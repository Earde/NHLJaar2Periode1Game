class MeshLoader extends THREE.Mesh {
    width: number;
    height: number;
    depth: number;
    loaded = false;

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
        this.loaded = true;
    }

    loadObject(obj, scene, scale) {
        let geometry: THREE.Geometry = obj.geometry.clone();
        geometry.computeVertexNormals();
        this.geometry = geometry.clone();
        let box = new THREE.Box3().setFromObject(obj);
        this.scale.set(scale.x, scale.y, scale.z);
        this.width = (box.max.x - box.min.x) * this.scale.x;
        this.height = (box.max.z - box.min.z) * this.scale.y;
        this.depth = (box.max.y - box.min.y) * this.scale.z;
        this.material = obj.material.clone();
        this.material.side = THREE.DoubleSide;
        this.material.needsUpdate = true;
        this.castShadow = true;
        this.receiveShadow = true;
        this.load(scene);
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