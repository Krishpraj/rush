/**
 * Track definitions for the racing game
 * Each track defines: road segments, checkpoints, start position, walls, and decorations
 */

const TRACK_DATA = {

    // ===== TRACK 1: SPEED LOOP (Oval circuit - Easy) =====
    track_1: {
        name: "Speed Loop",
        difficulty: "Easy",
        laps: 3,
        startPosition: { x: 0, y: 0.5, z: -50 },
        startRotation: Math.PI,
        // Control points for CatmullRom spline (fewer = smoother curves)
        controlPoints: [
            { x: 0, z: -50 },
            { x: 0, z: -85 },
            { x: 30, z: -115 },
            { x: 65, z: -115 },
            { x: 95, z: -85 },
            { x: 95, z: -15 },
            { x: 95, z: 45 },
            { x: 65, z: 75 },
            { x: 30, z: 75 },
            { x: 0, z: 45 },
            { x: 0, z: -15 },
        ],
        roadWidth: 18,
        splineSamples: 200,
        // Ramps on this track
        ramps: [
            { splineT: 0.15, width: 14, length: 18, height: 2.5 },  // on the back straight
            { splineT: 0.65, width: 14, length: 18, height: 2.0 },  // on the front straight
        ],
        checkpoints: [
            { x: 0, z: -68, width: 18, rotation: 0 },
            { x: 48, z: -115, width: 18, rotation: Math.PI / 2 },
            { x: 95, z: -50, width: 18, rotation: 0 },
            { x: 95, z: 15, width: 18, rotation: 0 },
            { x: 48, z: 75, width: 18, rotation: Math.PI / 2 },
            { x: 0, z: 15, width: 18, rotation: 0 },
        ],
        finishLine: { x: 0, z: -45, width: 18, rotation: 0 },
        walls: [],
        decorations: [
            { type: 'tree', x: -20, z: -70 },
            { type: 'tree', x: -20, z: -40 },
            { type: 'tree', x: -20, z: -10 },
            { type: 'tree', x: -20, z: 20 },
            { type: 'tree', x: -20, z: 50 },
            { type: 'tree', x: 115, z: -70 },
            { type: 'tree', x: 115, z: -40 },
            { type: 'tree', x: 115, z: -10 },
            { type: 'tree', x: 115, z: 20 },
            { type: 'tree', x: 115, z: 50 },
            { type: 'rock', x: 48, z: -130 },
            { type: 'rock', x: 48, z: 92 },
            { type: 'tree', x: 30, z: -130 },
            { type: 'tree', x: 65, z: -130 },
            { type: 'tree', x: 30, z: 92 },
            { type: 'tree', x: 65, z: 92 },
        ],
        groundColor: 0x1a5c1a,
        roadColor: 0x333333,
        skyColor: 0x87CEEB,
        ambientLight: 0x404060,
        sunColor: 0xffffff,
        sunPosition: { x: 100, y: 200, z: 50 },
    },

    // ===== TRACK 2: CITY SPRINT (Urban circuit - Medium) =====
    track_2: {
        name: "City Sprint",
        difficulty: "Medium",
        laps: 3,
        startPosition: { x: 0, y: 0.5, z: -30 },
        startRotation: Math.PI,
        controlPoints: [
            { x: 0, z: -30 },
            { x: 0, z: -80 },
            { x: 0, z: -120 },
            { x: 40, z: -125 },
            { x: 75, z: -120 },
            { x: 75, z: -80 },
            { x: 75, z: -45 },
            { x: 45, z: -35 },
            { x: 45, z: 0 },
            { x: 45, z: 35 },
            { x: 75, z: 45 },
            { x: 75, z: 80 },
            { x: 45, z: 85 },
            { x: 0, z: 85 },
            { x: 0, z: 45 },
            { x: 0, z: 0 },
        ],
        roadWidth: 16,
        splineSamples: 200,
        ramps: [],
        checkpoints: [
            { x: 0, z: -55, width: 16, rotation: 0 },
            { x: 0, z: -100, width: 16, rotation: 0 },
            { x: 40, z: -125, width: 16, rotation: Math.PI / 2 },
            { x: 75, z: -80, width: 16, rotation: 0 },
            { x: 60, z: -40, width: 16, rotation: Math.PI / 2 },
            { x: 45, z: 20, width: 16, rotation: 0 },
            { x: 75, z: 62, width: 16, rotation: 0 },
            { x: 22, z: 85, width: 16, rotation: Math.PI / 2 },
            { x: 0, z: 45, width: 16, rotation: 0 },
        ],
        finishLine: { x: 0, z: -25, width: 16, rotation: 0 },
        walls: [],
        decorations: [
            { type: 'building', x: -20, z: -60, h: 15 },
            { type: 'building', x: -20, z: -90, h: 20 },
            { type: 'building', x: -20, z: 20, h: 12 },
            { type: 'building', x: -20, z: 60, h: 18 },
            { type: 'building', x: 95, z: -100, h: 25 },
            { type: 'building', x: 95, z: -60, h: 16 },
            { type: 'building', x: 95, z: 20, h: 14 },
            { type: 'building', x: 95, z: 62, h: 22 },
            { type: 'building', x: 22, z: -145, h: 18 },
            { type: 'building', x: 55, z: -145, h: 20 },
            { type: 'cone', x: 60, z: -42 },
            { type: 'cone', x: 60, z: -38 },
            { type: 'cone', x: 30, z: -42 },
            { type: 'cone', x: 30, z: -38 },
        ],
        groundColor: 0x2a2a2a,
        roadColor: 0x444444,
        skyColor: 0x4a6080,
        ambientLight: 0x505060,
        sunColor: 0xffeedd,
        sunPosition: { x: -80, y: 150, z: 100 },
    },

    // ===== TRACK 3: MOUNTAIN PASS (Hill circuit - Hard) =====
    track_3: {
        name: "Mountain Pass",
        difficulty: "Hard",
        laps: 3,
        startPosition: { x: 0, y: 0.5, z: -20 },
        startRotation: Math.PI,
        controlPoints: [
            { x: 0, z: -20 },
            { x: 0, z: -65 },
            { x: -35, z: -95 },
            { x: -65, z: -95 },
            { x: -85, z: -65 },
            { x: -85, z: -15 },
            { x: -65, z: 15 },
            { x: -30, z: 35 },
            { x: 0, z: 62 },
            { x: 35, z: 85 },
            { x: 65, z: 85 },
            { x: 85, z: 55 },
            { x: 85, z: 10 },
            { x: 65, z: -20 },
            { x: 30, z: -30 },
        ],
        roadWidth: 14,
        splineSamples: 200,
        ramps: [],
        checkpoints: [
            { x: 0, z: -42, width: 14, rotation: 0 },
            { x: -50, z: -95, width: 14, rotation: Math.PI / 2 },
            { x: -85, z: -40, width: 14, rotation: 0 },
            { x: -48, z: 25, width: 14, rotation: Math.PI / 4 },
            { x: 18, z: 74, width: 14, rotation: Math.PI / 4 },
            { x: 85, z: 32, width: 14, rotation: 0 },
            { x: 48, z: -25, width: 14, rotation: Math.PI / 4 },
        ],
        finishLine: { x: 0, z: -15, width: 14, rotation: 0 },
        walls: [],
        decorations: [
            { type: 'tree', x: -15, z: -70 },
            { type: 'tree', x: -45, z: -105 },
            { type: 'tree', x: -95, z: -50 },
            { type: 'tree', x: -75, z: 25 },
            { type: 'tree', x: -15, z: 50 },
            { type: 'tree', x: 45, z: 95 },
            { type: 'tree', x: 95, z: 40 },
            { type: 'tree', x: 75, z: -25 },
            { type: 'rock', x: -30, z: -75 },
            { type: 'rock', x: -70, z: -30 },
            { type: 'rock', x: 20, z: 55 },
            { type: 'rock', x: 70, z: 60 },
            { type: 'rock', x: 50, z: -10 },
            { type: 'mountain', x: -40, z: -50, h: 30 },
            { type: 'mountain', x: 50, z: 40, h: 25 },
            { type: 'mountain', x: -60, z: 50, h: 20 },
        ],
        groundColor: 0x3a5a2a,
        roadColor: 0x555544,
        skyColor: 0x6699bb,
        ambientLight: 0x607060,
        sunColor: 0xffffcc,
        sunPosition: { x: 50, y: 180, z: -80 },
    },
};

