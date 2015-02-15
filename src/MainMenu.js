TS.MainMenu = function(game){
	var background;
	var music;
};
TS.MainMenu.prototype = {
	create: function(){
		// display images
		this.background = this.add.tileSprite(0, 0, 160, 60, 'menuBackground');
		this.background.scale.setTo(10, 10);

		var title = this.add.sprite((TS.GAME_WIDTH-200)/2, 30, 'title');
		title.scale.setTo(5, 5);

		var car = this.add.sprite(60, 320, 'car');
		car.scale.setTo(4, 4);
		this.game.add.tween(car).to({y: '+4'}, 300, Phaser.Easing.Linear.None, true, 0, -1, true);

		// add the button that will start the game
		var carTween = this.add.button(TS.GAME_WIDTH-220, TS.GAME_HEIGHT-130, 'button-start', this.startGame, this, 1, 0, 2);

		if(!this.music || !this.music.isPlaying){
			this.music = this.game.add.audio('bgMusic');
			this.music.play();
		}

	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	},
	update: function() {
		this.background.tilePosition.x -= 0.5;
	}
};
