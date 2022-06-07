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
    this.speedMax = 400;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Maintains collides equal body
    //this.body.setSize(100);
    this.body.setCircle(90);
    this.setScale(this.size/200);
  }

  createAnims(){
    
  }

  Grow(enemy){
       
  //  this.size + enemy.size >  100 ? this.size = 100 : this.size += enemy.size;
   this.size += enemy.size;
   let scale = this.size/200;  


  this.setScale(scale);
    
  }

  Shrink(enemy){
   
    this.size - enemy.size <  10 ? this.size = 10 : this.size -= enemy.size;
    let scale = this.size/200;  

    this.setScale(scale);
    
  }


  update(mouse) {
    // Check if mouse is undefined
    if (mouse){  
      //console.log(mouse.x, mouse.y);
      var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.x, this.y, mouse.x, mouse.y);
      this.setAngle(angle);

      //Distance between mouse and edge of player
      let dist = Phaser.Math.Distance.Between(mouse.x,mouse.y, this.x,this.y) - this.size / 2;
      //console.log(dist);

      //Have a soft deadzone of 30, hard deadzone at 10
      if(dist > 30){
        if(this.speed / this.size >= this.speedMax){
          this.scene.physics.moveToObject(this, mouse, this.speedMax);
        }
        else{
          this.scene.physics.moveToObject(this, mouse, this.speed / this.size);
        }
      }
      // Slow the player progressivly if they are less than 30 distance away until stopping at 10
      else if(dist > 20){ 
        this.slow =  20 -(dist % 10);
        this.slow = ((this.slow /10));
        if(this.speed /(this.size * this.slow) >= this.speedMax){
          this.scene.physics.moveToObject(this, mouse, this.speedMax);
        }
        else{
          this.scene.physics.moveToObject(this, mouse, this.speed / (this.size * (this.slow)));
        }
      }
      else if(dist > 10){ 
        this.slow =  10 -(dist % 10);
        this.slow = ((this.slow /10)+2);
        //console.log(dist, this.slow);
        if(this.speed /(this.size * this.slow) >= this.speedMax){
          this.scene.physics.moveToObject(this, mouse, this.speedMax);
        }
        else{
          this.scene.physics.moveToObject(this, mouse, this.speed / (this.size * (this.slow)));
        }
      }
      else{
        this.scene.physics.moveToObject(this, mouse, 0);
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
