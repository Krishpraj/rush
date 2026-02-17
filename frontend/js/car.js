/**
 * Car - Three.js visual model + Ammo.js physics vehicle
 * Handles rendering, physics forces, steering, and suspension
 */

class Car {
    constructor(scene, physics, options = {}) {
        this.scene = scene;
        this.physics = physics;
        this.color = options.color || '#ff3333';
        this.playerName = options.playerName || 'Player';
        this.isLocal = options.isLocal !== false;

        // Car state
        this.speed = 0;
        this.steerAngle = 0;
        this.engineForce = 0;
        this.brakeForce = 0;
        this.handbrake = false;

        // Physics body
        this.body = null;

        // Three.js meshes
        this.group = new THREE.Group();
        this.wheelMeshes = [];
        this._wheelSpinAngle = 0;
        this.chassisMesh = null;
        this._colorMaterials = [];
        this._boostFlames = [];
        this._boostLight = null;

        // Car settings
        this.maxSpeed = 200; // km/h
        this.maxReverseSpeed = 50;
        this.acceleration = 32000;
        this.brakeStrength = 55000;
        this.maxSteerAngle = 0.55;
        this.steerSpeed = 4.0;
        this.steerReturnSpeed = 6.0;
        this.suspensionStiffness = 30;

        // Boost system
        this.boostMax = 2.0;          // seconds of boost
        this.boostFuel = 2.0;         // current fuel
        this.boostRegenRate = 0.5;    // fuel/second regen (full in 4s)
        this.boostDrainRate = 1.0;    // fuel/second while boosting
        this.boostMultiplier = 2.8;   // engine force multiplier during boost
        this.boostSpeedCap = 280;     // max speed while boosting
        this.isBoosting = false;

        // Input
        this.input = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            handbrake: false,
            boost: false,
        };

        // Yaw-based rotation (no roll/pitch ever)
        this.yaw = 0; // radians, 0 = facing +Z
        this.visualPitch = 0;
        this.targetRampPitch = 0;

        // Camera
        this.cameraMode = 0; // 0=chase, 1=hood, 2=top
        this.cameraLookAt = new THREE.Vector3(0, 1, 0);
        this.cameraPosSmooth = new THREE.Vector3(0, 5, -10);

        // Right-click orbit camera
        this.orbitAngle = 0;      // horizontal offset from behind-car
        this.orbitPitch = 0.3;    // vertical angle (radians, 0.3 = slight look-down)
        this.orbitDist = 12;
        this._orbiting = false;
        this._orbitLastX = 0;
        this._orbitLastY = 0;
        this._orbitReturnSpeed = 3.0; // how fast orbit snaps back
        // GLB model index — set before construction or via options
        this.modelIndex = options.modelIndex !== undefined ? options.modelIndex : -1;

        this._setupOrbitControls();

