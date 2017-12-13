class Camera extends THREE.PerspectiveCamera {
    lon = 0;
    lat = 0;
    verticalMin = -89;
    verticalMax = 89;

    verticalSpeed = 5;
    horizontalSpeed = 5;

    constructor() {
        super(90, window.innerWidth / window.innerHeight, 0.1, 6000);
        this.castShadow = true;
        this.receiveShadow = true;
    }

    public update(delta, keyMap, mouseX, mouseY, creator) {
        //look movement
        this.lon += mouseX * delta * this.horizontalSpeed;
        this.lat -= mouseY * delta * this.verticalSpeed;
        if (this.lat < this.verticalMin) {
            this.lat = this.verticalMin;
        } else if (this.lat > this.verticalMax) {
            this.lat = this.verticalMax;
        }

        let phi = (90 - this.lat) * Math.PI / 180;
        let theta = this.lon * Math.PI / 180;

        let target = new THREE.Vector3(0, 0, 0);
        target.x = this.position.x + 100 * Math.sin(phi) * Math.cos(theta);
        target.y = this.position.y + 100 * Math.cos(phi);
        target.z = this.position.z + 100 * Math.sin(phi) * Math.sin(theta);

        this.lookAt(target);

        //movement
        let speed = creator.player.speed * delta;
        if (keyMap[87]) {
            this.position.z += Math.sin(theta) * speed;
            this.position.x += Math.cos(theta) * speed;
        } else if (keyMap[83]) {
            this.position.z -= Math.sin(theta) * speed;
            this.position.x -= Math.cos(theta) * speed;
        }
        if (keyMap[65]) {
            this.position.z += Math.sin(theta - Math.PI / 2) * speed;
            this.position.x += Math.cos(theta - Math.PI / 2) * speed;
        } else if (keyMap[68]) {
            this.position.z += Math.sin(theta + Math.PI / 2) * speed;
            this.position.x += Math.cos(theta + Math.PI / 2) * speed;
        }

        //set camera height based on heightmap
        this.position.y = creator.heightmap.getHeightAt(this.position) + creator.player.height * 0.9;

        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i] instanceof Weapon) {
                let weapon = this.children[i] as Weapon;
                let distance = creator.heightmap.getDistanceAt(this.getWorldPosition(), this.getWorldDirection());
                if (distance <= 0) {
                    distance = creator.skybox.getDistanceAt(this.getWorldPosition(), this.getWorldDirection());
                }
                weapon.update(distance);
            }
        }

        this.updateMatrix();
    }

    public windowResize() {
        this.aspect = window.innerWidth / window.innerHeight;
        this.updateProjectionMatrix();
        this.resizeChildren();
    }

    public resizeChildren() {
        var fovRadians = THREE.Math.degToRad(this.fov);
        var cameraHeight = 2 * Math.tan(fovRadians / 2);
        var cameraWidth = cameraHeight * this.aspect;
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i] instanceof Weapon) {
                let weapon = this.children[i] as Weapon;
                weapon.resize(cameraWidth, cameraHeight);
            }
        }
    }

    public updateNetwork(pos) {
        this.position.set(pos.x, 0, pos.y);
    }
}