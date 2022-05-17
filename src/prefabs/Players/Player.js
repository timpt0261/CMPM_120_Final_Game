// Create Main_Ball prefab
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, size, frame) {
    super(scene, x, y, texture, size, frame);
    this.scene = scene;
    this.size = size;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.addPhysics();
  }

  addPhysics() {
    // Maintains collides equal body
    this.body.setSize(200,200);
    this.body.setCircle(100);
    this.setScale(this.size/100);

    this.speed = 100;
    this.setMaxVelocity(200);
  }

  update(mouseX,mouseY) {
    if (mouseX){  // Check if mouseX is undefined
      this.angleToMouse = Phaser.Math.Angle.Between(this.x,this.y,mouseX,mouseY);
      this.angleToMouse = this.angleToMouse * (180/Math.PI);
      //console.log(this.x, this.y, mouseX, mouseY);
      console.log(this.angleToMouse); 
    }

  }

  reset() {
    // add reset
  }

  deleteSelf() {
    // deletes it self
  }
}
