/**
 * Ammo.js Stub — Lightweight pure-JS physics engine that mimics the Bullet/Ammo.js API.
 * Provides: gravity, rigid body dynamics, ground plane collision, AABB wall collision.
 * Used instead of the full Ammo.js WASM build for simplicity and bundle size.
 */

// ========== btVector3 ==========
class btVector3 {
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }
    x() { return this._x; }
    y() { return this._y; }
    z() { return this._z; }
    setX(v) { this._x = v; }
    setY(v) { this._y = v; }
    setZ(v) { this._z = v; }
    setValue(x, y, z) { this._x = x; this._y = y; this._z = z; }
    length() { return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z); }
    normalize() {
        const l = this.length() || 1;
        this._x /= l; this._y /= l; this._z /= l;
        return this;
    }
    op_add(v) { return new btVector3(this._x + v._x, this._y + v._y, this._z + v._z); }
    op_sub(v) { return new btVector3(this._x - v._x, this._y - v._y, this._z - v._z); }
    op_mul(s) { return new btVector3(this._x * s, this._y * s, this._z * s); }
    dot(v) { return this._x * v._x + this._y * v._y + this._z * v._z; }
}

// ========== btQuaternion ==========
class btQuaternion {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this._x = x; this._y = y; this._z = z; this._w = w;
    }
    x() { return this._x; }
    y() { return this._y; }
    z() { return this._z; }
    w() { return this._w; }
    setX(v) { this._x = v; }
    setY(v) { this._y = v; }
    setZ(v) { this._z = v; }
    setW(v) { this._w = v; }
    setValue(x, y, z, w) { this._x = x; this._y = y; this._z = z; this._w = w; }
    setEulerZYX(z, y, x) {
        const c1 = Math.cos(x / 2), s1 = Math.sin(x / 2);
        const c2 = Math.cos(y / 2), s2 = Math.sin(y / 2);
        const c3 = Math.cos(z / 2), s3 = Math.sin(z / 2);
        this._x = s1 * c2 * c3 + c1 * s2 * s3;
        this._y = c1 * s2 * c3 - s1 * c2 * s3;
        this._z = c1 * c2 * s3 + s1 * s2 * c3;
        this._w = c1 * c2 * c3 - s1 * s2 * s3;
    }
    normalize() {
        const l = Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w) || 1;
        this._x /= l; this._y /= l; this._z /= l; this._w /= l;
        return this;
    }
}

// ========== btTransform ==========
class btTransform {
    constructor() {
        this._origin = new btVector3(0, 0, 0);
        this._rotation = new btQuaternion(0, 0, 0, 1);
    }
    setIdentity() {
        this._origin.setValue(0, 0, 0);
        this._rotation.setValue(0, 0, 0, 1);
    }
    setOrigin(v) { this._origin = v; }
    getOrigin() { return this._origin; }
    setRotation(q) { this._rotation = q; }
    getRotation() { return this._rotation; }
}

// ========== Shapes ==========
class btBoxShape {
    constructor(halfExtents) {
        this.halfExtents = halfExtents;
        this.type = 'box';
    }
    calculateLocalInertia(mass, out) {
        const hx = this.halfExtents._x, hy = this.halfExtents._y, hz = this.halfExtents._z;
        const f = mass / 3.0;
        out._x = f * (hy * hy + hz * hz);
        out._y = f * (hx * hx + hz * hz);
        out._z = f * (hx * hx + hy * hy);
    }
}

class btCompoundShape {
    constructor() {
        this.children = [];
        this.type = 'compound';
    }
    addChildShape(transform, shape) {
        this.children.push({ transform, shape });
    }
    calculateLocalInertia(mass, out) {
        // Approximate with first child
        if (this.children.length > 0 && this.children[0].shape.calculateLocalInertia) {
            this.children[0].shape.calculateLocalInertia(mass, out);
        }
    }
}

