class MeshLoader extends THREE.Mesh {
    width: number;
    height: number;
    depth: number;

    constructor(mesh, material, w, h, d) {
        super(mesh, material);
        this.width = w;
        this.height = h;
        this.depth = d;
        this.receiveShadow = true;
        this.castShadow = true;
    }

    load(scene) {
        scene.add(this);
    }

    createMaterial(phong, side, xSets, ySets, uri) {
        let material;
        if (phong) {
            material = new THREE.MeshPhongMaterial();
        } else {
            material = new THREE.MeshBasicMaterial();
        }
        let texture = new THREE.TextureLoader().load(uri);
        texture.wrapS = material.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(xSets, ySets);
        texture.generateMipmaps = true;
        material.map = texture;
        material.side = side;
        material.needsUpdate = true;
        return material;
    }

    getDistanceAt(pos: THREE.Vector3, dir: THREE.Vector3) {
        let ray = new THREE.Raycaster(new THREE.Vector3(pos.x, pos.y, pos.z), new THREE.Vector3(dir.x, dir.y, dir.z));
        let obj = ray.intersectObject(this);
        if (obj.length > 0) {
            return obj[0].distance;
        }
        return 0;
    }
}