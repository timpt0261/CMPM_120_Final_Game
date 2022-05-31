class Start_Screen extends Phaser.Scene {
    constructor() {
    super("start_screenScene");
   
    }

    create(){
        console.log("In start screen");
        currentScene = 0;
        let pie = this.add.image(100, 100, 'red_pie');
        
    }
}