let MAX_SPEED = 2000;

class Level_01 extends Phaser.Scene {
    constructor() {
        super("Level_01");
    }
    
    
 
    create(){
        currentScene = 1;
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // set up Scene switcher
        this.input.keyboard.on("keydown", sceneSwitcher);

        // Add background color
        this.add.tileSprite(0, 0, game.config.height, game.config.width, "red_background")
            .setOrigin(0, 0)
            .setScale(2);

        // Add player


        this.player = new Player(this, this.game.config.width / 2 , this.game.config.height / 2,'player',70, 10000,1).setOrigin(0.5,0.5);  //Origin default is (0.5,0.5)
        
        this.createEnemies();

        this.physics.add.collider(this.player, this.enemyGroup, this.EatenOrAlive, null, this);

        this.input.on('pointermove', (pointer) => {
            this.mouse = pointer;
        })

        this.bonk = this.sound.add("wallBonk");
        this.eat = this.sound.add("eatEnemy");
        this.getEaten = this.sound.add("getEaten");
    }

    update(){
        this.player.update(this.mouse);
        this.EatOrDie(this.player, this.enemy_1);
    }


    EatenOrAlive(player,enemy){
        
        let sizeDiff = player.size - enemy.size;
        console.log(sizeDiff); 

        if(sizeDiff > 0 ){

            console.log("In eat or alive");
            this.eat.play();
            // player can consume enemy
  

            player.Grow(enemy);
            this.enemyGroup.destroy(enemy);
        
        }else if (sizeDiff <= 0){
            this.getEaten.play();
            this.physics.pause();
            this.player.alpha = 0.3;
            
        }

    }

    createEnemies(){
        this.enemyGroup = this.physics.add.group();
        

        this.enemy_1 = new Enemy_Ball(this, Phaser.Math.Between(50, game.config.width - 100), Phaser.Math.Between(50, game.config.height - 100), "enemy", 50, 0).setOrigin(
            0.5,
            0.5
        );

        this.enemyGroup.add(this.enemy_1);

        this.enemy_2 = new Enemy_Ball(this, Phaser.Math.Between(50, game.config.width - 100), Phaser.Math.Between(50, game.config.height - 100), "enemy", 80, 0).setOrigin(
            0.5,
            0.5
        );

        this.enemyGroup.add(this.enemy_2);

        this.enemyGroup.colliderWorldBounds = true;


    }

    EatOrDie(player, enemy){

        // calculates distance between player and enemy
        let dist = Phaser.Math.Distance.BetweenPoints(player, enemy);
        // calculate diffence of size
        let sizeDiff = enemy.size - player.size;
        console.log("Player Size: %d Enemy Size: %d", player.size, enemy.size,);
        // if dist is 400 or less player will move towards player
        if (dist <= 200 && sizeDiff >= 0) {
          //console.log(dist);
          this.physics.moveToObject(enemy, player, MAX_SPEED / enemy.size);
          // this.eat_or_die = true;
        } else if (dist <= 200 && sizeDiff < 0) {
          // else if the enemy is smaller and distance is 200, it will move away
          this.physics.moveTo(enemy, enemy.x + player.x, enemy.y + player.y,  MAX_SPEED / enemy.size);
          // this.eat_or_die = false;
    
        }
      }
}
