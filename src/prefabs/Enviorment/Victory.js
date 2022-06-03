// Create Victory prefab
class Victory extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    //UNUSED

    this.scene = scene; // global variables to be used in other functions
    this.first_x = x;
    this.first_y = y;
    this.scene = scene;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    console.log("Dies");

    // Maintains collides equal body
    //this.body.setSize();
    this.body.setCircle();
    this.setScale(this.size/20);
  }


  update() {
    // add to update
  }

}
