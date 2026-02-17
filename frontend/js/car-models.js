/**
 * CarModelLoader
 * Loads a single user-provided car model and normalizes it for in-game use.
 */

class CarModelLoader {
    constructor() {
        this.loaded = false;
        this.models = [];
        this._carDefs = [
            {
                name: 'F5 Racer',
                urls: [
                    '/assets/source/uploads_files_5387911_f5.glb',
                    '/assets/uploads_files_5387911_f5.glb',
                ],
            },
        ];
    }

    async load() {
        if (this.loaded) return;
        if (typeof THREE === 'undefined' || !THREE.GLTFLoader) {
            console.warn('[CarModelLoader] THREE.GLTFLoader not available');
            return;
        }

        const loader = new THREE.GLTFLoader();

        for (const def of this._carDefs) {
            let loadedGroup = null;

            for (const url of def.urls) {
                const model = await new Promise((resolve) => {
                    loader.load(
                        url,
                        (gltf) => resolve(gltf),
                        undefined,
                        () => resolve(null)
                    );
                });

                if (!model || !model.scene) continue;

                const group = this._prepareModel(model.scene.clone(true));
                if (!group) continue;

                loadedGroup = group;
                console.log('[CarModelLoader] Loaded', def.name, 'from', url);
                break;
            }

            if (loadedGroup) {
                this.models.push({ name: def.name, group: loadedGroup });
            } else {
                console.warn('[CarModelLoader] Failed to load', def.name);
            }
        }

        if (this.models.length > 0) {
            this.loaded = true;
            console.log('[CarModelLoader] Total models loaded:', this.models.length);
        } else {
            console.warn('[CarModelLoader] No valid car models loaded');
        }
    }

    _prepareModel(modelRoot) {
        const wrapper = new THREE.Group();
        wrapper.add(modelRoot);

        modelRoot.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = false;
                // Strip all normal/bump/displacement maps to prevent wavy artifacts
                const cleanMat = (m) => {
                    if (!m) return;
                    if (m.normalMap) { m.normalMap.dispose(); m.normalMap = null; }
                    if (m.normalScale) m.normalScale.set(1, 1);
                    if (m.bumpMap) { m.bumpMap.dispose(); m.bumpMap = null; m.bumpScale = 0; }
                    if (m.displacementMap) { m.displacementMap.dispose(); m.displacementMap = null; m.displacementScale = 0; }
                    if (m.roughnessMap) { m.roughnessMap.dispose(); m.roughnessMap = null; }
                    if (m.metalnessMap) { m.metalnessMap.dispose(); m.metalnessMap = null; }
                    m.needsUpdate = true;
                };
                if (Array.isArray(child.material)) {
                    child.material.forEach(cleanMat);
                } else {
                    cleanMat(child.material);
                }
            }
        });

        // Pick best upright orientation from 90° candidates by minimizing vertical dimension.
        const candidates = [
            { x: 0, z: 0 },
            { x: -Math.PI / 2, z: 0 },
            { x: Math.PI / 2, z: 0 },
            { x: 0, z: Math.PI / 2 },
            { x: 0, z: -Math.PI / 2 },
        ];

        let best = null;
        for (const rot of candidates) {
            modelRoot.rotation.set(rot.x, 0, rot.z);
            wrapper.updateMatrixWorld(true);
            const box = new THREE.Box3().setFromObject(wrapper);
            if (box.isEmpty()) continue;

            const size = box.getSize(new THREE.Vector3());
            const horiz = Math.max(size.x, size.z);
            const score = size.y / (horiz + 1e-6);

            if (!best || score < best.score) {
                best = { rot, box, size, score };
            }
        }

        if (!best) return null;

        modelRoot.rotation.set(best.rot.x, 0, best.rot.z);
        wrapper.updateMatrixWorld(true);

        // Ensure long axis is Z (game forward axis)
        let box = new THREE.Box3().setFromObject(wrapper);
        let size = box.getSize(new THREE.Vector3());

        // Bail out early if imported model bounds are nonsensical.
        const maxDimPre = Math.max(size.x, size.y, size.z);
        if (!Number.isFinite(maxDimPre) || maxDimPre < 0.001 || maxDimPre > 5000) {
            console.warn('[CarModelLoader] Invalid model bounds, skipping');
            return null;
        }

        if (size.x > size.z) {
            modelRoot.rotation.y += Math.PI / 2;
            wrapper.updateMatrixWorld(true);
            box = new THREE.Box3().setFromObject(wrapper);
            size = box.getSize(new THREE.Vector3());
        }

        // Scale to a larger in-game footprint
        const targetLength = 5.2;
        const currentLength = Math.max(size.x, size.z);
        const rawScale = currentLength > 0.001 ? targetLength / currentLength : 1;
        const scale = Math.min(5, Math.max(0.05, rawScale));
        modelRoot.scale.setScalar(scale);
        wrapper.updateMatrixWorld(true);

        // Center at x/z and place bottom on y=0
        box = new THREE.Box3().setFromObject(wrapper);
        const center = box.getCenter(new THREE.Vector3());
        modelRoot.position.x -= center.x;
        modelRoot.position.z -= center.z;
        modelRoot.position.y -= box.min.y;
        wrapper.updateMatrixWorld(true);

        return wrapper;
    }

    getCarModel(index) {
        if (!this.loaded || index < 0 || index >= this.models.length) return null;
        return this.models[index].group.clone(true);
    }

    getCount() {
        return this.models.length;
    }

    getName(index) {
        if (index < 0 || index >= this.models.length) return 'Unknown';
        return this.models[index].name;
    }
}

window.CarModelLoader = CarModelLoader;
