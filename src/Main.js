let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 640,
    scene: [Level_01,Level_02,Level_03],
    title: 'Title In progress',

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
}

let game = new Phaser.Game(config);

// Copied from Movement Lab
let sceneSwitcher = (event) => {
    //console.log("Key is: " + event.key);
    switch (event.key) {
        case '1':
            game.scene.start('Level_01');
            game.scene.bringToTop('Level_01');
            game.scene.pause('Level_02');
            game.scene.pause('Level_03');

            break;
        case '2':
            game.scene.start('Level_02');
            game.scene.bringToTop('Level_02');
            game.scene.pause('Level_01');
            game.scene.pause('Level_03');

            break;
        case '3':
            game.scene.start('Level_03');
            game.scene.bringToTop('Level_03');
            game.scene.pause('Level_01');
            game.scene.pause('Level_02');

            break;
        default:
            break;
    }
}

