// Create Main_Ball prefab
class Shrink_Pipe extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    addPhysics();
  }

  addPhysics() {
    // add physics to main
  }

  update() {
    // add to update
  }

  reset() {
    // add reset
  }

  deleteSelf() {
    // deletes it self
  }
}
