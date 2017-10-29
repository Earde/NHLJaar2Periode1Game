class Crosshair extends MeshLoader {
    constructor(w, h, d) {
        super(new THREE.BoxGeometry(w, h, 0.01), new THREE.Material(), w, h, d);
        this.castShadow = false;
        this.receiveShadow = false;
    }

    public load(camera: Camera) {
        let material = new THREE.LineBasicMaterial({ color: 0xAAFFAA });
        this.material = material;
        this.position.set(0, 0, -this.depth);
        super.load(camera);
    }
}