/**
 * TrackBuilder - Creates Three.js meshes and physics bodies from track data
 */
class TrackBuilder {
    constructor(scene, physics) {
        this.scene = scene;
        this.physics = physics;
        this.trackObjects = [];
        this.checkpointMeshes = [];
        this.wallBodies = [];
        // Track boundary data for constraint system
        this.trackPath = [];
        this.trackHalfWidth = 8;
        this.splineCurve = null;
        this.splinePoints = [];
        this.rampZones = [];
    }

    buildTrack(trackId) {
        const track = TRACK_DATA[trackId];
        if (!track) {
            console.error('Track not found:', trackId);
            return null;
        }

        this.clearTrack();

        // Generate smooth spline from control points
        const samples = track.splineSamples || 200;
        const pts = track.controlPoints || track.path || [];
        const splineVecs = pts.map(p => new THREE.Vector3(p.x, 0, p.z));
        this.splineCurve = new THREE.CatmullRomCurve3(splineVecs, true, 'catmullrom', 0.5);

        // Sample the spline into a dense polyline for boundary + road building
        this.splinePoints = [];
        for (let i = 0; i <= samples; i++) {
            const t = i / samples;
            const pt = this.splineCurve.getPoint(t);
            this.splinePoints.push({ x: pt.x, z: pt.z });
        }

        // Store for boundary constraint
        this.trackPath = this.splinePoints;
        this.trackHalfWidth = track.roadWidth / 2;

        // Set sky
        this.scene.background = new THREE.Color(track.skyColor);
        this.scene.fog = new THREE.Fog(track.skyColor, 150, 500);

        // Ground plane
        this._buildGround(track);

        // Road (spline-based)
        this._buildRoad(track);

        // Ramps
        if (track.ramps && track.ramps.length > 0) {
            this._buildRamps(track);
        }

        // Walls along the road
        this._buildWalls(track);

        // Checkpoints
        this._buildCheckpoints(track);

        // Finish line
        this._buildFinishLine(track);

        // Decorations
        this._buildDecorations(track);

        // Lights
        this._setupLights(track);

        return track;
    }

