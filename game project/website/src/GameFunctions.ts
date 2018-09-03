class GameFunctions {
    constructor() {

    }

    public update(creator: SceneCreator, network: Networking, delta: number, keyMap: Array<boolean>, mouseX: number, mouseY: number, isMouseDown: boolean) {
        for (let i = 0; i < creator.enemies.length; i++) {
            creator.enemies[i].update(delta, creator);
        }
        for (let i = 0; i < creator.enemyBullets.length; i++) {
            creator.enemyBullets[i].updateEnemyBullet(creator, delta);
        }
        creator.camera.update(delta, keyMap, mouseX, mouseY, creator);
        creator.player.update();
        creator.weapon.shoot(creator, isMouseDown, delta, network);
        creator.player.sendToNetwork(network, delta, creator);
        creator.text2D.update(creator.camera, keyMap[81]);
    }
}