// ========== Motion State ==========
class btDefaultMotionState {
    constructor(transform) {
        this._transform = transform || new btTransform();
    }
    getWorldTransform(out) {
        if (out) {
            out._origin = this._transform._origin;
            out._rotation = this._transform._rotation;
        }
        return this._transform;
    }
}

// ========== btRigidBodyConstructionInfo ==========
class btRigidBodyConstructionInfo {
    constructor(mass, motionState, shape, localInertia) {
        this.mass = mass;
        this.motionState = motionState;
        this.shape = shape;
        this.localInertia = localInertia;
    }
}

// ========== btRigidBody ==========
class btRigidBody {
    constructor(info) {
        this.mass = info.mass;
        this.shape = info.shape;
        this.inverseMass = info.mass > 0 ? 1.0 / info.mass : 0;

        const t = info.motionState._transform;
        this.position = new btVector3(t._origin._x, t._origin._y, t._origin._z);
        this.rotation = new btQuaternion(t._rotation._x, t._rotation._y, t._rotation._z, t._rotation._w);
        this.velocity = new btVector3(0, 0, 0);
        this.angularVelocity = new btVector3(0, 0, 0);
        this.forces = new btVector3(0, 0, 0);
        this.torques = new btVector3(0, 0, 0);

        this.friction = 0.5;
        this.restitution = 0.3;
        this.linearDamping = 0.0;
        this.angularDamping = 0.0;
        this.userIndex = -1;
        this._activationState = 0;
    }

    setFriction(f) { this.friction = f; }
    setRestitution(r) { this.restitution = r; }
    setLinearVelocity(v) { this.velocity._x = v._x; this.velocity._y = v._y; this.velocity._z = v._z; }
    getLinearVelocity() { return this.velocity; }
    setAngularVelocity(v) { this.angularVelocity._x = v._x; this.angularVelocity._y = v._y; this.angularVelocity._z = v._z; }
    getAngularVelocity() { return this.angularVelocity; }
    setDamping(lin, ang) { this.linearDamping = lin; this.angularDamping = ang; }
    setActivationState(s) { this._activationState = s; }
    setUserIndex(i) { this.userIndex = i; }
    getUserIndex() { return this.userIndex; }

    applyCentralForce(force) {
        this.forces._x += force._x;
        this.forces._y += force._y;
        this.forces._z += force._z;
    }

    applyTorque(torque) {
        this.torques._x += torque._x;
        this.torques._y += torque._y;
        this.torques._z += torque._z;
    }

    clearForces() {
        this.forces._x = 0; this.forces._y = 0; this.forces._z = 0;
        this.torques._x = 0; this.torques._y = 0; this.torques._z = 0;
    }

    getWorldTransform() {
        const t = new btTransform();
        t._origin = this.position;
        t._rotation = this.rotation;
        return t;
    }

    setWorldTransform(t) {
        this.position._x = t._origin._x;
        this.position._y = t._origin._y;
        this.position._z = t._origin._z;
        this.rotation._x = t._rotation._x;
        this.rotation._y = t._rotation._y;
        this.rotation._z = t._rotation._z;
        this.rotation._w = t._rotation._w;
    }

    isStaticObject() { return this.mass === 0; }
}

// ========== Collision Configuration / Dispatcher / etc ==========
class btDefaultCollisionConfiguration {}
class btCollisionDispatcher { constructor(config) {} }
class btDbvtBroadphase {}
class btSequentialImpulseConstraintSolver {}

// ========== DISABLE_DEACTIVATION constant ==========
const DISABLE_DEACTIVATION = 4;

// ========== btDiscreteDynamicsWorld ==========
class btDiscreteDynamicsWorld {
    constructor(dispatcher, broadphase, solver, config) {
        this.bodies = [];
        this.gravity = new btVector3(0, -15, 0);
    }

    setGravity(g) {
        this.gravity._x = g._x;
        this.gravity._y = g._y;
        this.gravity._z = g._z;
    }

    addRigidBody(body) {
        this.bodies.push(body);
    }

    removeRigidBody(body) {
        const idx = this.bodies.indexOf(body);
        if (idx >= 0) this.bodies.splice(idx, 1);
    }

