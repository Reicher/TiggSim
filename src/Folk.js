Folk = function (game, asset, throwSound) {

    var height = 110 + game.rnd.integerInRange(0, 160);
    var speed = game.rnd.integerInRange(4000, 12000)

    bmd = game.make.bitmapData(128, 48);

    // Random sprite
    var spriteSheets =['folk1', 'folk2', 'folk3'];
    bmd.load(game.rnd.pick(spriteSheets));

    // Random Skin tone
    var Tones =[{r: 255, g: 229, b: 200},
                {r: 255, g: 195, b: 170},
                {r: 150, g: 114, b: 100},
                {r: 120, g: 92,  b: 80}];
    var skinTone = game.rnd.pick(Tones);
    bmd.replaceRGB(123, 123, 123, 255,
        skinTone.r,skinTone.g, skinTone.b, 255);

    // Random hair color
    var Hair =[{r: 44, g: 44, b: 44},
                {r: 180, g: 160, b: 160},
                {r: 230, g: 207, b: 168},
                {r: 185, g: 151,  b: 120},
                {r: 180, g: 80,  b: 50},
                {r: 145, g: 85,  b: 61}];
    var hairColor = game.rnd.pick(Hair);
    bmd.replaceRGB(0, 100, 200, 255,
      hairColor.r,hairColor.g, hairColor.b, 255);

    game.cache.addSpriteSheet('dynamic', '', bmd.canvas, 32, 48, 4, 0, 0);
    Phaser.Sprite.call(this, game, 0, height, 'dynamic');
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
      asset.body.velocity.y = 150;
      asset.visible = true;

      if(this.throwSound)
        this.throwSound.play();
    };

    this.setThrowSound = function(ThrowSound){

    };
};

Folk.prototype = Object.create(Phaser.Sprite.prototype);
Folk.prototype.constructor = Folk;
