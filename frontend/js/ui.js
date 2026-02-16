/**
 * UI Manager - Handles all screen transitions, HUD updates, and user interactions
 */

class UIManager {
    constructor() {
        // Screens
        this.screens = {
            loading: document.getElementById('loading-screen'),
            mainMenu: document.getElementById('main-menu'),
            trackSelect: document.getElementById('track-select'),
            partyLobby: document.getElementById('party-lobby'),
            joinParty: document.getElementById('join-party-screen'),
            leaderboard: document.getElementById('leaderboard-screen'),
            hud: document.getElementById('hud'),
            countdown: document.getElementById('countdown'),
            raceResults: document.getElementById('race-results'),
            pauseMenu: document.getElementById('pause-menu'),
            mobileControls: document.getElementById('mobile-controls'),
        };

        // State
        this.selectedColor = '#ff3333';
        this.selectedTrack = 'track_1';
        this.playerName = '';
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Callbacks (set by Game)
        this.onSoloRace = null;
        this.onCreateParty = null;
        this.onJoinParty = null;
        this.onStartRace = null;
        this.onLeaveParty = null;
        this.onResumeGame = null;
        this.onRestartGame = null;
        this.onQuitToMenu = null;
        this.onRaceAgain = null;
        this.onTrackSelected = null;

        this._setupEventListeners();
    }

