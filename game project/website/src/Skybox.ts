class Skybox extends MeshLoader {
    constructor(w, h, d) {
        super(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial(), w, h, d);
        this.castShadow = false;
        this.receiveShadow = false;
    }

    load(scene) {
        let imagePrefix = "textures/skybox/skybox-";
        let directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
        let imageSuffix = ".jpg";
        let materialArray = [];
        for (let i = 0; i < 6; i++) {
            materialArray.push(this.createMaterial(false, THREE.BackSide, 1, 1, imagePrefix + directions[i] + imageSuffix));
        }
        let material = new THREE.MeshFaceMaterial(materialArray);
        this.material = material;
        super.load(scene);
    }
}