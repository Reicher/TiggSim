Player = function (game) {
  this.money = 0;
  this.wellbeing = 1;

  this.cursors = game.input.keyboard.createCursorKeys();

  Phaser.Sprite.call(this, game, 32, game.world.height - 150, 'player');
  this.scale.setTo(4, 4);
  game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  this.animations.add('left', [0, 1, 2, 3], 10, true);
  this.animations.add('right', [3, 2, 1, 0], 10, true);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
   //  Reset the players velocity (movement)
  this.body.velocity.x = 0;

  if (this.cursors.left.isDown)
  {
      //  Move to the left
      this.body.velocity.x = -150;
      this.animations.play('left');
  }
  else if (this.cursors.right.isDown)
  {
      //  Move to the right
      this.body.velocity.x = 150;
      this.animations.play('right');
  }
  else
  {
      // Stand still
      this.animations.stop();
      this.frame = 4;
  }

};
