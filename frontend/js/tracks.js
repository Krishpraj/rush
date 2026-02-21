/**
 * Track definitions for the racing game
 * Each track defines: road segments, checkpoints, start position, walls, and decorations
 */

const TRACK_DATA = {

    // ===== TRACK 1: SPEED LOOP (Large circuit with elevation) =====
    track_1: {
        name: "Speed Loop",
        difficulty: "Easy",
        laps: 3,
        startPosition: { x: 0, y: 0.5, z: -100 },
        startRotation: Math.PI,
        controlPoints: [
            { x: 0, y: 0, z: -100 },        // Start/finish zone
            { x: 0, y: 0, z: -260 },         // Long main straight
            { x: 100, y: 0, z: -380 },       // Turn 1: fast sweeping right
            { x: 280, y: 0, z: -420 },       // Short straight
            { x: 420, y: 8, z: -380 },       // Climbing, gentle bend
            { x: 500, y: 18, z: -280 },      // Turn 2: right bend, hilltop approach
            { x: 500, y: 22, z: -140 },      // Hilltop straight
            { x: 460, y: 16, z: -40 },       // Turn 3: descent begins
            { x: 360, y: 4, z: 20 },         // Fast downhill
            { x: 260, y: 0, z: 0 },          // Turn 4: left hairpin entry
            { x: 220, y: 0, z: -80 },        // Hairpin exit
            { x: 160, y: 3, z: -20 },        // S-curve 1
            { x: 100, y: 6, z: -100 },       // S-curve 2
            { x: 40, y: 4, z: -10 },         // Left sweeper
            { x: -20, y: 1, z: 60 },         // Sweeper exit
            { x: -30, y: 0, z: -20 },        // Final turn back to start
        ],
        roadWidth: 20,
        splineSamples: 400,
        ramps: [],
        checkpoints: [
            { x: 0, z: -180, width: 20, rotation: 0 },
            { x: 190, z: -400, width: 20, rotation: Math.PI / 2 },
            { x: 460, z: -330, width: 20, rotation: Math.PI / 4 },
            { x: 500, z: -140, width: 20, rotation: 0 },
            { x: 410, z: -10, width: 20, rotation: Math.PI / 4 },
            { x: 240, z: -40, width: 20, rotation: 0 },
            { x: 130, z: -60, width: 20, rotation: Math.PI / 4 },
            { x: -10, z: 20, width: 20, rotation: 0 },
        ],
        finishLine: { x: 0, z: -90, width: 20, rotation: 0 },
        walls: [],
        decorations: [
            // Main straight - dense tree line both sides
            { type: 'tree', x: -30, z: -120 },
            { type: 'tree', x: -32, z: -160 },
            { type: 'tree', x: -28, z: -200 },
            { type: 'tree', x: -30, z: -240 },
            { type: 'pine', x: -38, z: -140 },
            { type: 'pine', x: -36, z: -220 },
            { type: 'bush', x: -22, z: -150 },
            { type: 'bush', x: -22, z: -210 },
            { type: 'tree', x: 30, z: -130 },
            { type: 'tree', x: 32, z: -180 },
            { type: 'tree', x: 28, z: -230 },
            { type: 'pine', x: 38, z: -160 },
            { type: 'bush', x: 22, z: -170 },
            { type: 'bush', x: 22, z: -240 },
            // Grandstand near start/finish
            { type: 'grandstand', x: -40, z: -80, rot: Math.PI / 2, w: 16, rows: 4, color: 0x2255cc },
            { type: 'billboard', x: 30, z: -70, rot: -Math.PI / 2 },
            { type: 'lamppost', x: -18, z: -100 },
            { type: 'lamppost', x: -18, z: -180 },
            { type: 'lamppost', x: -18, z: -260 },
            // Turn 1 area
            { type: 'tree', x: 50, z: -420 },
            { type: 'tree', x: 150, z: -450 },
            { type: 'pine', x: 30, z: -400 },
            { type: 'pine', x: 80, z: -440 },
            { type: 'rock', x: 200, z: -455 },
            { type: 'rock', x: 130, z: -460 },
            { type: 'bush', x: 60, z: -410 },
            { type: 'bush', x: 120, z: -445 },
            { type: 'fence', x: 50, z: -455, rot: 0, len: 12 },
            // Hillside - lush mixed forest
            { type: 'tree', x: 540, z: -320 },
            { type: 'tree', x: 540, z: -240 },
            { type: 'tree', x: 540, z: -160 },
            { type: 'pine', x: 550, z: -280 },
            { type: 'pine', x: 545, z: -200 },
            { type: 'pine', x: 535, z: -360 },
            { type: 'tree', x: 450, z: -320 },
            { type: 'tree', x: 450, z: -260 },
            { type: 'bush', x: 530, z: -300 },
            { type: 'bush', x: 530, z: -220 },
            { type: 'bush', x: 530, z: -180 },
            { type: 'log', x: 535, z: -250, rot: 0.3 },
            // Mountains - grander backdrop
            { type: 'mountain', x: 600, z: -180, h: 42 },
            { type: 'mountain', x: 580, z: -380, h: 32 },
            { type: 'mountain', x: 640, z: -300, h: 28 },
            { type: 'mountain', x: -120, z: -400, h: 36 },
            { type: 'mountain', x: -80, z: -300, h: 22 },
            // Pond in the infield
            { type: 'pond', x: 200, z: -200, r: 8 },
            { type: 'bush', x: 195, z: -190 },
            { type: 'bush', x: 210, z: -205 },
            { type: 'tree', x: 190, z: -210 },
            // Downhill area
            { type: 'tree', x: 400, z: 60 },
            { type: 'tree', x: 320, z: 60 },
            { type: 'pine', x: 380, z: 70 },
            { type: 'pine', x: 350, z: 55 },
            { type: 'rock', x: 280, z: 45 },
            { type: 'rock', x: 360, z: 70 },
            { type: 'bush', x: 340, z: 55 },
            { type: 'log', x: 390, z: 65, rot: 0.8 },
            { type: 'billboard', x: 420, z: 50, rot: -Math.PI / 3 },
            // S-curve area
            { type: 'tree', x: 180, z: -130 },
            { type: 'tree', x: 120, z: -140 },
            { type: 'pine', x: 150, z: -135 },
            { type: 'pine', x: 100, z: -120 },
            { type: 'rock', x: 80, z: -60 },
            { type: 'bush', x: 160, z: -120 },
            { type: 'bush', x: 90, z: -130 },
            { type: 'fence', x: 140, z: -140, rot: Math.PI / 4, len: 8 },
            // Sweeper area
            { type: 'tree', x: -60, z: 80 },
            { type: 'tree', x: -50, z: 0 },
            { type: 'tree', x: 0, z: 100 },
            { type: 'pine', x: -70, z: 60 },
            { type: 'pine', x: -40, z: 90 },
            { type: 'rock', x: -60, z: -40 },
            { type: 'rock', x: -70, z: 40 },
            { type: 'bush', x: -55, z: 50 },
            { type: 'bush', x: -45, z: 70 },
            { type: 'log', x: -55, z: 20, rot: 1.2 },
        ],
        groundColor: 0x1a5c1a,
        roadColor: 0x333333,
        skyColor: 0x87CEEB,
        ambientLight: 0x404060,
        sunColor: 0xffffff,
        sunPosition: { x: 250, y: 300, z: 0 },
        gridTheme: 'nature',
    },

    // ===== TRACK 2: CITY SPRINT (Large urban circuit - Medium) =====
    track_2: {
        name: "City Sprint",
        difficulty: "Medium",
        laps: 3,
        startPosition: { x: 0, y: 0.5, z: -60 },
        startRotation: Math.PI,
        controlPoints: [
            { x: 0, z: -60 },
            { x: 0, z: -160 },
            { x: 0, z: -260 },
            { x: 60, z: -310 },
            { x: 160, z: -320 },
            { x: 220, z: -280 },
            { x: 220, z: -180 },
            { x: 220, z: -80 },
            { x: 180, z: -30 },
            { x: 120, z: -20 },
            { x: 120, z: 60 },
            { x: 120, z: 140 },
            { x: 160, z: 190 },
            { x: 220, z: 200 },
            { x: 220, z: 100 },
            { x: 220, z: 40 },
            { x: 280, z: 10 },
            { x: 340, z: 40 },
            { x: 340, z: 140 },
            { x: 300, z: 220 },
            { x: 200, z: 260 },
            { x: 100, z: 240 },
            { x: 40, z: 200 },
            { x: 0, z: 140 },
            { x: 0, z: 40 },
        ],
        roadWidth: 22,
        splineSamples: 400,
        ramps: [],
        checkpoints: [
            { x: 0, z: -110, width: 22, rotation: 0 },
            { x: 0, z: -220, width: 22, rotation: 0 },
            { x: 110, z: -320, width: 22, rotation: Math.PI / 2 },
            { x: 220, z: -230, width: 22, rotation: 0 },
            { x: 220, z: -130, width: 22, rotation: 0 },
            { x: 150, z: -25, width: 22, rotation: Math.PI / 2 },
            { x: 120, z: 100, width: 22, rotation: 0 },
            { x: 220, z: 150, width: 22, rotation: 0 },
            { x: 340, z: 90, width: 22, rotation: 0 },
            { x: 250, z: 240, width: 22, rotation: Math.PI / 4 },
            { x: 70, z: 220, width: 22, rotation: Math.PI / 4 },
            { x: 0, z: 90, width: 22, rotation: 0 },
        ],
        finishLine: { x: 0, z: -50, width: 22, rotation: 0 },
        walls: [],
        decorations: [
            // Left block - main straight buildings
            { type: 'building', x: -30, z: -100, h: 22 },
            { type: 'building', x: -30, z: -150, h: 28 },
            { type: 'building', x: -30, z: -200, h: 18 },
            { type: 'building', x: -30, z: -250, h: 24 },
            { type: 'building', x: -45, z: -130, h: 32 },
            { type: 'building', x: -45, z: -180, h: 20 },
            { type: 'building', x: -45, z: -230, h: 26 },
            // Right side buildings
            { type: 'building', x: 245, z: -260, h: 26 },
            { type: 'building', x: 245, z: -200, h: 20 },
            { type: 'building', x: 245, z: -140, h: 30 },
            { type: 'building', x: 258, z: -230, h: 22 },
            { type: 'building', x: 258, z: -170, h: 18 },
            // Top curve buildings
            { type: 'building', x: 60, z: -340, h: 20 },
            { type: 'building', x: 120, z: -345, h: 24 },
            { type: 'building', x: 180, z: -340, h: 18 },
            // S-section inner buildings
            { type: 'building', x: 145, z: -40, h: 16 },
            { type: 'building', x: 95, z: -40, h: 14 },
            { type: 'building', x: 95, z: 50, h: 18 },
            { type: 'building', x: 95, z: 120, h: 16 },
            // East loop buildings
            { type: 'building', x: 250, z: 50, h: 20 },
            { type: 'building', x: 365, z: 60, h: 24 },
            { type: 'building', x: 365, z: 120, h: 22 },
            { type: 'building', x: 250, z: 180, h: 18 },
            // South buildings
            { type: 'building', x: 260, z: 265, h: 16 },
            { type: 'building', x: 160, z: 280, h: 20 },
            { type: 'building', x: 60, z: 260, h: 14 },
            { type: 'building', x: -30, z: 50, h: 16 },
            { type: 'building', x: -30, z: 100, h: 20 },
            { type: 'building', x: -30, z: 150, h: 18 },
            // Lampposts along streets
            { type: 'lamppost', x: -16, z: -90 },
            { type: 'lamppost', x: -16, z: -150 },
            { type: 'lamppost', x: -16, z: -210 },
            { type: 'lamppost', x: -16, z: -270 },
            { type: 'lamppost', x: 236, z: -250 },
            { type: 'lamppost', x: 236, z: -180 },
            { type: 'lamppost', x: 236, z: -110 },
            { type: 'lamppost', x: 136, z: 50 },
            { type: 'lamppost', x: 136, z: 130 },
            { type: 'lamppost', x: 356, z: 80 },
            { type: 'lamppost', x: -16, z: 60 },
            { type: 'lamppost', x: -16, z: 130 },
            // Billboards
            { type: 'billboard', x: -20, z: -70, rot: Math.PI / 2, w: 6, h: 8 },
            { type: 'billboard', x: 240, z: -80, rot: -Math.PI / 2, w: 6, h: 8 },
            { type: 'billboard', x: 300, z: 240, rot: Math.PI / 4, w: 5, h: 7 },
            // Grandstand near start/finish
            { type: 'grandstand', x: -45, z: -55, rot: Math.PI / 2, w: 18, rows: 4, color: 0x2255cc },
            { type: 'grandstand', x: 250, z: -300, rot: -Math.PI / 4, w: 14, rows: 3, color: 0xcc8822 },
            // Cones
            { type: 'cone', x: 195, z: -32 },
            { type: 'cone', x: 195, z: -28 },
            { type: 'cone', x: 145, z: -8 },
            { type: 'cone', x: 145, z: -12 },
            // Urban planters
            { type: 'bush', x: -16, z: -120, s: 0.4 },
            { type: 'bush', x: -16, z: -180, s: 0.4 },
            { type: 'bush', x: 236, z: -210, s: 0.4 },
            { type: 'bush', x: 236, z: -150, s: 0.4 },
            { type: 'bush', x: 136, z: 90, s: 0.4 },
            { type: 'bush', x: 356, z: 130, s: 0.4 },
        ],
        groundColor: 0x2a2a2a,
        roadColor: 0x444444,
        skyColor: 0x4a6080,
        ambientLight: 0x505060,
        sunColor: 0xffeedd,
        sunPosition: { x: -80, y: 250, z: 100 },
        gridTheme: 'urban',
    },

    // ===== TRACK 3: MOUNTAIN PASS (Large hill circuit with sharp hairpins - Hard) =====
    track_3: {
        name: "Mountain Pass",
        difficulty: "Hard",
        laps: 3,
        startPosition: { x: 0, y: 11.5, z: -100 },
        startRotation: Math.PI,
        controlPoints: [
            { x: 0, y: 15, z: -10 },
            { x: 0, y: 10, z: -140 },
            { x: 0, y: 6, z: -240 },
            // Hairpin 1: sharp left (descend to low)
            { x: -30, y: 4, z: -280 },
            { x: -80, y: 2, z: -280 },
            { x: -100, y: 1, z: -250 },
            // Valley floor climb
            { x: -100, y: 4, z: -160 },
            { x: -100, y: 8, z: -80 },
            // Hairpin 2: sharp right switchback
            { x: -80, y: 12, z: -40 },
            { x: -30, y: 16, z: -30 },
            { x: 0, y: 18, z: -50 },
            // Ridge traverse (high)
            { x: 40, y: 22, z: -100 },
            { x: 100, y: 26, z: -130 },
            { x: 160, y: 24, z: -120 },
            // Hairpin 3: tight right
            { x: 200, y: 22, z: -90 },
            { x: 210, y: 20, z: -40 },
            { x: 180, y: 18, z: -10 },
            // Descent
            { x: 120, y: 14, z: 10 },
            { x: 60, y: 10, z: 40 },
            // Hairpin 4: sharp left
            { x: 20, y: 8, z: 80 },
            { x: -20, y: 6, z: 100 },
            { x: -50, y: 8, z: 80 },
            // Final climb back to elevated start
            { x: -60, y: 10, z: 30 },
            { x: -40, y: 12, z: -10 },
        ],
        roadWidth: 20,
        splineSamples: 500,
        ramps: [],
        checkpoints: [
            { x: 0, z: -140, width: 20, rotation: 0 },
            { x: -55, z: -280, width: 20, rotation: Math.PI / 2 },
            { x: -100, z: -160, width: 20, rotation: 0 },
            { x: -55, z: -35, width: 20, rotation: Math.PI / 2 },
            { x: 70, z: -115, width: 20, rotation: Math.PI / 4 },
            { x: 205, z: -65, width: 20, rotation: 0 },
            { x: 90, z: 25, width: 20, rotation: Math.PI / 4 },
            { x: -35, z: 90, width: 20, rotation: Math.PI / 2 },
            { x: -50, z: 10, width: 20, rotation: 0 },
        ],
        finishLine: { x: 0, z: -100, width: 20, rotation: 0 },
        walls: [],
        decorations: [
            // Pine forest along main straight
            { type: 'pine', x: -20, z: -80 },
            { type: 'pine', x: -22, z: -140 },
            { type: 'pine', x: -18, z: -200 },
            { type: 'pine', x: 20, z: -100 },
            { type: 'pine', x: 22, z: -170 },
            { type: 'pine', x: 18, z: -230 },
            { type: 'tree', x: -28, z: -120 },
            { type: 'tree', x: 28, z: -190 },
            // Hairpin 1 area
            { type: 'pine', x: -40, z: -300 },
            { type: 'pine', x: -80, z: -305 },
            { type: 'pine', x: -115, z: -270 },
            { type: 'rock', x: -50, z: -295 },
            { type: 'rock', x: -110, z: -285 },
            { type: 'fence', x: -30, z: -295, rot: Math.PI / 2, len: 12 },
            // Climb section
            { type: 'pine', x: -120, z: -200 },
            { type: 'pine', x: -118, z: -140 },
            { type: 'pine', x: -122, z: -100 },
            { type: 'tree', x: -80, z: -180 },
            { type: 'tree', x: -82, z: -120 },
            { type: 'rock', x: -115, z: -170 },
            { type: 'rock', x: -85, z: -150 },
            { type: 'bush', x: -115, z: -230 },
            { type: 'bush', x: -82, z: -90 },
            // Hairpin 2 switchback
            { type: 'pine', x: -90, z: -20 },
            { type: 'pine', x: -45, z: -15 },
            { type: 'rock', x: -85, z: -50 },
            { type: 'fence', x: -90, z: -35, rot: 0, len: 10 },
            // Ridge traverse
            { type: 'pine', x: 30, z: -130 },
            { type: 'pine', x: 70, z: -150 },
            { type: 'pine', x: 120, z: -155 },
            { type: 'pine', x: 160, z: -145 },
            { type: 'tree', x: 50, z: -85 },
            { type: 'tree', x: 110, z: -100 },
            { type: 'rock', x: 80, z: -145 },
            { type: 'rock', x: 140, z: -140 },
            { type: 'bush', x: 45, z: -75 },
            { type: 'bush', x: 135, z: -95 },
            // Hairpin 3
            { type: 'pine', x: 225, z: -110 },
            { type: 'pine', x: 230, z: -50 },
            { type: 'rock', x: 220, z: -100 },
            { type: 'fence', x: 222, z: -70, rot: 0, len: 10 },
            // Descent
            { type: 'pine', x: 140, z: 30 },
            { type: 'pine', x: 80, z: 55 },
            { type: 'tree', x: 100, z: -10 },
            { type: 'tree', x: 50, z: 20 },
            { type: 'rock', x: 130, z: 25 },
            { type: 'bush', x: 65, z: 50 },
            // Hairpin 4
            { type: 'pine', x: 30, z: 110 },
            { type: 'pine', x: -30, z: 120 },
            { type: 'pine', x: -65, z: 100 },
            { type: 'rock', x: 10, z: 105 },
            { type: 'rock', x: -55, z: 95 },
            { type: 'fence', x: -25, z: 115, rot: Math.PI / 2, len: 12 },
            // Return stretch
            { type: 'pine', x: -75, z: 40 },
            { type: 'pine', x: -72, z: -5 },
            { type: 'tree', x: -50, z: 55 },
            { type: 'bush', x: -68, z: 20 },
            { type: 'log', x: -70, z: 50, rot: 0.3 },
            // Mountain backdrop
            { type: 'mountain', x: -180, z: -200, h: 50 },
            { type: 'mountain', x: -160, z: -50, h: 38 },
            { type: 'mountain', x: -150, z: 80, h: 35 },
            { type: 'mountain', x: 280, z: -180, h: 45 },
            { type: 'mountain', x: 300, z: 0, h: 40 },
            { type: 'mountain', x: 100, z: -220, h: 30 },
            { type: 'mountain', x: -50, z: -180, h: 28 },
            { type: 'mountain', x: 200, z: 100, h: 32 },
            // Pond in valley
            { type: 'pond', x: 40, z: -50, r: 7 },
            { type: 'bush', x: 46, z: -42 },
            { type: 'bush', x: 34, z: -56 },
            // Billboards
            { type: 'billboard', x: 18, z: -60, rot: 0 },
            { type: 'billboard', x: -115, z: -160, rot: Math.PI / 2 },
        ],
        groundColor: 0x3a5a2a,
        roadColor: 0x555544,
        skyColor: 0x6699bb,
        ambientLight: 0x607060,
        sunColor: 0xffffcc,
        sunPosition: { x: 50, y: 250, z: -80 },
        gridTheme: 'nature',
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

        // Grid environment (auto-populate empty areas)
        this._populateGrid(track);

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
        groundTex.repeat.set(50, 50);

        const geo = new THREE.PlaneGeometry(1400, 1400);
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
            roughness: 0.65,
            metalness: 0.0,
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
            color: 0x3a3a3a,
            roughness: 0.8,
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
            color: 0x4a4a4a,
            roughness: 0.75,
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
            color: 0x888888,
            roughness: 0.6,
            metalness: 0.3,
        });
        const pillarCapMat = new THREE.MeshStandardMaterial({
            color: 0x666666,
            roughness: 0.5,
            metalness: 0.3,
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

        // Guardrail posts every ~8 units (skip if an overhead road passes above)
        const postMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.5, roughness: 0.5 });
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
                    const pGeo = new THREE.BoxGeometry(0.15, postHeight, 0.15);
                    const post = new THREE.Mesh(pGeo, postMat);
                    post.position.set(
                        px + nnx * rOff * side,
                        postY + postHeight / 2,
                        pz + nnz * rOff * side
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
        const sponsors = [
            { name: 'APEX MOTORS', bg: '#c41e1e', fg: '#ffffff' },
            { name: 'TURBOMAX', bg: '#1a3a8a', fg: '#ffdd00' },
            { name: 'NITRO FUEL', bg: '#1a1a1a', fg: '#00ff88' },
            { name: 'GRIP TIRES', bg: '#222222', fg: '#ff8800' },
            { name: 'RUSH ENERGY', bg: '#ff4400', fg: '#ffffff' },
            { name: 'VORTEX OIL', bg: '#0a2a4a', fg: '#00ccff' },
            { name: 'DYNAMO', bg: '#2a0a3a', fg: '#ff44ff' },
            { name: 'SPEEDTECH', bg: '#ffffff', fg: '#111111' },
        ];

        // 3 visual styles that rotate: 'sponsor', 'plain', 'poles'
        const styles = ['sponsor', 'plain', 'poles'];

        track.checkpoints.forEach((cp, i) => {
            const group = new THREE.Group();
            let cpX = cp.x;
            let cpZ = cp.z;
            const checkpointPosts = [];
            const checkpointLights = [];
            const checkpointStrips = [];

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

            const style = styles[i % styles.length];
            const railEdge = this.trackHalfWidth + 0.8;
            const pillarHalfSpan = railEdge + 0.3;
            const archWidth = pillarHalfSpan * 2;

            if (style === 'sponsor') {
                // Full sponsor arch with banner
                const sponsor = sponsors[Math.floor(i / styles.length) % sponsors.length];
                const archH = 6.5;
                const postMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.3, metalness: 0.6 });
                const accentMat = new THREE.MeshStandardMaterial({
                    color: new THREE.Color(sponsor.fg),
                    emissive: new THREE.Color(sponsor.fg),
                    emissiveIntensity: 0.15,
                    roughness: 0.4, metalness: 0.3,
                });

                for (let side = -1; side <= 1; side += 2) {
                    const postGeo = new THREE.BoxGeometry(0.5, archH, 0.5);
                    const post = new THREE.Mesh(postGeo, postMat);
                    post.position.set(side * pillarHalfSpan, archH / 2, 0);
                    post.castShadow = true;
                    group.add(post);
                    checkpointPosts.push(post);
                    const baseGeo = new THREE.BoxGeometry(0.9, 0.25, 0.9);
                    group.add(new THREE.Mesh(baseGeo, postMat)).position.set(side * pillarHalfSpan, 0.125, 0);
                    const stripeGeo = new THREE.BoxGeometry(0.52, archH, 0.15);
                    const stripe = new THREE.Mesh(stripeGeo, accentMat);
                    stripe.position.set(side * pillarHalfSpan, archH / 2, 0.2);
                    group.add(stripe);
                    checkpointStrips.push(stripe);
                }
                const crossGeo = new THREE.BoxGeometry(archWidth + 0.6, 0.45, 0.5);
                const cross = new THREE.Mesh(crossGeo, postMat);
                cross.position.set(0, archH + 0.22, 0);
                cross.castShadow = true;
                group.add(cross);
                checkpointPosts.push(cross);
                for (let side = -1; side <= 1; side += 2) {
                    const brGeo = new THREE.BoxGeometry(0.12, 2.2, 0.12);
                    const br = new THREE.Mesh(brGeo, postMat);
                    br.position.set(side * (pillarHalfSpan - 0.6), archH - 0.6, 0);
                    br.rotation.z = side * 0.45;
                    group.add(br);
                }
                // Banner
                const bc = document.createElement('canvas');
                bc.width = 512; bc.height = 128;
                const bx = bc.getContext('2d');
                bx.fillStyle = sponsor.bg; bx.fillRect(0, 0, 512, 128);
                bx.fillStyle = sponsor.fg;
                bx.fillRect(0, 0, 512, 4); bx.fillRect(0, 124, 512, 4);
                bx.font = 'bold 56px sans-serif'; bx.textAlign = 'center'; bx.textBaseline = 'middle';
                bx.fillText(sponsor.name, 256, 64);
                const bTex = new THREE.CanvasTexture(bc);
                const banGeo = new THREE.PlaneGeometry(archWidth * 0.85, archH * 0.22);
                const banMat = new THREE.MeshBasicMaterial({ map: bTex, side: THREE.DoubleSide });
                const ban = new THREE.Mesh(banGeo, banMat);
                ban.position.set(0, archH - 0.3, 0.26);
                group.add(ban);
                const ban2 = ban.clone(); ban2.position.z = -0.26; ban2.rotation.y = Math.PI;
                group.add(ban2);
                // LEDs
                const sc = new THREE.Color(sponsor.fg);
                for (let lx = -archWidth / 2 + 1; lx <= archWidth / 2 - 1; lx += 1.5) {
                    const lg = new THREE.BoxGeometry(0.8, 0.08, 0.08);
                    const lm = new THREE.MeshStandardMaterial({ color: sc, emissive: sc, emissiveIntensity: 0.6 });
                    const led = new THREE.Mesh(lg, lm);
                    led.position.set(lx, archH - 0.05, 0);
                    group.add(led);
                    checkpointStrips.push(led);
                }
                {
                    const lt = new THREE.PointLight(0xffffff, 0.5, 12, 2);
                    lt.position.set(0, archH + 0.5, 0);
                    group.add(lt);
                    checkpointLights.push(lt);
                }

            } else if (style === 'plain') {
                // Clean white/orange arch with no banner
                const archH = 6.0;
                const frameMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0, roughness: 0.35, metalness: 0.4 });
                const glowMat = new THREE.MeshStandardMaterial({
                    color: 0xff6600, emissive: 0xff4400, emissiveIntensity: 0.3, roughness: 0.4,
                });
                for (let side = -1; side <= 1; side += 2) {
                    const pg = new THREE.BoxGeometry(0.4, archH, 0.4);
                    const post = new THREE.Mesh(pg, frameMat);
                    post.position.set(side * pillarHalfSpan, archH / 2, 0);
                    post.castShadow = true;
                    group.add(post);
                    checkpointPosts.push(post);
                    // Orange glow strip
                    const sg = new THREE.BoxGeometry(0.12, archH, 0.42);
                    const strip = new THREE.Mesh(sg, glowMat);
                    strip.position.set(side * pillarHalfSpan, archH / 2, 0);
                    group.add(strip);
                    checkpointStrips.push(strip);
                }
                // Top bar
                const cg = new THREE.BoxGeometry(archWidth + 0.5, 0.4, 0.4);
                const cross = new THREE.Mesh(cg, frameMat);
                cross.position.set(0, archH + 0.2, 0);
                group.add(cross);
                checkpointPosts.push(cross);
                // Orange underline
                const ug = new THREE.BoxGeometry(archWidth, 0.12, 0.12);
                const uline = new THREE.Mesh(ug, glowMat);
                uline.position.set(0, archH - 0.05, 0);
                group.add(uline);
                checkpointStrips.push(uline);
                {
                    const lt = new THREE.PointLight(0xff7700, 0.4, 10, 2);
                    lt.position.set(0, archH + 0.3, 0);
                    group.add(lt);
                    checkpointLights.push(lt);
                }

            } else {
                // Minimal: two tall poles with LED tops (no crossbar)
                const poleH = 5.5;
                const poleMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.35, metalness: 0.5 });
                const topMat = new THREE.MeshStandardMaterial({
                    color: 0x00ccff, emissive: 0x0088ff, emissiveIntensity: 0.5, roughness: 0.3,
                });
                for (let side = -1; side <= 1; side += 2) {
                    const pg = new THREE.CylinderGeometry(0.18, 0.22, poleH, 6);
                    const pole = new THREE.Mesh(pg, poleMat);
                    pole.position.set(side * pillarHalfSpan, poleH / 2, 0);
                    pole.castShadow = true;
                    group.add(pole);
                    checkpointPosts.push(pole);
                    const cg = new THREE.SphereGeometry(0.35, 6, 4);
                    const cap = new THREE.Mesh(cg, topMat);
                    cap.position.set(side * pillarHalfSpan, poleH + 0.2, 0);
                    group.add(cap);
                    checkpointStrips.push(cap);
                }
                {
                    const lt = new THREE.PointLight(0x00aaff, 0.5, 8, 2);
                    lt.position.set(0, poleH + 0.4, 0);
                    group.add(lt);
                    checkpointLights.push(lt);
                }
                // Base rings
                for (let side = -1; side <= 1; side += 2) {
                    const bg = new THREE.CylinderGeometry(0.35, 0.38, 0.15, 8);
                    const base = new THREE.Mesh(bg, poleMat);
                    base.position.set(side * pillarHalfSpan, 0.075, 0);
                    group.add(base);
                }
            }

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
            const pulse = 0.85 + 0.15 * Math.sin(timeSec * 4.0 + cp.pulseOffset);

            if (cp.strips) {
                const intensity = cp.passed ? 0.1 : (isActive ? 1.0 * pulse : 0.4);
                cp.strips.forEach((strip) => {
                    if (strip.material && strip.material.emissiveIntensity !== undefined) {
                        strip.material.emissiveIntensity = intensity;
                    }
                });
            }

            if (cp.lights) {
                const lightIntensity = cp.passed ? 0.15 : (isActive ? 0.8 * pulse : 0.35);
                cp.lights.forEach((light) => {
                    light.intensity = lightIntensity;
                    light.color.setHex(isActive ? 0xffffff : (cp.passed ? 0x444444 : 0xcccccc));
                });
            }
        });
    }

    _buildFinishLine(track) {
        const fl = track.finishLine;
        const group = new THREE.Group();

        // Posts sit right at the guardrail edge (hw + 0.8 curb+rail offset)
        const railEdge = this.trackHalfWidth + 0.8;
        const finishHalfSpan = railEdge + 0.3;
        const finishWidth = finishHalfSpan * 2;
        const archH = 7.5;

        // Checkered road pattern
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
        const lineGeo = new THREE.PlaneGeometry(finishWidth, 3);
        const lineMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const lineMesh = new THREE.Mesh(lineGeo, lineMat);
        lineMesh.rotation.x = -Math.PI / 2;
        lineMesh.position.y = 0.12;
        group.add(lineMesh);

        // Truss arch structure
        const trussMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.3, metalness: 0.6 });
        const accentMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });

        for (let side = -1; side <= 1; side += 2) {
            const postGeo = new THREE.BoxGeometry(0.6, archH, 0.6);
            const post = new THREE.Mesh(postGeo, trussMat);
            post.position.set(side * finishHalfSpan, archH / 2, 0);
            post.castShadow = true;
            group.add(post);

            const baseGeo = new THREE.BoxGeometry(1.1, 0.3, 1.1);
            const base = new THREE.Mesh(baseGeo, accentMat);
            base.position.set(side * finishHalfSpan, 0.15, 0);
            group.add(base);

            // Checkered accent strip on post
            const stripCanvas = document.createElement('canvas');
            stripCanvas.width = 32;
            stripCanvas.height = 256;
            const sCtx = stripCanvas.getContext('2d');
            for (let sy = 0; sy < 32; sy++) {
                sCtx.fillStyle = sy % 2 === 0 ? '#ffffff' : '#000000';
                sCtx.fillRect(0, sy * 8, 32, 8);
            }
            const stripTex = new THREE.CanvasTexture(stripCanvas);
            const stripGeo = new THREE.PlaneGeometry(0.62, archH);
            const stripMat = new THREE.MeshBasicMaterial({ map: stripTex, side: THREE.DoubleSide });
            const stripFront = new THREE.Mesh(stripGeo, stripMat);
            stripFront.position.set(side * finishHalfSpan, archH / 2, 0.31);
            group.add(stripFront);
            const stripBack = stripFront.clone();
            stripBack.position.z = -0.31;
            group.add(stripBack);

            // Diagonal braces
            const braceGeo = new THREE.BoxGeometry(0.12, 2.5, 0.12);
            const brace = new THREE.Mesh(braceGeo, trussMat);
            brace.position.set(side * (finishHalfSpan - 0.8), archH - 1, 0);
            brace.rotation.z = side * 0.5;
            group.add(brace);
        }

        // Top crossbar
        const crossGeo = new THREE.BoxGeometry(finishWidth + 0.8, 0.55, 0.6);
        const cross = new THREE.Mesh(crossGeo, trussMat);
        cross.position.set(0, archH + 0.27, 0);
        cross.castShadow = true;
        group.add(cross);

        // Sponsor banner on the arch
        const bannerCanvas = document.createElement('canvas');
        bannerCanvas.width = 512;
        bannerCanvas.height = 128;
        const bCtx = bannerCanvas.getContext('2d');
        bCtx.fillStyle = '#b71c1c';
        bCtx.fillRect(0, 0, 512, 128);
        bCtx.fillStyle = '#ffffff';
        bCtx.fillRect(0, 0, 512, 4);
        bCtx.fillRect(0, 124, 512, 4);
        bCtx.font = 'bold 48px sans-serif';
        bCtx.textAlign = 'center';
        bCtx.textBaseline = 'middle';
        bCtx.fillStyle = '#ffffff';
        bCtx.fillText('APEX MOTORS', 256, 48);
        bCtx.font = 'bold 28px sans-serif';
        bCtx.fillStyle = '#ffcc00';
        bCtx.fillText('F I N I S H', 256, 95);
        const bannerTex = new THREE.CanvasTexture(bannerCanvas);
        const bannerW = finishWidth * 0.8;
        const bannerH = 1.6;

        for (const zOff of [0.31, -0.31]) {
            const bannerGeo = new THREE.PlaneGeometry(bannerW, bannerH);
            const bannerMat = new THREE.MeshBasicMaterial({ map: bannerTex, side: THREE.DoubleSide });
            const banner = new THREE.Mesh(bannerGeo, bannerMat);
            banner.position.set(0, archH - 0.5, zOff);
            if (zOff < 0) banner.rotation.y = Math.PI;
            group.add(banner);
        }

        // LED strips along underside
        const ledMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 0.8,
        });
        for (let lx = -finishWidth / 2 + 1; lx <= finishWidth / 2 - 1; lx += 1.2) {
            const ledGeo = new THREE.BoxGeometry(0.7, 0.08, 0.08);
            const led = new THREE.Mesh(ledGeo, ledMat);
            led.position.set(lx, archH - 0.02, 0);
            group.add(led);
        }

        {
            const light = new THREE.PointLight(0xffffff, 0.6, 15, 2);
            light.position.set(0, archH + 0.8, 0);
            group.add(light);
        }

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

    _populateGrid(track) {
        const cellSize = 18;
        const hw = this.trackHalfWidth;
        const minDist = hw + 3;
        const maxDist = 160;
        const theme = track.gridTheme || 'nature';

        const bounds = { minX: Infinity, maxX: -Infinity, minZ: Infinity, maxZ: -Infinity };
        for (const p of this.splinePoints) {
            if (p.x < bounds.minX) bounds.minX = p.x;
            if (p.x > bounds.maxX) bounds.maxX = p.x;
            if (p.z < bounds.minZ) bounds.minZ = p.z;
            if (p.z > bounds.maxZ) bounds.maxZ = p.z;
        }
        const pad = 80;
        bounds.minX -= pad; bounds.maxX += pad;
        bounds.minZ -= pad; bounds.maxZ += pad;

        const colsCount = Math.ceil((bounds.maxX - bounds.minX) / cellSize);
        const rowsCount = Math.ceil((bounds.maxZ - bounds.minZ) / cellSize);

        const seed = (track.name || 'x').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        const rng = (i) => {
            let h = seed * 2654435761 + i * 340573321;
            h = ((h >>> 16) ^ h) * 0x45d9f3b;
            h = ((h >>> 16) ^ h) * 0x45d9f3b;
            h = (h >>> 16) ^ h;
            return (h & 0x7fffffff) / 0x7fffffff;
        };

        const pts = this.splinePoints;
        const N = pts.length;
        const _closestDistToTrack = (px, pz) => {
            let best = Infinity;
            for (let i = 0; i < N - 1; i += 2) {
                const ax = pts[i].x, az = pts[i].z;
                const bx = pts[i + 1].x, bz = pts[i + 1].z;
                const dx = bx - ax, dz = bz - az;
                const lenSq = dx * dx + dz * dz;
                if (lenSq < 0.001) continue;
                let t = ((px - ax) * dx + (pz - az) * dz) / lenSq;
                t = Math.max(0, Math.min(1, t));
                const cx = ax + t * dx, cz = az + t * dz;
                const distSq = (px - cx) * (px - cx) + (pz - cz) * (pz - cz);
                if (distSq < best) best = distSq;
            }
            return Math.sqrt(best);
        };

        const eligible = [];
        let cellIdx = 0;
        for (let row = 0; row < rowsCount; row++) {
            for (let col = 0; col < colsCount; col++) {
                cellIdx++;
                const cx = bounds.minX + (col + 0.5) * cellSize;
                const cz = bounds.minZ + (row + 0.5) * cellSize;
                const dist = _closestDistToTrack(cx, cz);
                if (dist < minDist || dist > maxDist) continue;
                eligible.push({ cx, cz, idx: cellIdx });
            }
        }

        // Deterministic shuffle so placement is spread across the whole map
        for (let i = eligible.length - 1; i > 0; i--) {
            const j = Math.floor(rng(i + seed) * (i + 1));
            [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
        }

        const maxPlacements = Math.min(300, eligible.length);
        const variationFns = theme === 'urban' ? this._urbanVariations() : this._natureVariations();
        const varCount = variationFns.length;

        for (let p = 0; p < maxPlacements; p++) {
            const cell = eligible[p];
            const ci = cell.idx;
            if (rng(ci) > 0.85) continue;

            const variation = Math.floor(rng(ci + 7777) * varCount);
            const jitterX = (rng(ci + 111) - 0.5) * cellSize * 0.6;
            const jitterZ = (rng(ci + 222) - 0.5) * cellSize * 0.6;
            const px = cell.cx + jitterX;
            const pz = cell.cz + jitterZ;

            const mesh = variationFns[variation](px, pz, rng, ci);
            if (mesh) {
                this.scene.add(mesh);
                this.trackObjects.push(mesh);
            }
        }
    }

    _natureVariations() {
        return [
            (x, z, r, s) => this._gridOakCluster(x, z, r, s),
            (x, z, r, s) => this._gridPineGrove(x, z, r, s),
            (x, z, r, s) => this._gridRockyOutcrop(x, z, r, s),
            (x, z, r, s) => this._gridWildflowers(x, z, r, s),
            (x, z, r, s) => this._gridTallGrass(x, z, r, s),
            (x, z, r, s) => this._gridFallenLog(x, z, r, s),
            (x, z, r, s) => this._gridBoulderField(x, z, r, s),
            (x, z, r, s) => this._gridMixedWoodland(x, z, r, s),
            (x, z, r, s) => this._gridHayBales(x, z, r, s),
            (x, z, r, s) => this._gridCrateStack(x, z, r, s),
            (x, z, r, s) => this._gridCampfire(x, z, r, s),
            (x, z, r, s) => this._gridStoneRuins(x, z, r, s),
            (x, z, r, s) => this._gridMiniPond(x, z, r, s),
            (x, z, r, s) => this._gridEarthMound(x, z, r, s),
            (x, z, r, s) => this._gridSplitFence(x, z, r, s),
            (x, z, r, s) => this._gridTireStack(x, z, r, s),
            (x, z, r, s) => this._gridDeadTree(x, z, r, s),
            (x, z, r, s) => this._gridHedgeRow(x, z, r, s),
            (x, z, r, s) => this._gridBirchTrees(x, z, r, s),
            (x, z, r, s) => this._gridMushroomRing(x, z, r, s),
        ];
    }

    _urbanVariations() {
        return [
            (x, z, r, s) => this._gridUrbanBuilding(x, z, r, s),
            (x, z, r, s) => this._gridUrbanTower(x, z, r, s),
            (x, z, r, s) => this._gridUrbanParking(x, z, r, s),
            (x, z, r, s) => this._gridUrbanDumpster(x, z, r, s),
            (x, z, r, s) => this._gridUrbanBench(x, z, r, s),
            (x, z, r, s) => this._gridUrbanLamppost(x, z, r, s),
            (x, z, r, s) => this._gridUrbanContainer(x, z, r, s),
            (x, z, r, s) => this._gridUrbanFence(x, z, r, s),
            (x, z, r, s) => this._gridUrbanCones(x, z, r, s),
            (x, z, r, s) => this._gridTireStack(x, z, r, s),
            (x, z, r, s) => this._gridCrateStack(x, z, r, s),
            (x, z, r, s) => this._gridUrbanWarehouse(x, z, r, s),
            (x, z, r, s) => this._gridUrbanAC(x, z, r, s),
            (x, z, r, s) => this._gridUrbanPlanter(x, z, r, s),
            (x, z, r, s) => this._gridUrbanBarricade(x, z, r, s),
            (x, z, r, s) => this._gridUrbanSignpost(x, z, r, s),
            (x, z, r, s) => this._gridUrbanMailbox(x, z, r, s),
            (x, z, r, s) => this._gridUrbanTrashcan(x, z, r, s),
            (x, z, r, s) => this._gridUrbanBollards(x, z, r, s),
            (x, z, r, s) => this._gridUrbanShed(x, z, r, s),
        ];
    }

    // Shared material cache - MeshLambertMaterial is much cheaper than MeshStandardMaterial
    _gm(color) {
        if (!this._gridMatCache) this._gridMatCache = {};
        const key = typeof color === 'number' ? color : color.getHex();
        if (!this._gridMatCache[key]) {
            this._gridMatCache[key] = new THREE.MeshLambertMaterial({ color });
        }
        return this._gridMatCache[key];
    }

    // === URBAN GRID VARIATIONS ===

    _gridUrbanBuilding(x, z, rng, s) {
        const g = new THREE.Group();
        const h = 10 + rng(s + 10) * 18;
        const w = 6 + rng(s + 20) * 4;
        const d = 6 + rng(s + 30) * 4;
        const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this._gm(0x2a2a35));
        body.position.y = h / 2;
        g.add(body);
        g.position.set(x, 0, z);
        return g;
    }

    _gridUrbanTower(x, z, rng, s) {
        const g = new THREE.Group();
        const h = 20 + rng(s + 10) * 20;
        const w = 5 + rng(s + 20) * 3;
        const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), this._gm(0x2a2a38));
        body.position.y = h / 2;
        g.add(body);
        const roof = new THREE.Mesh(new THREE.BoxGeometry(w * 0.4, 1.5, w * 0.4), this._gm(0x444444));
        roof.position.y = h + 0.75;
        g.add(roof);
        g.position.set(x, 0, z);
        return g;
    }

    _gridUrbanParking(x, z, rng, s) {
        const g = new THREE.Group();
        const lot = new THREE.Mesh(new THREE.PlaneGeometry(10, 8), this._gm(0x333333));
        lot.rotation.x = -Math.PI / 2;
        lot.position.y = 0.02;
        g.add(lot);
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 10) * Math.PI;
        return g;
    }

    _gridUrbanDumpster(x, z, rng, s) {
        const g = new THREE.Group();
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 1.0), this._gm(0x2a6a2a));
        body.position.y = 0.6;
        g.add(body);
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 10) * Math.PI * 2;
        return g;
    }

    _gridUrbanBench(x, z, rng, s) {
        const g = new THREE.Group();
        const seat = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 0.5), this._gm(0x8B6914));
        seat.position.y = 0.45;
        g.add(seat);
        const back = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.5, 0.06), this._gm(0x8B6914));
        back.position.set(0, 0.7, -0.22);
        g.add(back);
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 10) * Math.PI * 2;
        return g;
    }

    _gridUrbanLamppost(x, z, rng, s) {
        const g = new THREE.Group();
        const h = 5 + rng(s + 10) * 2;
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, h, 5), this._gm(0x444444));
        pole.position.y = h / 2;
        g.add(pole);
        const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.15, 0.3), this._gm(0xeeeeee));
        lamp.position.set(0.3, h - 0.2, 0);
        g.add(lamp);
        g.position.set(x, 0, z);
        return g;
    }

    _gridUrbanContainer(x, z, rng, s) {
        const g = new THREE.Group();
        const colors = [0xcc2222, 0x2255aa, 0xcc8822, 0x228844];
        const ci = Math.floor(rng(s + 10) * colors.length);
        const body = new THREE.Mesh(new THREE.BoxGeometry(6, 2.5, 2.4), this._gm(colors[ci]));
        body.position.y = 1.25;
        g.add(body);
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 20) * Math.PI;
        return g;
    }

    _gridUrbanFence(x, z, rng, s) {
        const g = new THREE.Group();
        const len = 5 + rng(s + 10) * 4;
        const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 1.5, 0.05), this._gm(0x888888));
        rail.position.y = 0.75;
        g.add(rail);
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 20) * Math.PI;
        return g;
    }

    _gridUrbanCones(x, z, rng, s) {
        const g = new THREE.Group();
        for (let i = 0; i < 3; i++) {
            const cone = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.6, 5), this._gm(0xff5500));
            cone.position.set((rng(s + 10 + i) - 0.5) * 3, 0.3, (rng(s + 20 + i) - 0.5) * 3);
            g.add(cone);
        }
        g.position.set(x, 0, z);
        return g;
    }

    _gridUrbanWarehouse(x, z, rng, s) {
        const g = new THREE.Group();
        const w = 8 + rng(s + 10) * 5;
        const h = 4 + rng(s + 20) * 3;
        const d = 6 + rng(s + 30) * 4;
        const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this._gm(0x6a6a6a));
        body.position.y = h / 2;
        g.add(body);
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 40) * Math.PI * 2;
        return g;
    }

    _gridUrbanAC(x, z, rng, s) {
        const g = new THREE.Group();
        const unit = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.8, 0.8), this._gm(0xaaaaaa));
        unit.position.y = 0.4;
        g.add(unit);
        g.position.set(x, 0, z);
        return g;
    }

    _gridUrbanPlanter(x, z, rng, s) {
        const g = new THREE.Group();
        const pot = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 1.2), this._gm(0x777777));
        pot.position.y = 0.3;
        g.add(pot);
        const bush = new THREE.Mesh(new THREE.SphereGeometry(0.6, 4, 3), this._gm(0x2a5a1a));
        bush.scale.y = 0.7;
        bush.position.y = 0.9;
        g.add(bush);
        g.position.set(x, 0, z);
        return g;
    }

    _gridUrbanBarricade(x, z, rng, s) {
        const g = new THREE.Group();
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.8, 0.4), this._gm(0xff8800));
        body.position.y = 0.4;
        g.add(body);
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 10) * Math.PI;
        return g;
    }

    _gridUrbanSignpost(x, z, rng, s) {
        const g = new THREE.Group();
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3, 4), this._gm(0x666666));
        pole.position.y = 1.5;
        g.add(pole);
        const colors = [0x2255cc, 0xcc2222, 0x22aa44, 0xdddd22];
        const sign = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.6, 0.05),
            this._gm(colors[Math.floor(rng(s + 10) * 4)])
        );
        sign.position.y = 2.8;
        g.add(sign);
        g.position.set(x, 0, z);
        return g;
    }

    _gridUrbanMailbox(x, z, rng, s) {
        const g = new THREE.Group();
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 4), this._gm(0x555555));
        post.position.y = 0.5;
        g.add(post);
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 0.3), this._gm(0x2244aa));
        box.position.y = 1.17;
        g.add(box);
        g.position.set(x, 0, z);
        return g;
    }

    _gridUrbanTrashcan(x, z, rng, s) {
        const g = new THREE.Group();
        const can = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 0.8, 6), this._gm(0x444444));
        can.position.y = 0.4;
        g.add(can);
        g.position.set(x, 0, z);
        return g;
    }

    _gridUrbanBollards(x, z, rng, s) {
        const g = new THREE.Group();
        for (let i = 0; i < 3; i++) {
            const b = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.7, 5), this._gm(0x888888));
            b.position.set(i * 1.2 - 1.2, 0.35, 0);
            g.add(b);
        }
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 10) * Math.PI;
        return g;
    }

    _gridUrbanShed(x, z, rng, s) {
        const g = new THREE.Group();
        const w = 3 + rng(s + 10) * 2;
        const h = 2.5 + rng(s + 20) * 1;
        const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, w * 0.8), this._gm(0x7a6a5a));
        body.position.y = h / 2;
        g.add(body);
        const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, 0.15, w * 0.85), this._gm(0x555555));
        roof.position.y = h + 0.07;
        g.add(roof);
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 30) * Math.PI * 2;
        return g;
    }

    // === NATURE GRID VARIATIONS ===

    _gridOakCluster(x, z, rng, s) {
        const g = new THREE.Group();
        const sc = 0.8 + rng(s + 20) * 0.5;
        const trH = 3.0 * sc;
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2 * sc, 0.4 * sc, trH, 5), this._gm(0x6B3410));
        trunk.position.y = trH / 2;
        g.add(trunk);
        const cr = 2.5 * sc;
        const crown = new THREE.Mesh(new THREE.SphereGeometry(cr, 5, 4), this._gm(0x2a5a1a));
        crown.position.y = trH + cr * 0.6;
        g.add(crown);
        g.position.set(x, 0, z);
        return g;
    }

    _gridPineGrove(x, z, rng, s) {
        const g = new THREE.Group();
        const sc = 0.7 + rng(s + 20) * 0.6;
        const trH = 3.5 * sc;
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15 * sc, 0.3 * sc, trH, 5), this._gm(0x5a3a1a));
        trunk.position.y = trH / 2;
        g.add(trunk);
        for (let t = 0; t < 2; t++) {
            const r = (2.2 - t * 0.7) * sc;
            const h = (2.8 - t * 0.5) * sc;
            const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 5), this._gm(0x1a4a1a));
            cone.position.y = trH + t * 1.8 * sc + h / 2;
            g.add(cone);
        }
        g.position.set(x, 0, z);
        return g;
    }

    _gridRockyOutcrop(x, z, rng, s) {
        const g = new THREE.Group();
        const count = 2 + Math.floor(rng(s + 10) * 2);
        for (let i = 0; i < count; i++) {
            const sz = 1.0 + rng(s + 20 + i) * 1.5;
            const geo = new THREE.DodecahedronGeometry(sz, 0);
            geo.scale(1, 0.5, 0.85);
            const m = new THREE.Mesh(geo, this._gm(0x5a5a55));
            m.position.set((rng(s + 30 + i) - 0.5) * 5, sz * 0.25, (rng(s + 40 + i) - 0.5) * 5);
            m.rotation.y = rng(s + 90 + i) * Math.PI * 2;
            g.add(m);
        }
        g.position.set(x, 0, z);
        return g;
    }

    _gridWildflowers(x, z, rng, s) {
        const g = new THREE.Group();
        const colors = [0xff6699, 0xffcc33, 0xcc66ff, 0xff4444, 0xffaa00];
        const count = 5 + Math.floor(rng(s + 10) * 4);
        for (let i = 0; i < count; i++) {
            const ci = Math.floor(rng(s + 20 + i) * colors.length);
            const r = 0.18 + rng(s + 30 + i) * 0.15;
            const flower = new THREE.Mesh(new THREE.SphereGeometry(r, 3, 3), this._gm(colors[ci]));
            const stemH = 0.3 + rng(s + 40 + i) * 0.3;
            flower.position.set((rng(s + 50 + i) - 0.5) * 8, stemH + r, (rng(s + 60 + i) - 0.5) * 8);
            g.add(flower);
        }
        g.position.set(x, 0, z);
        return g;
    }

    _gridTallGrass(x, z, rng, s) {
        const g = new THREE.Group();
        const grassMat = this._gm(0x4a6a3a);
        for (let i = 0; i < 6; i++) {
            const h = 0.6 + rng(s + 20 + i) * 0.8;
            const blade = new THREE.Mesh(new THREE.PlaneGeometry(0.15, h), grassMat);
            blade.position.set((rng(s + 30 + i) - 0.5) * 6, h / 2, (rng(s + 40 + i) - 0.5) * 6);
            blade.rotation.y = rng(s + 50 + i) * Math.PI;
            g.add(blade);
        }
        g.position.set(x, 0, z);
        return g;
    }

    _gridFallenLog(x, z, rng, s) {
        const g = new THREE.Group();
        const len = 3 + rng(s + 10) * 2;
        const r = 0.25 + rng(s + 20) * 0.15;
        const log = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.1, len, 5), this._gm(0x6B4226));
        log.rotation.z = Math.PI / 2;
        log.position.y = r;
        g.add(log);
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 60) * Math.PI * 2;
        return g;
    }

    _gridBoulderField(x, z, rng, s) {
        const g = new THREE.Group();
        const sz = 1.5 + rng(s + 20) * 2.0;
        const geo = new THREE.DodecahedronGeometry(sz, 0);
        geo.scale(1, 0.5, 0.9);
        const m = new THREE.Mesh(geo, this._gm(0x5a5a50));
        m.position.y = sz * 0.25;
        m.rotation.y = rng(s + 60) * Math.PI * 2;
        g.add(m);
        g.position.set(x, 0, z);
        return g;
    }

    _gridMixedWoodland(x, z, rng, s) {
        const g = new THREE.Group();
        const sc = 0.7 + rng(s + 10) * 0.4;
        const trH = 3.2 * sc;
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2 * sc, 0.4 * sc, trH, 5), this._gm(0x6B3410));
        trunk.position.y = trH / 2;
        g.add(trunk);
        const crR = 2.0 * sc;
        const crown = new THREE.Mesh(new THREE.SphereGeometry(crR, 5, 4), this._gm(0x2a5a1a));
        crown.position.y = trH + crR * 0.6;
        g.add(crown);
        const bSc = 0.5 + rng(s + 50) * 0.3;
        const bush = new THREE.Mesh(new THREE.SphereGeometry(bSc, 4, 3), this._gm(0x1a4a15));
        bush.scale.y = 0.65;
        bush.position.set((rng(s + 60) - 0.5) * 4, bSc * 0.4, (rng(s + 70) - 0.5) * 4);
        g.add(bush);
        g.position.set(x, 0, z);
        return g;
    }

    _gridHayBales(x, z, rng, s) {
        const g = new THREE.Group();
        const r = 0.65 + rng(s + 20) * 0.25;
        const bale = new THREE.Mesh(new THREE.CylinderGeometry(r, r, r * 1.2, 7), this._gm(0xc8a84e));
        bale.rotation.z = Math.PI / 2;
        bale.position.y = r;
        g.add(bale);
        g.position.set(x, 0, z);
        return g;
    }

    _gridCrateStack(x, z, rng, s) {
        const g = new THREE.Group();
        const crate = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 1.2), this._gm(0x8B6914));
        crate.position.y = 0.5;
        g.add(crate);
        const top = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 0.8), this._gm(0x8B6914));
        top.position.y = 1.35;
        top.rotation.y = 0.3;
        g.add(top);
        g.position.set(x, 0, z);
        return g;
    }

    _gridCampfire(x, z, rng, s) {
        const g = new THREE.Group();
        for (let i = 0; i < 5; i++) {
            const a = (i / 5) * Math.PI * 2;
            const stone = new THREE.Mesh(new THREE.SphereGeometry(0.25, 3, 3), this._gm(0x666660));
            stone.position.set(Math.cos(a) * 0.9, 0.12, Math.sin(a) * 0.9);
            stone.scale.y = 0.6;
            g.add(stone);
        }
        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.7, 4), this._gm(0xff6600));
        flame.position.y = 0.45;
        g.add(flame);
        g.position.set(x, 0, z);
        return g;
    }

    _gridStoneRuins(x, z, rng, s) {
        const g = new THREE.Group();
        const wallH = 1.0 + rng(s + 10) * 1.5;
        const wallL = 3 + rng(s + 20) * 3;
        const wall = new THREE.Mesh(new THREE.BoxGeometry(wallL, wallH, 0.5), this._gm(0x6a6a60));
        wall.position.y = wallH / 2;
        g.add(wall);
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 100) * Math.PI * 2;
        return g;
    }

    _gridMiniPond(x, z, rng, s) {
        const g = new THREE.Group();
        const r = 2 + rng(s + 10) * 2;
        if (!this._pondMat) {
            this._pondMat = new THREE.MeshLambertMaterial({
                color: 0x2266aa, transparent: true, opacity: 0.75
            });
        }
        const water = new THREE.Mesh(new THREE.CircleGeometry(r, 8), this._pondMat);
        water.rotation.x = -Math.PI / 2;
        water.position.y = 0.02;
        g.add(water);
        g.position.set(x, 0, z);
        return g;
    }

    _gridEarthMound(x, z, rng, s) {
        const g = new THREE.Group();
        const r = 2 + rng(s + 10) * 2;
        const h = 0.8 + rng(s + 20) * 1.2;
        const mound = new THREE.Mesh(new THREE.SphereGeometry(r, 5, 4), this._gm(0x4a3a2a));
        mound.scale.y = h / r;
        mound.position.y = -r * 0.1;
        g.add(mound);
        g.position.set(x, 0, z);
        return g;
    }

    _gridSplitFence(x, z, rng, s) {
        const g = new THREE.Group();
        const len = 4 + rng(s + 10) * 4;
        const h = 1.0;
        for (let i = 0; i < 3; i++) {
            const px = i * (len / 2) - len / 2;
            const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, h + 0.2, 0.14), this._gm(0x8B7355));
            post.position.set(px, (h + 0.2) / 2, 0);
            g.add(post);
        }
        const rail = new THREE.Mesh(new THREE.BoxGeometry(len, 0.07, 0.07), this._gm(0x9B8365));
        rail.position.y = h * 0.6;
        g.add(rail);
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 30) * Math.PI;
        return g;
    }

    _gridTireStack(x, z, rng, s) {
        const g = new THREE.Group();
        for (let i = 0; i < 3; i++) {
            const tire = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.12, 4, 6), this._gm(0x222222));
            tire.position.set(i * 0.65 - 0.65, 0.32, 0);
            tire.rotation.x = Math.PI / 2;
            g.add(tire);
        }
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 30) * Math.PI;
        return g;
    }

    _gridDeadTree(x, z, rng, s) {
        const g = new THREE.Group();
        const sc = 0.8 + rng(s + 10) * 0.4;
        const trH = 4.0 * sc;
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12 * sc, 0.35 * sc, trH, 5), this._gm(0x5a4a3a));
        trunk.position.y = trH / 2;
        g.add(trunk);
        for (let i = 0; i < 2; i++) {
            const bLen = 1.2 + rng(s + 20 + i) * 1.0;
            const branch = new THREE.Mesh(
                new THREE.CylinderGeometry(0.02 * sc, 0.05 * sc, bLen * sc, 3), this._gm(0x5a4a3a)
            );
            const bY = trH * (0.55 + i * 0.2);
            const bAngle = rng(s + 50 + i) * Math.PI * 2;
            branch.position.set(Math.cos(bAngle) * 0.5 * sc, bY, Math.sin(bAngle) * 0.5 * sc);
            branch.rotation.z = Math.cos(bAngle) * 0.7;
            branch.rotation.x = Math.sin(bAngle) * 0.7;
            g.add(branch);
        }
        g.position.set(x, 0, z);
        return g;
    }

    _gridHedgeRow(x, z, rng, s) {
        const g = new THREE.Group();
        const w = 3 + rng(s + 30) * 2;
        const h = 1.2 + rng(s + 40) * 0.4;
        const hedge = new THREE.Mesh(new THREE.BoxGeometry(w, h, 1.2), this._gm(0x1a4a15));
        hedge.position.y = h / 2;
        g.add(hedge);
        g.position.set(x, 0, z);
        g.rotation.y = rng(s + 50) * Math.PI;
        return g;
    }

    _gridBirchTrees(x, z, rng, s) {
        const g = new THREE.Group();
        const sc = 0.8 + rng(s + 20) * 0.3;
        const trH = 4.5 * sc;
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1 * sc, 0.16 * sc, trH, 5), this._gm(0xddd8c8));
        trunk.position.y = trH / 2;
        g.add(trunk);
        const crR = 1.5 * sc;
        const crown = new THREE.Mesh(new THREE.SphereGeometry(crR, 5, 4), this._gm(0x4a8a3a));
        crown.position.y = trH + crR * 0.4;
        g.add(crown);
        g.position.set(x, 0, z);
        return g;
    }

    _gridMushroomRing(x, z, rng, s) {
        const g = new THREE.Group();
        const colors = [0xcc3333, 0xdd8844, 0xeedd88, 0xaa6633];
        for (let i = 0; i < 4; i++) {
            const a = (i / 4) * Math.PI * 2;
            const dist = 1.2 + rng(s + 30 + i) * 1;
            const sc = 0.4 + rng(s + 40 + i) * 0.4;
            const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.07 * sc, 0.09 * sc, 0.4 * sc, 4), this._gm(0xeeddcc));
            stem.position.set(Math.cos(a) * dist, 0.2 * sc, Math.sin(a) * dist);
            g.add(stem);
            const cap = new THREE.Mesh(
                new THREE.SphereGeometry(0.18 * sc, 4, 3, 0, Math.PI * 2, 0, Math.PI / 2),
                this._gm(colors[i])
            );
            cap.position.set(Math.cos(a) * dist, 0.4 * sc, Math.sin(a) * dist);
            g.add(cap);
        }
        g.position.set(x, 0, z);
        return g;
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

        const hue = 0.55 + Math.random() * 0.15;
        const bodyColor = new THREE.Color().setHSL(hue, 0.06, 0.15 + Math.random() * 0.1);
        const geo = new THREE.BoxGeometry(w, h, d);
        const mat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.8 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = h / 2;
        mesh.castShadow = true;
        group.add(mesh);

        const trimGeo = new THREE.BoxGeometry(w + 0.2, 0.3, d + 0.2);
        const trimMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6 });
        for (const ty of [0.15, h]) {
            const trim = new THREE.Mesh(trimGeo, trimMat);
            trim.position.y = ty;
            group.add(trim);
        }

        const roofGeo = new THREE.BoxGeometry(w * 0.3, 1.8, d * 0.3);
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.7 });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = h + 0.9;
        roof.castShadow = true;
        group.add(roof);

        const warmColor = 0xffffaa;
        const coolColor = 0xaaddff;
        const addWindowRow = (faceAxis, offset, faceW) => {
            for (let wy = 2.5; wy < h - 1.5; wy += 3) {
                for (let wx = -faceW / 2 + 1.5; wx < faceW / 2 - 1; wx += 2.2) {
                    const lit = Math.random() > 0.25;
                    const winGeo = new THREE.PlaneGeometry(0.9, 1.4);
                    const color = lit ? (Math.random() > 0.3 ? warmColor : coolColor) : 0x181818;
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
        const baseGeo = new THREE.BoxGeometry(0.6, 0.08, 0.6);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.y = 0.04;
        group.add(base);
        const coneGeo = new THREE.ConeGeometry(0.28, 0.75, 8);
        const coneMat = new THREE.MeshStandardMaterial({ color: 0xff5500, roughness: 0.6 });
        const cone = new THREE.Mesh(coneGeo, coneMat);
        cone.position.y = 0.46;
        cone.castShadow = true;
        group.add(cone);
        const stripeGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.12, 8);
        const stripeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.3 });
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
        const h = dec.h || 6;
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.6, roughness: 0.35 });

        const poleGeo = new THREE.CylinderGeometry(0.12, 0.16, h, 8);
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.y = h / 2;
        pole.castShadow = true;
        group.add(pole);

        const baseGeo = new THREE.CylinderGeometry(0.35, 0.4, 0.3, 8);
        const base = new THREE.Mesh(baseGeo, poleMat);
        base.position.y = 0.15;
        group.add(base);

        const armGeo = new THREE.BoxGeometry(1.8, 0.1, 0.1);
        const arm = new THREE.Mesh(armGeo, poleMat);
        arm.position.set(0.8, h - 0.1, 0);
        group.add(arm);

        const lampGeo = new THREE.BoxGeometry(1.2, 0.2, 0.4);
        const lampMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, emissive: 0xffeecc, emissiveIntensity: 0.5 });
        const lamp = new THREE.Mesh(lampGeo, lampMat);
        lamp.position.set(0.8, h - 0.3, 0);
        group.add(lamp);

        group.position.set(dec.x, 0, dec.z);
        if (dec.rot !== undefined) group.rotation.y = dec.rot;
        return group;
    }

    _createBarrier(dec) {
        const group = new THREE.Group();
        const len = dec.len || 4;
        const count = Math.round(len / 0.5);

        for (let i = 0; i < count; i++) {
            for (let row = 0; row < 3; row++) {
                const tireGeo = new THREE.TorusGeometry(0.22, 0.1, 6, 8);
                const tireMat = new THREE.MeshStandardMaterial({
                    color: row % 2 === 0 ? 0x222222 : 0xcc0000,
                    roughness: 0.85,
                });
                const tire = new THREE.Mesh(tireGeo, tireMat);
                tire.position.set(i * 0.5 - len / 2, 0.25 + row * 0.45, 0);
                tire.rotation.y = Math.PI / 2;
                tire.castShadow = true;
                group.add(tire);
            }
        }
        group.position.set(dec.x, 0, dec.z);
        if (dec.rot !== undefined) group.rotation.y = dec.rot;
        return group;
    }

    _createGrandstand(dec) {
        const group = new THREE.Group();
        const w = dec.w || 20;
        const rows = dec.rows || 5;
        const standMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.7 });
        const seatMat = new THREE.MeshStandardMaterial({ color: dec.color || 0xcc2222, roughness: 0.6 });

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

        const roofGeo = new THREE.BoxGeometry(w + 2, 0.2, rows * 1.6 + 3);
        const roofMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.5 });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.set(0, rows * 1.2 + 2.5, rows * 0.8);
        roof.castShadow = true;
        group.add(roof);

        for (let side = -1; side <= 1; side += 2) {
            const pillarGeo = new THREE.CylinderGeometry(0.2, 0.2, rows * 1.2 + 2.5, 6);
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
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.5, roughness: 0.5 });

        for (let side = -1; side <= 1; side += 2) {
            const poleGeo = new THREE.CylinderGeometry(0.15, 0.18, h, 6);
            const pole = new THREE.Mesh(poleGeo, poleMat);
            pole.position.set(side * (w / 2 - 0.5), h / 2, 0);
            pole.castShadow = true;
            group.add(pole);
        }

        const sponsors = [
            { name: 'APEX MOTORS', sub: 'Performance Engines', bg: '#b71c1c', fg: '#ffffff', accent: '#ffcc00' },
            { name: 'TURBOMAX', sub: 'Turbochargers', bg: '#0d47a1', fg: '#ffffff', accent: '#4fc3f7' },
            { name: 'GRIP TIRES', sub: 'Track Compound', bg: '#1b1b1b', fg: '#ff9800', accent: '#ffffff' },
            { name: 'NITRO FUEL', sub: 'High Octane', bg: '#1a1a1a', fg: '#00e676', accent: '#69f0ae' },
            { name: 'SPEEDTECH', sub: 'Aero Solutions', bg: '#f5f5f5', fg: '#212121', accent: '#f44336' },
            { name: 'VORTEX OIL', sub: 'Synthetic Racing', bg: '#0a1628', fg: '#29b6f6', accent: '#ffffff' },
            { name: 'DYNAMO', sub: 'Electric Power', bg: '#2a0845', fg: '#e040fb', accent: '#ffffff' },
            { name: 'RUSH ENERGY', sub: 'Fuel Your Drive', bg: '#e65100', fg: '#ffffff', accent: '#ffd54f' },
        ];
        const sp = sponsors[Math.floor(Math.random() * sponsors.length)];

        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = sp.bg;
        ctx.fillRect(0, 0, 512, 256);

        ctx.fillStyle = sp.accent;
        ctx.fillRect(0, 0, 512, 6);
        ctx.fillRect(0, 250, 512, 6);
        ctx.fillRect(0, 0, 6, 256);
        ctx.fillRect(506, 0, 6, 256);

        ctx.fillStyle = sp.fg;
        ctx.font = 'bold 64px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sp.name, 256, 100);

        ctx.fillStyle = sp.accent;
        ctx.fillRect(120, 140, 272, 2);

        ctx.fillStyle = sp.accent;
        ctx.font = '28px sans-serif';
        ctx.fillText(sp.sub, 256, 175);

        const tex = new THREE.CanvasTexture(canvas);
        const boardGeo = new THREE.BoxGeometry(w, w * 0.5, 0.2);
        const boardMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4 });
        const board = new THREE.Mesh(boardGeo, boardMat);
        board.position.set(0, h - w * 0.25, 0);
        board.castShadow = true;
        group.add(board);

        const frameMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.4, roughness: 0.5 });
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
        const postMat = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.85 });
        const railMat = new THREE.MeshStandardMaterial({ color: 0x9B8365, roughness: 0.85 });

        for (let i = 0; i < postCount; i++) {
            const px = i * (len / (postCount - 1)) - len / 2;
            const pGeo = new THREE.BoxGeometry(0.15, h + 0.2, 0.15);
            const post = new THREE.Mesh(pGeo, postMat);
            post.position.set(px, (h + 0.2) / 2, 0);
            post.castShadow = true;
            group.add(post);
        }
        for (const ry of [h * 0.35, h * 0.75]) {
            const railGeo = new THREE.BoxGeometry(len, 0.08, 0.08);
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

    _setupLights(track) {
        // Remove old lights
        const oldLights = this.scene.children.filter(
            c => c.isLight
        );
        oldLights.forEach(l => this.scene.remove(l));

        // Ambient
        const ambient = new THREE.AmbientLight(track.ambientLight, 1.2);
        this.scene.add(ambient);
        this.trackObjects.push(ambient);

        // Hemisphere
        const hemi = new THREE.HemisphereLight(track.skyColor, track.groundColor, 0.8);
        this.scene.add(hemi);
        this.trackObjects.push(hemi);

        // Sun
        const sun = new THREE.DirectionalLight(track.sunColor, 1.0);
        sun.position.set(
            track.sunPosition.x, track.sunPosition.y, track.sunPosition.z
        );
        sun.castShadow = true;
        sun.shadow.mapSize.width = 1024;
        sun.shadow.mapSize.height = 1024;
        sun.shadow.bias = -0.0003;
        sun.shadow.normalBias = 0.04;
        sun.shadow.camera.near = 10;
        sun.shadow.camera.far = 400;
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
        if (this._gridMatCache) {
            for (const m of Object.values(this._gridMatCache)) m.dispose();
            this._gridMatCache = null;
        }
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
