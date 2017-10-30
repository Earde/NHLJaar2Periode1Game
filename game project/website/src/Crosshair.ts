class Crosshair extends MeshLoader {
    color;

    constructor(w, h, d, color) {
        super(new THREE.BoxGeometry(w, h, 0.01), new THREE.Material(), w, h, d);
        this.castShadow = false;
        this.receiveShadow = false;
        this.color = color;
    }

    public load(camera: Camera) {
        let material = new THREE.LineBasicMaterial({ color: this.color });
        this.material = material;
        this.position.set(0, 0, -this.depth);
        super.load(camera);
    }
}