    _buildGround(track) {
        // Textured ground with subtle pattern
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const baseColor = new THREE.Color(track.groundColor);
        ctx.fillStyle = '#' + baseColor.getHexString();
        ctx.fillRect(0, 0, 512, 512);
        // Add noise/variation for natural look
        for (let i = 0; i < 5000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const r = Math.random() * 3 + 0.5;
            const bright = 0.8 + Math.random() * 0.4;
            ctx.fillStyle = `rgba(${Math.floor(baseColor.r * 255 * bright)},${Math.floor(baseColor.g * 255 * bright)},${Math.floor(baseColor.b * 255 * bright)},0.4)`;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
        const groundTex = new THREE.CanvasTexture(canvas);
        groundTex.wrapS = THREE.RepeatWrapping;
        groundTex.wrapT = THREE.RepeatWrapping;
        groundTex.repeat.set(30, 30);

        const geo = new THREE.PlaneGeometry(800, 800);
        const mat = new THREE.MeshStandardMaterial({
            map: groundTex,
            roughness: 0.95,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.trackObjects.push(mesh);

        // Physics ground
        this.physics.createGround(800, 800);
    }

    _buildRoad(track) {
        if (!this.splineCurve || !this.splinePoints) return;

        const hw = track.roadWidth / 2;
        const pts = this.splinePoints;
        const N = pts.length;

        // === Build smooth road surface as a single triangle strip mesh ===
        const roadVerts = [];
        const roadUVs = [];
        const roadIndices = [];

        // Left/right curb strip vertices
        const curbLVerts = [], curbRVerts = [], curbIndices = [];
        // Guardrail strip vertices
        const railLVerts = [], railRVerts = [], railIndices = [];

        let cumulDist = 0;

        for (let i = 0; i < N; i++) {
            // Get tangent at this point
            const next = (i + 1) % N;
            const prev = (i - 1 + N) % N;
            const tx = pts[next].x - pts[prev].x;
            const tz = pts[next].z - pts[prev].z;
            const tLen = Math.sqrt(tx * tx + tz * tz) || 1;
            // Normal = perpendicular to tangent (point right)
            const nx = -tz / tLen;
            const nz = tx / tLen;

            // Accumulate distance for UV mapping
            if (i > 0) {
                const dx = pts[i].x - pts[i - 1].x;
                const dz = pts[i].z - pts[i - 1].z;
                cumulDist += Math.sqrt(dx * dx + dz * dz);
            }

            const cx = pts[i].x;
            const cz = pts[i].z;
            const u = cumulDist / 10; // repeat texture every 10 units

            // Road surface: left and right edge
            roadVerts.push(cx - nx * hw, 0.05, cz - nz * hw);
            roadVerts.push(cx + nx * hw, 0.05, cz + nz * hw);
            roadUVs.push(0, u);
            roadUVs.push(1, u);

            // Curb strips (slightly raised)
            const curbW = 0.8;
            const curbOff = hw + curbW / 2;
            curbLVerts.push(cx - nx * hw, 0.1, cz - nz * hw);
            curbLVerts.push(cx - nx * (hw + curbW), 0.1, cz - nz * (hw + curbW));
            curbRVerts.push(cx + nx * hw, 0.1, cz + nz * hw);
            curbRVerts.push(cx + nx * (hw + curbW), 0.1, cz + nz * (hw + curbW));

            // Guardrail positions
            const railOff = hw + 1.8;
            railLVerts.push(cx - nx * railOff, 0, cz - nz * railOff);
            railLVerts.push(cx - nx * railOff, 0.9, cz - nz * railOff);
            railRVerts.push(cx + nx * railOff, 0, cz + nz * railOff);
            railRVerts.push(cx + nx * railOff, 0.9, cz + nz * railOff);

            if (i < N - 1) {
                const bi = i * 2;
                // Road quad (two triangles)
                roadIndices.push(bi, bi + 1, bi + 2);
                roadIndices.push(bi + 1, bi + 3, bi + 2);
                // Curb quads
                curbIndices.push(bi, bi + 1, bi + 2);
                curbIndices.push(bi + 1, bi + 3, bi + 2);
                // Rail quads
                railIndices.push(bi, bi + 1, bi + 2);
                railIndices.push(bi + 1, bi + 3, bi + 2);
            }
        }

        // Road surface mesh
        const roadGeo = new THREE.BufferGeometry();
        roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(roadVerts, 3));
        roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(roadUVs, 2));
        roadGeo.setIndex(roadIndices);
        roadGeo.computeVertexNormals();

        const roadMat = new THREE.MeshStandardMaterial({
            color: track.roadColor,
            roughness: 0.65,
            metalness: 0.0,
        });
        const roadMesh = new THREE.Mesh(roadGeo, roadMat);
        roadMesh.receiveShadow = true;
        this.scene.add(roadMesh);
        this.trackObjects.push(roadMesh);

        // Center line (dashed) — use small box segments along spline
        const dashLen = 3, gapLen = 3;
        let accum = 0;
        for (let i = 0; i < N - 1; i++) {
            const dx = pts[i + 1].x - pts[i].x;
            const dz = pts[i + 1].z - pts[i].z;
            const segLen = Math.sqrt(dx * dx + dz * dz);
            accum += segLen;
            const phase = accum % (dashLen + gapLen);
            if (phase < dashLen) {
                const mx = (pts[i].x + pts[i + 1].x) / 2;
                const mz = (pts[i].z + pts[i + 1].z) / 2;
                const angle = Math.atan2(dx, dz);
                const dGeo = new THREE.BoxGeometry(0.25, 0.02, Math.min(segLen, dashLen));
                const dMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
                const dash = new THREE.Mesh(dGeo, dMat);
                dash.position.set(mx, 0.11, mz);
                dash.rotation.y = angle;
                this.scene.add(dash);
                this.trackObjects.push(dash);
            }
        }

        // Curb strips (alternating red/white)
        const buildCurbMesh = (verts) => {
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
            geo.setIndex(curbIndices);
            geo.computeVertexNormals();
            // Color each face alternating
            const colors = [];
            for (let i = 0; i < verts.length / 3; i++) {
                const segIdx = Math.floor(i / 2);
                const phase = Math.floor(segIdx / 4) % 2;
                if (phase === 0) colors.push(1, 0, 0);
                else colors.push(1, 1, 1);
            }
            geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            const mat = new THREE.MeshStandardMaterial({
                vertexColors: true,
                roughness: 0.8,
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.receiveShadow = true;
            return mesh;
        };

        const curbL = buildCurbMesh(curbLVerts);
        const curbR = buildCurbMesh(curbRVerts);
        this.scene.add(curbL);
        this.scene.add(curbR);
        this.trackObjects.push(curbL, curbR);

        // Guardrails (metallic strip — double-sided so visible from all angles)
        const buildRailMesh = (verts) => {
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
            geo.setIndex(railIndices);
            geo.computeVertexNormals();
            const mat = new THREE.MeshStandardMaterial({
                color: 0x999999,
                metalness: 0.7,
                roughness: 0.3,
                side: THREE.DoubleSide,
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.castShadow = true;
            return mesh;
        };

        const railL = buildRailMesh(railLVerts);
        const railR = buildRailMesh(railRVerts);
        this.scene.add(railL);
        this.scene.add(railR);
        this.trackObjects.push(railL, railR);

        // Guardrail posts every ~8 units
        const postMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.5, roughness: 0.5 });
        let postAccum = 0;
        for (let i = 0; i < N - 1; i++) {
            const dx = pts[i + 1].x - pts[i].x;
            const dz = pts[i + 1].z - pts[i].z;
            postAccum += Math.sqrt(dx * dx + dz * dz);
            if (postAccum > 8) {
                postAccum = 0;
                const next = (i + 1) % N;
                const prev = (i - 1 + N) % N;
                const ttx = pts[next].x - pts[prev].x;
                const ttz = pts[next].z - pts[prev].z;
                const tl = Math.sqrt(ttx * ttx + ttz * ttz) || 1;
                const nnx = -ttz / tl;
                const nnz = ttx / tl;
                const rOff = hw + 1.8;
                for (let side = -1; side <= 1; side += 2) {
                    const pGeo = new THREE.BoxGeometry(0.15, 1.0, 0.15);
                    const post = new THREE.Mesh(pGeo, postMat);
                    post.position.set(
                        pts[i].x + nnx * rOff * side,
                        0.5,
                        pts[i].z + nnz * rOff * side
                    );
                    post.castShadow = true;
                    this.scene.add(post);
                    this.trackObjects.push(post);
                }
            }
        }
    }

    _buildRamps(track) {
        if (!this.splineCurve) return;
        this.rampZones = []; // store for physics
        for (const ramp of track.ramps) {
            const t = ramp.splineT;
            const center = this.splineCurve.getPoint(t);
            const tangent = this.splineCurve.getTangent(t);
            const angle = Math.atan2(tangent.x, tangent.z);

            const w = ramp.width || 12;
            const len = ramp.length || 16;
            const h = ramp.height || 2;
            const hw2 = w / 2;
            const hl = len / 2;

            const group = new THREE.Group();

            // Ramp = two halves: upslope then flat top then downslope
            // We'll do a smooth wedge: ground→peak→ground
            const geo = new THREE.BufferGeometry();
            // 8 verts: bottom-back, bottom-front, peak-left, peak-right on each side
            //   0---1  back bottom (entry)
            //   2---3  middle peak top
            //   4---5  front bottom (exit)
            const verts = new Float32Array([
                -hw2, 0, -hl,    // 0 back-left
                 hw2, 0, -hl,    // 1 back-right
                -hw2, h,  0,     // 2 peak-left
                 hw2, h,  0,     // 3 peak-right
                -hw2, 0,  hl,    // 4 front-left
                 hw2, 0,  hl,    // 5 front-right
            ]);
            const indices = [
                // Upslope
                0, 2, 1,   1, 2, 3,
                // Downslope
                2, 4, 3,   3, 4, 5,
                // Left side
                0, 4, 2,
                // Right side
                1, 3, 5,
                // bottom
                0, 1, 4,   1, 5, 4,
            ];
            geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
            geo.setIndex(indices);
            geo.computeVertexNormals();

            const rampMat = new THREE.MeshStandardMaterial({
                color: 0x666666,
                roughness: 0.5,
                side: THREE.DoubleSide,
            });
            const rampMesh = new THREE.Mesh(geo, rampMat);
            rampMesh.castShadow = true;
            rampMesh.receiveShadow = true;
            group.add(rampMesh);

            // Chevron arrows on upslope
            const arrowCanvas = document.createElement('canvas');
            arrowCanvas.width = 128;
            arrowCanvas.height = 128;
            const ctx = arrowCanvas.getContext('2d');
            ctx.fillStyle = '#ffaa00';
            ctx.font = 'bold 80px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('\u25B2', 64, 64);
            const arrowTex = new THREE.CanvasTexture(arrowCanvas);
            const arrowGeo = new THREE.PlaneGeometry(2.5, 2.5);
            const arrowMat = new THREE.MeshBasicMaterial({ map: arrowTex, transparent: true, side: THREE.DoubleSide });
            const slopeAngle = Math.atan2(h, hl);
            for (let a = -1; a <= 1; a++) {
                const arrow = new THREE.Mesh(arrowGeo, arrowMat);
                arrow.rotation.x = -Math.PI / 2 + slopeAngle;
                arrow.position.set(a * 3, h * 0.3, -hl * 0.35);
                group.add(arrow);
            }

            // Warning stripes on sides
            for (let side = -1; side <= 1; side += 2) {
                const stripeGeo = new THREE.BoxGeometry(0.3, h + 0.2, len);
                const stripeMat = new THREE.MeshStandardMaterial({
                    color: 0xff8800,
                    emissive: 0x442200,
                });
                const stripe = new THREE.Mesh(stripeGeo, stripeMat);
                stripe.position.set(side * hw2, h * 0.35, 0);
                group.add(stripe);
            }

            group.position.set(center.x, 0.01, center.z);
            group.rotation.y = angle;
            this.scene.add(group);
            this.trackObjects.push(group);

            // Store ramp zone data for physics (world-space oriented rectangle)
            const fwd = { x: Math.sin(angle), z: Math.cos(angle) };
            this.rampZones.push({
                cx: center.x,
                cz: center.z,
                fwdX: fwd.x,
                fwdZ: fwd.z,
                halfLen: hl,
                halfWid: hw2,
                height: h,
            });
        }
    }

    /**
     * Check if position is on a ramp and return the ramp height at that point.
     * Returns 0 if not on any ramp.
     */
    getRampHeight(x, z) {
        if (!this.rampZones) return 0;
        for (const r of this.rampZones) {
            // Transform car position into ramp-local coords
            const dx = x - r.cx;
            const dz = z - r.cz;
            // Project onto ramp's forward (along-length) and right (across-width) axes
            const along = dx * r.fwdX + dz * r.fwdZ;   // + = forward
            const across = dx * r.fwdZ - dz * r.fwdX;   // perpendicular

            if (Math.abs(along) <= r.halfLen && Math.abs(across) <= r.halfWid) {
                // Inside the ramp rectangle. Height forms a triangle peak at along=0
                // along = -halfLen → 0, along = 0 → height, along = +halfLen → 0
                const t = 1.0 - Math.abs(along) / r.halfLen; // 0 at edges, 1 at center
                return r.height * t;
            }
        }
        return 0;
    }

    _buildWalls(track) {
        for (const wall of track.walls) {
            const geo = new THREE.BoxGeometry(wall.width || 1, wall.height || 2, wall.depth || 1);
            const mat = new THREE.MeshStandardMaterial({ color: 0x666666 });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(wall.x, (wall.height || 2) / 2, wall.z);
            mesh.castShadow = true;
            this.scene.add(mesh);
            this.trackObjects.push(mesh);

            this.physics.createBox(
                { x: wall.x, y: (wall.height || 2) / 2, z: wall.z },
                { x: (wall.width || 1) / 2, y: (wall.height || 2) / 2, z: (wall.depth || 1) / 2 },
                0, 0.8, 0.5
            );
        }
    }

    _buildCheckpoints(track) {
        this.checkpointMeshes = [];
        track.checkpoints.forEach((cp, i) => {
            const group = new THREE.Group();

            // AUTO-ORIENT: find the closest spline point and use its tangent
            let cpAngle = cp.rotation;
            if (this.splineCurve) {
                let bestDist = Infinity;
                let bestT = 0;
                for (let t = 0; t <= 1; t += 0.005) {
                    const p = this.splineCurve.getPoint(t);
                    const d = (p.x - cp.x) ** 2 + (p.z - cp.z) ** 2;
                    if (d < bestDist) { bestDist = d; bestT = t; }
                }
                // Checkpoint gate should be perpendicular to the road direction
                const tang = this.splineCurve.getTangent(bestT);
                cpAngle = Math.atan2(tang.x, tang.z);
            }

            // Gate posts — in LOCAL space (group rotation handles world orientation)
            for (let side = -1; side <= 1; side += 2) {
                const postGeo = new THREE.BoxGeometry(0.4, 5, 0.4);
                const postMat = new THREE.MeshStandardMaterial({
                    color: 0x00ffcc,
                    emissive: 0x004433,
                });
                const post = new THREE.Mesh(postGeo, postMat);
                post.position.set(side * cp.width / 2, 2.5, 0);
                group.add(post);
            }

            // Top bar — local space, no extra rotation needed
            const barGeo = new THREE.BoxGeometry(cp.width, 0.3, 0.3);
            const barMat = new THREE.MeshStandardMaterial({
                color: 0x00ffcc,
                emissive: 0x004433,
                transparent: true,
                opacity: 0.7,
            });
            const bar = new THREE.Mesh(barGeo, barMat);
            bar.position.set(0, 5, 0);
            group.add(bar);

            // Number display
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#00ffcc';
            ctx.font = 'bold 40px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(i + 1), 32, 32);
            const texture = new THREE.CanvasTexture(canvas);
            const numGeo = new THREE.PlaneGeometry(1.5, 1.5);
            const numMat = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide,
            });
            const numMesh = new THREE.Mesh(numGeo, numMat);
            numMesh.position.set(0, 5.5, 0);
            group.add(numMesh);

            group.position.set(cp.x, 0, cp.z);
            group.rotation.y = cpAngle;
            this.scene.add(group);
            this.trackObjects.push(group);
            this.checkpointMeshes.push({
                mesh: group,
                x: cp.x,
                z: cp.z,
                width: cp.width,
                rotation: cpAngle,
                index: i,
                passed: false,
            });
        });
    }

    _buildFinishLine(track) {
        const fl = track.finishLine;
        const group = new THREE.Group();

        // Checkered pattern
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 4; y++) {
                ctx.fillStyle = (x + y) % 2 === 0 ? '#ffffff' : '#000000';
                ctx.fillRect(x * 8, y * 8, 8, 8);
            }
        }
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        const lineGeo = new THREE.PlaneGeometry(fl.width, 3);
        const lineMat = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        const lineMesh = new THREE.Mesh(lineGeo, lineMat);
        lineMesh.rotation.x = -Math.PI / 2;
        lineMesh.position.y = 0.12;
        group.add(lineMesh);

