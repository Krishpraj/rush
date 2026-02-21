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
        this.selectedCarIndex = 0;
        this.playerName = '';
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Car selector state
        this._carLoader = null;
        this._previewScene = null;
        this._previewCamera = null;
        this._previewRenderer = null;

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
            // Try quick join from top-bar input first, fall back to join screen
            const quickInput = document.getElementById('join-code-quick');
            if (quickInput) {
                const code = quickInput.value.trim().toUpperCase();
                if (code.length >= 4) {
                    if (this.onJoinParty) this.onJoinParty(code, this.playerName, this.selectedColor);
                    return;
                }
            }
            this.showScreen('joinParty');
        });

        const btnLb = document.getElementById('btn-leaderboard');
        if (btnLb) btnLb.addEventListener('click', () => {
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

    // --- Car Selector ---

    initCarSelector(carLoader) {
        this._carLoader = carLoader;
        const count = carLoader ? carLoader.getCount() : 0;
        const nameEl = document.getElementById('car-name');
        const indexEl = document.getElementById('car-index');
        const prevBtn = document.getElementById('car-prev');
        const nextBtn = document.getElementById('car-next');

        if (count === 0) {
            nameEl.textContent = 'Default Car';
            indexEl.textContent = '—';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            this._initPreviewFallback();
            return;
        }

        this.selectedCarIndex = 0;
        this._initPreviewRenderer();
        this._updateCarPreview();

        prevBtn.addEventListener('click', () => {
            this.selectedCarIndex = (this.selectedCarIndex - 1 + count) % count;
            this._updateCarPreview();
        });
        nextBtn.addEventListener('click', () => {
            this.selectedCarIndex = (this.selectedCarIndex + 1) % count;
            this._updateCarPreview();
        });
    }

    _initPreviewRenderer() {
        const canvas = document.getElementById('car-preview-canvas');
        if (!canvas) return;

        this._previewScene = new THREE.Scene();
        this._previewScene.background = new THREE.Color(0x1a1a2e);

        // Lights
        const amb = new THREE.AmbientLight(0xffffff, 0.6);
        this._previewScene.add(amb);
        const dir = new THREE.DirectionalLight(0xffffff, 0.8);
        dir.position.set(3, 5, 4);
        this._previewScene.add(dir);
        const fill = new THREE.DirectionalLight(0x4488ff, 0.3);
        fill.position.set(-3, 2, -2);
        this._previewScene.add(fill);

        this._previewCamera = new THREE.PerspectiveCamera(40, canvas.width / canvas.height, 0.1, 50);
        this._previewCamera.position.set(4, 2.5, 5);
        this._previewCamera.lookAt(0, 0.5, 0);

        this._previewRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        this._previewRenderer.setSize(canvas.width, canvas.height);
        this._previewRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Ground plane
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshStandardMaterial({ color: 0x222244, roughness: 0.9 })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        this._previewScene.add(ground);
    }

    _initPreviewFallback() {
        // Just show a simple colored rectangle for the preview
        const canvas = document.getElementById('car-preview-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = this.selectedColor || '#ff3333';
        ctx.fillRect(60, 40, 80, 50);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Rajdhani';
        ctx.textAlign = 'center';
        ctx.fillText('Default Car', canvas.width / 2, 110);
    }

    _updateCarPreview() {
        if (!this._carLoader) return;
        const count = this._carLoader.getCount();
        const nameEl = document.getElementById('car-name');
        const indexEl = document.getElementById('car-index');

        nameEl.textContent = this._carLoader.getName(this.selectedCarIndex);
        indexEl.textContent = `${this.selectedCarIndex + 1} / ${count}`;

        if (!this._previewScene || !this._previewRenderer) return;

        // Remove old car model from scene
        const old = this._previewScene.getObjectByName('preview-car');
        if (old) this._previewScene.remove(old);

        // Add new car model
        const model = this._carLoader.getCarModel(this.selectedCarIndex);
        if (model) {
            model.name = 'preview-car';
            // Slight rotation for a nicer preview angle
            model.rotation.y = -Math.PI / 6;
            this._previewScene.add(model);

            // Detect wheel nodes for preview spin animation
            this._previewWheels = [];
            const wheelNamePattern = /wheel|tyre|tire|rim|roue|whl/i;

            // Collect all candidate wheel nodes (groups, bones, and meshes)
            const candidates = [];
            model.traverse((child) => {
                if (wheelNamePattern.test(child.name || '')) {
                    const tmp = new THREE.Vector3();
                    child.getWorldPosition(tmp);
                    candidates.push({ node: child, worldPos: tmp });
                }
            });

            // Prefer parent groups over child meshes
            const parentIds = new Set(candidates.filter(c => !c.node.isMesh).map(c => c.node.id));
            const filtered = candidates.filter(c => {
                if (!c.node.isMesh) return true;
                return !(c.node.parent && parentIds.has(c.node.parent.id));
            });

            // Dedupe by proximity
            const used = [];
            const modelBox = new THREE.Box3().setFromObject(model);
            const mSize = modelBox.getSize(new THREE.Vector3());
            for (const c of filtered) {
                if (!used.some(p => p.distanceTo(c.worldPos) < mSize.x * 0.08)) {
                    // Detect spin axis (local axis most aligned with world X)
                    const wq = new THREE.Quaternion();
                    c.node.getWorldQuaternion(wq);
                    const invQ = wq.clone().invert();
                    const localLat = new THREE.Vector3(1, 0, 0).applyQuaternion(invQ);
                    const axes = [new THREE.Vector3(1,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1)];
                    let bestAxis = axes[0], bestDot = 0;
                    for (const ax of axes) {
                        const d = Math.abs(localLat.dot(ax));
                        if (d > bestDot) { bestDot = d; bestAxis = ax.clone(); }
                    }
                    if (localLat.dot(bestAxis) < 0) bestAxis.negate();

                    this._previewWheels.push({
                        node: c.node,
                        baseQuaternion: c.node.quaternion.clone(),
                        spinAxis: bestAxis,
                    });
                    used.push(c.worldPos.clone());
                }
            }
        }

        // Start turntable animation loop
        if (this._previewAnimId) cancelAnimationFrame(this._previewAnimId);
        this._startPreviewAnimation();
    }

    _startPreviewAnimation() {
        const animate = () => {
            this._previewAnimId = requestAnimationFrame(animate);
            if (!this._previewScene || !this._previewRenderer || !this._previewCamera) return;

            const car = this._previewScene.getObjectByName('preview-car');
            if (car) {
                // Slow turntable rotation
                car.rotation.y += 0.008;
            }

            // Spin wheels for preview using per-wheel axis
            if (this._previewWheels && this._previewWheels.length > 0) {
                const spinAngle = Date.now() * 0.003;
                for (const w of this._previewWheels) {
                    const axis = w.spinAxis || new THREE.Vector3(1, 0, 0);
                    const spinQuat = new THREE.Quaternion().setFromAxisAngle(axis, spinAngle);
                    w.node.quaternion.copy(w.baseQuaternion).multiply(spinQuat);
                }
            }

            this._previewRenderer.render(this._previewScene, this._previewCamera);
        };
        animate();
    }

    showScreen(name) {
        // Hide all screens first
        Object.values(this.screens).forEach(s => s.classList.add('hidden'));
        if (this.screens[name]) {
            this.screens[name].classList.remove('hidden');
        }
        // Stop preview animation when leaving main menu
        if (name !== 'mainMenu' && this._previewAnimId) {
            cancelAnimationFrame(this._previewAnimId);
            this._previewAnimId = null;
        }
        // Restart preview animation when returning to main menu
        if (name === 'mainMenu' && this._previewScene && !this._previewAnimId) {
            this._startPreviewAnimation();
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
        const segs = document.querySelectorAll('.loader-segment');
        const thresholdPerSegment = 100 / (segs.length || 1);
        segs.forEach((seg, i) => {
            const fillAt = (i + 1) * thresholdPerSegment;
            seg.classList.toggle('filled', percent >= fillAt);
        });
        const car = document.getElementById('loader-car');
        const trackWrap = document.querySelector('.loader-track-wrap');
        if (car && trackWrap) {
            const tw = trackWrap.offsetWidth || 320;
            const pad = 8;
            const carW = 24;
            const maxLeft = tw - pad - carW;
            car.style.left = pad + (percent / 100) * Math.max(0, maxLeft - pad) + 'px';
        }
        const textEl = document.getElementById('loader-text');
        const percentEl = document.getElementById('loader-percent');
        if (textEl) textEl.textContent = text || '';
        if (percentEl) percentEl.textContent = Math.round(percent) + '%';
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
                // Monochrome Forza-like boost telemetry styling
                if (data.isBoosting) {
                    fill.style.background = pct < 15
                        ? 'linear-gradient(90deg, #9f9f9f, #666666)'
                        : 'linear-gradient(90deg, #ffffff, #9f9f9f)';
                    fill.classList.add('boosting');
                } else {
                    fill.style.background = 'linear-gradient(90deg, #f5f5f5, #cfcfcf)';
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
                    textEl.style.color = '#f5f5f5';
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

        // Auto-fit scale based on track bounds (important for larger tracks)
        let scale = 0.6;
        if (trackPath && trackPath.length > 1) {
            let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
            trackPath.forEach((p) => {
                if (p.x < minX) minX = p.x;
                if (p.x > maxX) maxX = p.x;
                if (p.z < minZ) minZ = p.z;
                if (p.z > maxZ) maxZ = p.z;
            });
            const spanX = Math.max(1, maxX - minX);
            const spanZ = Math.max(1, maxZ - minZ);
            const maxSpan = Math.max(spanX, spanZ);
            scale = Math.max(0.28, Math.min(1.15, 120 / maxSpan));
        }
        const cx = 75;
        const cy = 75;
        const offsetX = playerPos ? -playerPos.x * scale + cx : 0;
        const offsetZ = playerPos ? -playerPos.z * scale + cy : 0;

        // Draw track path
        if (trackPath && trackPath.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255,255,255,0.32)';
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
                ctx.beginPath();
                ctx.fillStyle = cp.passed ? 'rgba(255,255,255,0.62)' : 'rgba(255,255,255,0.22)';
                ctx.arc(x, z, 2.2, 0, Math.PI * 2);
                ctx.fill();
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
            ctx.fillStyle = '#ffffff';
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
