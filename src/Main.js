
let cursors;
let currentScene;

let config = {
    type: Phaser.CANVAS,
    width: 900,
    height: 640,
    scene: [Preloader, Start_Screen ,Level_01,Level_02,Level_03, Level_04],
    title: 'P.I.E(Puzzle Intense Experiance)',

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }

    
}

let game = new Phaser.Game(config);

// Copied from Movement Lab
let sceneSwitcher = (event) => {
    //console.log("Key is: " + event.key);
    switch (event.key) {
        case '0':
            game.scene.start("start_screenScene");
            game.scene.bringToTop("start_screenScene");
            game.scene.pause('Level_01');
            game.scene.pause('Level_02');
            game.scene.pause('Level_03');
            game.scene.pause('level_04');
            break;

        case '1':
            console.log("In scene 1\n");
            game.scene.start('Level_01');
            game.scene.bringToTop('Level_01');
            game.scene.pause('start_screenScene');
            game.scene.pause('Level_02');
            game.scene.pause('Level_03');
            game.scene.pause('Level_04');

            break;
        case '2':
            console.log("In scene 2\n");
            game.scene.start('Level_02');
            game.scene.bringToTop('Level_02');
            game.scene.pause('start_screenScene');
            game.scene.pause('Level_01');
            game.scene.pause('Level_03');
            game.scene.pause('Level_04');

            break;
        case '3':
            console.log("In scene 3\n");
            game.scene.start('Level_03');
            game.scene.bringToTop('Level_03');
            game.scene.pause('start_screenScene');
            game.scene.pause('Level_01');
            game.scene.pause('Level_02');
            game.scene.pause('Level_04');

            break;
        case '4':
            console.log("In scene 4\n");
            game.scene.start('Level_04');
            game.scene.bringToTop('Level_04');
            game.scene.pause('start_screenScene');
            game.scene.pause('Level_01');
            game.scene.pause('Level_02');
            game.scene.pause('Level_03');

            break;
    }

}

let mode = 1;

let EatOrDie = function (player, enemy){

    // calculates distance between player and enemy
    let dist = Phaser.Math.Distance.BetweenPoints(player, enemy);
    // calculate diffence of size
    let sizeDiff = enemy.size - player.size;
    console.log("Player Dist: %f Size Diff: %f", player.size, enemy.size);
    // if dist is 400 or less player will move towards player
    if (dist <= 200 && sizeDiff >= 0) {
        //console.log(dist);
        this.getEaten.play();

        this.physics.pause();
        this.player.alpha = 0;
        // play death animation 
        // launch game ove screen

    } else if (dist <= 200 && sizeDiff < 0) {
        // else if the enemy is smaller and distance is 200, it will move away
        this.eat.play();
        // player grows/ shrinks depedding on mode
        mode == 1 ? player.Grow(enemy): player.Shrink(enemy);
        // enemy is removed
        this.enemyGroup.remove(enemy, true);

    }
}



  




