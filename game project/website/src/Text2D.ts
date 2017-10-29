class Text2D extends THREE.Sprite {
    width;
    height;
    depth;

    constructor(w, h, d) {
        super(new THREE.SpriteMaterial());
        this.width = w;
        this.height = h;
        this.depth = d;
    }

    load(scene) {
        scene.add(this);
    }

    update(camera: Camera) {
        let target = camera.getWorldPosition().add(camera.getWorldDirection().multiplyScalar(this.depth));
        this.position.set(target.x, target.y, target.z);
    }

    createText( message)
    {
        let parameters = {};
        parameters["fontface"] = "Arial";
        parameters["fontsize"] = 10;
        parameters["borderThickness"] = 1;
        parameters["borderColor"] = { r:0, g:0, b:0, a:1.0 };
        parameters["backgroundColor"] = { r:255, g:255, b:255, a:1.0 };

        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        context.font = "Bold " + parameters["fontsize"] + "px " + parameters["fontface"];

        // get size data (height depends only on font size)
        let metrics = context.measureText( message );
        let textWidth = metrics.width;

        // background color
        context.fillStyle   = "rgba(" + parameters["backgroundColor"].r + "," + parameters["backgroundColor"].g + ","
            + parameters["backgroundColor"].b + "," + parameters["backgroundColor"].a + ")";
        // border color
        context.strokeStyle = "rgba(" + parameters["borderColor"].r + "," + parameters["borderColor"].g + ","
            + parameters["borderColor"].b + "," + parameters["borderColor"].a + ")";

        context.lineWidth = parameters["borderThickness"];
        // 1.4 is extra height factor for text below baseline: g,j,p,q.
        this.roundRect(context, parameters["borderThickness"]/2, parameters["borderThickness"]/2, textWidth + parameters["borderThickness"], parameters["fontsize"] * 1.4 + parameters["borderThickness"], 6);

        // text color
        context.fillStyle = "rgba(0, 0, 0, 1.0)";

        context.fillText( message, parameters["borderThickness"], parameters["fontsize"] + parameters["borderThickness"]);

        // canvas contents will be used for a texture
        let texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        this.material = new THREE.SpriteMaterial(
            { map: texture } );
        this.material.needsUpdate = true;
        this.scale.set(this.width, this.height, 1);
        this.updateMatrix();
    }

    roundRect(ctx, x, y, w, h, r)
    {
        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.lineTo(x+w-r, y);
        ctx.quadraticCurveTo(x+w, y, x+w, y+r);
        ctx.lineTo(x+w, y+h-r);
        ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
        ctx.lineTo(x+r, y+h);
        ctx.quadraticCurveTo(x, y+h, x, y+h-r);
        ctx.lineTo(x, y+r);
        ctx.quadraticCurveTo(x, y, x+r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}