// Create Enemy Ball
class Enemy_Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, size, frame) {
    super(scene, x, y, texture, size, frame);

    this.setColliderWorldBounds = true;

    this.scene = scene; // global variables to be used in other functions
    this.size = size;
    this.first_x = x;
    this.first_y = y;

    this.eat_or_die = false; // determines if should eat or kill player

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
    // calculate diffence of size
    let sizeDiff = this.size - player.size;

    // if dist is 400 or less player will move towards player
    if (dist <= 400 && sizeDiff >= 0) {
      console.log(dist);
      this.scene.physics.moveToObject(this, player, 2000 / this.size);
      // this.eat_or_die = true;
    } else if (dist <= 200 && sizeDiff < 0) {
      // else if the enemy is smaller and distance is 200, it will move away
      this.scene.physics.moveToObject(this, player, -2000 / this.size);
      // this.eat_or_die = false;
    }
  }

  reset() {
    // add reset
    this.x = this.first_x;
    this.y = this.first_y;
  }

  deleteSelf() {
    // deletes it self
  }
}
