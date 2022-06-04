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


        // Music
        this.musicConfig = {
            mute: 0,
            volume: 1,
            seek: 0,
            loop: true,
            delay: 0
        };
        this.bgMusic = this.sound.add("bgMusic");

        
        this.background = this.add.tileSprite(0,0,game.config.width, game.config.height, 'red_checker').setOrigin(0);

        this.anims.create({
            key : "start",
            frames: this.anims.generateFrameNumbers('opening_animation', { start: 0, end: 14 }),
            frameRate :7,
        
        });

        this.anims.create({
            key: 'loop',
            frames: this.anims.generateFrameNumbers('opening_animation', { start: 14, end: -1 }),
            frameRate: 7,
            repeat: -1,
            yoyo : true,
        })

        let open_anims =this.add.sprite(game.config.width/2,game.config.height/2, 'opening_animation');

        open_anims.play('start');

        let play = this.add.image(800, 400, 'play_btn').setScale(.35);
        play.setInteractive().on('pointerdown', ()=>{
            this.bgMusic.play(this.musicConfig);
            this.scene.start("Level_01")
        })




        // open_anims.play('loop');
    }
}
