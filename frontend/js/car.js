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
        this.chassisMesh = null;

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
        this._setupOrbitControls();

        this._buildVisual();
    }

    _buildVisual() {
        const color = new THREE.Color(this.color);
        const darkColor = color.clone().multiplyScalar(0.4);

        // === LOW-POLY SPORTS CAR using custom BufferGeometry ===

        // --- Main body (sleek shape using extruded cross-section) ---
        const bodyShape = new THREE.Shape();
        // Side profile: (x = length axis, y = height)  car is ~4.2m long, ~1.1m tall
        bodyShape.moveTo(-2.1, 0.15);
        bodyShape.lineTo(-1.9, 0.05);
        bodyShape.lineTo(-1.0, 0.05);
        bodyShape.lineTo(0.3, 0.05);
        bodyShape.lineTo(1.6, 0.05);
        bodyShape.lineTo(2.05, 0.15);
        bodyShape.lineTo(2.1, 0.35);
        bodyShape.lineTo(1.8, 0.55);
        bodyShape.lineTo(1.1, 0.65);
        bodyShape.lineTo(0.5, 0.95);
        bodyShape.lineTo(-0.1, 1.0);
        bodyShape.lineTo(-0.7, 0.95);
        bodyShape.lineTo(-1.2, 0.75);
        bodyShape.lineTo(-1.7, 0.6);
        bodyShape.lineTo(-2.05, 0.45);
        bodyShape.lineTo(-2.1, 0.3);
        bodyShape.closePath();

        const extrudeSettings = {
            steps: 1,
            depth: 1.7,
            bevelEnabled: true,
            bevelThickness: 0.08,
            bevelSize: 0.06,
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

        // --- Hood/bonnet scoop ---
        const scoopGeo = new THREE.BoxGeometry(0.5, 0.08, 0.8);
        const scoopMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.2 });
        const scoop = new THREE.Mesh(scoopGeo, scoopMat);
        scoop.position.set(0, 0.72, 1.0);
        this.group.add(scoop);

        // --- Front splitter ---
        const splitterGeo = new THREE.BoxGeometry(1.8, 0.04, 0.3);
        const splitterMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 });
        const splitter = new THREE.Mesh(splitterGeo, splitterMat);
        splitter.position.set(0, 0.12, 2.05);
        this.group.add(splitter);

        // --- Rear diffuser ---
        const diffGeo = new THREE.BoxGeometry(1.6, 0.06, 0.4);
        const diff = new THREE.Mesh(diffGeo, splitterMat.clone());
        diff.position.set(0, 0.12, -2.0);
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
        windshield.position.set(0, 1.02, 0.58);
        windshield.rotation.x = -0.45;
        this.group.add(windshield);

        // --- Rear window ---
        const rwGeo = new THREE.PlaneGeometry(1.2, 0.4);
        const rearWin = new THREE.Mesh(rwGeo, glassMat.clone());
        rearWin.position.set(0, 0.95, -0.95);
        rearWin.rotation.x = 0.5;
        this.group.add(rearWin);

        // --- Side windows ---
        for (let side = -1; side <= 1; side += 2) {
            const swGeo = new THREE.PlaneGeometry(1.0, 0.35);
            const sideWin = new THREE.Mesh(swGeo, glassMat.clone());
            sideWin.position.set(side * 0.87, 0.95, -0.1);
            sideWin.rotation.y = side * Math.PI / 2;
            this.group.add(sideWin);
        }

        // --- Headlights (LED style) ---
        for (let side = -1; side <= 1; side += 2) {
            // Main light housing
            const hlHousing = new THREE.Mesh(
                new THREE.BoxGeometry(0.35, 0.12, 0.15),
                new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.5 })
            );
            hlHousing.position.set(side * 0.6, 0.5, 2.08);
            this.group.add(hlHousing);

            // LED strip
            const hlGeo = new THREE.BoxGeometry(0.3, 0.06, 0.02);
            const hlMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const hl = new THREE.Mesh(hlGeo, hlMat);
            hl.position.set(side * 0.6, 0.5, 2.16);
            this.group.add(hl);

            // DRL accent
            const drlGeo = new THREE.BoxGeometry(0.2, 0.02, 0.02);
            const drlMat = new THREE.MeshBasicMaterial({ color: 0xccddff });
            const drl = new THREE.Mesh(drlGeo, drlMat);
            drl.position.set(side * 0.6, 0.44, 2.16);
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

        // --- Spoiler (GT wing) ---
        const spoilerGeo = new THREE.BoxGeometry(1.65, 0.05, 0.35);
        const spoilerMat = new THREE.MeshStandardMaterial({
            color: darkColor,
            metalness: 0.85,
            roughness: 0.15,
        });
        const spoilerWing = new THREE.Mesh(spoilerGeo, spoilerMat);
        spoilerWing.position.set(0, 1.05, -1.75);
        this.group.add(spoilerWing);
        // Wing endplates
        for (let side = -1; side <= 1; side += 2) {
            const epGeo = new THREE.BoxGeometry(0.04, 0.18, 0.35);
            const ep = new THREE.Mesh(epGeo, spoilerMat.clone());
            ep.position.set(side * 0.82, 0.98, -1.75);
            this.group.add(ep);
        }
        // Wing supports
        for (let side = -1; side <= 1; side += 2) {
            const supGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.32, 6);
            const supMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.9 });
            const sup = new THREE.Mesh(supGeo, supMat);
            sup.position.set(side * 0.5, 0.88, -1.75);
            this.group.add(sup);
        }

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

        // --- Exhaust tips ---
        for (let i = -1; i <= 1; i += 2) {
            const exGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.2, 8);
            const exMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.95, roughness: 0.1 });
            const exhaust = new THREE.Mesh(exGeo, exMat);
            exhaust.rotation.x = Math.PI / 2;
            exhaust.position.set(i * 0.35, 0.18, -2.15);
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

        // Name tag above car (for multiplayer)
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
            nameMesh.position.y = 2.5;
            this.group.add(nameMesh);
            this.nameMesh = nameMesh;
        }

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

        // === PURE YAW-BASED 2D DRIVING ===
        // The car ONLY rotates around Y. No roll, no pitch, ever.

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
        this.group.quaternion.copy(yawQuat);

        // Animate wheels (groups: rotate children around local X for spin)
        const wheelSpin = this.speed * dt * 0.08;
        this.wheelMeshes.forEach((wheelGrp, i) => {
            // Spin all children (tire, rim, hub, disc) around the axle
            wheelGrp.children.forEach(child => {
                child.rotation.x += wheelSpin;
            });
            // Steer front wheels
            if (i < 2) {
                wheelGrp.rotation.y = this.steerAngle * 0.5;
            }
            const suspOffset = Math.sin(Date.now() * 0.01 + i) * 0.02 * Math.min(Math.abs(this.speed) / 50, 1);
            wheelGrp.position.y = 0.0 + suspOffset;
        });

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
        if (this.chassisMesh) {
            this.chassisMesh.material.color.set(color);
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
