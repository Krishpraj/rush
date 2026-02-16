/**
 * Game Engine - Core game loop, state management, and race logic
 * Ties together: Three.js rendering, physics, car, track, network, and UI
 */

class Game {
    constructor() {
        // Core systems
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.physics = null;
        this.trackBuilder = null;
        this.network = null;
        this.ui = null;

        // Game state
        this.state = 'menu'; // menu, countdown, racing, paused, finished
        this.trackId = 'track_1';
        this.trackData = null;

        // Cars
        this.localCar = null;
        this.remoteCars = new Map(); // peerId -> Car

        // Race state
        this.raceStartTime = 0;
        this.lapStartTime = 0;
        this.currentLap = 1;
        this.totalLaps = 3;
        this.nextCheckpoint = 0;
        this.lapTimes = [];
        this.bestLap = Infinity;
        this.raceFinished = false;

        // Wrong-way detection
        this._wrongWay = false;
        this._wrongWayTimer = 0;   // seconds going the wrong way
        this._wrongWayCooldown = 0; // cooldown before hiding the warning

        // Player info
        this.playerName = 'Player';
        this.carColor = '#ff3333';
        this.isMultiplayer = false;

        // Rankings (multiplayer)
        this.finishRankings = [];

        // Frame timing
        this.clock = null;
        this.animFrameId = null;

        // Input state
        this.keys = {};
        this.touchInput = { steerX: 0, gas: false, brake: false };
    }

    async init(ui, network) {
        this.ui = ui;
        this.network = network;

        // Three.js renderer
        const canvas = document.getElementById('game-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            powerPreference: 'high-performance',
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            65, window.innerWidth / window.innerHeight, 0.5, 500
        );
        this.camera.position.set(0, 10, 20);

        // Physics
        this.physics = new PhysicsEngine();
        await this.physics.init();

        // Track builder
        this.trackBuilder = new TrackBuilder(this.scene, this.physics);

        // Clock
        this.clock = new THREE.Clock();

        // Input handlers
        this._setupInputHandlers();

        // Resize handler
        window.addEventListener('resize', () => this._onResize());

        // Network callbacks
        this._setupNetworkCallbacks();

        console.log('[Game] Initialized');
    }

