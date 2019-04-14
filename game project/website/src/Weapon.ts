class Weapon extends MeshLoader {
    shot = false;
    power = 40;
    lookDistance = 0;

    constructor() {
        super(new THREE.Geometry(), new THREE.MeshPhongMaterial(), 0, 0, 0);
    }

    //update weapon position based on camera
    update(distance) {
        //rotate weapon to where crosshair is looking
        this.lookAt(new THREE.Vector3(0, 0, -distance));
        this.rotateX(-Math.PI / 2);
        this.lookDistance = distance;
        //this.updateMatrix();
    }

    //create new bullet and add to creator
    shoot(creator, isMouseDown, delta, network) {
        if (this.shot) {
            this.shot = creator.bullet.update(delta);
            if (!this.shot) {
                creator.scene.remove(creator.bullet);
            }
        } else if (isMouseDown && !this.shot) {
            //let middleOfWeapon = this.getWorldPosition().add(new THREE.Vector3(this.middleOfObject.x * this.rotation.x, this.middleOfObject.y * this.rotation.y, this.middleOfObject.z * this.rotation.z));
            //let endOfWeapon = middleOfWeapon.add(creator.camera.getWorldDirection().multiplyScalar(this.depth / 2));
            let endOfWeapon = this.getWorldPosition().clone();
            //p1 = end of weapon position, p2 = crosshair position on heightmap
            creator.bullet.shoot(endOfWeapon.clone(),
                this.getWorldPosition().add(creator.camera.getWorldDirection().multiplyScalar(this.lookDistance)),
                network, this.power);
            creator.scene.add(creator.bullet);
            this.shot = true;
        }
    }

    resize(width, height) {
        this.position.set(width / 16, -(height / 10 * 4), -1);
    }
}