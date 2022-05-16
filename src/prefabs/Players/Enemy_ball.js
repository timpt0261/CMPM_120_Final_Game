// Create Enemy Ball
class Enemy_Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame,size) {
    super(scene, x, y, texture, frame, size);
    this.scene = scene;
    this.size = size;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCircle(size);
    
  }

  addPhysics() {
    // add physics to main
    
  }

  update(player) {
    // add to update
    var dist = Phaser.Math.Distance.BetweenPoints(player,this);
   
    if(dist <= 500){
      console.log(dist);
      this.scene.physics.moveToObject(this, player, 200/this.size);
    }
  }

  reset() {
    // add reset
  }

  deleteSelf() {
    // deletes it self
  }
}
