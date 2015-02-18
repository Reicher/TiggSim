TS.GameEnd = function(game){
  var car;
  var ending = false; // Stooopid
};
TS.GameEnd.prototype = {
  init: function(wellbeing, money, goalReached){
    this.playerWellbeing = wellbeing;
    this.playerMoney = money;
    this.goalReached = goalReached;
  },
  create: function(){
    // display scrolling background
    this.background = this.add.tileSprite(800, 0, 160, 60, 'menuBackground');
    this.background.scale.setTo(-10, 10);

    this.car = this.add.sprite(750, 320, 'car');
    this.car.scale.setTo(-4, 4);
    this.game.add.tween(this.car).to({y: '+4'}, 300, Phaser.Easing.Linear.None, true, 0, -1, true);

    var gameOverText;
    var scoreText;

    if(this.playerWellbeing <= 0 || !this.goalReached)
      gameOverText = this.add.text(400, 250, 'Game over, du orkar inte mer.', { fontSize: '150', fill: '#FF00FF' });
    else
      gameOverText = this.add.text(400, 250, 'Grattis, du fick ihop lite pengar.', { fontSize: '150', fill: '#FF00FF' });

    gameOverText.anchor.set(0.5);

    scoreText = this.add.text(400, 320, 'Du fick ihop ' + this.playerMoney + ' kr', { fontSize: '150', fill: '#FF00FF' });
    scoreText.anchor.set(0.5);

    var restartText = this.add.text(400, 400, '(Tryck för att gå tillbaka)', { fontSize: '75', fill: '#FF00FF' });
    restartText.anchor.set(0.5);

    this.game.input.onDown.add(this.startBack, this);

  },
  restartGame: function() {
    this.game.world.alpha = 255;
    this.state.start('MainMenu');
  },
	update: function() {
		this.background.tilePosition.x -= 0.5;
	},
  startBack: function() {
    if(this.ending)
      return;

    this.ending = true;
    this.game.add.tween(this.car).to({x: 0}, 1500, Phaser.Easing.Quadratic.In, true, 200);

    // NO IDEA why the fade only works on main menu...
    var fadeTween = this.game.add.tween(this.game.world).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, false, 1200);
    fadeTween.onComplete.add(this.restartGame, this);
    fadeTween.start();
  }
};
