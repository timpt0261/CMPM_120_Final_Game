// Create Enemy Ball
class Enemy_Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame, size) {
    super(scene, x, y, texture, frame, size);
    this.scene = scene;
    this.size = size;

    // Orginal ball size is 85

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCircle(size);
    this.setScale(size / 85);
  }

  update(player) {
    // calculates distance between player and enemy
    var dist = Phaser.Math.Distance.BetweenPoints(player, this);
    // if dist is 500 or less player will move towards player
    // if (dist <= 500) {
    //   console.log(dist);
    //   this.scene.physics.moveToObject(this, player, 200 / this.size);
    // }
  }

  reset() {
    // add reset
  }

  deleteSelf() {
    // deletes it self
  }
}
