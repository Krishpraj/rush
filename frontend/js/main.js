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

    // Start race from lobby
    ui.onStartRace = async () => {
        const party = await network.getParty();
        if (!party) return;
        game.trackId = party.track_id;
        await network.startRace();
        ui.hideAllScreens();
        await game.startRace(party.track_id);
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

    // Handle race start from network (non-host)
    network.onRaceStart = async (data) => {
        if (game.state !== 'racing') {
            const party = await network.getParty();
            if (party) {
                game.trackId = party.track_id;
                ui.hideAllScreens();
                await game.startRace(party.track_id);
            }
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

    console.log('[Rush Racing] Game ready!');
})();
