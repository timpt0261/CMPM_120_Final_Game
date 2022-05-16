// Create Main_Ball prefab
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    //addPhysics();
  }

  addPhysics() {
    // add physics to main
    
  }

  update() {
    // update
  }

  reset() {
    // add reset
  }

  deleteSelf(){
      // deletes it self
  }
}
