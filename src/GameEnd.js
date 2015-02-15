TS.GameEnd = function(game){};
TS.GameEnd.prototype = {
  init: function(wellbeing, money, goalReached){
    this.playerWellbeing = wellbeing;
    this.playerMoney = money;
    this.goalReached = goalReached;
  },
  create: function(){

    // this should all be pictures...
    var background = this.add.sprite(0, 0, 'background');
    background.scale.setTo(10, 10);

    var gameOverText;
    var scoreText;

    if(this.playerWellbeing <= 0 || !this.goalReached)
      gameOverText = this.add.text(400, 250, 'Game over, du orkar inte mer.', { fontSize: '150', fill: '#FF00FF' });
    else
      gameOverText = this.add.text(400, 250, 'Grattis, du fick ihop lite pengar.', { fontSize: '150', fill: '#FF00FF' });

    gameOverText.anchor.set(0.5);

    scoreText = this.add.text(400, 320, 'Du fick ihop ' + this.playerMoney + ' kr', { fontSize: '150', fill: '#FF00FF' });
    scoreText.anchor.set(0.5);

    var restartText = this.add.text(400, 400, '(Tryck på mellanslag)', { fontSize: '75', fill: '#FF00FF' });
    restartText.anchor.set(0.5);

    var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    space.onDown.add(this.restartGame, this);
  },
  restartGame: function() {
    this.state.start('MainMenu');
  }
};
