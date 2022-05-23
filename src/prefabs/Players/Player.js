// Create Main_Ball prefab
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, size, speed, frame) {
    super(scene, x, y, texture, size, speed, frame);

    this.scene = scene; // global variables to be used in other functions
    this.first_x = x;
    this.first_y = y;
    this.scene = scene;
    this.size = size;
    this.speed = speed;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Maintains collides equal body
    this.body.setSize(200, 200);
    this.body.setCircle(100);
    this.setScale(size / 100);
  }

  Grow(enemy){
    console.log("in grow");
    this.size += enemy.size;
    this.body.setSize(200, 200);
    this.body.setCircle(100);
    this.setScale(this.size / 100);
    this.speed += 1000;  
  }


  update(mouse) {
    // Check if mouse is undefined
    if (mouse){  
      //Distance between mouse and edge of player
      let dist = Phaser.Math.Distance.Between(mouse.x,mouse.y, this.x,this.y) - this.size;

      //Have a soft deadzone of 40, hard deadzone at 20
      if(dist > 40){
        this.scene.physics.moveToObject(this, mouse, this.speed / this.size);
      }
      // Slow the player progressivly if they are less than 40 distance away until stopping at 20
      else if(dist > 20){ 
        this.slow =  20 -(dist % 20);
        this.slow = ((this.slow /10)+1);
        // console.log(dist, this.slow);
        this.scene.physics.moveToObject(this, mouse, this.speed / (this.size * (this.slow)));
      }
      else{
        this.scene.physics.moveToObject(this, mouse, 0 / this.size);
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
    this.deleted = true;
  }
}
