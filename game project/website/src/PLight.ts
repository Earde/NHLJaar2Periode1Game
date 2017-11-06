class PLight extends THREE.PointLight {
    constructor(x, y, z, color) {
        super(color, 1, 0, 0);
        this.position.set(x, y, z);
        this.lookAt(new THREE.Vector3(0, 0, 0));
        this.receiveShadow = false;
        this.castShadow = true;
        this.shadow.bias = -0.005;
        this.shadow.mapSize = new THREE.Vector2(2048, 2048);
    }

    update(creator, origin) {
        /*
        let rayCaster = new THREE.Raycaster(new THREE.Vector3(origin.x, origin.y, origin.z),
            new THREE.Vector3(creator.player.getWorldPosition().x - origin.x, creator.player.getWorldPosition().y - origin.y, creator.player.getWorldPosition().z - origin.z).normalize());
        let obj = rayCaster.intersectObject(creator.player);
        if (obj.length > 0) {
            let newPos = new THREE.Vector3(origin.x, origin.y, origin.z).add(rayCaster.ray.direction.multiplyScalar(obj[0].distance * 0.80));
            this.position.set(newPos.x, newPos.y, newPos.z);
        }
        */
        //this.lookAt(new THREE.Vector3(creator.player.getWorldPosition().x, creator.player.getWorldPosition().y, creator.player.getWorldPosition().z));
        //this.updateMatrix();
    }
}