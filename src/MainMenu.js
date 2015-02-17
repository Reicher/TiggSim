TS.MainMenu = function(game){
	var background;
	var music;
	var startButton;

	var car;
};
TS.MainMenu.prototype = {
	create: function(){
		// display scrolling background
		this.background = this.add.tileSprite(0, 0, 160, 60, 'menuBackground');
		this.background.scale.setTo(10, 10);

		var title = this.add.sprite((TS.GAME_WIDTH-200)/2, 30, 'title');
		title.scale.setTo(5, 5);

		var aboutText = this.add.text(400, 220, 'v0.2 by Robin Reicher', { fontSize: '5', fill: '#AAAAAA' });

		this.car = this.add.sprite(60, 320, 'car');
		this.car.scale.setTo(4, 4);
		this.game.add.tween(this.car).to({y: '+4'}, 300, Phaser.Easing.Linear.None, true, 0, -1, true);

		// add the button that will start the game
		this.startButton = this.add.button(TS.GAME_WIDTH-220, TS.GAME_HEIGHT-130, 'button-start', this.onStartClick, this, 1, 0, 2);

		if(!this.music){
			this.music = this.game.add.audio('bgMusic', 1, true);
			//this.music.play();
		}
	},
	startGame: function() {
		this.game.world.alpha = 255;
		// start the Game state
		this.state.start('Game');
	},
	update: function() {
		this.background.tilePosition.x -= 0.5;
	},
	onStartClick: function() {
		this.startButton.visible = false;

		this.game.add.tween(this.car).to({x: '800'}, 1500, Phaser.Easing.Quadratic.In, true, 200);
		var fadeTween = this.game.add.tween(this.game.world).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, false, 1200);
		fadeTween.onComplete.add(this.startGame, this);
		fadeTween.start();
	}
};