        this._buildVisual();
    }

    _buildVisual() {
        // Try loaded GLB model first, fallback to procedural.
        if (this.modelIndex >= 0 && window._carModelLoader) {
            try {
                const glbGroup = window._carModelLoader.getCarModel(this.modelIndex);
                if (glbGroup) {
                    this._useGLBModel(glbGroup);
                    return;
                }
            } catch (err) {
                console.warn('[Car] GLB visual failed, using procedural fallback:', err);
            }
        }
        this._buildProceduralCar();
    }

    _useGLBModel(glbGroup) {
        // The GLB model is already centered/scaled by CarModelLoader.
        const carColor = new THREE.Color(this.color);
        this._colorMaterials = [];

        glbGroup.traverse((child) => {
            if (!child.isMesh) return;
            child.castShadow = true;
            child.receiveShadow = false;

            const tintMat = (m) => {
                if (!m || typeof m.clone !== 'function') return m;
                const cm = m.clone();

                // Ensure normal/bump/displacement maps are gone (belt-and-suspenders)
                cm.normalMap = null;
                cm.bumpMap = null;
                cm.displacementMap = null;
                cm.roughnessMap = null;
                cm.metalnessMap = null;
                if (cm.normalScale) cm.normalScale.set(1, 1);
                cm.needsUpdate = true;

                // Skip glass / transparent / emissive materials
                const name = (m.name || '').toLowerCase();
                const isGlass = name.includes('glass') || name.includes('window') ||
                    name.includes('windshield') || name.includes('light') ||
                    name.includes('lens') || name.includes('chrome') ||
                    cm.transparent || (cm.opacity != null && cm.opacity < 0.9);
                if (isGlass) return cm;

                // Skip materials that already have a texture map (decals, logos, etc.)
                if (cm.map) return cm;

                // Only tint dark body-paint materials (low luminance = black/dark grey panels)
                if (cm.color) {
                    const lum = cm.color.r * 0.299 + cm.color.g * 0.587 + cm.color.b * 0.114;
                    if (lum < 0.35) {
                        cm.color.copy(carColor);
                        this._colorMaterials.push(cm);
                    }
                }
                return cm;
            };

            if (Array.isArray(child.material)) {
                child.material = child.material.map(tintMat).filter(Boolean);
            } else {
                child.material = tintMat(child.material);
            }
        });

        this.chassisMesh = glbGroup;
        this.group.add(glbGroup);
        this._detectGLBWheels(glbGroup);

        this._setupBoostEffect();

        this._addNameTag();
        this.scene.add(this.group);
    }

    _detectGLBWheels(glbGroup) {
        this.wheelMeshes = [];
        this._riggedWheels = [];

        glbGroup.updateMatrixWorld(true);

        // Log scene graph for debugging
        const allNames = [];
        glbGroup.traverse((c) => {
            if (c.name) allNames.push(`${c.name}(${c.type})`);
        });
        console.log('[Car] Scene graph nodes:', allNames.join(', '));

        const modelBox = new THREE.Box3().setFromObject(glbGroup);
        const modelSize = modelBox.getSize(new THREE.Vector3());
        const modelCenter = modelBox.getCenter(new THREE.Vector3());

        // --- Strategy 1: Find ANY node (group, bone, or mesh) with a wheel-related name ---
        const wheelNamePattern = /wheel|tyre|tire|rim|roue|whl/i;
        const namedCandidates = [];
        glbGroup.traverse((child) => {
            if (!wheelNamePattern.test(child.name || '')) return;
            const tmp = new THREE.Vector3();
            child.getWorldPosition(tmp);
            namedCandidates.push({ node: child, worldPos: tmp.clone(), name: child.name });
        });

        // For named candidates, prefer parent group/bone nodes over individual meshes.
        // If a mesh's parent is also in the list, skip the mesh.
        const namedParentIds = new Set(namedCandidates.filter(c => !c.node.isMesh).map(c => c.node.id));
        let namedFiltered = namedCandidates.filter(c => {
            if (!c.node.isMesh) return true;
            // Skip mesh if its parent group is already a named wheel node
            if (c.node.parent && namedParentIds.has(c.node.parent.id)) return false;
            return true;
        });

        // Deduplicate: if multiple named nodes are at nearly the same position, keep the
        // highest-level (non-mesh) one, or the one with the most children.
        const deduped = [];
        const usedPositions = [];
        for (const c of namedFiltered) {
            const dominated = usedPositions.some(p => p.distanceTo(c.worldPos) < modelSize.x * 0.08);
            if (!dominated) {
                deduped.push(c);
                usedPositions.push(c.worldPos.clone());
            }
        }
        namedFiltered = deduped;

        console.log('[Car] Named wheel candidates:', namedFiltered.map(c => c.name).join(', '));

        // --- Strategy 2: Geometry heuristics (small meshes at bottom corners) ---
        const wheelCandidateMeshes = [];
        glbGroup.traverse((child) => {
            if (!child.isMesh) return;
            const box = new THREE.Box3().setFromObject(child);
            if (box.isEmpty()) return;
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > modelSize.x * 0.55) return;
            if (maxDim < modelSize.x * 0.04) return;

            // Must be in the lower 60%
            if (center.y > modelCenter.y + modelSize.y * 0.15) return;

            // Must be offset from center (not on centerline)
            if (Math.abs(center.x - modelCenter.x) < modelSize.x * 0.1) return;

            const name = (child.name || '').toLowerCase();
            const nameScore = wheelNamePattern.test(name) ? 100 : 0;

            wheelCandidateMeshes.push({ mesh: child, center, size, nameScore, maxDim });
        });

        // Pick the best approach
        let wheelTargets = []; // { node, worldPos }

        if (namedFiltered.length >= 4) {
            wheelTargets = namedFiltered.map(c => ({ node: c.node, worldPos: c.worldPos }));
            console.log('[Car] Using', namedFiltered.length, 'named wheel nodes');
        } else if (namedFiltered.length >= 2) {
            // Some models only name 2 wheels (e.g. "WheelFront", "WheelRear").
            // Check if each named node actually contains geometry on both sides (left+right).
            // If not, use them directly and supplement with geometry detection.
            wheelTargets = namedFiltered.map(c => ({ node: c.node, worldPos: c.worldPos }));
            console.log('[Car] Using', namedFiltered.length, 'named wheel nodes (partial match)');
        }

        if (wheelTargets.length < 4 && wheelCandidateMeshes.length >= 4) {
            // Cluster candidates into 4 quadrants and pick the best mesh per quadrant
            const quadrants = { LF: null, RF: null, LR: null, RR: null };
            for (const c of wheelCandidateMeshes) {
                const side = c.center.x < modelCenter.x ? 'L' : 'R';
                const fore = c.center.z > modelCenter.z ? 'F' : 'R';
                const key = side + fore;
                const score = c.nameScore + c.maxDim;
                if (!quadrants[key] || score > quadrants[key].score) {
                    quadrants[key] = { ...c, score };
                }
            }
            const selected = Object.values(quadrants).filter(Boolean);

            // Only use geometry results if we got at least as many as named results
            if (selected.length >= wheelTargets.length) {
                wheelTargets = [];
                for (const s of selected) {
                    // Prefer the mesh's parent group if it's a meaningful node
                    const node = (s.mesh.parent && !s.mesh.parent.isMesh && s.mesh.parent !== glbGroup)
                        ? s.mesh.parent : s.mesh;
                    const tmp = new THREE.Vector3();
                    node.getWorldPosition(tmp);
                    wheelTargets.push({ node, worldPos: tmp.clone() });
                }
                console.log('[Car] Using', selected.length, 'geometry-detected wheels');
            }
        }

        if (wheelTargets.length === 0) {
            console.warn('[Car] No wheels detected in model — trying all bottom-corner meshes');
            // Last resort: grab the 4 largest meshes near the bottom corners
            const sorted = wheelCandidateMeshes.sort((a, b) => b.maxDim - a.maxDim);
            for (const c of sorted.slice(0, 4)) {
                const node = (c.mesh.parent && !c.mesh.parent.isMesh && c.mesh.parent !== glbGroup)
                    ? c.mesh.parent : c.mesh;
                const tmp = new THREE.Vector3();
                node.getWorldPosition(tmp);
                wheelTargets.push({ node, worldPos: tmp.clone() });
            }
        }

        if (wheelTargets.length === 0) {
            console.warn('[Car] No wheels detected in model at all');
            return;
        }

        // Compute wheel center for front/rear classification
        const wheelCenter = new THREE.Vector3();
        wheelTargets.forEach((w) => wheelCenter.add(w.worldPos));
        wheelCenter.multiplyScalar(1 / wheelTargets.length);

        // Determine spin axis per wheel:
        // The spin axis should be the local axis that best aligns with the car's
        // lateral (world X) direction. Test all 3 local axes and pick the best.
        const worldLateral = new THREE.Vector3(1, 0, 0); // car lateral in world space

        for (const { node, worldPos } of wheelTargets) {
            const isFront = worldPos.z > wheelCenter.z;
            const isLeft = worldPos.x < wheelCenter.x;

            // Get the node's world rotation matrix
            const worldQuat = new THREE.Quaternion();
            node.getWorldQuaternion(worldQuat);
            const invQuat = worldQuat.clone().invert();

            // Transform world lateral into node's local space
            const localLateral = worldLateral.clone().applyQuaternion(invQuat);

            // Find which local axis is most aligned with the lateral direction
            const axes = [
                new THREE.Vector3(1, 0, 0),
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3(0, 0, 1),
            ];
            let bestAxis = axes[0];
            let bestDot = 0;
            for (const ax of axes) {
                const d = Math.abs(localLateral.dot(ax));
                if (d > bestDot) {
                    bestDot = d;
                    bestAxis = ax.clone();
                }
            }

            // Ensure axis direction is consistent (positive dot with lateral)
            if (localLateral.dot(bestAxis) < 0) bestAxis.negate();

            this._riggedWheels.push({
                node,
                baseQuaternion: node.quaternion.clone(),
                steerable: isFront,
                isLeft,
                spinAxis: bestAxis,
            });
            console.log('[Car] Wheel:', node.name, 'front:', isFront, 'left:', isLeft,
                'spinAxis:', `(${bestAxis.x.toFixed(1)},${bestAxis.y.toFixed(1)},${bestAxis.z.toFixed(1)})`);
        }

        console.log('[Car] Total rigged wheels:', this._riggedWheels.length);
    }

    _setupBoostEffect() {
        if (this._boostFlames.length > 0 || this._boostLight) return;

        const flameMatCore = new THREE.MeshBasicMaterial({
            color: 0xffaa22,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide,
        });
        const flameMatOuter = new THREE.MeshBasicMaterial({
            color: 0x33aaff,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
        });

        const exhaustPositions = [
            new THREE.Vector3(-0.2, 0.26, -2.3),
            new THREE.Vector3(0.2, 0.26, -2.3),
        ];

        for (const p of exhaustPositions) {
            const core = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.35, 8), flameMatCore.clone());
            core.rotation.x = -Math.PI / 2;
            core.position.copy(p);
            core.visible = false;

            const outer = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.28, 8), flameMatOuter.clone());
            outer.rotation.x = -Math.PI / 2;
            outer.position.copy(p.clone().add(new THREE.Vector3(0, 0, -0.05)));
            outer.visible = false;

            this.group.add(core);
            this.group.add(outer);
            this._boostFlames.push({ core, outer });
        }

        this._boostLight = new THREE.PointLight(0xff6600, 0, 6, 2);
        this._boostLight.position.set(0, 0.35, -2.2);
        this.group.add(this._boostLight);
    }

    _addNameTag() {
        if (!this.isLocal || this.playerName) {
            const nameCanvas = document.createElement('canvas');
            nameCanvas.width = 256;
            nameCanvas.height = 64;
            const ctx = nameCanvas.getContext('2d');
            ctx.fillStyle = this.color;
            ctx.font = 'bold 32px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.playerName, 128, 32);
            const nameTexture = new THREE.CanvasTexture(nameCanvas);
            const nameGeo = new THREE.PlaneGeometry(3, 0.75);
            const nameMat = new THREE.MeshBasicMaterial({
                map: nameTexture,
                transparent: true,
                side: THREE.DoubleSide,
                depthTest: false,
            });
            const nameMesh = new THREE.Mesh(nameGeo, nameMat);
            nameMesh.position.y = 3.0;
            this.group.add(nameMesh);
            this.nameMesh = nameMesh;
        }
    }

    _buildProceduralCar() {
        const color = new THREE.Color(this.color);
        const darkColor = color.clone().multiplyScalar(0.4);

        // === LOW-POLY AVENTADOR-STYLE SUPERCAR ===

        // --- Main body (sleek shape using extruded cross-section) ---
        const bodyShape = new THREE.Shape();
        // Side profile: aggressive wedge nose, low cabin, tall rear deck
        bodyShape.moveTo(-2.2, 0.16);
        bodyShape.lineTo(-2.0, 0.08);
        bodyShape.lineTo(-1.2, 0.06);
        bodyShape.lineTo(0.2, 0.06);
        bodyShape.lineTo(1.55, 0.06);
        bodyShape.lineTo(2.15, 0.15);
        bodyShape.lineTo(2.2, 0.28);
        bodyShape.lineTo(1.9, 0.43);
        bodyShape.lineTo(1.2, 0.55);
        bodyShape.lineTo(0.55, 0.9);
        bodyShape.lineTo(-0.2, 1.03);
        bodyShape.lineTo(-0.95, 0.9);
        bodyShape.lineTo(-1.45, 0.7);
        bodyShape.lineTo(-1.95, 0.56);
        bodyShape.lineTo(-2.18, 0.4);
        bodyShape.lineTo(-2.2, 0.28);
        bodyShape.closePath();

        const extrudeSettings = {
            steps: 1,
            depth: 1.88,
            bevelEnabled: true,
            bevelThickness: 0.06,
            bevelSize: 0.05,
            bevelSegments: 2,
        };
        const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
        bodyGeo.center();
        // Rotate so depth is along X (width of car)
        bodyGeo.rotateY(Math.PI / 2);
        const bodyMat = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.75,
            roughness: 0.25,
            envMapIntensity: 1.0,
        });
        this.chassisMesh = new THREE.Mesh(bodyGeo, bodyMat);
        this.chassisMesh.castShadow = true;
        this.chassisMesh.receiveShadow = true;
        this.chassisMesh.position.y = 0.3;
        this.group.add(this.chassisMesh);

        // --- Hood/bonnet vent ---
        const scoopGeo = new THREE.BoxGeometry(0.65, 0.06, 0.95);
        const scoopMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.2 });
        const scoop = new THREE.Mesh(scoopGeo, scoopMat);
        scoop.position.set(0, 0.63, 0.95);
        this.group.add(scoop);

        // --- Front splitter ---
        const splitterGeo = new THREE.BoxGeometry(1.92, 0.05, 0.34);
        const splitterMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 });
        const splitter = new THREE.Mesh(splitterGeo, splitterMat);
        splitter.position.set(0, 0.13, 2.13);
        this.group.add(splitter);

        // --- Rear diffuser ---
        const diffGeo = new THREE.BoxGeometry(1.74, 0.07, 0.42);
        const diff = new THREE.Mesh(diffGeo, splitterMat.clone());
        diff.position.set(0, 0.13, -2.1);
        this.group.add(diff);

        // --- Windshield (angled glass) ---
        const wsGeo = new THREE.PlaneGeometry(1.3, 0.55);
        const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0x88ccff,
            transparent: true,
            opacity: 0.35,
            metalness: 0.1,
            roughness: 0.05,
            side: THREE.DoubleSide,
        });
        const windshield = new THREE.Mesh(wsGeo, glassMat);
        windshield.position.set(0, 0.98, 0.5);
        windshield.rotation.x = -0.58;
        this.group.add(windshield);

        // --- Rear window ---
        const rwGeo = new THREE.PlaneGeometry(1.2, 0.4);
        const rearWin = new THREE.Mesh(rwGeo, glassMat.clone());
        rearWin.position.set(0, 0.84, -0.88);
        rearWin.rotation.x = 0.65;
        this.group.add(rearWin);

        // --- Side windows ---
        for (let side = -1; side <= 1; side += 2) {
            const swGeo = new THREE.PlaneGeometry(1.0, 0.35);
            const sideWin = new THREE.Mesh(swGeo, glassMat.clone());
            sideWin.position.set(side * 0.93, 0.87, -0.08);
            sideWin.rotation.y = side * Math.PI / 2;
            this.group.add(sideWin);
        }

        // --- Headlights (Y-inspired LED style) ---
        for (let side = -1; side <= 1; side += 2) {
            // Main light housing
            const hlHousing = new THREE.Mesh(
                new THREE.BoxGeometry(0.35, 0.12, 0.15),
                new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 })
            );
            hlHousing.position.set(side * 0.62, 0.45, 2.16);
            this.group.add(hlHousing);

            // LED strip
            const hlGeo = new THREE.BoxGeometry(0.3, 0.06, 0.02);
            const hlMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const hl = new THREE.Mesh(hlGeo, hlMat);
            hl.position.set(side * 0.62, 0.46, 2.22);
            this.group.add(hl);

            // DRL accent
            const drlGeo = new THREE.BoxGeometry(0.2, 0.02, 0.02);
            const drlMat = new THREE.MeshBasicMaterial({ color: 0xccddff });
            const drl = new THREE.Mesh(drlGeo, drlMat);
            drl.position.set(side * 0.67, 0.42, 2.22);
            drl.rotation.z = side * 0.45;
            this.group.add(drl);
        }

        // --- Tail lights (LED bar style) ---
        for (let side = -1; side <= 1; side += 2) {
            const tlOuter = new THREE.Mesh(
                new THREE.BoxGeometry(0.4, 0.1, 0.1),
                new THREE.MeshStandardMaterial({ color: 0x220000, roughness: 0.3, metalness: 0.5 })
            );
            tlOuter.position.set(side * 0.55, 0.48, -2.08);
            this.group.add(tlOuter);

            const tlGeo = new THREE.BoxGeometry(0.35, 0.06, 0.02);
            const tlMat = new THREE.MeshBasicMaterial({ color: 0xff1111 });
            const tl = new THREE.Mesh(tlGeo, tlMat);
            tl.position.set(side * 0.55, 0.48, -2.14);
            this.group.add(tl);
        }
        // Center brake light
        const cblGeo = new THREE.BoxGeometry(0.6, 0.03, 0.02);
        const cbl = new THREE.Mesh(cblGeo, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
        cbl.position.set(0, 0.78, -1.3);
        this.group.add(cbl);

        // --- Rear lip spoiler (integrated Aventador style) ---
        const spoilerGeo = new THREE.BoxGeometry(1.52, 0.035, 0.26);
        const spoilerMat = new THREE.MeshStandardMaterial({
            color: darkColor,
            metalness: 0.85,
            roughness: 0.15,
        });
        const spoilerWing = new THREE.Mesh(spoilerGeo, spoilerMat);
        spoilerWing.position.set(0, 0.86, -1.9);
        this.group.add(spoilerWing);

        // --- Side mirrors ---
        for (let side = -1; side <= 1; side += 2) {
            const mirrorArm = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 0.04, 0.04),
                new THREE.MeshStandardMaterial({ color: darkColor, metalness: 0.7 })
            );
            mirrorArm.position.set(side * 0.95, 0.82, 0.3);
            this.group.add(mirrorArm);

            const mirrorGeo = new THREE.BoxGeometry(0.12, 0.1, 0.08);
            const mirrorMat = new THREE.MeshStandardMaterial({ color: color, metalness: 0.8, roughness: 0.2 });
            const mirror = new THREE.Mesh(mirrorGeo, mirrorMat);
            mirror.position.set(side * 1.07, 0.82, 0.3);
            this.group.add(mirror);
        }

        // --- Side skirts ---
        for (let side = -1; side <= 1; side += 2) {
            const skirtGeo = new THREE.BoxGeometry(0.06, 0.12, 3.0);
            const skirt = new THREE.Mesh(skirtGeo, new THREE.MeshStandardMaterial({
                color: 0x111111, roughness: 0.7
            }));
            skirt.position.set(side * 0.9, 0.15, 0);
            this.group.add(skirt);
        }

        // --- Exhaust tips (center high dual) ---
        for (let i = -1; i <= 1; i += 2) {
            const exGeo = new THREE.CylinderGeometry(0.055, 0.065, 0.22, 6);
            const exMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.95, roughness: 0.1 });
            const exhaust = new THREE.Mesh(exGeo, exMat);
            exhaust.rotation.x = Math.PI / 2;
            exhaust.position.set(i * 0.16, 0.32, -2.15);
            this.group.add(exhaust);
        }

        // --- Wheels (detailed with tire + rim + brake disc) ---
        const wheelPositions = [
            { x: -0.82, y: 0.0, z: 1.35 },  // FL
            { x: 0.82, y: 0.0, z: 1.35 },   // FR
            { x: -0.82, y: 0.0, z: -1.25 },  // RL
            { x: 0.82, y: 0.0, z: -1.25 },   // RR
        ];

        for (const pos of wheelPositions) {
            const wheelGroup = new THREE.Group();

            // Tire (torus for round look)
            const tireGeo = new THREE.TorusGeometry(0.28, 0.12, 8, 16);
            const tireMat = new THREE.MeshStandardMaterial({
                color: 0x1a1a1a,
                roughness: 0.9,
                metalness: 0.05,
            });
            const tire = new THREE.Mesh(tireGeo, tireMat);
            tire.rotation.y = Math.PI / 2;
            wheelGroup.add(tire);

            // Rim (5-spoke look)
            const rimGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.1, 5);
            const rimMat = new THREE.MeshStandardMaterial({
                color: 0xcccccc,
                metalness: 0.95,
                roughness: 0.05,
            });
            const rim = new THREE.Mesh(rimGeo, rimMat);
            rim.rotation.z = Math.PI / 2;
            wheelGroup.add(rim);

            // Hub cap
            const hubGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.12, 8);
            const hubMat = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.9 });
            const hub = new THREE.Mesh(hubGeo, hubMat);
            hub.rotation.z = Math.PI / 2;
            wheelGroup.add(hub);

            // Brake disc (visible behind spokes)
            const discGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.02, 16);
            const discMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.8 });
            const disc = new THREE.Mesh(discGeo, discMat);
            disc.rotation.z = Math.PI / 2;
            wheelGroup.add(disc);

            // Brake caliper (red accent)
            const calGeo = new THREE.BoxGeometry(0.06, 0.08, 0.1);
            const calMat = new THREE.MeshStandardMaterial({ color: 0xff2200, metalness: 0.5 });
            const caliper = new THREE.Mesh(calGeo, calMat);
            caliper.position.set(0, 0.14, 0);
            wheelGroup.add(caliper);

            wheelGroup.position.set(pos.x, pos.y, pos.z);
            wheelGroup.castShadow = true;
            this.group.add(wheelGroup);
            this.wheelMeshes.push(wheelGroup);
        }

        // --- Wheel arches (fender flares) ---
        for (const pos of wheelPositions) {
            const archGeo = new THREE.TorusGeometry(0.38, 0.06, 4, 8, Math.PI);
            const archMat = new THREE.MeshStandardMaterial({ color: darkColor, roughness: 0.6 });
            const arch = new THREE.Mesh(archGeo, archMat);
            arch.position.set(pos.x * 0.95, 0.1, pos.z);
            arch.rotation.y = pos.x > 0 ? -Math.PI / 2 : Math.PI / 2;
            this.group.add(arch);
        }

        // Name tag
        this._addNameTag();

        this.scene.add(this.group);
    }

    initPhysics(position) {
        this.body = this.physics.createCarBody({
            x: position.x,
            y: position.y + 0.5,
            z: position.z
        });
    }

    setInput(input) {
        this.input = { ...this.input, ...input };
    }

    update(dt) {
        if (!this.body) return;

        // === PURE YAW-BASED 2D DRIVING PHYSICS ===
        // Physics rotation stays yaw-only for stable handling.

        // Get position from physics body (only use Y for ground height)
        const pos = this.body.position;

        // Forward and right vectors from yaw angle
        const forward = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
        const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));

        // Calculate current speed from velocity dot forward
        const vx = this.body.velocity._x;
        const vz = this.body.velocity._z;
        this.speed = (vx * forward.x + vz * forward.z) * 3.6; // m/s to km/h

        // --- Steering ---
        let targetSteer = 0;
        if (this.input.left) targetSteer = this.maxSteerAngle;
        if (this.input.right) targetSteer = -this.maxSteerAngle;

        // Less steering at high speed
        const speedFactor = 1.0 - Math.min(Math.abs(this.speed) / this.maxSpeed, 0.7) * 0.6;
        targetSteer *= speedFactor;

        if (targetSteer !== 0) {
            this.steerAngle += (targetSteer - this.steerAngle) * Math.min(dt * this.steerSpeed, 1);
        } else {
            this.steerAngle *= Math.max(0, 1 - dt * this.steerReturnSpeed);
        }

        // Apply yaw rotation from steering (only when moving)
        if (Math.abs(this.speed) > 2) {
            const turnRate = this.steerAngle * (this.speed / 100) * 2.5;
            this.yaw += turnRate * dt;
        }

        // --- Boost ---
        this.isBoosting = false;
        if (this.input.boost && this.input.forward && this.boostFuel > 0) {
            this.isBoosting = true;
            this.boostFuel = Math.max(0, this.boostFuel - this.boostDrainRate * dt);
        } else {
            // Regen when not boosting
            this.boostFuel = Math.min(this.boostMax, this.boostFuel + this.boostRegenRate * dt);
        }

        const currentMaxSpeed = this.isBoosting ? this.boostSpeedCap : this.maxSpeed;
        const currentAccel = this.isBoosting ? this.acceleration * this.boostMultiplier : this.acceleration;

        // --- Engine / Braking ---
        this.engineForce = 0;
        this.brakeForce = 0;

        if (this.input.forward) {
            if (this.speed < currentMaxSpeed) {
                const speedRatio = Math.abs(this.speed) / currentMaxSpeed;
                const forceMult = 1.0 + (1.0 - speedRatio) * 0.5;
                this.engineForce = currentAccel * forceMult;
            }
        }

        if (this.input.backward) {
            if (this.speed > 5) {
                this.brakeForce = this.brakeStrength;
            } else if (this.speed > -this.maxReverseSpeed) {
                this.engineForce = -this.acceleration * 0.4;
            }
        }

        if (this.input.handbrake) {
            this.brakeForce = this.brakeStrength * 1.2;
        }

        // Natural drag when coasting
        if (!this.input.forward && !this.input.backward) {
            if (Math.abs(this.speed) > 1) {
                const dragForce = -Math.sign(this.speed) * Math.min(Math.abs(this.speed) * 50, 5000);
                this.body.applyCentralForce(new Ammo.btVector3(
                    forward.x * dragForce, 0, forward.z * dragForce
                ));
            } else {
                this.body.velocity._x *= 0.95;
                this.body.velocity._z *= 0.95;
            }
        }

        // Apply engine force
        if (this.engineForce !== 0) {
            this.body.applyCentralForce(new Ammo.btVector3(
                forward.x * this.engineForce, 0, forward.z * this.engineForce
            ));
        }

        // Apply braking (oppose current velocity)
        if (this.brakeForce > 0) {
            const spd = Math.sqrt(vx * vx + vz * vz);
            if (spd > 0.1) {
                this.body.applyCentralForce(new Ammo.btVector3(
                    -(vx / spd) * this.brakeForce, 0, -(vz / spd) * this.brakeForce
                ));
            }
        }

        // --- Lateral grip: cancel sideways velocity ---
        const lateralSpeed = vx * right.x + vz * right.z;
        const lateralGrip = this.input.handbrake ? 0.90 : 0.97;
        this.body.velocity._x -= right.x * lateralSpeed * lateralGrip;
        this.body.velocity._z -= right.z * lateralSpeed * lateralGrip;

        // --- Force body flat: kill all Y-rotation, roll, pitch physics ---
        // Only allow Y-position to change (gravity/ground)
        this.body.angularVelocity._x = 0;
        this.body.angularVelocity._y = 0;
        this.body.angularVelocity._z = 0;

        // Set physics body quaternion from our yaw (flat, no roll/pitch)
        const yawQuat = new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(0, 1, 0), this.yaw
        );
        this.body.rotation._x = yawQuat.x;
        this.body.rotation._y = yawQuat.y;
        this.body.rotation._z = yawQuat.z;
        this.body.rotation._w = yawQuat.w;

        // Gentle downforce at speed
        const speedMs = Math.abs(this.speed) / 3.6;
        this.body.applyCentralForce(new Ammo.btVector3(0, -speedMs * 12, 0));

        // --- Update visual ---
        this.group.position.set(pos._x, pos._y, pos._z);
        const pitchLerp = Math.min(dt * 8.0, 1);
        this.visualPitch += (this.targetRampPitch - this.visualPitch) * pitchLerp;
        const pitchQuat = new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(1, 0, 0), this.visualPitch
        );
        this.group.quaternion.copy(yawQuat.clone().multiply(pitchQuat));

        // Animate wheels
        const wheelSpin = this.speed * dt * 0.08;
        this._wheelSpinAngle += wheelSpin;

        // Rigged wheel pivots — spin around detected axle, steer front wheels
        if (this._riggedWheels && this._riggedWheels.length > 0) {
            for (const w of this._riggedWheels) {
                const axis = w.spinAxis || new THREE.Vector3(1, 0, 0);
                const spinQuat = new THREE.Quaternion().setFromAxisAngle(axis, this._wheelSpinAngle);
                if (w.steerable) {
                    const steerQuat = new THREE.Quaternion().setFromAxisAngle(
                        new THREE.Vector3(0, 1, 0), this.steerAngle * 0.35
                    );
                    w.node.quaternion.copy(w.baseQuaternion).multiply(steerQuat).multiply(spinQuat);
                } else {
                    w.node.quaternion.copy(w.baseQuaternion).multiply(spinQuat);
                }
            }
        }

        // Procedural wheels fallback
        this.wheelMeshes.forEach((wheelGrp, i) => {
            wheelGrp.children.forEach(child => {
                child.rotation.x += wheelSpin;
            });
            if (i < 2) {
                wheelGrp.rotation.y = this.steerAngle * 0.5;
            }
            const suspOffset = Math.sin(Date.now() * 0.01 + i) * 0.02 * Math.min(Math.abs(this.speed) / 50, 1);
            wheelGrp.position.y = 0.0 + suspOffset;
        });

        // Boost flames + light effect
        if (this._boostFlames.length > 0) {
            const pulse = 0.75 + Math.random() * 0.45;
            const show = this.isBoosting && this.boostFuel > 0.02;
            this._boostFlames.forEach((fx) => {
                fx.core.visible = show;
                fx.outer.visible = show;
                if (show) {
                    fx.core.scale.set(1, pulse * (1.2 + Math.min(Math.abs(this.speed) / 180, 0.8)), 1);
                    fx.outer.scale.set(1, pulse, 1);
                }
            });
            if (this._boostLight) {
                this._boostLight.intensity = show ? (1.2 + Math.random() * 0.9) : 0;
            }
        }

        // Name tag billboard
        if (this.nameMesh) {
            this.nameMesh.lookAt(
                this.scene.getObjectByProperty('isCamera', true)?.position || new THREE.Vector3(0, 10, 10)
            );
        }
    }

    _setupOrbitControls() {
        const canvas = document.getElementById('game-canvas');
        if (!canvas) return;

        canvas.addEventListener('contextmenu', e => e.preventDefault());

        canvas.addEventListener('mousedown', (e) => {
            if (e.button === 2) { // right click
                this._orbiting = true;
                this._orbitLastX = e.clientX;
                this._orbitLastY = e.clientY;
            }
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!this._orbiting) return;
            const dx = e.clientX - this._orbitLastX;
            const dy = e.clientY - this._orbitLastY;
            this._orbitLastX = e.clientX;
            this._orbitLastY = e.clientY;
            this.orbitAngle -= dx * 0.005;
            this.orbitPitch = Math.max(0.05, Math.min(1.2, this.orbitPitch + dy * 0.005));
        });

        const stopOrbit = () => { this._orbiting = false; };
        canvas.addEventListener('mouseup', (e) => { if (e.button === 2) stopOrbit(); });
        canvas.addEventListener('mouseleave', stopOrbit);
    }

    updateCamera(camera, dt) {
        if (!this.body) return;

        const pos = this.group.position;
        const fwd = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));

        if (this.cameraMode === 0) {
            // Smoothly return orbit angle to 0 when not dragging
            if (!this._orbiting) {
                this.orbitAngle += (0 - this.orbitAngle) * Math.min(dt * this._orbitReturnSpeed, 1);
                this.orbitPitch += (0.3 - this.orbitPitch) * Math.min(dt * this._orbitReturnSpeed, 1);
            }

            // Compute camera position on a sphere around the car
            const camYaw = this.yaw + Math.PI + this.orbitAngle; // PI = behind car
            const cosP = Math.cos(this.orbitPitch);
            const sinP = Math.sin(this.orbitPitch);

            const idealPos = new THREE.Vector3(
                pos.x + Math.sin(camYaw) * cosP * this.orbitDist,
                pos.y + sinP * this.orbitDist + 1.5,
                pos.z + Math.cos(camYaw) * cosP * this.orbitDist
            );
            const idealLookAt = new THREE.Vector3(pos.x, pos.y + 1.2, pos.z);

            const lerpFactor = 1 - Math.pow(0.01, dt);
            this.cameraPosSmooth.lerp(idealPos, lerpFactor);
            this.cameraLookAt.lerp(idealLookAt, lerpFactor);
            camera.position.copy(this.cameraPosSmooth);
            camera.lookAt(this.cameraLookAt);

        } else if (this.cameraMode === 1) {
            // Hood camera — on car roof, looking forward
            camera.position.set(
                pos.x + fwd.x * 0.5,
                pos.y + 1.6,
                pos.z + fwd.z * 0.5
            );
            camera.lookAt(
                pos.x + fwd.x * 50,
                pos.y + 1,
                pos.z + fwd.z * 50
            );

        } else {
            // Top-down
            camera.position.set(pos.x, 30, pos.z + 5);
            camera.lookAt(pos);
        }
    }

    getPosition() {
        return this.group.position.clone();
    }

    getRotation() {
        return this.group.quaternion.clone();
    }

    getSpeed() {
        return Math.abs(this.speed);
    }

    setRampPitch(pitchRadians) {
        this.targetRampPitch = Math.max(-0.35, Math.min(0.35, pitchRadians || 0));
    }

    reset(position, rotation) {
        if (this.body) {
            this.yaw = rotation || 0;
            const quat = new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0), this.yaw
            );
            const resetPos = { x: position.x, y: Math.max(position.y, 0.5), z: position.z };
            this.physics.setBodyTransform(this.body, resetPos, {
                x: quat.x, y: quat.y, z: quat.z, w: quat.w
            });
            this.speed = 0;
            this.steerAngle = 0;
            this.visualPitch = 0;
            this.targetRampPitch = 0;
            // Reset camera to behind car
            const fwd = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
            this.cameraPosSmooth.set(
                resetPos.x - fwd.x * 10, resetPos.y + 4.5, resetPos.z - fwd.z * 10
            );
            this.cameraLookAt.set(
                resetPos.x + fwd.x * 8, resetPos.y + 1.5, resetPos.z + fwd.z * 8
            );
        }
    }

    setColor(color) {
        this.color = color;
        const c = new THREE.Color(color);
        if (this._colorMaterials && this._colorMaterials.length > 0) {
            this._colorMaterials.forEach((mat) => {
                if (mat && mat.color) {
                    mat.color.copy(c);
                }
            });
        }
    }

    toggleCamera() {
        this.cameraMode = (this.cameraMode + 1) % 3;
    }

    // Set state from network (for remote players)
    setNetworkState(state) {
        this.group.position.set(state.px, state.py, state.pz);
        this.yaw = state.yaw || 0;
        const yawQuat = new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(0, 1, 0), this.yaw
        );
        this.group.quaternion.copy(yawQuat);
        this.speed = state.speed || 0;
        this.steerAngle = state.steer || 0;
        const wheelSpin = this.speed * 0.016 * 0.08;
        this._wheelSpinAngle += wheelSpin;

        // Animate rigged GLB wheels (same logic as update())
        if (this._riggedWheels && this._riggedWheels.length > 0) {
            for (const w of this._riggedWheels) {
                const axis = w.spinAxis || new THREE.Vector3(1, 0, 0);
                const spinQuat = new THREE.Quaternion().setFromAxisAngle(axis, this._wheelSpinAngle);
                if (w.steerable) {
                    const steerQuat = new THREE.Quaternion().setFromAxisAngle(
                        new THREE.Vector3(0, 1, 0), this.steerAngle * 0.35
                    );
                    w.node.quaternion.copy(w.baseQuaternion).multiply(steerQuat).multiply(spinQuat);
                } else {
                    w.node.quaternion.copy(w.baseQuaternion).multiply(spinQuat);
                }
            }
        }

        // Procedural wheels fallback
        this.wheelMeshes.forEach((wheelGrp, i) => {
            wheelGrp.children.forEach(child => { child.rotation.x += wheelSpin; });
            if (i < 2) wheelGrp.rotation.y = this.steerAngle * 0.5;
        });
    }

    // Get state for network sync
    getNetworkState() {
        const p = this.group.position;
        return {
            px: p.x, py: p.y, pz: p.z,
            yaw: this.yaw,
            speed: this.speed,
            steer: this.steerAngle,
        };
    }

    dispose() {
        this.scene.remove(this.group);
        if (this.body) {
            this.physics.removeBody(this.body);
        }
    }
}

window.Car = Car;
