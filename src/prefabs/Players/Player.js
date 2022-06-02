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
    //this.body.setSize(200, 200);
    this.body.setCircle(100);
    this.setScale(this.size/200);
  }

  createAnims(){
    this.scene.anims.create({
      key : 'pie_flip',
      frames: [
          {key : 'pie_red'},
          {key : 'pie_blue', duration: 1},
      ],
      frameRate: 3,
      repeat : 4
  });
  }

  Grow(enemy){
   
    console.log("in grow");
    this.play('pie_flip');
    this.size += enemy.size;
    let scale = this.size/200;
    console.log("Scale: ${scale}");

    this.setScale(scale);
    
    this.speed -= 100;  
  }

  Shrink(enemy){
   
    console.log("in shrink");
    this.play('pie_flip');
    this.size -= enemy.size;
    let scale = this.size/200;
    console.log("Scale: ${scale}");

    this.setScale(scale);
    
    this.speed += 100;  
  }


  update(mouse) {
    // Check if mouse is undefined
    if (mouse){  
      //Distance between mouse and edge of player
      let dist = Phaser.Math.Distance.Between(mouse.x,mouse.y, this.x,this.y) - this.size / 2;
      //console.log(dist);

      //Have a soft deadzone of 30, hard deadzone at 10
      if(dist > 30){
        this.scene.physics.moveToObject(this, mouse, this.speed / this.size);
      }
      // Slow the player progressivly if they are less than 30 distance away until stopping at 10
      else if(dist > 20){ 
        this.slow =  20 -(dist % 10);
        this.slow = ((this.slow /10));
        //console.log(dist, this.slow);
        this.scene.physics.moveToObject(this, mouse, this.speed / (this.size * (this.slow)));
      }
      else if(dist > 10){ 
        this.slow =  10 -(dist % 10);
        this.slow = ((this.slow /10)+2);
        //console.log(dist, this.slow);
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
