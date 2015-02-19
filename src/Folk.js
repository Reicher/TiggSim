Folk = function (game, asset, throwSound) {

    var height = 110 + game.rnd.integerInRange(0, 160);
    var speed = game.rnd.integerInRange(4000, 12000)

    var folkNr = game.rnd.integerInRange(0, 2);
    if(folkNr == 0)
      Phaser.Sprite.call(this, game, 0, height, 'folk1');
    else if(folkNr == 1)
      Phaser.Sprite.call(this, game, 0, height, 'folk2');
    else if(folkNr == 2)
      Phaser.Sprite.call(this, game, 0, height, 'folk3');
    this.anchor.setTo(0.5);

    var tween;

    // 50-50 går från höger eller vänster
    if( game.rnd.integerInRange(0, 1) ){ // vänster till höger
        this.scale.setTo(3, 3);
        this.x = -this.width/2;
        tween = game.add.tween(this).to({x: this.game.world.width + this.width/2}, speed, Phaser.Easing.Linear.None, false);
    }
    else{ // höger till vänster
        this.scale.setTo(-3, 3);
        this.x = game.width - (this.width/2);
        tween = game.add.tween(this).to({x: +this.width/2}, speed, Phaser.Easing.Linear.None, false);
    }

    this.animations.add('walking', [0, 1, 2, 3], speed/1500, true);

    // Remove sprite when tween is done
    tween.onComplete.add(function () {
        this.destroy();
    }, this);
    tween.start();

    // Trow cash
    var timer = game.time.create(game);
    this.throwSound = throwSound;

    if(asset){ // if they have something on them
      asset.visible = false; // hide it
      timer.add(game.rnd.integerInRange(0, speed), function () { this.throwAsset(asset) }, this);
    }

    timer.start();
    this.animations.play('walking');

    this.throwAsset = function(asset){
      asset.x = this.x;
      asset.y = this.y;
      asset.body.velocity.y = 100;
      asset.visible = true;

      if(this.throwSound)
        this.throwSound.play();
    };

    this.setThrowSound = function(ThrowSound){

    };
};

Folk.prototype = Object.create(Phaser.Sprite.prototype);
Folk.prototype.constructor = Folk;
