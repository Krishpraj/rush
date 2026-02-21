/**
 * Physics Engine wrapper for the racing game
 * Handles dynamics world, vehicle physics, and collision detection
 */

class PhysicsEngine {
    constructor() {
        this.world = null;
        this.bodies = [];
        this.initialized = false;
    }

    async init() {
        if (typeof Ammo === 'function') {
            await Ammo();
        }

        const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
        const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
        const broadphase = new Ammo.btDbvtBroadphase();
        const solver = new Ammo.btSequentialImpulseConstraintSolver();

        this.world = new Ammo.btDiscreteDynamicsWorld(
            dispatcher, broadphase, solver, collisionConfiguration
        );
        this.world.setGravity(new Ammo.btVector3(0, -15, 0));

        this.initialized = true;
        console.log('[Physics] Engine initialized');
    }

    createGround(width, depth) {
        const shape = new Ammo.btBoxShape(
            new Ammo.btVector3(width / 2, 0.5, depth / 2)
        );
        const transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(0, -0.5, 0));

        const motionState = new Ammo.btDefaultMotionState(transform);
        const localInertia = new Ammo.btVector3(0, 0, 0);
        const rbInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, shape, localInertia);
        const body = new Ammo.btRigidBody(rbInfo);

        body.setFriction(0.8);
        body.setRestitution(0.1);
        body.setUserIndex(0); // 0 = ground

        this.world.addRigidBody(body);
        this.bodies.push(body);
        return body;
    }

    createBox(position, halfExtents, mass, friction, restitution) {
        const shape = new Ammo.btBoxShape(
            new Ammo.btVector3(halfExtents.x, halfExtents.y, halfExtents.z)
        );
        const transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));

        const motionState = new Ammo.btDefaultMotionState(transform);
        const localInertia = new Ammo.btVector3(0, 0, 0);
        if (mass > 0) shape.calculateLocalInertia(mass, localInertia);

        const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
        const body = new Ammo.btRigidBody(rbInfo);

        body.setFriction(friction || 0.5);
        body.setRestitution(restitution || 0.3);
        if (mass > 0) {
            body.setDamping(0.05, 0.1);
            body.setActivationState(Ammo.DISABLE_DEACTIVATION);
        }

        this.world.addRigidBody(body);
        this.bodies.push(body);
        return body;
    }

    createCarBody(position, scale = 1) {
        const shape = new Ammo.btCompoundShape();
        const s = Math.max(0.5, scale || 1);

        // Main chassis
        const chassisShape = new Ammo.btBoxShape(
            new Ammo.btVector3(0.9 * s, 0.3 * s, 2.0 * s)
        );
        const chassisTransform = new Ammo.btTransform();
        chassisTransform.setIdentity();
        chassisTransform.setOrigin(new Ammo.btVector3(0, 0.3 * s, 0));
        shape.addChildShape(chassisTransform, chassisShape);

        // Cabin
        const cabinShape = new Ammo.btBoxShape(
            new Ammo.btVector3(0.7 * s, 0.25 * s, 0.8 * s)
        );
        const cabinTransform = new Ammo.btTransform();
        cabinTransform.setIdentity();
        cabinTransform.setOrigin(new Ammo.btVector3(0, 0.75 * s, -0.2 * s));
        shape.addChildShape(cabinTransform, cabinShape);

        const transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));

        const mass = 1200;
        const localInertia = new Ammo.btVector3(0, 0, 0);
        shape.calculateLocalInertia(mass, localInertia);

        const motionState = new Ammo.btDefaultMotionState(transform);
        const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
        const body = new Ammo.btRigidBody(rbInfo);

        body.setFriction(0.6);
        body.setRestitution(0.1);
        body.setDamping(0.05, 0.3);
        body.setActivationState(Ammo.DISABLE_DEACTIVATION);
        body.setUserIndex(1); // 1 = car

        this.world.addRigidBody(body);
        this.bodies.push(body);
        return body;
    }

    step(dt) {
        if (!this.world) return;
        this.world.stepSimulation(dt, 4);
    }

    getBodyTransform(body) {
        const wt = body.getWorldTransform();
        const origin = wt.getOrigin();
        const rotation = wt.getRotation();
        return {
            position: { x: origin.x(), y: origin.y(), z: origin.z() },
            quaternion: { x: rotation.x(), y: rotation.y(), z: rotation.z(), w: rotation.w() }
        };
    }

    setBodyTransform(body, position, quaternion) {
        const transform = new Ammo.btTransform();
        transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));
        if (quaternion) {
            transform.setRotation(
                new Ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w)
            );
        }
        body.setWorldTransform(transform);
        body.position = transform.getOrigin();
        body.rotation = transform.getRotation();
        body.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
        body.setAngularVelocity(new Ammo.btVector3(0, 0, 0));
    }

    removeBody(body) {
        this.world.removeRigidBody(body);
        const idx = this.bodies.indexOf(body);
        if (idx >= 0) this.bodies.splice(idx, 1);
    }

    cleanup() {
        for (const body of this.bodies) {
            this.world.removeRigidBody(body);
        }
        this.bodies = [];
    }
}

window.PhysicsEngine = PhysicsEngine;
