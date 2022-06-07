class EndScreen extends Phaser.Scene {
    constructor() {
    super("endScene");
    }

    create(){
        this.endScreen= this.add.sprite(0,0, "end").setOrigin(0,0);

        this.input.on('pointerdown', (pointer) =>{
            this.scene.start("Level_01");
        });
    }
}