class Weapon extends MeshLoader {
    shot = false;
    power = 40;
    lookDistance = 0;

    constructor() {
        super(new THREE.Geometry(), new THREE.MeshPhongMaterial(), 0, 0, 0);
    }

    loadObject(obj, scene, scale) {
        let geometry: THREE.Geometry = obj.geometry.clone();
        geometry.computeVertexNormals();
        this.geometry = geometry.clone();
        let box = new THREE.Box3().setFromObject(obj);
        this.scale.set(scale.x, scale.y, scale.z);
        this.width = box.max.x * this.scale.x;
        this.height = box.max.z * this.scale.y;
        this.depth = box.max.y * this.scale.z;
        this.material = obj.material.clone();
        this.material.side = THREE.DoubleSide;
        this.material.needsUpdate = true;
        this.castShadow = true;
        this.receiveShadow = true;
        this.load(scene);
    }

    update(distance) {
        //rotate weapon to where crosshair is looking
        this.lookAt(new THREE.Vector3(0, 0, -distance));
        this.rotateX(Math.PI / 2);
        this.lookDistance = distance;
        this.updateMatrix();
    }

    shoot(creator, isMouseDown, delta, network) {
        if (this.shot) {
            this.shot = creator.bullet.update(delta);
            if (!this.shot) {
                creator.scene.remove(creator.bullet);
            }
        } else if (isMouseDown && !this.shot) {
            //p1 = end of weapon position, p2 = crosshair point on map
            let endOfWeapon = this.getWorldPosition().add(creator.camera.getWorldDirection().multiplyScalar(this.depth));
            creator.bullet.shoot(endOfWeapon.clone(),
                this.getWorldPosition().add(creator.camera.getWorldDirection().multiplyScalar(this.lookDistance)),
                network, this.power);
            creator.scene.add(creator.bullet);
            this.shot = true;
        }
    }

    resize(width, height) {
        this.position.set(width / 24, -(height / 10 * 4), 0);
    }
}