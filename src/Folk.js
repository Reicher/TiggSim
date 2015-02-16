Folk = function (game, asset) {

    var height = 110 + game.rnd.integerInRange(0, 160);
    var speed = game.rnd.integerInRange(5000, 15000)

    //var aBitmap = game.make.bitmapData(148, 48);
    //aBitmap.draw('folk', 0, 0, 148, 48);
    Phaser.Sprite.call(this, game, 0, height, 'folk');
    //this.tint = 0xff00ff;

    this.anchor.setTo(0.5);

    var tween;
    var dead = false;

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

    this.animations.add('walking', [0, 1, 2, 3], 10, true);

    // Remove sprite when tween is done
    tween.onComplete.add(function () {
        this.destroy();
    }, this);
    tween.start();

    // Trow cash
    var timer = game.time.create(game);

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
    };
};

Folk.prototype = Object.create(Phaser.Sprite.prototype);
Folk.prototype.constructor = Folk;