    _setupEventListeners() {
        // Color picker
        document.querySelectorAll('.color-option').forEach(el => {
            el.addEventListener('click', () => {
                document.querySelectorAll('.color-option').forEach(e => e.classList.remove('selected'));
                el.classList.add('selected');
                this.selectedColor = el.dataset.color;
            });
        });

        // Track selection
        document.querySelectorAll('.track-card').forEach(el => {
            el.addEventListener('click', () => {
                document.querySelectorAll('.track-card').forEach(e => e.classList.remove('selected'));
                el.classList.add('selected');
                this.selectedTrack = el.dataset.track;
            });
        });

        // Main menu buttons
        document.getElementById('btn-single').addEventListener('click', () => {
            this.playerName = document.getElementById('player-name').value.trim() || 'Player';
            this.showScreen('trackSelect');
            this._trackSelectMode = 'solo';
        });

        document.getElementById('btn-create-party').addEventListener('click', () => {
            this.playerName = document.getElementById('player-name').value.trim() || 'Player';
            if (this.onCreateParty) this.onCreateParty(this.playerName, this.selectedColor);
        });

        document.getElementById('btn-join-party').addEventListener('click', () => {
            this.playerName = document.getElementById('player-name').value.trim() || 'Player';
            this.showScreen('joinParty');
        });

        document.getElementById('btn-leaderboard').addEventListener('click', () => {
            this.showScreen('leaderboard');
            if (this._loadLeaderboard) this._loadLeaderboard('all');
        });

        // Track select
        document.getElementById('btn-track-back').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });

        document.getElementById('btn-track-go').addEventListener('click', () => {
            if (this._trackSelectMode === 'solo') {
                if (this.onSoloRace) this.onSoloRace(this.selectedTrack, this.playerName, this.selectedColor);
            } else if (this._trackSelectMode === 'party') {
                if (this.onTrackSelected) this.onTrackSelected(this.selectedTrack);
                this.showScreen('partyLobby');
            }
        });

        // Join party
        document.getElementById('btn-join-back').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });

        document.getElementById('btn-join-go').addEventListener('click', () => {
            const code = document.getElementById('join-code-input').value.trim().toUpperCase();
            if (code.length < 4) {
                this.showJoinError('Please enter a valid party code');
                return;
            }
            if (this.onJoinParty) this.onJoinParty(code, this.playerName, this.selectedColor);
        });

        // Party lobby
        document.getElementById('btn-leave-party').addEventListener('click', () => {
            if (this.onLeaveParty) this.onLeaveParty();
        });

        document.getElementById('btn-start-race').addEventListener('click', () => {
            if (this.onStartRace) this.onStartRace();
        });

        document.getElementById('btn-copy-code').addEventListener('click', () => {
            const code = document.getElementById('party-code-value').textContent;
            navigator.clipboard.writeText(code).catch(() => { });
        });

        document.getElementById('btn-change-track-party').addEventListener('click', () => {
            this._trackSelectMode = 'party';
            this.showScreen('trackSelect');
        });

        // Leaderboard
        document.getElementById('btn-lb-back').addEventListener('click', () => {
            this.showScreen('mainMenu');
        });

        document.querySelectorAll('.lb-filter').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.lb-filter').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (this._loadLeaderboard) this._loadLeaderboard(btn.dataset.filter);
            });
        });

        // HUD
        document.getElementById('btn-hud-menu').addEventListener('click', () => {
            this.showScreen('pauseMenu');
        });

        // Pause menu
        document.getElementById('btn-resume').addEventListener('click', () => {
            this.hideScreen('pauseMenu');
            this.showScreen('hud');
            if (this.onResumeGame) this.onResumeGame();
        });

        document.getElementById('btn-restart').addEventListener('click', () => {
            this.hideScreen('pauseMenu');
            if (this.onRestartGame) this.onRestartGame();
        });

        document.getElementById('btn-quit').addEventListener('click', () => {
            this.hideScreen('pauseMenu');
            if (this.onQuitToMenu) this.onQuitToMenu();
        });

        // Race results
        document.getElementById('btn-race-again').addEventListener('click', () => {
            if (this.onRaceAgain) this.onRaceAgain();
        });

        document.getElementById('btn-back-menu').addEventListener('click', () => {
            if (this.onQuitToMenu) this.onQuitToMenu();
        });

        // Keyboard shortcut for pause
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (!this.screens.pauseMenu.classList.contains('hidden')) {
                    this.hideScreen('pauseMenu');
                    this.showScreen('hud');
                    if (this.onResumeGame) this.onResumeGame();
                } else if (!this.screens.hud.classList.contains('hidden')) {
                    this.showScreen('pauseMenu');
                }
            }
        });
    }

    showScreen(name) {
        // Hide all screens first
        Object.values(this.screens).forEach(s => s.classList.add('hidden'));
        if (this.screens[name]) {
            this.screens[name].classList.remove('hidden');
        }
    }

    hideScreen(name) {
        if (this.screens[name]) {
            this.screens[name].classList.add('hidden');
        }
    }

    hideAllScreens() {
        Object.values(this.screens).forEach(s => s.classList.add('hidden'));
    }

    // --- Loading ---

    setLoadingProgress(percent, text) {
        document.getElementById('loader-fill').style.width = percent + '%';
        document.getElementById('loader-text').textContent = text || '';
    }

    // --- HUD ---

    showHUD() {
        this.screens.hud.classList.remove('hidden');
        if (this.isMobile) {
            this.screens.mobileControls.classList.remove('hidden');
        }
    }

    hideHUD() {
        this.screens.hud.classList.add('hidden');
        this.screens.mobileControls.classList.add('hidden');
    }

    updateHUD(data) {
        if (data.position !== undefined) {
            const suffixes = ['st', 'nd', 'rd', 'th', 'th', 'th'];
            document.getElementById('hud-position').textContent =
                data.position + (suffixes[data.position - 1] || 'th');
        }
        if (data.lap !== undefined) {
            document.getElementById('hud-lap').textContent = data.lap;
        }
        if (data.time !== undefined) {
            document.getElementById('hud-time').textContent = this.formatTime(data.time);
        }
        if (data.speed !== undefined) {
            document.getElementById('hud-speed').textContent = Math.round(data.speed);
        }
        if (data.boostFuel !== undefined && data.boostMax !== undefined) {
            const fill = document.getElementById('hud-boost-fill');
            if (fill) {
                const pct = Math.max(0, Math.min(100, (data.boostFuel / data.boostMax) * 100));
                fill.style.width = pct + '%';
                // Color: cyan when full/regen, orange when boosting, red when empty
                if (data.isBoosting) {
                    fill.style.background = pct < 15 ? '#ff2222' : 'linear-gradient(90deg, #ff8800, #ffcc00)';
                    fill.classList.add('boosting');
                } else {
                    fill.style.background = 'linear-gradient(90deg, #00ccff, #00ffcc)';
                    fill.classList.remove('boosting');
                }
            }
        }
    }

    showCheckpointFlash() {
        const el = document.getElementById('hud-checkpoint');
        el.classList.remove('hidden');
        setTimeout(() => el.classList.add('hidden'), 800);
    }

    showLapTime(time) {
        const el = document.getElementById('hud-lap-time');
        document.getElementById('hud-lap-time-val').textContent = this.formatTime(time);
        el.classList.remove('hidden');
        setTimeout(() => el.classList.add('hidden'), 2000);
    }

    // --- Countdown ---

    async showCountdown() {
        return new Promise(resolve => {
            this.screens.countdown.classList.remove('hidden');
            const textEl = document.getElementById('countdown-text');
            let count = 3;

            const tick = () => {
                if (count > 0) {
                    textEl.textContent = count;
                    textEl.style.animation = 'none';
                    void textEl.offsetWidth;
                    textEl.style.animation = 'countPulse 1s ease-out';
                    count--;
                    setTimeout(tick, 1000);
                } else {
                    textEl.textContent = 'GO!';
                    textEl.style.color = '#33ff33';
                    textEl.style.animation = 'none';
                    void textEl.offsetWidth;
                    textEl.style.animation = 'countPulse 1s ease-out';
                    setTimeout(() => {
                        this.screens.countdown.classList.add('hidden');
                        textEl.style.color = '';
                        resolve();
                    }, 1000);
                }
            };
            tick();
        });
    }

    // --- Party Lobby ---

    updatePartyLobby(party) {
        document.getElementById('party-code-value').textContent = party.code;
        const trackNames = {
            track_1: 'Speed Loop',
            track_2: 'City Sprint',
            track_3: 'Mountain Pass',
        };
        document.getElementById('party-track-name').textContent =
            trackNames[party.track_id] || party.track_id;

        const list = document.getElementById('player-list');
        list.innerHTML = '';
        for (const p of party.players) {
            const item = document.createElement('div');
            item.className = 'player-item';
            item.innerHTML = `
                <div class="player-color" style="background:${p.car_color}"></div>
                <span class="player-name">${this._escapeHtml(p.name)}</span>
                ${p.is_host ? '<span class="player-host">HOST</span>' : ''}
                <span class="player-ready ${p.ready ? 'is-ready' : 'not-ready'}">
                    ${p.ready ? 'READY' : 'NOT READY'}
                </span>
            `;
            list.appendChild(item);
        }

        // Show start button for host
        const startBtn = document.getElementById('btn-start-race');
        const waitText = document.getElementById('waiting-text');
        const isHostView = party.players.some(
            p => p.is_host && p.peer_id === window._currentPeerId
        );
        if (isHostView) {
            startBtn.style.display = 'block';
            waitText.style.display = 'none';
        } else {
            startBtn.style.display = 'none';
            waitText.style.display = 'block';
        }
    }

    showJoinError(msg) {
        const el = document.getElementById('join-error');
        el.textContent = msg;
        el.classList.remove('hidden');
        setTimeout(() => el.classList.add('hidden'), 3000);
    }

    // --- Race Results ---

    showResults(data) {
        document.getElementById('result-total-time').textContent = this.formatTime(data.totalTime);
        document.getElementById('result-best-lap').textContent = this.formatTime(data.bestLap);
        const suffixes = ['st', 'nd', 'rd', 'th', 'th', 'th'];
        document.getElementById('result-position').textContent =
            data.position + (suffixes[data.position - 1] || 'th');

        // Player rankings
        const playersDiv = document.getElementById('results-players');
        playersDiv.innerHTML = '';
        if (data.rankings) {
            data.rankings.forEach((p, i) => {
                const item = document.createElement('div');
                item.className = 'player-item';
                item.innerHTML = `
                    <span style="font-weight:700;color:var(--primary);width:30px">${i + 1}</span>
                    <div class="player-color" style="background:${p.color}"></div>
                    <span class="player-name">${this._escapeHtml(p.name)}</span>
                    <span style="color:var(--text-dim)">${this.formatTime(p.time)}</span>
                `;
                playersDiv.appendChild(item);
            });
        }

        this.hideHUD();
        this.showScreen('raceResults');
    }

    // --- Leaderboard ---

    updateLeaderboard(entries) {
        const body = document.getElementById('lb-body');
        body.innerHTML = '';
        const trackNames = {
            track_1: 'Speed Loop',
            track_2: 'City Sprint',
            track_3: 'Mountain Pass',
        };
        entries.forEach((entry, i) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${this._escapeHtml(entry.player_name)}</td>
                <td>${trackNames[entry.track_id] || entry.track_id}</td>
                <td>${this.formatTime(entry.lap_time)}</td>
                <td>${this.formatTime(entry.total_time)}</td>
            `;
            body.appendChild(row);
        });
        if (entries.length === 0) {
            body.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-dim)">No records yet</td></tr>';
        }
    }

    // --- Minimap ---

    updateMinimap(playerPos, checkpoints, otherPlayers, trackPath) {
        const canvas = document.getElementById('minimap-canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 150, 150);

        const scale = 0.6;
        const cx = 75;
        const cy = 75;
        const offsetX = playerPos ? -playerPos.x * scale + cx : 0;
        const offsetZ = playerPos ? -playerPos.z * scale + cy : 0;

        // Draw track path
        if (trackPath && trackPath.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0,255,204,0.3)';
            ctx.lineWidth = 3;
            trackPath.forEach((p, i) => {
                const x = p.x * scale + offsetX;
                const z = p.z * scale + offsetZ;
                if (i === 0) ctx.moveTo(x, z);
                else ctx.lineTo(x, z);
            });
            ctx.closePath();
            ctx.stroke();
        }

        // Draw checkpoints
        if (checkpoints) {
            checkpoints.forEach(cp => {
                const x = cp.x * scale + offsetX;
                const z = cp.z * scale + offsetZ;
                ctx.fillStyle = cp.passed ? 'rgba(0,255,204,0.5)' : 'rgba(255,255,255,0.2)';
                ctx.fillRect(x - 2, z - 2, 4, 4);
            });
        }

        // Draw other players
        if (otherPlayers) {
            otherPlayers.forEach(p => {
                const x = p.x * scale + offsetX;
                const z = p.z * scale + offsetZ;
                ctx.fillStyle = p.color || '#888';
                ctx.beginPath();
                ctx.arc(x, z, 3, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // Draw self
        if (playerPos) {
            ctx.fillStyle = '#00ffcc';
            ctx.beginPath();
            ctx.arc(cx, cy, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // --- Utilities ---

    formatTime(seconds) {
        if (seconds == null || isNaN(seconds)) return '0:00.000';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs.toFixed(3)}`;
    }

    _escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

window.UIManager = UIManager;
