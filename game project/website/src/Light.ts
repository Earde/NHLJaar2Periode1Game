class Light extends THREE.PointLight {
    constructor(x, y, z, color) {
        super(color, 1, 0, 2);
        this.position.set(x, y, z);
        this.lookAt(new THREE.Vector3(0, 0, 0));
        this.receiveShadow = false;
        this.castShadow = true;
        this.shadow.mapSize = new THREE.Vector2(2048, 2048);
        this.shadow.bias = -0.005;
    }
}