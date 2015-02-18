TS.Preloader = function(game){
	// define width and height of the game
	TS.GAME_WIDTH = 800;
	TS.GAME_HEIGHT = 600;
};
TS.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#000000';
		this.preloadBar = this.add.sprite((TS.GAME_WIDTH-311)/2,
										  (TS.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		// load images
		this.load.image('background', 'assets/background.png');
		this.load.image('menuBackground', 'assets/background_menu.png');
		this.load.image('title', 'assets/title.png');
		this.load.image('car', 'assets/car.png');
		this.load.image('peng', 'assets/peng.png');
		this.load.image('glob', 'assets/glob.png');
		this.load.image('infoBox', 'assets/roundedRect.png');

		// so much easier
		this.load.image('clock', 'assets/clock.png');
		this.load.image('clock_h', 'assets/clock_h.png');
		this.load.image('clock_m', 'assets/clock_m.png');

		// load spritesheets
		this.load.spritesheet('button-start', 'assets/button-start.png', 200, 100);

		this.load.spritesheet('player', 'assets/player.png', 32, 48);
		this.load.spritesheet('folk', 'assets/folk1.png', 32, 48);

		// Load music
		//  Firefox doesn't support mp3 files, so use ogg
		this.load.audio('bgMusic', 'assets/audio/bensound-jazzyfrenchy.ogg');

		this.load.audio('coin1', 'assets/audio/Coin1.ogg');
		this.load.audio('coin2', 'assets/audio/Coin2.ogg');
		this.load.audio('spit1', 'assets/audio/Spit1.ogg');
		this.load.audio('spit2', 'assets/audio/Spit2.ogg');

	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};
