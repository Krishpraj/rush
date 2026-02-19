/**
 * NetworkManager - WebRTC peer-to-peer multiplayer via PeerJS
 * Handles party creation, joining, syncing car states, and race events
 */

class NetworkManager {
    constructor() {
        this.peer = null;
        this.peerId = null;
        this.playerId = this._getOrCreatePlayerId();
        this.connections = new Map(); // peerId -> DataConnection
        this.isHost = false;
        this.partyCode = null;
        this.playerName = 'Player';
        this.carColor = '#ff3333';

        // Callbacks
        this.onPlayerJoined = null;
        this.onPlayerLeft = null;
        this.onPlayerState = null;
        this.onRaceStart = null;
        this.onRaceFinish = null;
        this.onChatMessage = null;
        this.onPartyUpdate = null;

        this.syncInterval = null;
        this.pollInterval = null;
        this.connected = false;
    }

    async init(playerName, carColor) {
        this.playerName = playerName;
        this.carColor = carColor;

        return new Promise((resolve, reject) => {
            // Create PeerJS instance
            this.peer = new Peer({
                debug: 1,
            });

            this.peer.on('open', (id) => {
                this.peerId = id;
                this.connected = true;
                console.log('[Network] PeerJS connected, ID:', id);
                resolve(id);
            });

            this.peer.on('connection', (conn) => {
                this._handleIncomingConnection(conn);
            });

            this.peer.on('error', (err) => {
                console.error('[Network] PeerJS error:', err);
                if (!this.connected) {
                    // Fallback: generate a local ID
                    this.peerId = 'local_' + Math.random().toString(36).substr(2, 9);
                    this.connected = true;
                    resolve(this.peerId);
                }
            });

            // Timeout
            setTimeout(() => {
                if (!this.connected) {
                    this.peerId = 'local_' + Math.random().toString(36).substr(2, 9);
                    this.connected = true;
                    resolve(this.peerId);
                }
            }, 5000);
        });
    }

