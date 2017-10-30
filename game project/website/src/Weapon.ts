class Weapon extends MeshLoader {
    shot = false;
    power = 50;

    lookDistance = 0;

    constructor(w, h, d) {
        super(new THREE.BoxGeometry(w, h, d), new THREE.Material(), w, h, d);
    }

    load(camera: Camera) {
        let material = this.createMaterial(true, THREE.DoubleSide, 1, 1, "textures/gun.jpg");
        this.material = material;
        super.load(camera);
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
            creator.bullet.shoot(this.getWorldPosition().add(creator.camera.getWorldDirection().multiplyScalar(this.height / 2)),
                this.getWorldPosition().add(creator.camera.getWorldDirection().multiplyScalar(this.lookDistance)),
                network, this.power);
            creator.scene.add(creator.bullet);
            this.shot = true;
        }
    }

    resize(width, height) {
        this.position.set(width / 8, -height / 4, -this.height / 2);
    }
}