        // Finish arch
        for (let side = -1; side <= 1; side += 2) {
            const postGeo = new THREE.BoxGeometry(0.5, 6, 0.5);
            const postMat = new THREE.MeshStandardMaterial({
                color: 0xff3366,
                emissive: 0x660022,
            });
            const post = new THREE.Mesh(postGeo, postMat);
            post.position.set(side * fl.width / 2, 3, 0);
            group.add(post);
        }

        const archGeo = new THREE.BoxGeometry(fl.width + 0.5, 0.5, 0.5);
        const archMat = new THREE.MeshStandardMaterial({
            color: 0xff3366,
            emissive: 0x660022,
        });
        const arch = new THREE.Mesh(archGeo, archMat);
        arch.position.set(0, 6, 0);
        group.add(arch);

        // FINISH text
        const txtCanvas = document.createElement('canvas');
        txtCanvas.width = 256;
        txtCanvas.height = 64;
        const txtCtx = txtCanvas.getContext('2d');
        txtCtx.fillStyle = '#ff3366';
        txtCtx.font = 'bold 48px monospace';
        txtCtx.textAlign = 'center';
        txtCtx.textBaseline = 'middle';
        txtCtx.fillText('FINISH', 128, 32);
        const txtTexture = new THREE.CanvasTexture(txtCanvas);
        const txtGeo = new THREE.PlaneGeometry(8, 2);
        const txtMat = new THREE.MeshBasicMaterial({
            map: txtTexture,
            transparent: true,
            side: THREE.DoubleSide,
        });
        const txtMesh = new THREE.Mesh(txtGeo, txtMat);
        txtMesh.position.set(0, 7, 0);
        group.add(txtMesh);