    stepSimulation(dt, maxSubSteps) {
        const numSubSteps = Math.min(maxSubSteps || 4, 4);
        const subDt = dt / numSubSteps;

        for (let step = 0; step < numSubSteps; step++) {
            this._substep(subDt);
        }

        // Friction applied ONCE per step (same on ground and in air)
        for (const body of this.bodies) {
            if (body.mass <= 0) continue;
            body.velocity._x *= 0.995;
            body.velocity._z *= 0.995;
        }

        // Clear forces AFTER all substeps
        for (const body of this.bodies) {
            body.clearForces();
        }
    }

    /**
     * Get the lowest point of a shape relative to body origin.
     * For compound shapes, checks all children's positions + half extents.
     */
    _getShapeBottomOffset(shape) {
        if (!shape) return 0;
        if (shape.type === 'compound') {
            let minY = 0;
            for (const child of shape.children) {
                const localY = child.transform._origin._y;
                const hy = child.shape.halfExtents ? child.shape.halfExtents._y : 0;
                const childBottom = localY - hy;
                if (childBottom < minY) minY = childBottom;
            }
            return minY;
        }
        if (shape.type === 'box') {
            return -shape.halfExtents._y;
        }
        return 0;
    }

    /**
     * Approximate local-space half extents from a body shape.
     * For compound shapes this aggregates all child box shapes.
     */
    _getShapeHitbox(shape) {
        if (!shape) {
            return { halfX: 0.9, halfZ: 2.0, minY: -0.1, maxY: 0.6 };
        }

        if (shape.type === 'box' && shape.halfExtents) {
            return {
                halfX: shape.halfExtents._x,
                halfZ: shape.halfExtents._z,
                minY: -shape.halfExtents._y,
                maxY: shape.halfExtents._y,
            };
        }

        if (shape.type === 'compound' && Array.isArray(shape.children) && shape.children.length > 0) {
            let minX = Infinity;
            let maxX = -Infinity;
            let minY = Infinity;
            let maxY = -Infinity;
            let minZ = Infinity;
            let maxZ = -Infinity;

            for (const child of shape.children) {
                const cx = child.transform?._origin?._x || 0;
                const cy = child.transform?._origin?._y || 0;
                const cz = child.transform?._origin?._z || 0;
                const hx = child.shape?.halfExtents?._x || 0;
                const hy = child.shape?.halfExtents?._y || 0;
                const hz = child.shape?.halfExtents?._z || 0;

                minX = Math.min(minX, cx - hx);
                maxX = Math.max(maxX, cx + hx);
                minY = Math.min(minY, cy - hy);
                maxY = Math.max(maxY, cy + hy);
                minZ = Math.min(minZ, cz - hz);
                maxZ = Math.max(maxZ, cz + hz);
            }

            return {
                halfX: Math.max(Math.abs(minX), Math.abs(maxX)),
                halfZ: Math.max(Math.abs(minZ), Math.abs(maxZ)),
                minY,
                maxY,
            };
        }

        return { halfX: 0.9, halfZ: 2.0, minY: -0.1, maxY: 0.6 };
    }

