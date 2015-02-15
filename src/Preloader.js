TS.Preloader = function(game){
	// define width and height of the game
	TS.GAME_WIDTH = 800;
	TS.GAME_HEIGHT = 600;
};
TS.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((TS.GAME_WIDTH-311)/2,
										  (TS.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		// load images
		this.load.image('background', 'assets/background.png');
		this.load.image('title', 'assets/title.png');
		this.load.image('peng', 'assets/peng.png');
		this.load.image('glob', 'assets/glob.png');

		// load spritesheets
		this.load.spritesheet('button-start', 'assets/button-start.png', 200, 100);

		this.load.spritesheet('player', 'assets/player.png', 32, 48);
		this.load.spritesheet('folk', 'assets/folk1.png', 32, 48);
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};