        group.position.set(fl.x, 0, fl.z);
        group.rotation.y = fl.rotation;
        this.scene.add(group);
        this.trackObjects.push(group);
    }

    _buildDecorations(track) {
        for (const dec of track.decorations) {
            let mesh;
            switch (dec.type) {
                case 'tree':
                    mesh = this._createTree(dec);
                    break;
                case 'rock':
                    mesh = this._createRock(dec);
                    break;
                case 'building':
                    mesh = this._createBuilding(dec);
                    break;
                case 'cone':
                    mesh = this._createCone(dec);
                    break;
                case 'mountain':
                    mesh = this._createMountain(dec);
                    break;
                default:
                    continue;
            }
            if (mesh) {
                this.scene.add(mesh);
                this.trackObjects.push(mesh);
            }
        }
    }

    _createTree(dec) {
        const group = new THREE.Group();
        // Trunk
        const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 3, 6);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 1.5;
        trunk.castShadow = true;
        group.add(trunk);
        // Foliage
        const foliageGeo = new THREE.ConeGeometry(2.5, 5, 6);
        const foliageMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });
        const foliage = new THREE.Mesh(foliageGeo, foliageMat);
        foliage.position.y = 5;
        foliage.castShadow = true;
        group.add(foliage);
        group.position.set(dec.x, 0, dec.z);
        return group;
    }

    _createRock(dec) {
        const geo = new THREE.DodecahedronGeometry(2, 0);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x888888,
            roughness: 0.9,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(dec.x, 1, dec.z);
        mesh.rotation.set(Math.random(), Math.random(), 0);
        mesh.castShadow = true;
        return mesh;
    }

    _createBuilding(dec) {
        const h = dec.h || 15;
        const w = 8 + Math.random() * 4;
        const d = 8 + Math.random() * 4;
        const group = new THREE.Group();

        // Main building
        const geo = new THREE.BoxGeometry(w, h, d);
        const mat = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0.6, 0.05, 0.15 + Math.random() * 0.1),
            roughness: 0.8,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = h / 2;
        mesh.castShadow = true;
        group.add(mesh);

        // Windows
        const windowColor = 0xffffaa;
        for (let wy = 2; wy < h - 2; wy += 3) {
            for (let wx = -w / 2 + 1.5; wx < w / 2 - 1; wx += 2) {
                const lit = Math.random() > 0.3;
                const winGeo = new THREE.PlaneGeometry(1, 1.5);
                const winMat = new THREE.MeshBasicMaterial({
                    color: lit ? windowColor : 0x222222,
                });
                // Front
                const win = new THREE.Mesh(winGeo, winMat);
                win.position.set(wx, wy, d / 2 + 0.01);
                group.add(win);
                // Back
                const win2 = win.clone();
                win2.position.z = -d / 2 - 0.01;
                win2.rotation.y = Math.PI;
                group.add(win2);
            }
        }

        group.position.set(dec.x, 0, dec.z);
        return group;
    }

    _createCone(dec) {
        const geo = new THREE.ConeGeometry(0.3, 0.8, 8);
        const mat = new THREE.MeshStandardMaterial({ color: 0xff6600 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(dec.x, 0.4, dec.z);
        mesh.castShadow = true;
        return mesh;
    }

    _createMountain(dec) {
        const h = dec.h || 25;
        const geo = new THREE.ConeGeometry(h * 0.8, h, 5);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x667766,
            roughness: 1,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(dec.x, h / 2, dec.z);
        mesh.castShadow = true;
        return mesh;
    }

    _setupLights(track) {
        // Remove old lights
        const oldLights = this.scene.children.filter(
            c => c.isLight
        );
        oldLights.forEach(l => this.scene.remove(l));

        // Ambient
        const ambient = new THREE.AmbientLight(track.ambientLight, 0.6);
        this.scene.add(ambient);
        this.trackObjects.push(ambient);

        // Hemisphere
        const hemi = new THREE.HemisphereLight(track.skyColor, track.groundColor, 0.4);
        this.scene.add(hemi);
        this.trackObjects.push(hemi);

        // Sun
        const sun = new THREE.DirectionalLight(track.sunColor, 1.0);
        sun.position.set(
            track.sunPosition.x, track.sunPosition.y, track.sunPosition.z
        );
        sun.castShadow = true;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        sun.shadow.camera.near = 1;
        sun.shadow.camera.far = 500;
        sun.shadow.camera.left = -150;
        sun.shadow.camera.right = 150;
        sun.shadow.camera.top = 150;
        sun.shadow.camera.bottom = -150;
        this.scene.add(sun);
        this.trackObjects.push(sun);
    }

    clearTrack() {
        for (const obj of this.trackObjects) {
            this.scene.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach(m => m.dispose());
                } else {
                    obj.material.dispose();
                }
            }
        }
        this.trackObjects = [];
        this.checkpointMeshes = [];
        this.wallBodies = [];
        this.trackPath = [];
        this.trackHalfWidth = 8;
        this.splineCurve = null;
        this.splinePoints = [];
        this.rampZones = [];
    }

    getCheckpoints() {
        return this.checkpointMeshes;
    }

    resetCheckpoints() {
        this.checkpointMeshes.forEach(cp => { cp.passed = false; });
    }

    /**
     * Constrain a car body to stay within the track boundaries.
     * Uses closest-point-on-polyline distance checking.
     * @param {Object} body - The physics body (has .position and .velocity)
     * @returns {boolean} true if the car was pushed back
     */
    /**
     * Get the track forward direction at the closest point to (x,z).
     * Returns {dx, dz} normalised tangent along the correct racing direction,
     * plus the index of the closest segment.
     */
    getTrackDirection(x, z) {
        if (!this.trackPath || this.trackPath.length < 2) return { dx: 0, dz: 1, segIndex: 0 };

        let minDist = Infinity;
        let bestIdx = 0;
        for (let i = 0; i < this.trackPath.length - 1; i++) {
            const ax = this.trackPath[i].x, az = this.trackPath[i].z;
            const bx = this.trackPath[i + 1].x, bz = this.trackPath[i + 1].z;
            const ex = bx - ax, ez = bz - az;
            const lenSq = ex * ex + ez * ez;
            if (lenSq < 0.001) continue;
            let t = ((x - ax) * ex + (z - az) * ez) / lenSq;
            t = Math.max(0, Math.min(1, t));
            const px = ax + t * ex, pz = az + t * ez;
            const d = (x - px) * (x - px) + (z - pz) * (z - pz);
            if (d < minDist) { minDist = d; bestIdx = i; }
        }
        const ax = this.trackPath[bestIdx].x;
        const az = this.trackPath[bestIdx].z;
        const bx = this.trackPath[bestIdx + 1].x;
        const bz = this.trackPath[bestIdx + 1].z;
        let dx = bx - ax, dz = bz - az;
        const len = Math.sqrt(dx * dx + dz * dz) || 1;
        dx /= len; dz /= len;
        return { dx, dz, segIndex: bestIdx };
    }

    constrainToTrack(body) {
        if (!this.trackPath || this.trackPath.length < 2) return false;

        const cx = body.position._x;
        const cz = body.position._z;
        const margin = 1.2; // car half-width buffer
        const maxDist = this.trackHalfWidth - margin;

        // Find closest point on the entire track centerline polyline
        let minDist = Infinity;
        let nearestX = cx, nearestZ = cz;

        for (let i = 0; i < this.trackPath.length - 1; i++) {
            const ax = this.trackPath[i].x;
            const az = this.trackPath[i].z;
            const bx = this.trackPath[i + 1].x;
            const bz = this.trackPath[i + 1].z;

            // Project car position onto segment A→B
            const dx = bx - ax;
            const dz = bz - az;
            const lenSq = dx * dx + dz * dz;
            if (lenSq < 0.001) continue;

            let t = ((cx - ax) * dx + (cz - az) * dz) / lenSq;
            t = Math.max(0, Math.min(1, t));

            const px = ax + t * dx;
            const pz = az + t * dz;
            const distSq = (cx - px) * (cx - px) + (cz - pz) * (cz - pz);

            if (distSq < minDist) {
                minDist = distSq;
                nearestX = px;
                nearestZ = pz;
            }
        }

        minDist = Math.sqrt(minDist);

        if (minDist > maxDist) {
            // Car is outside track — push it back to the edge
            const pushDirX = (nearestX - cx);
            const pushDirZ = (nearestZ - cz);
            const pushLen = Math.sqrt(pushDirX * pushDirX + pushDirZ * pushDirZ);

            if (pushLen > 0.001) {
                const nx = pushDirX / pushLen; // normal pointing inward
                const nz = pushDirZ / pushLen;

                // Place car at the boundary
                const overshoot = minDist - maxDist;
                body.position._x += nx * overshoot;
                body.position._z += nz * overshoot;

                // Kill velocity going outward (reflect inward)
                const vDotN = body.velocity._x * nx + body.velocity._z * nz;
                if (vDotN < 0) {
                    // Velocity is going outward — cancel it with a bounce
                    body.velocity._x -= nx * vDotN * 1.3; // slight bounce
                    body.velocity._z -= nz * vDotN * 1.3;
                    // Speed penalty for hitting the wall
                    body.velocity._x *= 0.85;
                    body.velocity._z *= 0.85;
                }
            }
            return true;
        }
        return false;
    }
}

window.TRACK_DATA = TRACK_DATA;
window.TrackBuilder = TrackBuilder;
