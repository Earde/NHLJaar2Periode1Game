var GameFunctions = (function () {
    function GameFunctions() {
    }
    GameFunctions.prototype.update = function (creator, network, delta, keyMap, mouseX, mouseY, isMouseDown) {
        for (var i = 0; i < creator.enemies.length; i++) {
            creator.enemies[i].update(delta, creator);
        }
        for (var i = 0; i < creator.enemyBullets.length; i++) {
            creator.enemyBullets[i].updateEnemyBullet(creator, delta);
        }
        creator.camera.update(delta, keyMap, mouseX, mouseY, creator);
        creator.player.update();
        creator.weapon.shoot(creator, isMouseDown, delta, network);
        creator.player.sendToNetwork(network, delta, creator);
        creator.text2D.update(creator.camera, keyMap[32]);
    };
    return GameFunctions;
}());
//# sourceMappingURL=GameFunctions.js.map