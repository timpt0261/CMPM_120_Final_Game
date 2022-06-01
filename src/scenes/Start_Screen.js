class Start_Screen extends Phaser.Scene {
    constructor() {
    super("start_screenScene");
   
    }

    create(){
        console.log("In start screen");
        currentScene = 0;
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        // set up Scene switcher
        this.input.keyboard.on("keydown", sceneSwitcher);

        
        // let background = this.add.tileSprite(0,0,game.config.width, game.config.height, 'red_picnic').setOrgin(0,0);

        this.anims.create({
            key : "start",
            frames: this.anims.generateFrameNumbers('opening_animation', { start: 0, end: -1 }),
            frameRate :7,
        
        });

        let open_anims =this.add.sprite(game.config.width/2,game.config.height/2, 'opening_animation');

        open_anims.play('start');
    }
}