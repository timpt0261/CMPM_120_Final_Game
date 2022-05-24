// Create Main_Ball prefab
class Door extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      scene.add.existing(this);
      scene.physics.add.existing(this);
      //addPhysics:
      this.body.setSize(32,32);
    }

  
    openDoor(){
        // deactivates rigidbody and plays opening animation
    }
  }
  