    _setupInputHandlers() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            if (e.key === 'r' && this.state === 'racing') {
                this._resetCar();
            }
            if (e.key === 'c' && this.state === 'racing' && this.localCar) {
                this.localCar.toggleCamera();
            }
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Mobile touch controls
        this._setupTouchControls();
    }

    _setupTouchControls() {
        const joystickZone = document.getElementById('touch-steer-zone');
        const knob = document.getElementById('joystick-knob');
        const gasBtn = document.getElementById('touch-gas');
        const brakeBtn = document.getElementById('touch-brake');

        let joystickActive = false;
        let joystickCenterX = 0;

        if (joystickZone) {
            joystickZone.addEventListener('touchstart', (e) => {
                e.preventDefault();
                joystickActive = true;
                const rect = joystickZone.getBoundingClientRect();
                joystickCenterX = rect.left + rect.width / 2;
            });

            joystickZone.addEventListener('touchmove', (e) => {
                e.preventDefault();
                if (!joystickActive) return;
                const touch = e.touches[0];
                const rect = joystickZone.getBoundingClientRect();
                const relX = (touch.clientX - joystickCenterX) / (rect.width / 2);
                this.touchInput.steerX = Math.max(-1, Math.min(1, relX));
                if (knob) {
                    knob.style.transform = `translate(${-50 + relX * 40}%, -50%)`;
                }
            });

            const endJoystick = () => {
                joystickActive = false;
                this.touchInput.steerX = 0;
                if (knob) knob.style.transform = 'translate(-50%, -50%)';
            };
            joystickZone.addEventListener('touchend', endJoystick);
            joystickZone.addEventListener('touchcancel', endJoystick);
        }

        if (gasBtn) {
            gasBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.touchInput.gas = true;
            });
            gasBtn.addEventListener('touchend', () => this.touchInput.gas = false);
            gasBtn.addEventListener('touchcancel', () => this.touchInput.gas = false);
        }

        if (brakeBtn) {
            brakeBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.touchInput.brake = true;
            });
            brakeBtn.addEventListener('touchend', () => this.touchInput.brake = false);
            brakeBtn.addEventListener('touchcancel', () => this.touchInput.brake = false);
        }
    }

    _setupNetworkCallbacks() {
        if (!this.network) return;

        this.network.onPlayerState = (peerId, state) => {
            if (this.remoteCars.has(peerId)) {
                this.remoteCars.get(peerId).setNetworkState(state);
            }
        };

        this.network.onPlayerJoined = (peerId) => {
            console.log('[Game] Player joined:', peerId);
        };

        this.network.onPlayerLeft = (peerId) => {
            if (this.remoteCars.has(peerId)) {
                this.remoteCars.get(peerId).dispose();
                this.remoteCars.delete(peerId);
            }
        };

        this.network.onRaceStart = (data) => {
            if (this.state !== 'racing') {
                this.startRace(this.trackId, false);
            }
        };

        this.network.onRaceFinish = (peerId, data) => {
            this.finishRankings.push({
                name: data.name || 'Player',
                color: data.color || '#888',
                time: data.totalTime || 0,
            });
        };

        this.network.onPartyUpdate = (party) => {
            if (this.ui && this.state === 'menu') {
                this.ui.updatePartyLobby(party);
            }
            this.trackId = party.track_id;

            // Create/update remote cars when racing
            if (this.state === 'racing') {
                for (const player of party.players) {
                    if (player.peer_id !== this.network.peerId && !this.remoteCars.has(player.peer_id)) {
                        this._createRemoteCar(player);
                    }
                }
            }
        };
    }

    // --- Game States ---

    async startRace(trackId, showCountdown = true) {
        this.trackId = trackId;
        this.state = 'countdown';
        this.raceFinished = false;
        this.currentLap = 1;
        this.nextCheckpoint = 0;
        this.lapTimes = [];
        this.bestLap = Infinity;
        this.finishRankings = [];

        // Clear old scene contents
        this._clearScene();

        // Build track
        this.trackData = this.trackBuilder.buildTrack(trackId);
        if (!this.trackData) {
            console.error('Failed to build track');
            return;
        }
        this.totalLaps = this.trackData.laps;

        // Create local car
        this.localCar = new Car(this.scene, this.physics, {
            color: this.carColor,
            playerName: this.playerName,
            isLocal: true,
        });
        this.localCar.initPhysics(this.trackData.startPosition);
        this.localCar.reset(this.trackData.startPosition, this.trackData.startRotation);

        // Create remote cars (multiplayer)
        if (this.isMultiplayer && this.network) {
            const party = await this.network.getParty();
            if (party) {
                let offset = 0;
                for (const player of party.players) {
                    if (player.peer_id !== this.network.peerId) {
                        this._createRemoteCar(player, offset);
                        offset++;
                    }
                }
            }
        }

        // Show HUD
        this.ui.hideAllScreens();
        this.ui.showHUD();

        // Countdown
        if (showCountdown) {
            await this.ui.showCountdown();
        }

        // Start racing
        this.state = 'racing';
        this.raceStartTime = performance.now();
        this.lapStartTime = this.raceStartTime;

        // Start network sync
        if (this.isMultiplayer && this.network) {
            this.network.startSync(() => {
                if (this.localCar) return this.localCar.getNetworkState();
                return null;
            });
        }

        // Start game loop
        this._startLoop();
    }

    _createRemoteCar(player, offset = 0) {
        const spawnPos = {
            x: this.trackData.startPosition.x + (offset + 1) * 3,
            y: this.trackData.startPosition.y,
            z: this.trackData.startPosition.z,
        };
        const car = new Car(this.scene, this.physics, {
            color: player.car_color || '#888888',
            playerName: player.name || 'Player',
            isLocal: false,
        });
        // Remote cars don't need full physics, just visual
        car.group.position.set(spawnPos.x, spawnPos.y, spawnPos.z);
        this.remoteCars.set(player.peer_id, car);
    }

    pauseGame() {
        this.state = 'paused';
    }

    resumeGame() {
        if (this.state === 'paused') {
            this.state = 'racing';
        }
    }

    restartRace() {
        this.stopGame();
        this.startRace(this.trackId);
    }

    stopGame() {
        this.state = 'menu';
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }
        if (this.network) {
            this.network.stopSync();
        }
        this._clearScene();
    }

    quitToMenu() {
        this.stopGame();
        if (this.network && this.network.partyCode) {
            this.network.leaveParty();
        }
        this.isMultiplayer = false;
        this.ui.hideAllScreens();
        this.ui.showScreen('mainMenu');
    }

    _clearScene() {
        // Remove local car
        if (this.localCar) {
            this.localCar.dispose();
            this.localCar = null;
        }

        // Remove remote cars
        for (const [pid, car] of this.remoteCars) {
            car.dispose();
        }
        this.remoteCars.clear();

        // Clear track
        if (this.trackBuilder) {
            this.trackBuilder.clearTrack();
        }

        // Reset physics
        if (this.physics) {
            this.physics.cleanup();
        }
    }

    // --- Game Loop ---

    _startLoop() {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        this.clock.start();

        const loop = () => {
            this.animFrameId = requestAnimationFrame(loop);

            const dt = Math.min(this.clock.getDelta(), 1 / 30);

            if (this.state === 'racing') {
                this._updateInput();
                this._updatePhysics(dt);
                this._updateCheckpoints();
                this._updateHUD();
                this._updateMinimap();
            }

            this._render();
        };

        loop();
    }

    _updateInput() {
        if (!this.localCar) return;

        const isMobile = this.ui.isMobile;
        const input = {
            forward: this.keys['w'] || this.keys['arrowup'] || this.touchInput.gas,
            backward: this.keys['s'] || this.keys['arrowdown'] || this.touchInput.brake,
            left: this.keys['a'] || this.keys['arrowleft'] || (isMobile && this.touchInput.steerX < -0.2),
            right: this.keys['d'] || this.keys['arrowright'] || (isMobile && this.touchInput.steerX > 0.2),
            handbrake: this.keys[' '],
            boost: this.keys['shift'],
        };

        this.localCar.setInput(input);
    }

    _updatePhysics(dt) {
        this.physics.step(dt);
        if (this.localCar) {
            this.localCar.update(dt);
            // Constrain car to track boundaries
            if (this.localCar.body && this.trackBuilder) {
                this.trackBuilder.constrainToTrack(this.localCar.body);
                // Apply ramp heights — lift car when driving over ramps
                const rampH = this.trackBuilder.getRampHeight(
                    this.localCar.body.position._x,
                    this.localCar.body.position._z
                );
                if (rampH > 0.05) {
                    const targetY = rampH + 0.5; // car half-height offset
                    if (this.localCar.body.position._y < targetY) {
                        this.localCar.body.position._y = targetY;
                        if (this.localCar.body.velocity._y < 0) {
                            this.localCar.body.velocity._y = 0;
                        }
                    }
                    // At ramp peak, give upward boost for a jump
                    if (rampH > 0.3 && this.localCar.body.velocity._y < 2) {
                        const speedMs = Math.abs(this.localCar.speed) / 3.6;
                        const boost = Math.min(speedMs * 0.15, 6);
                        this.localCar.body.velocity._y = Math.max(this.localCar.body.velocity._y, boost);
                    }
                }
            }
            this.localCar.updateCamera(this.camera, dt);
        }
    }

    _updateCheckpoints() {
        if (!this.localCar || !this.trackData || this.raceFinished) return;

        const carPos = this.localCar.getPosition();
        const checkpoints = this.trackBuilder.getCheckpoints();
        const finishLine = this.trackData.finishLine;

        // --- Wrong-way detection ---
        this._detectWrongWay();

        // Check current target checkpoint
        if (this.nextCheckpoint < checkpoints.length) {
            const cp = checkpoints[this.nextCheckpoint];
            const dist = Math.sqrt(
                (carPos.x - cp.x) ** 2 + (carPos.z - cp.z) ** 2
            );
            if (dist < cp.width) {
                // Only register if car is moving in the correct track direction
                const dir = this.trackBuilder.getTrackDirection(carPos.x, carPos.z);
                const fwd = { x: Math.sin(this.localCar.yaw), z: Math.cos(this.localCar.yaw) };
                const dot = fwd.x * dir.dx + fwd.z * dir.dz;
                if (dot > -0.3) { // allow up to ~107 degrees off (generous for tight curves)
                    cp.passed = true;
                    this.nextCheckpoint++;
                    this.ui.showCheckpointFlash();
                }
            }
        }

        // Check finish line (all checkpoints passed)
        if (this.nextCheckpoint >= checkpoints.length) {
            const dist = Math.sqrt(
                (carPos.x - finishLine.x) ** 2 + (carPos.z - finishLine.z) ** 2
            );
            if (dist < finishLine.width) {
                this._completeLap();
            }
        }

        // Reset car if fallen off
        if (carPos.y < -10) {
            this._resetCar();
        }
    }

    _detectWrongWay() {
        if (!this.localCar || !this.trackBuilder) return;
        const carPos = this.localCar.getPosition();
        const dir = this.trackBuilder.getTrackDirection(carPos.x, carPos.z);
        const fwd = { x: Math.sin(this.localCar.yaw), z: Math.cos(this.localCar.yaw) };
        const dot = fwd.x * dir.dx + fwd.z * dir.dz;

        // Also check velocity direction (more reliable than facing)
        const vx = this.localCar.body ? this.localCar.body.velocity._x : 0;
        const vz = this.localCar.body ? this.localCar.body.velocity._z : 0;
        const spd = Math.sqrt(vx * vx + vz * vz);
        let velDot = 0;
        if (spd > 1) {
            velDot = (vx * dir.dx + vz * dir.dz) / spd;
        }

        // Wrong way if both facing AND moving opposite to track direction, and speed > 10 km/h
        const isWrong = dot < -0.5 && velDot < -0.3 && Math.abs(this.localCar.speed) > 10;

        const el = document.getElementById('hud-wrong-way');
        if (!el) return;

        if (isWrong) {
            this._wrongWayTimer += 0.016;
            this._wrongWayCooldown = 1.0; // keep showing for 1s after correcting
            if (this._wrongWayTimer > 0.4) { // only show after 0.4s of consistent wrong-way
                el.classList.remove('hidden');
                this._wrongWay = true;
            }
        } else {
            this._wrongWayTimer = 0;
            if (this._wrongWay) {
                this._wrongWayCooldown -= 0.016;
                if (this._wrongWayCooldown <= 0) {
                    el.classList.add('hidden');
                    this._wrongWay = false;
                }
            }
        }
    }

    _completeLap() {
        const now = performance.now();
        const lapTime = (now - this.lapStartTime) / 1000;
        this.lapTimes.push(lapTime);
        if (lapTime < this.bestLap) this.bestLap = lapTime;

        this.ui.showLapTime(lapTime);

        if (this.currentLap >= this.totalLaps) {
            this._finishRace();
        } else {
            this.currentLap++;
            this.lapStartTime = now;
            this.nextCheckpoint = 0;
            this.trackBuilder.resetCheckpoints();
        }
    }

    _finishRace() {
        this.raceFinished = true;
        this.state = 'finished';
        const totalTime = (performance.now() - this.raceStartTime) / 1000;

        // Submit to leaderboard
        if (this.network) {
            this.network.submitTime(
                this.trackId,
                this.bestLap,
                totalTime,
                this.totalLaps
            );

            // Notify others
            if (this.isMultiplayer) {
                this.network.sendFinish({
                    name: this.playerName,
                    color: this.carColor,
                    totalTime,
                    bestLap: this.bestLap,
                });
            }
        }

        // Add self to rankings
        this.finishRankings.unshift({
            name: this.playerName,
            color: this.carColor,
            time: totalTime,
        });
        this.finishRankings.sort((a, b) => a.time - b.time);

        const position = this.finishRankings.findIndex(r => r.name === this.playerName) + 1;

        // Show results after a short delay
        setTimeout(() => {
            this.ui.showResults({
                totalTime,
                bestLap: this.bestLap,
                position: position || 1,
                rankings: this.finishRankings,
            });
        }, 1500);
    }

    _resetCar() {
        if (!this.localCar || !this.trackData) return;

        // Find the last passed checkpoint or start
        const checkpoints = this.trackBuilder.getCheckpoints();
        let resetPos;
        if (this.nextCheckpoint > 0 && checkpoints[this.nextCheckpoint - 1]) {
            const cp = checkpoints[this.nextCheckpoint - 1];
            resetPos = { x: cp.x, y: 1, z: cp.z };
        } else {
            resetPos = {
                x: this.trackData.startPosition.x,
                y: 1,
                z: this.trackData.startPosition.z,
            };
        }
        this.localCar.reset(resetPos, this.trackData.startRotation);
    }

    _updateHUD() {
        if (!this.localCar) return;
        const elapsed = (performance.now() - this.raceStartTime) / 1000;
        this.ui.updateHUD({
            position: this._calculatePosition(),
            lap: this.currentLap,
            time: elapsed,
            speed: this.localCar.getSpeed(),
            boostFuel: this.localCar.boostFuel,
            boostMax: this.localCar.boostMax,
            isBoosting: this.localCar.isBoosting,
        });
    }

    _calculatePosition() {
        // In single player, always 1st. In multiplayer, based on checkpoints and lap
        if (!this.isMultiplayer) return 1;

        // Simple: based on who's ahead in checkpoints / laps
        let position = 1;
        // Could be enhanced with actual distance tracking
        return position;
    }

    _updateMinimap() {
        if (!this.localCar || !this.trackData) return;

        const carPos = this.localCar.getPosition();
        const checkpoints = this.trackBuilder.getCheckpoints();
        const others = [];

        for (const [pid, car] of this.remoteCars) {
            const p = car.getPosition();
            others.push({ x: p.x, z: p.z, color: car.color });
        }

        this.ui.updateMinimap(
            { x: carPos.x, z: carPos.z },
            checkpoints,
            others,
            this.trackData.path
        );
    }

    _render() {
        this.renderer.render(this.scene, this.camera);
    }

    _onResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }
}

window.Game = Game;
