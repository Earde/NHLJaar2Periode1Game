class ObjectLoader {
    constructor() {

    }

    //load big mesh files async
    loadObjectFiles = async(creator) => {
        let loader = new THREE.ObjectLoader();
        loader.load("textures/weapon/sniper-rifle.json", function(obj) {
            creator.models[0] = obj.children[0].children[0].clone();
            creator.loadModels(0);
        });
        loader.load("textures/enemy/stormtrooper.json", function(obj) {
            creator.models[1] = obj.children[3].children[0].clone();
            creator.loadModels(1);
        });
    };
}