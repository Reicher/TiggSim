TS.MainMenu = function(game){};
TS.MainMenu.prototype = {
	create: function(){
		// display images
		var background = this.add.sprite(0, 0, 'background');
		background.scale.setTo(10, 10);
		var title = this.add.sprite((TS.GAME_WIDTH-400)/2, 60, 'title');
		title.scale.setTo(10, 10);
				
		// add the button that will start the game
		this.add.button(TS.GAME_WIDTH-220, TS.GAME_HEIGHT-120, 'button-start', this.startGame, this, 1, 0, 2);

	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};