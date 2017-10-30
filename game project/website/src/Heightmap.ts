import MeshBasicMaterial = THREE.MeshBasicMaterial;
import MeshPhongMaterial = THREE.MeshPhongMaterial;

class Heightmap extends MeshLoader {
    constructor(w, h, d) {
        super(new THREE.PlaneGeometry(w, d), new THREE.Material(), w, h, d);
        this.castShadow = false;
    }

    getHeightData(img) {
        let canvas = document.createElement( 'canvas' );
        canvas.width = img.width;
        canvas.height = img.height;
        let context = canvas.getContext( '2d' );
        context.drawImage(img,0,0, img.width, img.height);
        let pix = context.getImageData(0, 0, img.width, img.height).data;
        let data = [];
        let j=0;
        for (let i = 0; i<pix.length; i +=4) {
            data.push((pix[i]+pix[i+1]+pix[i+2]) / 3);
        }
        return data;
    }

    load(scene) {
        let img = new Image();
        let imagePrefix = "textures/";
        let imageName = "heightmap1";
        let imageSuffix = ".png";
        img.onload = () => {
            //var material = this.createMaterial(true, THREE.BackSide, 1, 1, imagePrefix + imageName + imageSuffix);
            var material = new MeshPhongMaterial();
            material.side = THREE.BackSide;
            material.vertexColors = THREE.VertexColors;
            material.wireframe = false;
            material.needsUpdate = true;
            this.material = material;
            var geometry = new THREE.PlaneGeometry(this.width, this.depth, img.width - 1, img.height - 1);
            var data = this.getHeightData(img);
            for (let i = 0; i < geometry.vertices.length; i++) {
                geometry.vertices[i].z -= data[i] / 255 * this.height;
            }
            let indices = ['a', 'b', 'c', 'd'];
            for (let i = 0; i < geometry.faces.length; i++) {
                let sides = (geometry.faces[i] instanceof THREE.Face3) ? 3 : 4;
                for (let j = 0; j < sides; j++) {
                    let color = new THREE.Color(0xffffff);
                    let position = geometry.vertices[geometry.faces[i][indices[j]]];
                    color.setRGB(0.7 + (Math.abs(position.x) / (this.width / 2)) * 0.3, 1.0 - (0.5 + (Math.abs(position.z) / (this.height / 2)) * 0.5), (Math.abs(position.y) / (this.depth / 2)) * 0.25);
                    geometry.faces[i].vertexColors[j] = color;
                }
            }
            geometry.verticesNeedUpdate = true;
            geometry.computeFaceNormals();
            geometry.computeVertexNormals();
            this.geometry = geometry;
            this.position = new THREE.Vector3(0, 0, 0);
            let q = new THREE.Quaternion();
            q.setFromAxisAngle( new THREE.Vector3(-1,0,0), 1.5 * Math.PI );
            this.quaternion.multiplyQuaternions( q, this.quaternion );
            super.load(scene);
        };
        img.src = imagePrefix + imageName + imageSuffix;
    }

    getHeightAt(pos: THREE.Vector3) {
        let ray = new THREE.Raycaster(new THREE.Vector3(pos.x, this.height + 1, pos.z), new THREE.Vector3(0, -1, 0));
        let obj = ray.intersectObject(this);
        if (obj.length > 0) {
            return this.height + 1 - obj[0].distance;
        }
        return 0;
    }
}