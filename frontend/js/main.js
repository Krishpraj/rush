/**
 * Main entry point - Bootstrap the game
 * Initializes all systems and wires up UI callbacks
 */

(async function main() {
    const ui = new UIManager();
    const network = new NetworkManager();
    const game = new Game();

    // 3D car preview state (declared early so hoisted functions can access)
    let _menuPreviewRenderer, _menuPreviewScene, _menuPreviewCamera, _menuPreviewCar, _menuPreviewAnimId;

    // Loading sequence
    ui.setLoadingProgress(10, 'Initializing engine...');

    try {
        await game.init(ui, network);
        ui.setLoadingProgress(30, 'Loading physics...');

        let runtimeConfig = {};
        try {
            const configResp = await fetch('/api/config');
            if (configResp.ok) {
                runtimeConfig = await configResp.json();
            }
        } catch (e) {
            console.warn('[Rush] Runtime config unavailable, using defaults:', e);
        }

        // Load car models (non-blocking — fallback to procedural if GLB fails)
        ui.setLoadingProgress(40, 'Loading car models...');
        try {
            const carLoader = new CarModelLoader({
                carModelUrl: runtimeConfig.car_model_url || '',
            });
            await carLoader.load();
            window._carModelLoader = carLoader;
            console.log('[Rush] Car models loaded:', carLoader.getCount());
        } catch (e) {
            console.warn('[Rush] Car model loading failed, using procedural cars:', e);
        }

        // Car model loaded — always use index 0
        ui.selectedCarIndex = 0;

        // Init 3D car preview on home screen (non-critical)
        try { _initMenuCarPreview(); } catch (e) { console.warn('[Rush] Car preview failed:', e); }

        ui.setLoadingProgress(60, 'Connecting to network...');
        const name = localStorage.getItem('rush_name') || '';
        const color = localStorage.getItem('rush_color') || '#ff3333';
        document.getElementById('player-name').value = name;
        if (color) {
            document.querySelectorAll('.color-option').forEach(el => {
                if (el.dataset.color === color) {
                    document.querySelectorAll('.color-option').forEach(e => e.classList.remove('selected'));
                    el.classList.add('selected');
                    ui.selectedColor = color;
                }
            });
        }

        await network.init(name || 'Player', color);
        window._currentPeerId = network.peerId;

        ui.setLoadingProgress(90, 'Preparing tracks...');

        await new Promise(r => setTimeout(r, 400));

        ui.setLoadingProgress(100, 'Ready!');
        await new Promise(r => setTimeout(r, 300));

        // Show main menu
        ui.showScreen('mainMenu');

    } catch (err) {
        console.error('Init failed:', err);
        ui.setLoadingProgress(100, 'Error loading. Please refresh.');
        return;
    }

    // --- Wire up UI callbacks ---

    // Stop/restart car preview on screen changes
    const _origShowScreen = ui.showScreen.bind(ui);
    ui.showScreen = (name) => {
        _origShowScreen(name);
        if (name === 'mainMenu') {
            if (!_menuPreviewAnimId && _menuPreviewRenderer) _startMenuPreviewLoop();
        } else {
            _stopMenuPreview();
        }
    };

    // Solo race
    ui.onSoloRace = async (trackId, playerName, carColor) => {
        _savePrefs(playerName, carColor);
        game.playerName = playerName;
        game.carColor = carColor;
        game.carModelIndex = 0;
        game.isMultiplayer = false;
        network.playerName = playerName;
        network.carColor = carColor;
        ui.hideAllScreens();
        await game.startRace(trackId);
    };

    // Create party
    ui.onCreateParty = async (playerName, carColor) => {
        _savePrefs(playerName, carColor);
        network.playerName = playerName;
        network.carColor = carColor;
        game.playerName = playerName;
        game.carColor = carColor;
        game.isMultiplayer = true;

        try {
            const data = await network.createParty(ui.selectedTrack);
            ui.showScreen('partyLobby');
            ui.updatePartyLobby(data.party);
        } catch (err) {
            alert('Failed to create party. Is the server running?');
        }
    };

    // Join party
    ui.onJoinParty = async (code, playerName, carColor) => {
        _savePrefs(playerName, carColor);
        network.playerName = playerName;
        network.carColor = carColor;
        game.playerName = playerName;
        game.carColor = carColor;
        game.isMultiplayer = true;

        try {
            const data = await network.joinParty(code);
            ui.showScreen('partyLobby');
            ui.updatePartyLobby(data.party);
        } catch (err) {
            ui.showJoinError(err.message || 'Failed to join party');
        }
    };

    // Start race from lobby (host) — synchronized countdown
    ui.onStartRace = async () => {
        const party = await network.getParty();
        if (!party) return;
        game.trackId = party.track_id;
        const goTime = Date.now() + 5500;
        await network.startRace(party.track_id, goTime);
        ui.hideAllScreens();
        await game.startRace(party.track_id, true, goTime);
    };

    // Leave party
    ui.onLeaveParty = async () => {
        await network.leaveParty();
        game.isMultiplayer = false;
        ui.showScreen('mainMenu');
    };

    // Track selected in party
    ui.onTrackSelected = (trackId) => {
        network.changeTrack(trackId);
    };

    // Pause/Resume
    ui.onResumeGame = () => {
        game.resumeGame();
    };

    ui.onRestartGame = () => {
        game.restartRace();
    };

    ui.onQuitToMenu = () => {
        game.quitToMenu();
    };

    ui.onRaceAgain = () => {
        game.restartRace();
    };

    // Leaderboard loading
    ui._loadLeaderboard = async (filter) => {
        const data = await network.getLeaderboard(filter);
        ui.updateLeaderboard(data.leaderboard || []);
    };

    // Handle race start from network (non-host) — use broadcast data directly, skip API call
    network.onRaceStart = async (data) => {
        if (game.state !== 'racing' && data.trackId) {
            game.trackId = data.trackId;
            ui.hideAllScreens();
            await game.startRace(data.trackId, true, data.goTime || null);
        }
    };

    // --- 3D Menu Background: Track + Rotating Car ---
    const _F5_BLOB_URL = 'https://ncy61ofykoro7ctm.public.blob.vercel-storage.com/rush/uploads_files_5387911_f5_optimized-ShPgSxqnEyKwAByVvPTY34VYaNRd9H.glb';
    let _menuCamAngle = 0;

    function _initMenuCarPreview() {
        const canvas = document.getElementById('menu-bg-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        const w = window.innerWidth;
        const h = window.innerHeight;

        // Simple clean scene — just car, ground, sky
        _menuPreviewScene = new THREE.Scene();
        _menuPreviewScene.background = new THREE.Color(0x87ceeb);

        _menuPreviewRenderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        _menuPreviewRenderer.setSize(w, h);
        _menuPreviewRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        _menuPreviewRenderer.shadowMap.enabled = true;
        _menuPreviewRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Camera — looking at car from front-ish angle, car in upper portion of screen
        _menuPreviewCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 500);
        _menuPreviewCamera.position.set(6, 4.5, 8);
        _menuPreviewCamera.lookAt(0, 2.5, 0);

        // Green ground
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(300, 300),
            new THREE.MeshStandardMaterial({ color: 0x3dba5c, roughness: 0.9 })
        );
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        _menuPreviewScene.add(ground);

        // Simple oval track on the ground
        const trackShape = new THREE.Shape();
        const trackR = 40;
        const trackInner = 32;
        // Outer oval
        trackShape.absellipse(0, 0, trackR, trackR * 0.65, 0, Math.PI * 2, false, 0);
        // Inner hole
        const holePath = new THREE.Path();
        holePath.absellipse(0, 0, trackInner, trackInner * 0.65, 0, Math.PI * 2, true, 0);
        trackShape.holes.push(holePath);
        const trackGeo = new THREE.ShapeGeometry(trackShape, 64);
        const trackMesh = new THREE.Mesh(trackGeo, new THREE.MeshStandardMaterial({
            color: 0x555555, roughness: 0.7
        }));
        trackMesh.rotation.x = -Math.PI / 2;
        trackMesh.position.y = 0.02;
        _menuPreviewScene.add(trackMesh);

        // Dashed center line on track
        const centerR = (trackR + trackInner) / 2;
        const centerRy = centerR * 0.65;
        const dashPts = [];
        for (let i = 0; i < 80; i++) {
            const a = (i / 80) * Math.PI * 2;
            dashPts.push(new THREE.Vector3(Math.cos(a) * centerR, 0.04, -Math.sin(a) * centerRy));
        }
        // Draw dashes as small boxes
        for (let i = 0; i < dashPts.length; i += 2) {
            const p = dashPts[i];
            const dash = new THREE.Mesh(
                new THREE.BoxGeometry(0.8, 0.01, 0.3),
                new THREE.MeshStandardMaterial({ color: 0xffffff })
            );
            dash.position.copy(p);
            const next = dashPts[(i + 1) % dashPts.length];
            dash.lookAt(next);
            _menuPreviewScene.add(dash);
        }

        // Scatter some simple trees around the track
        const treeMat = new THREE.MeshStandardMaterial({ color: 0x2d8a45 });
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B5A2B });
        const treePositions = [];
        for (let i = 0; i < 24; i++) {
            const angle = (i / 24) * Math.PI * 2;
            const dist = trackR + 8 + Math.random() * 15;
            treePositions.push({ x: Math.cos(angle) * dist, z: -Math.sin(angle) * dist * 0.65 });
        }
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const dist = trackInner - 6 - Math.random() * 8;
            treePositions.push({ x: Math.cos(angle) * dist, z: -Math.sin(angle) * dist * 0.65 });
        }
        treePositions.forEach(tp => {
            const h = 2 + Math.random() * 2;
            const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, h, 6), trunkMat);
            trunk.position.set(tp.x, h / 2, tp.z);
            trunk.castShadow = true;
            _menuPreviewScene.add(trunk);
            const crown = new THREE.Mesh(new THREE.SphereGeometry(1 + Math.random() * 0.8, 8, 6), treeMat);
            crown.position.set(tp.x, h + 0.5, tp.z);
            crown.castShadow = true;
            _menuPreviewScene.add(crown);
        });

        // Lighting
        _menuPreviewScene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const sun = new THREE.DirectionalLight(0xffffff, 1.2);
        sun.position.set(5, 10, 7);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 1024;
        sun.shadow.mapSize.height = 1024;
        sun.shadow.camera.left = -60;
        sun.shadow.camera.right = 60;
        sun.shadow.camera.top = 60;
        sun.shadow.camera.bottom = -60;
        _menuPreviewScene.add(sun);
        const fill = new THREE.DirectionalLight(0x88ccff, 0.4);
        fill.position.set(-5, 3, -3);
        _menuPreviewScene.add(fill);
        const hemi = new THREE.HemisphereLight(0x87ceeb, 0x3dba5c, 0.3);
        _menuPreviewScene.add(hemi);

        // Load F5 car
        _loadF5ForMenu();

        // Resize handler
        window.addEventListener('resize', () => {
            if (!_menuPreviewRenderer || !_menuPreviewCamera) return;
            const nw = window.innerWidth, nh = window.innerHeight;
            _menuPreviewRenderer.setSize(nw, nh);
            _menuPreviewCamera.aspect = nw / nh;
            _menuPreviewCamera.updateProjectionMatrix();
        });

        _startMenuPreviewLoop();
    }

    async function _loadF5ForMenu() {
        // Try cached loader first
        const cached = window._carModelLoader;
        if (cached && cached.loaded && cached.getCount() > 0) {
            const model = cached.getCarModel(0);
            if (model) { _placeMenuCar(model); return; }
        }

        // Load from Vercel blob
        if (typeof THREE === 'undefined' || !THREE.GLTFLoader) return;
        const gltfLoader = new THREE.GLTFLoader();
        if (THREE.DRACOLoader) {
            const draco = new THREE.DRACOLoader();
            draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/libs/draco/');
            gltfLoader.setDRACOLoader(draco);
        }

        const urls = [_F5_BLOB_URL, '/assets/source/uploads_files_5387911_f5.glb'];
        for (const url of urls) {
            try {
                const gltf = await new Promise((resolve, reject) => {
                    gltfLoader.load(url, resolve, undefined, reject);
                });
                if (gltf && gltf.scene) {
                    const tempLoader = new CarModelLoader();
                    const prepared = tempLoader._prepareModel(gltf.scene.clone(true));
                    if (prepared) { _placeMenuCar(prepared); return; }
                }
            } catch (e) {
                console.warn('[MenuBG] Failed from', url);
            }
        }
    }

    function _placeMenuCar(model) {
        if (_menuPreviewCar && _menuPreviewScene) {
            _menuPreviewScene.remove(_menuPreviewCar);
        }
        _menuPreviewCar = model;
        _menuPreviewCar.name = 'menu-car';
        _menuPreviewCar.position.set(0, 0.05, 0);
        _menuPreviewCar.traverse(c => {
            if (c.isMesh) {
                c.castShadow = true;
                // Brighten car materials — make them less dark
                const mats = Array.isArray(c.material) ? c.material : [c.material];
                mats.forEach(m => {
                    if (m) {
                        m.roughness = Math.min(m.roughness, 0.5);
                        m.metalness = Math.max(m.metalness, 0.3);
                        // If color is very dark (near black), tint it with the selected color
                        if (m.color && m.color.getHex() < 0x222222) {
                            // Keep dark parts (tires etc) but lighten slightly
                            m.color.setHex(0x333333);
                        }
                        m.needsUpdate = true;
                    }
                });
            }
        });
        if (_menuPreviewScene) _menuPreviewScene.add(_menuPreviewCar);
    }

    function _startMenuPreviewLoop() {
        if (_menuPreviewAnimId) return;
        const animate = () => {
            _menuPreviewAnimId = requestAnimationFrame(animate);

            // Slowly rotate the car on the spot
            if (_menuPreviewCar) {
                _menuPreviewCar.rotation.y += 0.005;
            }

            if (_menuPreviewRenderer && _menuPreviewScene && _menuPreviewCamera) {
                _menuPreviewRenderer.render(_menuPreviewScene, _menuPreviewCamera);
            }
        };
        animate();
    }

    function _stopMenuPreview() {
        if (_menuPreviewAnimId) {
            cancelAnimationFrame(_menuPreviewAnimId);
            _menuPreviewAnimId = null;
        }
    }

    // Color picker updates the car model color on the track
    document.querySelectorAll('.color-option').forEach(el => {
        el.addEventListener('click', () => {
            if (!_menuPreviewCar) return;
            const hex = parseInt(el.dataset.color.replace('#', ''), 16);
            _menuPreviewCar.traverse(child => {
                if (child.isMesh && child.material) {
                    const mats = Array.isArray(child.material) ? child.material : [child.material];
                    mats.forEach(mat => {
                        if (mat.color && mat.color.getHex() > 0x333333) {
                            mat.color.setHex(hex);
                        }
                    });
                }
            });
        });
    });

    // Instructions overlay
    const btnHowTo = document.getElementById('btn-how-to-play');
    const instrOverlay = document.getElementById('instructions-overlay');
    const btnCloseInstr = document.getElementById('btn-close-instructions');
    if (btnHowTo && instrOverlay) {
        btnHowTo.addEventListener('click', () => instrOverlay.classList.remove('hidden'));
    }
    if (btnCloseInstr && instrOverlay) {
        btnCloseInstr.addEventListener('click', () => instrOverlay.classList.add('hidden'));
    }

    function _savePrefs(name, color) {
        localStorage.setItem('rush_name', name);
        localStorage.setItem('rush_color', color);
    }

    // --- Draw actual track paths in track-select cards ---
    function _drawTrackPreviews() {
        if (typeof TRACK_DATA === 'undefined' || typeof THREE === 'undefined') return;
        const themeColors = {
            track_1: { stroke: 'rgba(74,222,128,0.8)', fill: 'rgba(74,222,128,0.06)' },
            track_2: { stroke: 'rgba(140,170,220,0.8)', fill: 'rgba(140,170,220,0.06)' },
            track_3: { stroke: 'rgba(220,180,100,0.8)', fill: 'rgba(220,180,100,0.06)' },
        };
        document.querySelectorAll('.track-preview-canvas').forEach(canvas => {
            const trackId = canvas.dataset.trackId;
            const track = TRACK_DATA[trackId];
            if (!track || !track.controlPoints) return;

            const ctx = canvas.getContext('2d');
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            const colors = themeColors[trackId] || themeColors.track_1;
            ctx.fillStyle = colors.fill;
            ctx.fillRect(0, 0, w, h);

            const pts = track.controlPoints;
            let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
            for (const p of pts) {
                if (p.x < minX) minX = p.x;
                if (p.x > maxX) maxX = p.x;
                if ((p.z !== undefined ? p.z : 0) < minZ) minZ = (p.z !== undefined ? p.z : 0);
                if ((p.z !== undefined ? p.z : 0) > maxZ) maxZ = (p.z !== undefined ? p.z : 0);
            }
            const spanX = maxX - minX || 1;
            const spanZ = maxZ - minZ || 1;
            const pad = 16;
            const scaleX = (w - pad * 2) / spanX;
            const scaleZ = (h - pad * 2) / spanZ;
            const scale = Math.min(scaleX, scaleZ);
            const offX = (w - spanX * scale) / 2 - minX * scale;
            const offZ = (h - spanZ * scale) / 2 - minZ * scale;

            const toX = (p) => p.x * scale + offX;
            const toY = (p) => (p.z !== undefined ? p.z : 0) * scale + offZ;

            // Smooth the path using a Catmull-Rom-style subdivision
            const smooth = [];
            const n = pts.length;
            const segments = 6;
            for (let i = 0; i < n; i++) {
                const p0 = pts[(i - 1 + n) % n];
                const p1 = pts[i];
                const p2 = pts[(i + 1) % n];
                const p3 = pts[(i + 2) % n];
                for (let t = 0; t < segments; t++) {
                    const s = t / segments;
                    const s2 = s * s, s3 = s2 * s;
                    const x = 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * s +
                        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * s2 +
                        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * s3);
                    const z0 = p0.z !== undefined ? p0.z : 0;
                    const z1 = p1.z !== undefined ? p1.z : 0;
                    const z2 = p2.z !== undefined ? p2.z : 0;
                    const z3 = p3.z !== undefined ? p3.z : 0;
                    const z = 0.5 * ((2 * z1) + (-z0 + z2) * s +
                        (2 * z0 - 5 * z1 + 4 * z2 - z3) * s2 +
                        (-z0 + 3 * z1 - 3 * z2 + z3) * s3);
                    smooth.push({ x, z });
                }
            }

            // Road width fill
            const roadW = (track.roadWidth || 16) * scale * 0.4;
            ctx.lineWidth = roadW;
            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            smooth.forEach((p, i) => {
                const sx = p.x * scale + offX;
                const sy = p.z * scale + offZ;
                if (i === 0) ctx.moveTo(sx, sy);
                else ctx.lineTo(sx, sy);
            });
            ctx.closePath();
            ctx.stroke();

            // Center line
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = colors.stroke;
            ctx.beginPath();
            smooth.forEach((p, i) => {
                const sx = p.x * scale + offX;
                const sy = p.z * scale + offZ;
                if (i === 0) ctx.moveTo(sx, sy);
                else ctx.lineTo(sx, sy);
            });
            ctx.closePath();
            ctx.stroke();

            // Start/finish marker
            if (track.finishLine) {
                const fx = track.finishLine.x * scale + offX;
                const fz = track.finishLine.z * scale + offZ;
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(fx, fz, 3.5, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }
    _drawTrackPreviews();

    console.log('[Rush Racing] Game ready!');
})();
