class Bullet extends THREE.Line {
    bulletTime = 0;
    bulletTimeMax = 1;

    constructor() {
        super(new THREE.Geometry(), new THREE.LineBasicMaterial());
        this.castShadow = true;
        this.receiveShadow = false;
    }

    load() {
        /*
        var material = new THREE.LineBasicMaterial({
            color: 0xff00ff,
            linewidth: 1,
            scale: 1,
            lights: false
        } ); //linewidth & lights werken niet op windows ;(
        */
        let material = new MeshLoader(new THREE.Geometry(), new THREE.Material(), 0, 0, 0)
            .createMaterial(true, THREE.DoubleSide, 1, 1, "textures/bullet/smoke.jpg");
        this.material = material;
        this.material.opacity = 0;
        this.material.transparent = true;
        this.material.needsUpdate = true;
    }

    shoot(start, end, network, power) {
        let geometry = new THREE.Geometry();
        geometry.vertices.push(start);
        geometry.vertices.push(end);
        this.geometry = geometry;
        let data = {
            startx: start.x,
            starty: start.y,
            startz: start.z,
            endx: end.x,
            endy: end.y,
            endz: end.z,
            power: power
        };
        network.sendData("shoot", data);
    }

    update(delta) {
        this.material.opacity = 1.0 - (this.bulletTime / this.bulletTimeMax);
        this.bulletTime += delta;
        if (this.bulletTime >= this.bulletTimeMax) {
            this.bulletTime = 0;
            return false;
        }
        return true;
    }
}