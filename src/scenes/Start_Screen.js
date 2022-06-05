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

        let title = this.add.image(450, 60, 'title').setScale(2);
        let play = this.add.image(800, 400, 'play_btn').setScale(.35);

        title.alpha = 0;
        play.alpha = 0;
   

    
       
       

        this.anims.create({
            key : "start",
            frames: this.anims.generateFrameNumbers('opening_animation', { start: 0, end: 14 }),
            frameRate :7,
        
        });


        let open_anims =this.add.sprite(game.config.width/2,game.config.height/2  + 55, 'opening_animation');
        open_anims.play('start');
       
        open_anims.on('animationcomplete',()=>{
            title.alpha = 1;
            play.alpha = 1;
            
           
        });
       
        play.setInteractive().on('pointerdown', ()=>{
            this.bgMusic.play(this.musicConfig);
            this.scene.start("Level_01")
        });

    }
}