    // --- Party Management (via backend API) ---

    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async _requestJson(url, options = {}, config = {}) {
        const {
            retries = 0,
            retryDelayMs = 300,
            retryOnStatuses = [502, 503, 504],
            retryOnNotFoundDetail = [],
        } = config;

        let lastError = null;

        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const resp = await fetch(url, options);
                let data = {};

                try {
                    data = await resp.json();
                } catch {
                    data = {};
                }

                if (resp.ok) {
                    return { resp, data };
                }

                const detail = data.detail || data.message || `HTTP ${resp.status}`;
                const canRetryByStatus = retryOnStatuses.includes(resp.status);
                const canRetryNotFound =
                    resp.status === 404 &&
                    retryOnNotFoundDetail.some(msg => String(detail).toLowerCase().includes(msg.toLowerCase()));

                if (attempt < retries && (canRetryByStatus || canRetryNotFound)) {
                    await this._delay(retryDelayMs * (attempt + 1));
                    continue;
                }

                throw new Error(detail);
            } catch (err) {
                const msg = String(err?.message || '');
                const isNetworkError =
                    err instanceof TypeError ||
                    msg.toLowerCase().includes('failed to fetch') ||
                    msg.toLowerCase().includes('network');

                if (attempt < retries && isNetworkError) {
                    await this._delay(retryDelayMs * (attempt + 1));
                    continue;
                }

                lastError = err;
                break;
            }
        }

        throw lastError || new Error('Request failed');
    }

    async createParty(trackId) {
        try {
            const { data } = await this._requestJson('/api/party/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    host_name: this.playerName,
                    host_peer_id: this.peerId,
                    host_player_id: this.playerId,
                    track_id: trackId,
                    car_color: this.carColor,
                }),
            }, {
                retries: 3,
                retryDelayMs: 400,
            });
            this.partyCode = data.code;
            this.isHost = true;
            console.log('[Network] Party created:', this.partyCode);

            // Start polling for new players
            this._startPartyPolling();

            return data;
        } catch (err) {
            console.error('[Network] Create party error:', err);
            throw err;
        }
    }

    async joinParty(code) {
        try {
            const { data } = await this._requestJson(`/api/party/${code}/join`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    player_name: this.playerName,
                    player_peer_id: this.peerId,
                    player_id: this.playerId,
                    car_color: this.carColor,
                }),
            }, {
                retries: 5,
                retryDelayMs: 500,
                retryOnNotFoundDetail: ['party not found'],
            });
            this.partyCode = code.toUpperCase();
            this.isHost = false;

            // Connect to all existing players via WebRTC
            for (const player of data.party.players) {
                if (player.peer_id !== this.peerId) {
                    this._connectToPeer(player.peer_id);
                }
            }

            this._startPartyPolling();
            return data;
        } catch (err) {
            if (String(err?.message || '').toLowerCase().includes('party not found')) {
                throw new Error('Party not found. It may have expired after a server restart—ask host to recreate it.');
            }
            console.error('[Network] Join party error:', err);
            throw err;
        }
    }

    async getParty() {
        if (!this.partyCode) return null;
        try {
            const { data } = await this._requestJson(`/api/party/${this.partyCode}`, {}, {
                retries: 2,
                retryDelayMs: 350,
                retryOnNotFoundDetail: ['party not found'],
            });
            return data.party;
        } catch {
            return null;
        }
    }

    async leaveParty() {
        if (!this.partyCode || !this.playerId) return;
        try {
            await fetch(`/api/party/${this.partyCode}/leave/${this.playerId}`, {
                method: 'DELETE',
            });
        } catch { }

        this._stopPartyPolling();
        this._disconnectAll();
        this.partyCode = null;
        this.isHost = false;
    }

    async startRace() {
        if (!this.partyCode || !this.isHost) return;
        try {
            await fetch(`/api/party/${this.partyCode}/start`, { method: 'POST' });
        } catch { }

        // Notify all peers
        this.broadcast({
            type: 'race_start',
            timestamp: Date.now(),
        });
    }

    async changeTrack(trackId) {
        if (!this.partyCode) return;
        try {
            await fetch(`/api/party/${this.partyCode}/track?track_id=${trackId}`, {
                method: 'POST',
            });
        } catch { }
    }

    // --- WebRTC Connections ---

    _connectToPeer(remotePeerId) {
        if (this.connections.has(remotePeerId)) return;
        if (!this.peer || this.peer.destroyed) return;

        try {
            const conn = this.peer.connect(remotePeerId, {
                reliable: false,
                serialization: 'json',
            });
            this._setupConnection(conn);
        } catch (err) {
            console.error('[Network] Connect to peer error:', err);
        }
    }

    _handleIncomingConnection(conn) {
        console.log('[Network] Incoming connection from:', conn.peer);
        this._setupConnection(conn);
    }

    _setupConnection(conn) {
        conn.on('open', () => {
            console.log('[Network] Connection open with:', conn.peer);
            this.connections.set(conn.peer, conn);

            // Send hello
            conn.send({
                type: 'hello',
                name: this.playerName,
                color: this.carColor,
                peerId: this.peerId,
            });

            if (this.onPlayerJoined) {
                this.onPlayerJoined(conn.peer);
            }
        });

        conn.on('data', (data) => {
            this._handleMessage(conn.peer, data);
        });

        conn.on('close', () => {
            console.log('[Network] Connection closed:', conn.peer);
            this.connections.delete(conn.peer);
            if (this.onPlayerLeft) {
                this.onPlayerLeft(conn.peer);
            }
        });

        conn.on('error', (err) => {
            console.error('[Network] Connection error:', err);
        });
    }

    _handleMessage(fromPeerId, data) {
        switch (data.type) {
            case 'hello':
                // Player introduced themselves
                break;
            case 'car_state':
                if (this.onPlayerState) {
                    this.onPlayerState(fromPeerId, data.state);
                }
                break;
            case 'race_start':
                if (this.onRaceStart) {
                    this.onRaceStart(data);
                }
                break;
            case 'race_finish':
                if (this.onRaceFinish) {
                    this.onRaceFinish(fromPeerId, data);
                }
                break;
            case 'checkpoint':
                // Handle checkpoint passing
                break;
            case 'chat':
                if (this.onChatMessage) {
                    this.onChatMessage(fromPeerId, data.message);
                }
                break;
        }
    }

    broadcast(data) {
        for (const [peerId, conn] of this.connections) {
            try {
                if (conn.open) {
                    conn.send(data);
                }
            } catch (err) {
                console.error('[Network] Broadcast error to', peerId, err);
            }
        }
    }

    sendCarState(state) {
        this.broadcast({
            type: 'car_state',
            state,
        });
    }

    sendFinish(data) {
        this.broadcast({
            type: 'race_finish',
            ...data,
        });
    }

    // --- Party Polling ---

    _startPartyPolling() {
        this._stopPartyPolling();
        this.pollInterval = setInterval(async () => {
            const party = await this.getParty();
            if (party && this.onPartyUpdate) {
                this.onPartyUpdate(party);

                // Connect to any new peers we haven't connected to
                for (const player of party.players) {
                    if (player.peer_id !== this.peerId && !this.connections.has(player.peer_id)) {
                        this._connectToPeer(player.peer_id);
                    }
                }
            }
        }, 2000);
    }

    _stopPartyPolling() {
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
            this.pollInterval = null;
        }
    }

    _disconnectAll() {
        for (const [peerId, conn] of this.connections) {
            try { conn.close(); } catch { }
        }
        this.connections.clear();
    }

    _getOrCreatePlayerId() {
        try {
            const key = 'rush_player_id';
            const existing = localStorage.getItem(key);
            if (existing) return existing;
            const generated = `p_${Math.random().toString(36).slice(2, 12)}${Date.now().toString(36).slice(-4)}`;
            localStorage.setItem(key, generated);
            return generated;
        } catch {
            return `p_${Math.random().toString(36).slice(2, 12)}`;
        }
    }

    // --- Sync Loop ---

    startSync(getStateFn) {
        this.stopSync();
        this.syncInterval = setInterval(() => {
            const state = getStateFn();
            if (state) {
                this.sendCarState(state);
            }
        }, 50); // 20 Hz
    }

    stopSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
    }

    // --- Leaderboard ---

    async submitTime(trackId, lapTime, totalTime, laps) {
        try {
            const resp = await fetch('/api/leaderboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    player_name: this.playerName,
                    track_id: trackId,
                    lap_time: lapTime,
                    total_time: totalTime,
                    laps,
                }),
            });
            return await resp.json();
        } catch (err) {
            console.error('[Network] Submit time error:', err);
            return null;
        }
    }

    async getLeaderboard(trackId) {
        try {
            let url = '/api/leaderboard';
            if (trackId && trackId !== 'all') {
                url += `?track_id=${trackId}`;
            }
            const resp = await fetch(url);
            return await resp.json();
        } catch (err) {
            console.error('[Network] Get leaderboard error:', err);
            return { leaderboard: [] };
        }
    }

    // --- Cleanup ---

    destroy() {
        this.stopSync();
        this._stopPartyPolling();
        this._disconnectAll();
        if (this.peer) {
            this.peer.destroy();
        }
    }

    getPlayerCount() {
        return this.connections.size + 1; // +1 for self
    }

    isConnected() {
        return this.connected && this.peerId != null;
    }
}

window.NetworkManager = NetworkManager;
