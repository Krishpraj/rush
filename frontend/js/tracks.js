/**
 * Track definitions for the racing game
 * Each track defines: road segments, checkpoints, start position, walls, and decorations
 */

const TRACK_DATA = {

    // ===== TRACK 1: VELOCITY (Zig-zag esses circuit) =====
    track_1: {
        name: "Velocity",
        difficulty: "Easy",
        laps: 3,
        startPosition: { x: 0, y: 0.5, z: -60 },
        startRotation: Math.PI,
        controlPoints: [
            { x: 0, y: 0, z: -60 },
            { x: 0, y: 0, z: -200 },
            { x: 100, y: 1, z: -300 },        // Zig right
            { x: 0, y: 2, z: -400 },          // Zag left
            { x: 120, y: 3, z: -500 },        // Zig right
            { x: 20, y: 4, z: -600 },         // Zag left
            { x: 160, y: 5, z: -680 },        // Zig right (far south)
            { x: 300, y: 5, z: -640 },        // Wide sweeper turnaround
            { x: 380, y: 4, z: -540 },        // Heading back north
            { x: 280, y: 3, z: -440 },        // Zig left
            { x: 380, y: 2, z: -340 },        // Zag right
            { x: 280, y: 1, z: -240 },        // Zig left
            { x: 360, y: 0, z: -140 },        // Zag right
            { x: 260, y: 0, z: -40 },         // Zig left
            { x: 180, y: 0, z: 20 },          // Wide return sweeper
            { x: 80, y: 0, z: -10 },          // Back toward start
        ],
        roadWidth: 20,
        splineSamples: 600,
        ramps: [],
        checkpoints: [
            { x: 50, z: -250, width: 20, rotation: Math.PI / 4 },
            { x: 60, z: -450, width: 20, rotation: Math.PI / 4 },
            { x: 90, z: -640, width: 20, rotation: Math.PI / 4 },
            { x: 340, z: -590, width: 20, rotation: Math.PI / 4 },
            { x: 330, z: -390, width: 20, rotation: Math.PI / 4 },
            { x: 330, z: -190, width: 20, rotation: Math.PI / 4 },
            { x: 220, z: -10, width: 20, rotation: Math.PI / 2 },
        ],
        finishLine: { x: 0, z: -60, width: 20, rotation: 0 },
        walls: [],
        decorations: [],
        groundColor: 0x1a1e24,
        roadColor: 0x222222,
        skyColor: 0x0a1628,
        ambientLight: 0x304060,
        sunColor: 0xddeeff,
        sunPosition: { x: 250, y: 300, z: 0 },
    },

    // ===== TRACK 2: FLUX (Twisted gauntlet with hairpins and chicanes) =====
    track_2: {
        name: "Flux",
        difficulty: "Medium",
        laps: 3,
        startPosition: { x: 0, y: 0.5, z: -60 },
        startRotation: Math.PI,
        controlPoints: [
            { x: 0, y: 0, z: -60 },              // Start/finish
            { x: 0, y: 0, z: -200 },              // Long straight
            { x: -20, y: 3, z: -320 },            // Gentle drift left
            { x: 0, y: 7, z: -440 },              // Straighten out
            { x: 40, y: 11, z: -530 },            // Gentle drift right
            { x: 80, y: 14, z: -580 },            // Climbing right bend
            { x: 200, y: 19, z: -620 },           // Wide right arc
            { x: 330, y: 22, z: -580 },           // Arc continues east
            { x: 400, y: 20, z: -480 },           // Arc flows north-east
            { x: 420, y: 16, z: -370 },           // Descent into esses
            { x: 460, y: 12, z: -270 },           // S-curve right (wide)
            { x: 400, y: 8, z: -190 },            // S-curve left (wide)
            { x: 470, y: 5, z: -110 },            // S-curve exit
            { x: 520, y: 2, z: -20 },             // Fast descent
            { x: 530, y: 0, z: 90 },              // Valley bottom
            { x: 460, y: 0, z: 170 },             // Wide sweeper left
            { x: 370, y: 2, z: 130 },             // Flowing left
            { x: 300, y: 7, z: 200 },             // Sweeping left climb
            { x: 240, y: 13, z: 280 },            // Continuing south-west
            { x: 260, y: 18, z: 350 },            // Arc continues south
            { x: 200, y: 23, z: 380 },            // Summit wide bend
            { x: 100, y: 20, z: 340 },            // Descent flowing left
            { x: 30, y: 14, z: 390 },             // Dropping south
            { x: -40, y: 8, z: 300 },             // Sweeper exit
            { x: -50, y: 4, z: 200 },             // Gentle left
            { x: 20, y: 2, z: 110 },              // Kink right
            { x: -20, y: 0, z: 20 },              // Final gentle bend
        ],
        roadWidth: 22,
        splineSamples: 900,
        ramps: [],
        checkpoints: [
            { x: -10, z: -350, width: 22, rotation: Math.PI / 5 },
            { x: 140, z: -600, width: 22, rotation: Math.PI / 3 },
            { x: 410, z: -420, width: 22, rotation: Math.PI / 4 },
            { x: 490, z: -60, width: 22, rotation: Math.PI / 4 },
            { x: 400, z: 150, width: 22, rotation: Math.PI / 3 },
            { x: 260, z: 250, width: 22, rotation: Math.PI / 4 },
            { x: 60, z: 370, width: 22, rotation: Math.PI / 4 },
            { x: -10, z: 250, width: 22, rotation: Math.PI / 4 },
            { x: -10, z: 100, width: 22, rotation: Math.PI / 4 },
        ],
        finishLine: { x: 0, z: -50, width: 22, rotation: 0 },
        walls: [],
        decorations: [],
        groundColor: 0x141820,
        roadColor: 0x1a1a1a,
        skyColor: 0x0c1a30,
        ambientLight: 0x354565,
        sunColor: 0xcce0ff,
        sunPosition: { x: -80, y: 250, z: 100 },
    },

    // ===== TRACK 3: ZENITH (Figure-8 with bridge crossing) =====
    track_3: {
        name: "Zenith",
        difficulty: "Hard",
        laps: 3,
        startPosition: { x: 0, y: 10.5, z: -80 },
        startRotation: Math.PI,
        controlPoints: [
            { x: 0, y: 10, z: -80 },         // Start/finish
            { x: 40, y: 6, z: -200 },         // Descending south-east
            { x: 140, y: 2, z: -320 },        // Wide sweeper into south loop
            { x: 300, y: 1, z: -380 },        // South loop far end
            { x: 420, y: 3, z: -300 },        // Wide sweeper east
            { x: 400, y: 8, z: -160 },        // Climbing north-east
            { x: 280, y: 16, z: -70 },        // Crossing zone — HIGH (bridge)
            { x: 160, y: 22, z: 20 },         // Into north loop
            { x: 80, y: 26, z: 120 },         // North loop west
            { x: 120, y: 28, z: 220 },        // North loop apex
            { x: 280, y: 26, z: 220 },        // North loop east
            { x: 380, y: 22, z: 120 },        // Sweeping south-east
            { x: 340, y: 14, z: 20 },         // Descending toward crossing
            { x: 220, y: 6, z: -60 },         // Crossing zone — LOW (under bridge)
            { x: 100, y: 8, z: -70 },         // Back toward start
        ],
        roadWidth: 20,
        splineSamples: 600,
        ramps: [],
        checkpoints: [
            { x: 90, z: -260, width: 20, rotation: Math.PI / 4 },
            { x: 360, z: -340, width: 20, rotation: Math.PI / 4 },
            { x: 400, z: -160, width: 20, rotation: 0 },
            { x: 160, z: 20, width: 20, rotation: Math.PI / 4 },
            { x: 100, z: 170, width: 20, rotation: Math.PI / 4 },
            { x: 280, z: 220, width: 20, rotation: Math.PI / 2 },
            { x: 340, z: 20, width: 20, rotation: 0 },
        ],
        finishLine: { x: 0, z: -80, width: 20, rotation: 0 },
        walls: [],
        decorations: [],
        groundColor: 0x181d22,
        roadColor: 0x202020,
        skyColor: 0x0e1e35,
        ambientLight: 0x3a4a60,
        sunColor: 0xd0e8ff,
        sunPosition: { x: 50, y: 250, z: -80 },
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

        // Generate smooth spline from control points (including Y elevation)
        const samples = track.splineSamples || 200;
        const pts = track.controlPoints || track.path || [];
        const splineVecs = pts.map(p => new THREE.Vector3(p.x, p.y || 0, p.z));
        this.splineCurve = new THREE.CatmullRomCurve3(splineVecs, true, 'catmullrom', 0.5);

        // Sample the spline into a dense polyline for boundary + road building
        this.splinePoints = [];
        for (let i = 0; i <= samples; i++) {
            const t = i / samples;
            const pt = this.splineCurve.getPoint(t);
            this.splinePoints.push({ x: pt.x, y: Math.max(0, pt.y), z: pt.z });
        }

        // Store for boundary constraint
        this.trackPath = this.splinePoints;
        this.trackHalfWidth = track.roadWidth / 2;

        // Set sky
        this.scene.background = new THREE.Color(track.skyColor);
        this.scene.fog = new THREE.Fog(track.skyColor, 200, 800);

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
        const sz = 512;
        const canvas = document.createElement('canvas');
        canvas.width = sz;
        canvas.height = sz;
        const ctx = canvas.getContext('2d');

        const base = new THREE.Color(track.groundColor);
        ctx.fillStyle = '#' + base.getHexString();
        ctx.fillRect(0, 0, sz, sz);

        // Tron-style grid lines
        const gridSpacing = 32;
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.07)';
        ctx.lineWidth = 1;
        for (let x = 0; x <= sz; x += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, sz);
            ctx.stroke();
        }
        for (let y = 0; y <= sz; y += gridSpacing) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(sz, y);
            ctx.stroke();
        }

        // Brighter lines every 4th cell
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.14)';
        ctx.lineWidth = 1;
        for (let x = 0; x <= sz; x += gridSpacing * 4) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, sz);
            ctx.stroke();
        }
        for (let y = 0; y <= sz; y += gridSpacing * 4) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(sz, y);
            ctx.stroke();
        }

        // Faint glow dots at intersections of major lines
        ctx.fillStyle = 'rgba(0, 229, 255, 0.12)';
        for (let x = 0; x <= sz; x += gridSpacing * 4) {
            for (let y = 0; y <= sz; y += gridSpacing * 4) {
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const groundTex = new THREE.CanvasTexture(canvas);
        groundTex.wrapS = THREE.RepeatWrapping;
        groundTex.wrapT = THREE.RepeatWrapping;
        groundTex.repeat.set(50, 50);

        const geo = new THREE.PlaneGeometry(1400, 1400);
        const mat = new THREE.MeshStandardMaterial({
            map: groundTex,
            roughness: 0.85,
            metalness: 0.15,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.trackObjects.push(mesh);

        this.physics.createGround(1400, 1400);
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
            const cy = pts[i].y || 0;
            const cz = pts[i].z;
            const u = cumulDist / 10; // repeat texture every 10 units

            // Road surface: left and right edge (follow elevation)
            roadVerts.push(cx - nx * hw, cy + 0.05, cz - nz * hw);
            roadVerts.push(cx + nx * hw, cy + 0.05, cz + nz * hw);
            roadUVs.push(0, u);
            roadUVs.push(1, u);

            // Curb strips (slightly raised above road)
            const curbW = 0.8;
            const curbOff = hw + curbW / 2;
            curbLVerts.push(cx - nx * hw, cy + 0.1, cz - nz * hw);
            curbLVerts.push(cx - nx * (hw + curbW), cy + 0.1, cz - nz * (hw + curbW));
            curbRVerts.push(cx + nx * hw, cy + 0.1, cz + nz * hw);
            curbRVerts.push(cx + nx * (hw + curbW), cy + 0.1, cz + nz * (hw + curbW));

            // Guardrail positions (follow elevation)
            const railOff = hw + 0.8;
            railLVerts.push(cx - nx * railOff, cy, cz - nz * railOff);
            railLVerts.push(cx - nx * railOff, cy + 0.9, cz - nz * railOff);
            railRVerts.push(cx + nx * railOff, cy, cz + nz * railOff);
            railRVerts.push(cx + nx * railOff, cy + 0.9, cz + nz * railOff);

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
            roughness: 0.4,
            metalness: 0.15,
            side: THREE.DoubleSide,
        });
        const roadMesh = new THREE.Mesh(roadGeo, roadMat);
        roadMesh.receiveShadow = true;
        this.scene.add(roadMesh);
        this.trackObjects.push(roadMesh);

        // Road underside slab (dark bottom visible from below)
        const undersideVerts = [];
        const undersideIndices = [];
        for (let i = 0; i < N; i++) {
            const next = (i + 1) % N;
            const prev = (i - 1 + N) % N;
            const stx = pts[next].x - pts[prev].x;
            const stz = pts[next].z - pts[prev].z;
            const sl = Math.sqrt(stx * stx + stz * stz) || 1;
            const snx = -stz / sl;
            const snz = stx / sl;
            const scx = pts[i].x;
            const scy = pts[i].y || 0;
            const scz = pts[i].z;
            const edgeOff = hw + 0.8;
            const slabDrop = 0.4;
            undersideVerts.push(scx - snx * edgeOff, scy - slabDrop, scz - snz * edgeOff);
            undersideVerts.push(scx + snx * edgeOff, scy - slabDrop, scz + snz * edgeOff);
            if (i < N - 1) {
                const bi = i * 2;
                undersideIndices.push(bi, bi + 2, bi + 1);
                undersideIndices.push(bi + 1, bi + 2, bi + 3);
            }
        }
        const undersideMat = new THREE.MeshStandardMaterial({
            color: 0x0a0a0a,
            roughness: 0.3,
            metalness: 0.6,
            side: THREE.DoubleSide,
        });
        const undersideGeo = new THREE.BufferGeometry();
        undersideGeo.setAttribute('position', new THREE.Float32BufferAttribute(undersideVerts, 3));
        undersideGeo.setIndex(undersideIndices);
        undersideGeo.computeVertexNormals();
        const undersideMesh = new THREE.Mesh(undersideGeo, undersideMat);
        undersideMesh.receiveShadow = true;
        this.scene.add(undersideMesh);
        this.trackObjects.push(undersideMesh);

        // Side walls connecting road top edge to underside slab
        const sideWallLVerts = [], sideWallRVerts = [], sideWallIndices = [];
        for (let i = 0; i < N; i++) {
            const next = (i + 1) % N;
            const prev = (i - 1 + N) % N;
            const stx = pts[next].x - pts[prev].x;
            const stz = pts[next].z - pts[prev].z;
            const sl = Math.sqrt(stx * stx + stz * stz) || 1;
            const snx = -stz / sl;
            const snz = stx / sl;
            const scx = pts[i].x;
            const scy = pts[i].y || 0;
            const scz = pts[i].z;
            const edgeOff = hw + 0.8;
            const slabDrop = 0.4;
            sideWallLVerts.push(scx - snx * edgeOff, scy + 0.05, scz - snz * edgeOff);
            sideWallLVerts.push(scx - snx * edgeOff, scy - slabDrop, scz - snz * edgeOff);
            sideWallRVerts.push(scx + snx * edgeOff, scy + 0.05, scz + snz * edgeOff);
            sideWallRVerts.push(scx + snx * edgeOff, scy - slabDrop, scz + snz * edgeOff);
            if (i < N - 1) {
                const bi = i * 2;
                sideWallIndices.push(bi, bi + 1, bi + 2);
                sideWallIndices.push(bi + 1, bi + 3, bi + 2);
            }
        }
        const sideWallMat = new THREE.MeshStandardMaterial({
            color: 0x111111,
            roughness: 0.25,
            metalness: 0.7,
            side: THREE.DoubleSide,
        });
        for (const verts of [sideWallLVerts, sideWallRVerts]) {
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
            geo.setIndex(sideWallIndices);
            geo.computeVertexNormals();
            const mesh = new THREE.Mesh(geo, sideWallMat.clone());
            this.scene.add(mesh);
            this.trackObjects.push(mesh);
        }

        // Collect all pillar candidate positions first, then filter for overlaps
        const pillarMat = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.2,
            metalness: 0.85,
        });
        const pillarCapMat = new THREE.MeshStandardMaterial({
            color: 0x0a0a0a,
            roughness: 0.15,
            metalness: 0.9,
        });
        const minElevForPillar = 1.5;
        const pillarSpacing = 15;
        const pillarCandidates = [];
        let pillarAccum = 0;
        for (let i = 0; i < N - 1; i++) {
            const dx = pts[i + 1].x - pts[i].x;
            const dz = pts[i + 1].z - pts[i].z;
            pillarAccum += Math.sqrt(dx * dx + dz * dz);
            if (pillarAccum >= pillarSpacing) {
                pillarAccum = 0;
                const elev = pts[i].y || 0;
                if (elev < minElevForPillar) continue;
                pillarCandidates.push({ x: pts[i].x, z: pts[i].z, elev, segIdx: i });
            }
        }

        // For each pillar candidate, check if any OTHER road segment passes
        // nearby underneath. If so, skip the pillar entirely to keep the
        // lower road visually clean.
        const roadCheckRadius = hw + 4;
        const roadCheckRadiusSq = roadCheckRadius * roadCheckRadius;

        for (const pc of pillarCandidates) {
            let hasRoadUnderneath = false;

            for (let j = 0; j < N - 1; j++) {
                // Skip segments that belong to the same section of road
                // (within ~30 indices means same stretch)
                const idxDist = Math.min(
                    Math.abs(j - pc.segIdx),
                    N - Math.abs(j - pc.segIdx)
                );
                if (idxDist < 30) continue;

                const ax = pts[j].x, az = pts[j].z;
                const bx = pts[j + 1].x, bz = pts[j + 1].z;
                const sdx = bx - ax, sdz = bz - az;
                const sLenSq = sdx * sdx + sdz * sdz;
                if (sLenSq < 0.001) continue;

                let t = ((pc.x - ax) * sdx + (pc.z - az) * sdz) / sLenSq;
                t = Math.max(0, Math.min(1, t));
                const prx = ax + t * sdx;
                const prz = az + t * sdz;
                const distSq = (pc.x - prx) * (pc.x - prx) + (pc.z - prz) * (pc.z - prz);

                if (distSq < roadCheckRadiusSq) {
                    const ay = pts[j].y || 0;
                    const by = pts[j + 1].y || 0;
                    const otherElev = ay + t * (by - ay);
                    // Another road segment passes underneath this pillar's road
                    if (otherElev < pc.elev - 1.5) {
                        hasRoadUnderneath = true;
                        break;
                    }
                }
            }

            if (hasRoadUnderneath) continue;

            const pillarR = 0.45 + Math.min(pc.elev * 0.012, 0.2);
            const pillarTop = pc.elev - 0.4;
            const pillarH = pillarTop;
            if (pillarH < 0.8) continue;

            const colGeo = new THREE.CylinderGeometry(pillarR, pillarR * 1.2, pillarH, 10);
            const col = new THREE.Mesh(colGeo, pillarMat);
            col.position.set(pc.x, pillarH / 2, pc.z);
            col.castShadow = true;
            this.scene.add(col);
            this.trackObjects.push(col);

            const capGeo = new THREE.CylinderGeometry(pillarR * 2.0, pillarR * 1.5, 0.35, 10);
            const cap = new THREE.Mesh(capGeo, pillarCapMat);
            cap.position.set(pc.x, pillarTop + 0.17, pc.z);
            this.scene.add(cap);
            this.trackObjects.push(cap);

            const baseGeo = new THREE.CylinderGeometry(pillarR * 1.5, pillarR * 2.0, 0.3, 10);
            const base = new THREE.Mesh(baseGeo, pillarCapMat);
            base.position.set(pc.x, 0.15, pc.z);
            this.scene.add(base);
            this.trackObjects.push(base);
        }

        // Center line removed

        // Curb strips (alternating red/white)
        const buildCurbMesh = (verts) => {
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
            geo.setIndex(curbIndices);
            geo.computeVertexNormals();
            const colors = [];
            for (let i = 0; i < verts.length / 3; i++) {
                const segIdx = Math.floor(i / 2);
                const phase = Math.floor(segIdx / 4) % 2;
                if (phase === 0) colors.push(0, 0.9, 1);
                else colors.push(0.08, 0.08, 0.1);
            }
            geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            const mat = new THREE.MeshStandardMaterial({
                vertexColors: true,
                roughness: 0.3,
                metalness: 0.4,
                side: THREE.DoubleSide,
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

        const buildRailMesh = (verts) => {
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
            geo.setIndex(railIndices);
            geo.computeVertexNormals();
            const mat = new THREE.MeshStandardMaterial({
                color: 0x1a1a1a,
                metalness: 0.85,
                roughness: 0.15,
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

        const postMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.2 });
        const postLedMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.4, roughness: 0.2 });
        const postHeight = 1.0;
        const overheadCheckRadius = hw + 4;
        const overheadCheckRadiusSq = overheadCheckRadius * overheadCheckRadius;
        let postAccum = 0;
        for (let i = 0; i < N - 1; i++) {
            const dx = pts[i + 1].x - pts[i].x;
            const dz = pts[i + 1].z - pts[i].z;
            postAccum += Math.sqrt(dx * dx + dz * dz);
            if (postAccum > 8) {
                postAccum = 0;
                const postY = pts[i].y || 0;
                const postTop = postY + postHeight;
                const px = pts[i].x;
                const pz = pts[i].z;

                let hasOverheadRoad = false;
                for (let j = 0; j < N - 1; j++) {
                    const idxDist = Math.min(Math.abs(j - i), N - Math.abs(j - i));
                    if (idxDist < 30) continue;
                    const ax = pts[j].x, az = pts[j].z;
                    const bx = pts[j + 1].x, bz = pts[j + 1].z;
                    const sdx = bx - ax, sdz = bz - az;
                    const sLenSq = sdx * sdx + sdz * sdz;
                    if (sLenSq < 0.001) continue;
                    let t = ((px - ax) * sdx + (pz - az) * sdz) / sLenSq;
                    t = Math.max(0, Math.min(1, t));
                    const prx = ax + t * sdx;
                    const prz = az + t * sdz;
                    const distSq = (px - prx) * (px - prx) + (pz - prz) * (pz - prz);
                    if (distSq < overheadCheckRadiusSq) {
                        const ay = pts[j].y || 0;
                        const by = pts[j + 1].y || 0;
                        const segElev = ay + t * (by - ay);
                        if (segElev > postTop + 0.5) {
                            hasOverheadRoad = true;
                            break;
                        }
                    }
                }
                if (hasOverheadRoad) continue;

                const next = (i + 1) % N;
                const prev = (i - 1 + N) % N;
                const ttx = pts[next].x - pts[prev].x;
                const ttz = pts[next].z - pts[prev].z;
                const tl = Math.sqrt(ttx * ttx + ttz * ttz) || 1;
                const nnx = -ttz / tl;
                const nnz = ttx / tl;
                const rOff = hw + 0.8;
                for (let side = -1; side <= 1; side += 2) {
                    const pGeo = new THREE.BoxGeometry(0.12, postHeight, 0.18);
                    const post = new THREE.Mesh(pGeo, postMat);
                    const postX = px + nnx * rOff * side;
                    const postZ = pz + nnz * rOff * side;
                    post.position.set(postX, postY + postHeight / 2, postZ);
                    post.castShadow = true;
                    this.scene.add(post);
                    this.trackObjects.push(post);
                    const ledCapGeo = new THREE.BoxGeometry(0.14, 0.06, 0.2);
                    const ledCap = new THREE.Mesh(ledCapGeo, postLedMat);
                    ledCap.position.set(postX, postY + postHeight + 0.03, postZ);
                    this.scene.add(ledCap);
                    this.trackObjects.push(ledCap);
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
                color: 0x1a1a1a,
                roughness: 0.25,
                metalness: 0.7,
                side: THREE.DoubleSide,
            });
            const rampMesh = new THREE.Mesh(geo, rampMat);
            rampMesh.castShadow = true;
            rampMesh.receiveShadow = true;
            group.add(rampMesh);

            const arrowCanvas = document.createElement('canvas');
            arrowCanvas.width = 128;
            arrowCanvas.height = 128;
            const actx = arrowCanvas.getContext('2d');
            actx.fillStyle = '#00e5ff';
            actx.font = 'bold 80px sans-serif';
            actx.textAlign = 'center';
            actx.textBaseline = 'middle';
            actx.fillText('\u25B2', 64, 64);
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

            for (let side = -1; side <= 1; side += 2) {
                const stripeGeo = new THREE.BoxGeometry(0.2, h + 0.2, len);
                const stripeMat = new THREE.MeshStandardMaterial({
                    color: 0x00e5ff,
                    emissive: 0x00e5ff,
                    emissiveIntensity: 0.3,
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

    /**
     * Elevation-aware closest-segment finder. When multiple track segments
     * overlap in XZ (bridges, switchbacks), uses the car's current Y to
     * pick the correct layer. For non-overlapping sections, always picks
     * the closest XZ segment (same as the original behaviour).
     */
    _findClosestSegment(x, z, currentY) {
        const path = this.trackPath;
        if (!path || path.length < 2) return null;

        let bestXZ = null;
        let bestXZDist = Infinity;
        const nearThreshSq = (this.trackHalfWidth * 2.5) * (this.trackHalfWidth * 2.5);
        const nearCandidates = [];

        for (let i = 0; i < path.length - 1; i++) {
            const ax = path[i].x, az = path[i].z;
            const bx = path[i + 1].x, bz = path[i + 1].z;
            const dx = bx - ax, dz = bz - az;
            const lenSq = dx * dx + dz * dz;
            if (lenSq < 0.001) continue;

            let t = ((x - ax) * dx + (z - az) * dz) / lenSq;
            t = Math.max(0, Math.min(1, t));

            const px = ax + t * dx;
            const pz = az + t * dz;
            const xzDistSq = (x - px) * (x - px) + (z - pz) * (z - pz);

            const ay = path[i].y || 0;
            const by = path[i + 1].y || 0;
            const segElev = ay + t * (by - ay);

            const entry = { i, t, px, pz, xzDistSq, segElev };

            if (xzDistSq < bestXZDist) {
                bestXZDist = xzDistSq;
                bestXZ = entry;
            }
            if (xzDistSq < nearThreshSq) {
                nearCandidates.push(entry);
            }
        }

        if (currentY !== undefined && currentY !== null && nearCandidates.length > 1) {
            // Only use Y-aware selection when candidates span a real elevation
            // gap (actual overlapping layers), not just adjacent road segments
            // on a gentle slope.
            let minElev = Infinity, maxElev = -Infinity;
            for (const c of nearCandidates) {
                if (c.segElev < minElev) minElev = c.segElev;
                if (c.segElev > maxElev) maxElev = c.segElev;
            }
            if (maxElev - minElev > 4.0) {
                let best = null;
                let bestScore = Infinity;
                for (const c of nearCandidates) {
                    const yDiff = Math.abs(c.segElev - currentY);
                    const xzDist = Math.sqrt(c.xzDistSq);
                    const score = yDiff * 2.0 + xzDist;
                    if (score < bestScore) {
                        bestScore = score;
                        best = c;
                    }
                }
                return best;
            }
        }

        return bestXZ;
    }

    getTrackElevation(x, z, currentY) {
        if (!this.splinePoints || this.splinePoints.length < 2) return 0;
        const seg = this._findClosestSegment(x, z, currentY);
        return seg ? seg.segElev : 0;
    }

    _buildWalls(track) {
        for (const wall of track.walls) {
            const geo = new THREE.BoxGeometry(wall.width || 1, wall.height || 2, wall.depth || 1);
            const mat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.7, roughness: 0.25 });
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
        const carbonMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.25, metalness: 0.8 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.1, metalness: 0.95 });
        const glowMat = new THREE.MeshStandardMaterial({
            color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.6, roughness: 0.2, metalness: 0.3,
        });
        const glowMatDim = new THREE.MeshStandardMaterial({
            color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.15, roughness: 0.3, metalness: 0.3,
        });

        track.checkpoints.forEach((cp, i) => {
            const group = new THREE.Group();
            const checkpointPosts = [];
            const checkpointLights = [];
            const checkpointStrips = [];

            let cpX = cp.x;
            let cpZ = cp.z;
            let cpAngle = cp.rotation;
            let cpY = 0;
            if (this.splineCurve) {
                let bestDist = Infinity;
                let bestT = 0;
                for (let t = 0; t <= 1; t += 0.005) {
                    const p = this.splineCurve.getPoint(t);
                    const d = (p.x - cp.x) ** 2 + (p.z - cp.z) ** 2;
                    if (d < bestDist) { bestDist = d; bestT = t; }
                }
                const nearest = this.splineCurve.getPoint(bestT);
                cpX = nearest.x;
                cpY = nearest.y;
                cpZ = nearest.z;
                const tang = this.splineCurve.getTangent(bestT);
                cpAngle = Math.atan2(tang.x, tang.z);
            }

            const railEdge = this.trackHalfWidth + 0.8;
            const pillarHalfSpan = railEdge + 0.3;
            const archH = 7.0;

            // Angular carbon pylons — tapered trapezoidal shape
            for (let side = -1; side <= 1; side += 2) {
                const pylonW = 0.5;
                const pylonD = 0.35;
                const pylonGeo = new THREE.BoxGeometry(pylonW, archH, pylonD);
                const pylon = new THREE.Mesh(pylonGeo, carbonMat);
                pylon.position.set(side * pillarHalfSpan, archH / 2, 0);
                pylon.castShadow = true;
                group.add(pylon);
                checkpointPosts.push(pylon);

                // Chrome base plate
                const baseGeo = new THREE.BoxGeometry(pylonW + 0.3, 0.12, pylonD + 0.3);
                const base = new THREE.Mesh(baseGeo, chromeMat);
                base.position.set(side * pillarHalfSpan, 0.06, 0);
                group.add(base);

                // Vertical LED strip on inner face
                const ledGeo = new THREE.BoxGeometry(0.06, archH * 0.85, 0.06);
                const led = new THREE.Mesh(ledGeo, glowMat);
                led.position.set(side * (pillarHalfSpan - pylonW / 2 - 0.01), archH * 0.48, 0);
                group.add(led);
                checkpointStrips.push(led);

                // Small horizontal LED ticks
                for (let ty = 1.5; ty < archH - 0.5; ty += 1.8) {
                    const tickGeo = new THREE.BoxGeometry(0.25, 0.04, 0.08);
                    const tick = new THREE.Mesh(tickGeo, glowMatDim);
                    tick.position.set(side * (pillarHalfSpan - 0.05), ty, pylonD / 2 + 0.01);
                    group.add(tick);
                }

                // Chrome cap on top
                const capGeo = new THREE.BoxGeometry(pylonW + 0.15, 0.15, pylonD + 0.15);
                const cap = new THREE.Mesh(capGeo, chromeMat);
                cap.position.set(side * pillarHalfSpan, archH + 0.07, 0);
                group.add(cap);
            }

            // Arch beam — curved carbon fiber with LED underline
            const archPeak = 2.0;
            const archPath = new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(-pillarHalfSpan, archH, 0),
                new THREE.Vector3(0, archH + archPeak, 0),
                new THREE.Vector3(pillarHalfSpan, archH, 0)
            );
            const archGeo = new THREE.TubeGeometry(archPath, 32, 0.22, 6, false);
            const arch = new THREE.Mesh(archGeo, carbonMat);
            arch.castShadow = true;
            group.add(arch);
            checkpointPosts.push(arch);

            // LED underside of the arch
            const ledPath = new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(-pillarHalfSpan + 0.8, archH - 0.18, 0),
                new THREE.Vector3(0, archH + archPeak - 0.18, 0),
                new THREE.Vector3(pillarHalfSpan - 0.8, archH - 0.18, 0)
            );
            const ledArchGeo = new THREE.TubeGeometry(ledPath, 32, 0.06, 4, false);
            const ledArch = new THREE.Mesh(ledArchGeo, glowMat);
            group.add(ledArch);
            checkpointStrips.push(ledArch);

            // Chrome accent ridge on top of arch
            const ridgePath = new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(-pillarHalfSpan + 0.3, archH + 0.22, 0),
                new THREE.Vector3(0, archH + archPeak + 0.22, 0),
                new THREE.Vector3(pillarHalfSpan - 0.3, archH + 0.22, 0)
            );
            const ridgeGeo = new THREE.TubeGeometry(ridgePath, 32, 0.05, 4, false);
            const ridge = new THREE.Mesh(ridgeGeo, chromeMat);
            group.add(ridge);

            // Cyan point light
            const lt = new THREE.PointLight(0x00e5ff, 0.5, 14, 2);
            lt.position.set(0, archH + archPeak + 0.5, 0);
            group.add(lt);
            checkpointLights.push(lt);

            group.position.set(cpX, cpY, cpZ);
            group.rotation.y = cpAngle;
            this.scene.add(group);
            this.trackObjects.push(group);
            this.checkpointMeshes.push({
                mesh: group,
                x: cpX,
                z: cpZ,
                width: cp.width,
                rotation: cpAngle,
                index: i,
                passed: false,
                posts: checkpointPosts,
                strips: checkpointStrips,
                lights: checkpointLights,
                pulseOffset: Math.random() * Math.PI * 2,
            });
        });
    }

    updateCheckpointEffects(timeSec, nextCheckpointIndex) {
        if (!this.checkpointMeshes || this.checkpointMeshes.length === 0) return;

        this.checkpointMeshes.forEach((cp) => {
            const isActive = !cp.passed && cp.index === nextCheckpointIndex;
            const pulse = 0.8 + 0.2 * Math.sin(timeSec * 5.0 + cp.pulseOffset);

            if (cp.strips) {
                const intensity = cp.passed ? 0.05 : (isActive ? 0.9 * pulse : 0.25);
                cp.strips.forEach((strip) => {
                    if (strip.material && strip.material.emissiveIntensity !== undefined) {
                        strip.material.emissiveIntensity = intensity;
                    }
                });
            }

            if (cp.lights) {
                const lightIntensity = cp.passed ? 0.1 : (isActive ? 0.7 * pulse : 0.3);
                cp.lights.forEach((light) => {
                    light.intensity = lightIntensity;
                    light.color.setHex(isActive ? 0x00e5ff : (cp.passed ? 0x113333 : 0x00a0b0));
                });
            }
        });
    }

    _buildFinishLine(track) {
        const fl = track.finishLine;
        const group = new THREE.Group();

        const railEdge = this.trackHalfWidth + 0.8;
        const finishHalfSpan = railEdge + 0.3;
        const finishWidth = finishHalfSpan * 2;
        const archH = 8.0;

        const carbonMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.15, metalness: 0.9 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.08, metalness: 0.95 });
        const cyanGlow = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.7, roughness: 0.2 });
        const whiteGlow = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.9, roughness: 0.2 });

        // Road start lights grid pattern
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, 256, 64);
        for (let x = 0; x < 32; x++) {
            for (let y = 0; y < 8; y++) {
                ctx.fillStyle = (x + y) % 2 === 0 ? '#00e5ff' : '#0a0a0a';
                ctx.globalAlpha = (x + y) % 2 === 0 ? 0.6 : 1.0;
                ctx.fillRect(x * 8, y * 8, 8, 8);
            }
        }
        ctx.globalAlpha = 1.0;
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        const lineGeo = new THREE.PlaneGeometry(finishWidth, 3);
        const lineMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const lineMesh = new THREE.Mesh(lineGeo, lineMat);
        lineMesh.rotation.x = -Math.PI / 2;
        lineMesh.position.y = 0.12;
        group.add(lineMesh);

        // Angular carbon pylons
        for (let side = -1; side <= 1; side += 2) {
            const pylonGeo = new THREE.BoxGeometry(0.65, archH, 0.5);
            const pylon = new THREE.Mesh(pylonGeo, carbonMat);
            pylon.position.set(side * finishHalfSpan, archH / 2, 0);
            pylon.castShadow = true;
            group.add(pylon);

            const baseGeo = new THREE.BoxGeometry(1.0, 0.15, 0.9);
            const base = new THREE.Mesh(baseGeo, chromeMat);
            base.position.set(side * finishHalfSpan, 0.075, 0);
            group.add(base);

            const capGeo = new THREE.BoxGeometry(0.75, 0.18, 0.6);
            const cap = new THREE.Mesh(capGeo, chromeMat);
            cap.position.set(side * finishHalfSpan, archH + 0.09, 0);
            group.add(cap);

            // Vertical LED strip on inner face
            const ledStripGeo = new THREE.BoxGeometry(0.06, archH * 0.9, 0.06);
            const ledStrip = new THREE.Mesh(ledStripGeo, cyanGlow);
            ledStrip.position.set(side * (finishHalfSpan - 0.33), archH * 0.48, 0.26);
            group.add(ledStrip);
            const ledStripBack = ledStrip.clone();
            ledStripBack.position.z = -0.26;
            group.add(ledStripBack);
        }

        // Top gantry beam — wide carbon crossbar
        const gantryGeo = new THREE.BoxGeometry(finishWidth + 1.0, 0.7, 0.7);
        const gantry = new THREE.Mesh(gantryGeo, carbonMat);
        gantry.position.set(0, archH + 0.35, 0);
        gantry.castShadow = true;
        group.add(gantry);

        // Chrome trim on gantry edges
        for (const yOff of [0.35, -0.35]) {
            const trimGeo = new THREE.BoxGeometry(finishWidth + 1.2, 0.04, 0.72);
            const trim = new THREE.Mesh(trimGeo, chromeMat);
            trim.position.set(0, archH + 0.35 + yOff, 0);
            group.add(trim);
        }

        // LED panels under gantry (F1-style start/DRS lights)
        for (let lx = -finishWidth / 2 + 1; lx <= finishWidth / 2 - 1; lx += 1.5) {
            const ledGeo = new THREE.BoxGeometry(0.9, 0.06, 0.35);
            const led = new THREE.Mesh(ledGeo, whiteGlow);
            led.position.set(lx, archH - 0.03, 0);
            group.add(led);
        }

        // Banner — dark futuristic style
        const bannerCanvas = document.createElement('canvas');
        bannerCanvas.width = 512;
        bannerCanvas.height = 128;
        const bCtx = bannerCanvas.getContext('2d');
        bCtx.fillStyle = '#0a0a12';
        bCtx.fillRect(0, 0, 512, 128);
        bCtx.fillStyle = '#00e5ff';
        bCtx.fillRect(0, 0, 512, 3);
        bCtx.fillRect(0, 125, 512, 3);
        bCtx.font = 'bold 52px sans-serif';
        bCtx.textAlign = 'center';
        bCtx.textBaseline = 'middle';
        bCtx.fillStyle = '#ffffff';
        bCtx.fillText('RUSH', 256, 44);
        bCtx.font = 'bold 24px sans-serif';
        bCtx.fillStyle = '#00e5ff';
        bCtx.fillText('F I N I S H', 256, 90);
        const bannerTex = new THREE.CanvasTexture(bannerCanvas);
        const bannerW = finishWidth * 0.75;
        const bannerH = 1.4;

        for (const zOff of [0.36, -0.36]) {
            const bannerGeo = new THREE.PlaneGeometry(bannerW, bannerH);
            const bannerMat = new THREE.MeshBasicMaterial({ map: bannerTex, side: THREE.DoubleSide });
            const banner = new THREE.Mesh(bannerGeo, bannerMat);
            banner.position.set(0, archH - 0.4, zOff);
            if (zOff < 0) banner.rotation.y = Math.PI;
            group.add(banner);
        }

        const light = new THREE.PointLight(0x00e5ff, 0.6, 18, 2);
        light.position.set(0, archH + 1.0, 0);
        group.add(light);

        let flX = fl.x, flY = 0, flZ = fl.z, flAngle = fl.rotation;
        if (this.splineCurve) {
            let bestDist = Infinity;
            let bestT = 0;
            for (let t = 0; t <= 1; t += 0.005) {
                const p = this.splineCurve.getPoint(t);
                const d = (p.x - fl.x) ** 2 + (p.z - fl.z) ** 2;
                if (d < bestDist) { bestDist = d; bestT = t; }
            }
            const nearest = this.splineCurve.getPoint(bestT);
            flX = nearest.x;
            flY = nearest.y;
            flZ = nearest.z;
            const tang = this.splineCurve.getTangent(bestT);
            flAngle = Math.atan2(tang.x, tang.z);
        }
        group.position.set(flX, flY, flZ);
        group.rotation.y = flAngle;
        this.scene.add(group);
        this.trackObjects.push(group);
    }

    _buildDecorations(track) {
        for (const dec of track.decorations) {
            let mesh;
            switch (dec.type) {
                case 'tree':       mesh = this._createTree(dec); break;
                case 'pine':       mesh = this._createPine(dec); break;
                case 'rock':       mesh = this._createRock(dec); break;
                case 'building':   mesh = this._createBuilding(dec); break;
                case 'cone':       mesh = this._createCone(dec); break;
                case 'mountain':   mesh = this._createMountain(dec); break;
                case 'bush':       mesh = this._createBush(dec); break;
                case 'lamppost':   mesh = this._createLampPost(dec); break;
                case 'barrier':    mesh = this._createBarrier(dec); break;
                case 'grandstand': mesh = this._createGrandstand(dec); break;
                case 'billboard':  mesh = this._createBillboard(dec); break;
                case 'fence':      mesh = this._createFence(dec); break;
                case 'pond':       mesh = this._createPond(dec); break;
                case 'log':        mesh = this._createLog(dec); break;
                case 'lightpylon': mesh = this._createLightPylon(dec); break;
                case 'neonring':   mesh = this._createNeonRing(dec); break;
                case 'neonarc':    mesh = this._createNeonArc(dec); break;
                case 'holotower':  mesh = this._createHoloTower(dec); break;
                default: continue;
            }
            if (mesh) {
                this.scene.add(mesh);
                this.trackObjects.push(mesh);
            }
        }
    }

    _createTree(dec) {
        const group = new THREE.Group();
        const scale = dec.s || (0.8 + Math.random() * 0.5);
        const trunkH = 3.2 * scale;
        const trunkGeo = new THREE.CylinderGeometry(0.25 * scale, 0.45 * scale, trunkH, 8);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6B3410, roughness: 0.95 });
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = trunkH / 2;
        trunk.castShadow = true;
        group.add(trunk);

        const leafHue = 0.28 + Math.random() * 0.08;
        const leafColor = new THREE.Color().setHSL(leafHue, 0.65, 0.25 + Math.random() * 0.1);
        const foliageMat = new THREE.MeshStandardMaterial({ color: leafColor, roughness: 0.85 });

        const layers = [
            { r: 2.8 * scale, h: 3.0 * scale, y: trunkH + 1.2 * scale },
            { r: 2.2 * scale, h: 2.6 * scale, y: trunkH + 3.0 * scale },
            { r: 1.4 * scale, h: 2.0 * scale, y: trunkH + 4.4 * scale },
        ];
        for (const l of layers) {
            const geo = new THREE.SphereGeometry(l.r, 7, 5);
            geo.scale(1, l.h / (l.r * 2), 1);
            const m = new THREE.Mesh(geo, foliageMat);
            m.position.y = l.y;
            m.castShadow = true;
            group.add(m);
        }

        group.position.set(dec.x, 0, dec.z);
        group.rotation.y = Math.random() * Math.PI * 2;
        return group;
    }

    _createRock(dec) {
        const group = new THREE.Group();
        const count = dec.n || (2 + Math.floor(Math.random() * 3));
        for (let i = 0; i < count; i++) {
            const size = 0.8 + Math.random() * 1.8;
            const detail = Math.random() > 0.5 ? 1 : 0;
            const geo = Math.random() > 0.4
                ? new THREE.DodecahedronGeometry(size, detail)
                : new THREE.IcosahedronGeometry(size, detail);
            geo.scale(1, 0.6 + Math.random() * 0.5, 0.8 + Math.random() * 0.4);
            const lightness = 0.35 + Math.random() * 0.2;
            const mat = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0.08, 0.05, lightness),
                roughness: 0.92,
                metalness: 0.02,
            });
            const mesh = new THREE.Mesh(geo, mat);
            const spread = count > 1 ? 2.5 : 0;
            mesh.position.set(
                (Math.random() - 0.5) * spread,
                size * 0.35,
                (Math.random() - 0.5) * spread,
            );
            mesh.rotation.set(Math.random() * 0.4, Math.random() * Math.PI, Math.random() * 0.3);
            mesh.castShadow = true;
            group.add(mesh);
        }
        group.position.set(dec.x, 0, dec.z);
        return group;
    }

    _createBuilding(dec) {
        const h = dec.h || 15;
        const w = 8 + Math.random() * 4;
        const d = 8 + Math.random() * 4;
        const group = new THREE.Group();

        const bodyColor = new THREE.Color().setHSL(0.58 + Math.random() * 0.1, 0.03, 0.06 + Math.random() * 0.04);
        const geo = new THREE.BoxGeometry(w, h, d);
        const mat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.3, metalness: 0.6 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = h / 2;
        mesh.castShadow = true;
        group.add(mesh);

        const trimGeo = new THREE.BoxGeometry(w + 0.2, 0.15, d + 0.2);
        const trimMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.15, metalness: 0.8 });
        for (const ty of [0.075, h]) {
            const trim = new THREE.Mesh(trimGeo, trimMat);
            trim.position.y = ty;
            group.add(trim);
        }

        const roofGeo = new THREE.BoxGeometry(w * 0.3, 1.5, d * 0.3);
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.2, metalness: 0.8 });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = h + 0.75;
        roof.castShadow = true;
        group.add(roof);

        const cyanWin = 0x00c8e0;
        const warmWin = 0xffe8a0;
        const addWindowRow = (faceAxis, offset, faceW) => {
            for (let wy = 2.5; wy < h - 1.5; wy += 3) {
                for (let wx = -faceW / 2 + 1.5; wx < faceW / 2 - 1; wx += 2.2) {
                    const lit = Math.random() > 0.35;
                    const winGeo = new THREE.PlaneGeometry(0.9, 1.4);
                    const color = lit ? (Math.random() > 0.4 ? cyanWin : warmWin) : 0x060608;
                    const winMat = new THREE.MeshBasicMaterial({ color });
                    const win = new THREE.Mesh(winGeo, winMat);
                    if (faceAxis === 'z') {
                        win.position.set(wx, wy, offset);
                        if (offset < 0) win.rotation.y = Math.PI;
                    } else {
                        win.position.set(offset, wy, wx);
                        win.rotation.y = offset > 0 ? Math.PI / 2 : -Math.PI / 2;
                    }
                    group.add(win);
                }
            }
        };
        addWindowRow('z', d / 2 + 0.01, w);
        addWindowRow('z', -d / 2 - 0.01, w);
        addWindowRow('x', w / 2 + 0.01, d);
        addWindowRow('x', -w / 2 - 0.01, d);

        group.position.set(dec.x, 0, dec.z);
        return group;
    }

    _createCone(dec) {
        const group = new THREE.Group();
        const baseGeo = new THREE.BoxGeometry(0.6, 0.06, 0.6);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.8 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 0.03;
        group.add(base);
        const coneGeo = new THREE.ConeGeometry(0.28, 0.75, 8);
        const coneMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.15, roughness: 0.3 });
        const cone = new THREE.Mesh(coneGeo, coneMat);
        cone.position.y = 0.46;
        cone.castShadow = true;
        group.add(cone);
        const stripeGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.08, 8);
        const stripeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.2, roughness: 0.2 });
        const stripe = new THREE.Mesh(stripeGeo, stripeMat);
        stripe.position.y = 0.52;
        group.add(stripe);
        group.position.set(dec.x, 0, dec.z);
        return group;
    }

    _createMountain(dec) {
        const h = dec.h || 25;
        const group = new THREE.Group();

        const baseR = h * 0.85;
        const baseGeo = new THREE.ConeGeometry(baseR, h, 7, 1);
        const posAttr = baseGeo.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
            const y = posAttr.getY(i);
            if (y < h * 0.45) {
                posAttr.setX(i, posAttr.getX(i) + (Math.random() - 0.5) * h * 0.08);
                posAttr.setZ(i, posAttr.getZ(i) + (Math.random() - 0.5) * h * 0.08);
            }
        }
        baseGeo.computeVertexNormals();
        const baseMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0.3, 0.15, 0.28 + Math.random() * 0.08),
            roughness: 0.95,
        });
        const baseMesh = new THREE.Mesh(baseGeo, baseMat);
        baseMesh.position.y = h / 2;
        baseMesh.castShadow = true;
        group.add(baseMesh);

        const snowH = h * 0.28;
        const snowR = baseR * 0.32;
        const snowGeo = new THREE.ConeGeometry(snowR, snowH, 7, 1);
        const snowMat = new THREE.MeshStandardMaterial({
            color: 0xeef4f8,
            roughness: 0.7,
            metalness: 0.05,
        });
        const snow = new THREE.Mesh(snowGeo, snowMat);
        snow.position.y = h - snowH / 2 + 0.1;
        group.add(snow);

        const footR = baseR * 1.15;
        const footGeo = new THREE.CylinderGeometry(footR, footR * 1.1, h * 0.12, 8);
        const footMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0.28, 0.2, 0.22),
            roughness: 1,
        });
        const foot = new THREE.Mesh(footGeo, footMat);
        foot.position.y = h * 0.06;
        group.add(foot);

        group.position.set(dec.x, 0, dec.z);
        return group;
    }

    _createPine(dec) {
        const group = new THREE.Group();
        const scale = dec.s || (0.7 + Math.random() * 0.6);
        const trunkH = 4.0 * scale;
        const trunkGeo = new THREE.CylinderGeometry(0.18 * scale, 0.35 * scale, trunkH, 6);
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3a1a, roughness: 0.95 });
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = trunkH / 2;
        trunk.castShadow = true;
        group.add(trunk);

        const pineColor = new THREE.Color().setHSL(0.32, 0.55, 0.18 + Math.random() * 0.06);
        const pineMat = new THREE.MeshStandardMaterial({ color: pineColor, roughness: 0.9 });
        const tiers = [
            { r: 2.8 * scale, h: 3.5 * scale, y: trunkH },
            { r: 2.2 * scale, h: 3.0 * scale, y: trunkH + 2.2 * scale },
            { r: 1.5 * scale, h: 2.5 * scale, y: trunkH + 4.0 * scale },
            { r: 0.8 * scale, h: 2.0 * scale, y: trunkH + 5.4 * scale },
        ];
        for (const t of tiers) {
            const geo = new THREE.ConeGeometry(t.r, t.h, 7);
            const m = new THREE.Mesh(geo, pineMat);
            m.position.y = t.y + t.h / 2;
            m.castShadow = true;
            group.add(m);
        }
        group.position.set(dec.x, 0, dec.z);
        group.rotation.y = Math.random() * Math.PI * 2;
        return group;
    }

    _createBush(dec) {
        const group = new THREE.Group();
        const scale = dec.s || (0.6 + Math.random() * 0.5);
        const hue = 0.27 + Math.random() * 0.09;
        const bushMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(hue, 0.55, 0.22 + Math.random() * 0.08),
            roughness: 0.9,
        });
        const count = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
            const r = (0.6 + Math.random() * 0.8) * scale;
            const geo = new THREE.SphereGeometry(r, 6, 5);
            geo.scale(1, 0.65, 1);
            const m = new THREE.Mesh(geo, bushMat);
            m.position.set(
                (Math.random() - 0.5) * 1.6 * scale,
                r * 0.45,
                (Math.random() - 0.5) * 1.6 * scale,
            );
            m.castShadow = true;
            group.add(m);
        }
        group.position.set(dec.x, 0, dec.z);
        return group;
    }

    _createLampPost(dec) {
        const group = new THREE.Group();
        const h = dec.h || 8;
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.85, roughness: 0.15 });
        const ledMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.6, roughness: 0.2 });

        const poleGeo = new THREE.CylinderGeometry(0.1, 0.14, h, 6);
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.y = h / 2;
        pole.castShadow = true;
        group.add(pole);

        const baseGeo = new THREE.BoxGeometry(0.6, 0.15, 0.6);
        const base = new THREE.Mesh(baseGeo, poleMat);
        base.position.y = 0.075;
        group.add(base);

        // Angular arm
        const armGeo = new THREE.BoxGeometry(2.2, 0.08, 0.08);
        const arm = new THREE.Mesh(armGeo, poleMat);
        arm.position.set(1.0, h - 0.08, 0);
        group.add(arm);

        // LED flood panel
        const lampGeo = new THREE.BoxGeometry(1.8, 0.12, 0.5);
        const lamp = new THREE.Mesh(lampGeo, ledMat);
        lamp.position.set(1.0, h - 0.22, 0);
        group.add(lamp);

        const light = new THREE.PointLight(0x00e5ff, 0.3, 12, 2);
        light.position.set(1.0, h - 0.4, 0);
        group.add(light);

        group.position.set(dec.x, 0, dec.z);
        if (dec.rot !== undefined) group.rotation.y = dec.rot;
        return group;
    }

    _createBarrier(dec) {
        const group = new THREE.Group();
        const len = dec.len || 4;
        const barrierMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2, metalness: 0.8 });
        const stripeMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.3, roughness: 0.3 });

        const mainGeo = new THREE.BoxGeometry(len, 1.2, 0.5);
        const main = new THREE.Mesh(mainGeo, barrierMat);
        main.position.y = 0.6;
        main.castShadow = true;
        group.add(main);

        const stripeGeo = new THREE.BoxGeometry(len + 0.02, 0.06, 0.52);
        const stripe = new THREE.Mesh(stripeGeo, stripeMat);
        stripe.position.y = 1.0;
        group.add(stripe);

        group.position.set(dec.x, 0, dec.z);
        if (dec.rot !== undefined) group.rotation.y = dec.rot;
        return group;
    }

    _createGrandstand(dec) {
        const group = new THREE.Group();
        const w = dec.w || 20;
        const rows = dec.rows || 5;
        const standMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.25, metalness: 0.7 });
        const seatMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.5 });
        const accentMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.15, roughness: 0.3 });

        for (let r = 0; r < rows; r++) {
            const stepGeo = new THREE.BoxGeometry(w, 0.4, 1.5);
            const step = new THREE.Mesh(stepGeo, standMat);
            step.position.set(0, r * 1.2 + 0.2, r * 1.6);
            step.receiveShadow = true;
            group.add(step);

            for (let s = -w / 2 + 0.5; s < w / 2; s += 1.0) {
                const seatGeo = new THREE.BoxGeometry(0.6, 0.8, 0.3);
                const seat = new THREE.Mesh(seatGeo, seatMat);
                seat.position.set(s, r * 1.2 + 0.8, r * 1.6 - 0.4);
                group.add(seat);
            }
        }

        const roofGeo = new THREE.BoxGeometry(w + 2, 0.15, rows * 1.6 + 3);
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.15, metalness: 0.85 });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.set(0, rows * 1.2 + 2.5, rows * 0.8);
        roof.castShadow = true;
        group.add(roof);

        // LED accent strip on roof edge
        const ledGeo = new THREE.BoxGeometry(w + 2.2, 0.04, 0.15);
        const led = new THREE.Mesh(ledGeo, accentMat);
        led.position.set(0, rows * 1.2 + 2.58, rows * 0.8 - (rows * 1.6 + 3) / 2);
        group.add(led);

        for (let side = -1; side <= 1; side += 2) {
            const pillarGeo = new THREE.BoxGeometry(0.3, rows * 1.2 + 2.5, 0.3);
            const pillar = new THREE.Mesh(pillarGeo, standMat);
            pillar.position.set(side * (w / 2 + 0.5), (rows * 1.2 + 2.5) / 2, rows * 1.6);
            pillar.castShadow = true;
            group.add(pillar);
        }

        group.position.set(dec.x, 0, dec.z);
        if (dec.rot !== undefined) group.rotation.y = dec.rot;
        return group;
    }

    _createBillboard(dec) {
        const group = new THREE.Group();
        const h = dec.h || 8;
        const w = dec.w || 6;
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.85, roughness: 0.15 });

        for (let side = -1; side <= 1; side += 2) {
            const poleGeo = new THREE.BoxGeometry(0.2, h, 0.2);
            const pole = new THREE.Mesh(poleGeo, poleMat);
            pole.position.set(side * (w / 2 - 0.5), h / 2, 0);
            pole.castShadow = true;
            group.add(pole);
        }

        const sponsors = [
            { name: 'APEX MOTORS', sub: 'Performance Engines', bg: '#0a0a12', fg: '#ffffff', accent: '#00e5ff' },
            { name: 'TURBOMAX', sub: 'Turbochargers', bg: '#0a0a12', fg: '#4fc3f7', accent: '#00e5ff' },
            { name: 'GRIP TIRES', sub: 'Track Compound', bg: '#0a0a12', fg: '#ff3d00', accent: '#ff6e40' },
            { name: 'NITRO FUEL', sub: 'High Octane', bg: '#0a0a12', fg: '#00e676', accent: '#69f0ae' },
            { name: 'SPEEDTECH', sub: 'Aero Solutions', bg: '#0a0a12', fg: '#ffffff', accent: '#e040fb' },
            { name: 'VORTEX OIL', sub: 'Synthetic Racing', bg: '#0a0a12', fg: '#29b6f6', accent: '#00e5ff' },
            { name: 'DYNAMO', sub: 'Electric Power', bg: '#0a0a12', fg: '#e040fb', accent: '#7c4dff' },
            { name: 'RUSH ENERGY', sub: 'Fuel Your Drive', bg: '#0a0a12', fg: '#ff9100', accent: '#ffd740' },
        ];
        const sp = sponsors[Math.floor(Math.random() * sponsors.length)];

        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = sp.bg;
        ctx.fillRect(0, 0, 512, 256);

        ctx.fillStyle = sp.accent;
        ctx.fillRect(0, 0, 512, 2);
        ctx.fillRect(0, 254, 512, 2);
        ctx.fillRect(0, 0, 2, 256);
        ctx.fillRect(510, 0, 2, 256);

        ctx.fillStyle = sp.fg;
        ctx.font = 'bold 64px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sp.name, 256, 100);

        ctx.fillStyle = sp.accent;
        ctx.fillRect(120, 140, 272, 1);

        ctx.fillStyle = sp.accent;
        ctx.font = '28px sans-serif';
        ctx.fillText(sp.sub, 256, 175);

        const tex = new THREE.CanvasTexture(canvas);
        const boardGeo = new THREE.BoxGeometry(w, w * 0.5, 0.15);
        const boardMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.2, metalness: 0.3, emissive: 0x111111, emissiveIntensity: 0.2 });
        const board = new THREE.Mesh(boardGeo, boardMat);
        board.position.set(0, h - w * 0.25, 0);
        board.castShadow = true;
        group.add(board);

        const frameMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.85, roughness: 0.15 });
        const topGeo = new THREE.BoxGeometry(w + 0.3, 0.18, 0.35);
        const top = new THREE.Mesh(topGeo, frameMat);
        top.position.set(0, h, 0);
        group.add(top);
        const botGeo = new THREE.BoxGeometry(w + 0.3, 0.18, 0.35);
        const bot = new THREE.Mesh(botGeo, frameMat);
        bot.position.set(0, h - w * 0.5, 0);
        group.add(bot);
        for (let side = -1; side <= 1; side += 2) {
            const sideGeo = new THREE.BoxGeometry(0.18, w * 0.5 + 0.36, 0.35);
            const sideFrame = new THREE.Mesh(sideGeo, frameMat);
            sideFrame.position.set(side * w / 2 + side * 0.09, h - w * 0.25, 0);
            group.add(sideFrame);
        }

        group.position.set(dec.x, 0, dec.z);
        if (dec.rot !== undefined) group.rotation.y = dec.rot;
        return group;
    }

    _createFence(dec) {
        const group = new THREE.Group();
        const len = dec.len || 10;
        const h = dec.h || 1.2;
        const postCount = Math.ceil(len / 2) + 1;
        const postMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.2 });
        const railMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7, roughness: 0.25 });

        for (let i = 0; i < postCount; i++) {
            const px = i * (len / (postCount - 1)) - len / 2;
            const pGeo = new THREE.BoxGeometry(0.12, h + 0.2, 0.12);
            const post = new THREE.Mesh(pGeo, postMat);
            post.position.set(px, (h + 0.2) / 2, 0);
            post.castShadow = true;
            group.add(post);
        }
        for (const ry of [h * 0.35, h * 0.75]) {
            const railGeo = new THREE.BoxGeometry(len, 0.06, 0.06);
            const rail = new THREE.Mesh(railGeo, railMat);
            rail.position.set(0, ry, 0);
            group.add(rail);
        }

        group.position.set(dec.x, 0, dec.z);
        if (dec.rot !== undefined) group.rotation.y = dec.rot;
        return group;
    }

    _createPond(dec) {
        const group = new THREE.Group();
        const r = dec.r || 5;
        const waterGeo = new THREE.CircleGeometry(r, 24);
        const waterMat = new THREE.MeshStandardMaterial({
            color: 0x2266aa,
            roughness: 0.15,
            metalness: 0.4,
            transparent: true,
            opacity: 0.8,
        });
        const water = new THREE.Mesh(waterGeo, waterMat);
        water.rotation.x = -Math.PI / 2;
        water.position.y = 0.02;
        group.add(water);

        const edgeMat = new THREE.MeshStandardMaterial({ color: 0x6a6a5a, roughness: 0.9 });
        const edgeCount = 12 + Math.floor(Math.random() * 6);
        for (let i = 0; i < edgeCount; i++) {
            const angle = (i / edgeCount) * Math.PI * 2;
            const dist = r * (0.9 + Math.random() * 0.2);
            const sz = 0.3 + Math.random() * 0.4;
            const geo = new THREE.SphereGeometry(sz, 5, 4);
            geo.scale(1, 0.5, 1);
            const stone = new THREE.Mesh(geo, edgeMat);
            stone.position.set(Math.cos(angle) * dist, sz * 0.2, Math.sin(angle) * dist);
            group.add(stone);
        }

        group.position.set(dec.x, 0, dec.z);
        return group;
    }

    _createLog(dec) {
        const group = new THREE.Group();
        const len = dec.len || 3;
        const r = 0.25 + Math.random() * 0.15;
        const logGeo = new THREE.CylinderGeometry(r, r * 1.1, len, 8);
        const logMat = new THREE.MeshStandardMaterial({ color: 0x6B4226, roughness: 0.9 });
        const log = new THREE.Mesh(logGeo, logMat);
        log.rotation.z = Math.PI / 2;
        log.position.y = r;
        log.castShadow = true;
        group.add(log);

        const ringMat = new THREE.MeshStandardMaterial({ color: 0x8B6914, roughness: 0.85 });
        const endGeo = new THREE.CircleGeometry(r, 8);
        for (let side = -1; side <= 1; side += 2) {
            const end = new THREE.Mesh(endGeo, ringMat);
            end.position.set(side * len / 2, r, 0);
            end.rotation.y = side * Math.PI / 2;
            group.add(end);
        }

        group.position.set(dec.x, 0, dec.z);
        if (dec.rot !== undefined) group.rotation.y = dec.rot;
        return group;
    }

    _createLightPylon(dec) {
        const group = new THREE.Group();
        const h = dec.h || 10;
        const pylonMat = new THREE.MeshStandardMaterial({ color: 0x050510, roughness: 0.12, metalness: 0.92 });
        const isCyan = Math.random() > 0.35;
        const glowColor = isCyan ? 0x00e5ff : 0xe040fb;
        const glowMat = new THREE.MeshStandardMaterial({ color: glowColor, emissive: glowColor, emissiveIntensity: 0.7, roughness: 0.2 });

        const col = new THREE.Mesh(new THREE.BoxGeometry(0.18, h, 0.18), pylonMat);
        col.position.y = h / 2;
        col.castShadow = true;
        group.add(col);

        const ledStrip = new THREE.Mesh(new THREE.BoxGeometry(0.06, h * 0.85, 0.06), glowMat);
        ledStrip.position.y = h * 0.46;
        group.add(ledStrip);

        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.5), glowMat);
        cap.position.y = h;
        group.add(cap);

        const base = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.6), pylonMat);
        base.position.y = 0.05;
        group.add(base);

        const lt = new THREE.PointLight(glowColor, 0.25, 14, 2);
        lt.position.y = h + 0.3;
        group.add(lt);

        group.position.set(dec.x, 0, dec.z);
        if (dec.rot !== undefined) group.rotation.y = dec.rot;
        return group;
    }

    _createNeonRing(dec) {
        const group = new THREE.Group();
        const r = dec.r || (1.2 + Math.random() * 1.5);
        const isCyan = Math.random() > 0.4;
        const glowColor = isCyan ? 0x00e5ff : 0xe040fb;
        const glowMat = new THREE.MeshStandardMaterial({ color: glowColor, emissive: glowColor, emissiveIntensity: 0.8, roughness: 0.15, transparent: true, opacity: 0.9 });

        const ringGeo = new THREE.TorusGeometry(r, 0.04, 8, 32);
        const ring = new THREE.Mesh(ringGeo, glowMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 1.5 + Math.random() * 4;
        group.add(ring);

        if (Math.random() > 0.5) {
            const r2 = r * 0.65;
            const ring2Geo = new THREE.TorusGeometry(r2, 0.03, 6, 24);
            const ring2Mat = new THREE.MeshStandardMaterial({
                color: isCyan ? 0xe040fb : 0x00e5ff,
                emissive: isCyan ? 0xe040fb : 0x00e5ff,
                emissiveIntensity: 0.5, roughness: 0.2, transparent: true, opacity: 0.7,
            });
            const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
            ring2.rotation.x = Math.PI / 2;
            ring2.rotation.z = 0.3;
            ring2.position.y = ring.position.y + 0.6;
            group.add(ring2);
        }

        group.position.set(dec.x, 0, dec.z);
        return group;
    }

    _createNeonArc(dec) {
        const group = new THREE.Group();
        const span = dec.span || 8;
        const arcH = dec.arcH || 6;
        const isCyan = Math.random() > 0.3;
        const glowColor = isCyan ? 0x00e5ff : 0xe040fb;
        const pylonMat = new THREE.MeshStandardMaterial({ color: 0x050510, roughness: 0.12, metalness: 0.92 });
        const glowMat = new THREE.MeshStandardMaterial({ color: glowColor, emissive: glowColor, emissiveIntensity: 0.6, roughness: 0.2 });

        for (let side = -1; side <= 1; side += 2) {
            const col = new THREE.Mesh(new THREE.BoxGeometry(0.15, arcH, 0.15), pylonMat);
            col.position.set(side * span / 2, arcH / 2, 0);
            group.add(col);
        }

        const arcPath = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(-span / 2, arcH, 0),
            new THREE.Vector3(0, arcH + 3, 0),
            new THREE.Vector3(span / 2, arcH, 0)
        );
        const arcGeo = new THREE.TubeGeometry(arcPath, 24, 0.05, 6, false);
        const arc = new THREE.Mesh(arcGeo, glowMat);
        group.add(arc);

        const lt = new THREE.PointLight(glowColor, 0.2, 12, 2);
        lt.position.set(0, arcH + 3.5, 0);
        group.add(lt);

        group.position.set(dec.x, 0, dec.z);
        if (dec.rot !== undefined) group.rotation.y = dec.rot;
        return group;
    }

    _createHoloTower(dec) {
        const group = new THREE.Group();
        const h = dec.h || 15;
        const pylonMat = new THREE.MeshStandardMaterial({ color: 0x050510, roughness: 0.12, metalness: 0.92 });
        const cyanGlow = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.6, roughness: 0.2 });
        const magGlow = new THREE.MeshStandardMaterial({ color: 0xe040fb, emissive: 0xe040fb, emissiveIntensity: 0.5, roughness: 0.2 });

        const baseW = 1.2;
        const baseGeo = new THREE.BoxGeometry(baseW, 0.3, baseW);
        const base = new THREE.Mesh(baseGeo, pylonMat);
        base.position.y = 0.15;
        group.add(base);

        const col = new THREE.Mesh(new THREE.BoxGeometry(0.3, h, 0.3), pylonMat);
        col.position.y = h / 2;
        col.castShadow = true;
        group.add(col);

        for (let i = 0; i < 4; i++) {
            const ledH = h * 0.18;
            const ledY = h * 0.2 + i * (h * 0.2);
            const ledGeo = new THREE.BoxGeometry(0.06, ledH, 0.06);
            const led = new THREE.Mesh(ledGeo, i % 2 === 0 ? cyanGlow : magGlow);
            led.position.set((i % 2 === 0 ? 0.18 : -0.18), ledY, (i < 2 ? 0.18 : -0.18));
            group.add(led);
        }

        // Holo disc at top
        const discGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.04, 24);
        const discMat = new THREE.MeshStandardMaterial({
            color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.3,
            roughness: 0.2, transparent: true, opacity: 0.25,
        });
        const disc = new THREE.Mesh(discGeo, discMat);
        disc.position.y = h + 0.5;
        group.add(disc);

        // Rotating rings at top
        for (let r = 0; r < 2; r++) {
            const ringGeo = new THREE.TorusGeometry(1.0 + r * 0.6, 0.03, 6, 24);
            const ring = new THREE.Mesh(ringGeo, r === 0 ? cyanGlow : magGlow);
            ring.position.y = h + 0.5 + r * 0.4;
            ring.rotation.x = Math.PI / 2;
            ring.rotation.z = r * 0.5;
            group.add(ring);
        }

        const lt = new THREE.PointLight(0x00e5ff, 0.4, 20, 2);
        lt.position.y = h + 1;
        group.add(lt);

        const baseLt = new THREE.PointLight(0xe040fb, 0.15, 8, 2);
        baseLt.position.y = 1;
        group.add(baseLt);

        group.position.set(dec.x, 0, dec.z);
        if (dec.rot !== undefined) group.rotation.y = dec.rot;
        return group;
    }

    _setupLights(track) {
        const oldLights = this.scene.children.filter(c => c.isLight);
        oldLights.forEach(l => this.scene.remove(l));

        const ambient = new THREE.AmbientLight(track.ambientLight, 1.6);
        this.scene.add(ambient);
        this.trackObjects.push(ambient);

        const hemi = new THREE.HemisphereLight(0x1a3050, track.groundColor, 1.0);
        this.scene.add(hemi);
        this.trackObjects.push(hemi);

        const sun = new THREE.DirectionalLight(track.sunColor, 1.4);
        sun.position.set(track.sunPosition.x, track.sunPosition.y, track.sunPosition.z);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 2048;
        sun.shadow.mapSize.height = 2048;
        sun.shadow.bias = -0.0003;
        sun.shadow.normalBias = 0.04;
        sun.shadow.camera.near = 10;
        sun.shadow.camera.far = 500;
        sun.shadow.camera.left = -200;
        sun.shadow.camera.right = 200;
        sun.shadow.camera.top = 200;
        sun.shadow.camera.bottom = -200;
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
        if (this._pondMat) { this._pondMat.dispose(); this._pondMat = null; }
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
    getTrackDirection(x, z, currentY) {
        if (!this.trackPath || this.trackPath.length < 2) return { dx: 0, dz: 1, segIndex: 0 };

        const seg = this._findClosestSegment(x, z, currentY);
        const bestIdx = seg ? seg.i : 0;

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
        const cy = body.position._y;
        const cz = body.position._z;
        const carHalfWidth = body.shape?.children?.[0]?.shape?.halfExtents?._x || 0.9;
        const boundaryPadding = Math.max(0.8, carHalfWidth + 0.35);
        const maxDist = Math.max(1.0, this.trackHalfWidth - boundaryPadding);

        // Use elevation-aware segment finder to handle overlapping layers
        const seg = this._findClosestSegment(cx, cz, cy);
        if (!seg) return false;

        const nearestX = seg.px;
        const nearestZ = seg.pz;
        let minDist = Math.sqrt(seg.xzDistSq);

        if (minDist > maxDist) {
            const pushDirX = (nearestX - cx);
            const pushDirZ = (nearestZ - cz);
            const pushLen = Math.sqrt(pushDirX * pushDirX + pushDirZ * pushDirZ);

            if (pushLen > 0.001) {
                const nx = pushDirX / pushLen;
                const nz = pushDirZ / pushLen;

                const overshoot = minDist - maxDist;
                const correction = overshoot + 0.03;
                body.position._x += nx * correction;
                body.position._z += nz * correction;

                const vDotN = body.velocity._x * nx + body.velocity._z * nz;
                const tangentX = body.velocity._x - vDotN * nx;
                const tangentZ = body.velocity._z - vDotN * nz;

                const tangentialDamping = 0.996;
                const slideX = tangentX * tangentialDamping;
                const slideZ = tangentZ * tangentialDamping;

                let inwardVel;
                if (vDotN < 0) {
                    inwardVel = Math.max(0.6, Math.min(2.2, -vDotN * 0.08));
                } else {
                    inwardVel = Math.min(vDotN, 4.0);
                }

                body.velocity._x = slideX + nx * inwardVel;
                body.velocity._z = slideZ + nz * inwardVel;
            }
            return true;
        }
        return false;
    }
}

window.TRACK_DATA = TRACK_DATA;
window.TrackBuilder = TrackBuilder;
