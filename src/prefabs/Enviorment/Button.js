// Create Main_Ball prefab
class Button extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, Door) {
      super(scene, x, y, texture, frame);
  
      scene.add.existing(this);
      scene.physics.add.existing(this);
      
      //add Physics:
      this.body.setSize(32,32);
      this.body.setCircle(16);
    }
  
  
    signalDoor(){
        // calls the Door function to make it deactivate it's rigidbody
    }
  }
  