    _substep(dt) {
        // Integrate forces for dynamic bodies
        // NOTE: body.forces holds externally applied forces — we do NOT modify it here.
        // Gravity is combined with external forces for acceleration computation only.
        for (const body of this.bodies) {
            if (body.mass <= 0) continue; // static

            // Acceleration = (external_forces + gravity * mass) / mass
            const ax = (body.forces._x + this.gravity._x * body.mass) * body.inverseMass;
            const ay = (body.forces._y + this.gravity._y * body.mass) * body.inverseMass;
            const az = (body.forces._z + this.gravity._z * body.mass) * body.inverseMass;

            // Semi-implicit Euler: update velocity first, then position
            body.velocity._x += ax * dt;
            body.velocity._y += ay * dt;
            body.velocity._z += az * dt;

            // Linear damping
            const linDamp = Math.pow(1.0 - body.linearDamping, dt);
            body.velocity._x *= linDamp;
            body.velocity._y *= linDamp;
            body.velocity._z *= linDamp;

            // Integrate position
            body.position._x += body.velocity._x * dt;
            body.position._y += body.velocity._y * dt;
            body.position._z += body.velocity._z * dt;
        }

        // Collision: ground plane at y = 0 (shape-aware)
        for (const body of this.bodies) {
            if (body.mass <= 0) continue;

            const bottomOffset = this._getShapeBottomOffset(body.shape);
            const worldBottom = body.position._y + bottomOffset;

            if (worldBottom < 0) {
                // Push body up so bottom touches ground
                body.position._y -= worldBottom;
                // Kill downward velocity — no bouncing
                if (body.velocity._y < 0) {
                    body.velocity._y = 0;
                }
            }
        }

        // Collision: AABB wall bodies vs dynamic bodies
        for (const body of this.bodies) {
            if (body.mass <= 0) continue;

            for (const wall of this.bodies) {
                if (wall.mass > 0) continue;
                if (wall.userIndex === 0) continue; // skip ground
                if (!wall.shape || wall.shape.type !== 'box') continue;

                const hx = wall.shape.halfExtents._x;
                const hy = wall.shape.halfExtents._y;
                const hz = wall.shape.halfExtents._z;
                const wx = wall.position._x;
                const wy = wall.position._y;
                const wz = wall.position._z;

                const bx = body.position._x;
                const by = body.position._y;
                const bz = body.position._z;
                const hitbox = this._getShapeHitbox(body.shape);
                const carHalfX = hitbox.halfX;
                const carHalfZ = hitbox.halfZ;
                const carMinY = hitbox.minY;
                const carMaxY = hitbox.maxY;

                if (bx + carHalfX > wx - hx && bx - carHalfX < wx + hx &&
                    by + carMaxY > wy - hy && by + carMinY < wy + hy &&
                    bz + carHalfZ > wz - hz && bz - carHalfZ < wz + hz) {

                    const overlaps = [
                        { axis: 'x', pen: (hx + carHalfX) - Math.abs(bx - wx), sign: Math.sign(bx - wx) || 1 },
                        { axis: 'z', pen: (hz + carHalfZ) - Math.abs(bz - wz), sign: Math.sign(bz - wz) || 1 },
                    ];
                    overlaps.sort((a, b) => a.pen - b.pen);
                    const best = overlaps[0];

                    if (best.pen > 0) {
                        if (best.axis === 'x') {
                            body.position._x += best.sign * best.pen;
                            body.velocity._x *= -0.3;
                        } else {
                            body.position._z += best.sign * best.pen;
                            body.velocity._z *= -0.3;
                        }
                        body.velocity._x *= 0.85;
                        body.velocity._z *= 0.85;
                    }
                }
            }
        }
    }
}

// ========== Export as global Ammo ==========
function Ammo() {
    return Promise.resolve();
}

// Attach all classes
Ammo.btVector3 = btVector3;
Ammo.btQuaternion = btQuaternion;
Ammo.btTransform = btTransform;
Ammo.btBoxShape = btBoxShape;
Ammo.btCompoundShape = btCompoundShape;
Ammo.btDefaultMotionState = btDefaultMotionState;
Ammo.btRigidBodyConstructionInfo = btRigidBodyConstructionInfo;
Ammo.btRigidBody = btRigidBody;
Ammo.btDefaultCollisionConfiguration = btDefaultCollisionConfiguration;
Ammo.btCollisionDispatcher = btCollisionDispatcher;
Ammo.btDbvtBroadphase = btDbvtBroadphase;
Ammo.btSequentialImpulseConstraintSolver = btSequentialImpulseConstraintSolver;
Ammo.btDiscreteDynamicsWorld = btDiscreteDynamicsWorld;
Ammo.DISABLE_DEACTIVATION = DISABLE_DEACTIVATION;

window.Ammo = Ammo;
