// Create Enemy Ball
class Enemy_Ball extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, size,speed, frame) {
    super(scene, x, y, texture, size, speed, frame);

    this.setColliderWorldBounds = true;

    this.scene = scene; // global variables to be used in other functions
    this.size = size;
    this.first_x = x;
    this.first_y = y;
    this.speed = speed;



    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Maintains collides equal body
    this.body.setSize(200, 200);
    this.body.setCircle(100);
    this.setScale(size /200);

  }

  update(player){
    // calculates distance between player and enemy
    let dist = Phaser.Math.Distance.BetweenPoints(player, this);
    // calculate diffence of size
    let sizeDiff = this.size - player.size;

    if(this.speed != -1){
      if (dist <= 500 && sizeDiff >= 0) {
        //console.log(dist);
        this.scene.physics.moveToObject(this,player, this.speed);
        // this.eat_or_die = true;
      } else if (dist <= 500 && sizeDiff < 0) {
        // else if the enemy is smaller and distance is 500, it will move away
        //   player.Grow(enemy);     
        this.scene.physics.moveToObject(this, player, -this.speed);
      }
    }
    else{
      if (dist <= 500 && sizeDiff >= 0) {
        //console.log(dist);
        this.scene.physics.moveToObject(this,player, 2000 / this.size);
        // this.eat_or_die = true;
      } else if (dist <= 500 && sizeDiff < 0) {
        // else if the enemy is smaller and distance is 200, it will move away
        //   player.Grow(enemy);     
        this.scene.physics.moveToObject(this, player, -2000 / this.size);
      }
    }
    
  }

  reset() {
    // add reset
    this.x = this.first_x;
    this.y = this.first_y;
  }

  deleteSelf() {
    // deletes it self
    // this.setActive(false).setVisible(false);
    this.destroy();
  }
}
