// Create Enemy Ball
class Enemy_Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, size, frame) {
    super(scene, x, y, texture, size, frame);
    this.scene = scene;
    this.size = size;

    // Orginal ball size is 85

    scene.add.existing(this);
    scene.physics.add.existing(this);
    // Maintains collides equal body
    this.body.setSize(170, 170);
    this.body.setCircle(85);
    this.setScale(size / 85);
  }

  update(player) {
    // calculates distance between player and enemy
    let dist = Phaser.Math.Distance.BetweenPoints(player, this);
    let sizeDiff = this.size - player.size;
    console.log("enemy size : " + this.size + " Player size: " + player.size + " Diff: " + sizeDiff);
    // if dist is 400 or less player will move towards player
    if (dist <= 400 && sizeDiff >= 0) {
      console.log(dist);
      this.scene.physics.moveToObject(this, player, 2000 / this.size);
    } else if (dist <= 200 && sizeDiff < 0) {
      this.scene.physics.moveToObject(this, player, -2000 / this.size);
    }
  }

  reset() {
    // add reset
  }

  deleteSelf() {
    // deletes it self
  }
}
