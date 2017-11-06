class DirectLight extends THREE.DirectionalLight {
    constructor(x, y, z, color) {
        super(color, 1);
        this.position.set(x, y, z);
        this.lookAt(new THREE.Vector3(0, 0, 0));
        this.receiveShadow = false;
        this.castShadow = true;
        this.shadow.mapSize = new THREE.Vector2(2048, 2048);
        this.shadow.bias = -0.0001;
        this.shadowCameraLeft = -500; //deprecated????? zou niet weten hoe het anders moet
        this.shadowCameraRight = 420;
        this.shadowCameraTop = 275;
        this.shadowCameraBottom = -260;
        this.shadowCameraNear = 1200;
        this.shadowCameraFar = 5000;
    }
}