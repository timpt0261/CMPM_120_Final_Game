// Create Main_Ball prefab
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, size, frame) {
    super(scene, x, y, texture, size, frame);
    this.scene = scene;
    this.size = size;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    // Maintains collides equal body
    this.body.setSize(200,200);
    this.body.setCircle(100);
    this.setScale(size/100);
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

  deleteSelf() {
    // deletes it self
  }
}
