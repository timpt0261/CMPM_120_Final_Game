// Create Enemy Ball
class Enemy_Ball extends Phaser.Physics.Arcade.Sprite {
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
