// Create Button prefab
class Button extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, size, color, frame) {
      super(scene, x, y, texture, size, color, frame);
  
      this.scene = scene; // global variables to be used in other functions
      this.first_x = x;
      this.first_y = y;
      this.scene = scene;
      this.size = size;
      this.color = color;
      this.pressed = false;
  
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      // Maintains collides equal body
      //this.body.setSize(200, 200);
      this.body.setCircle();
      this.setScale(this.size/50);
    }

    update(){
    }
}