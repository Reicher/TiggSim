TS.Game = function(game){
	// define needed variables for TS.Game
	var player;

	var pengGroup;
	var money;
	var moneyText;
};

TS.Game.prototype = {
	create: function(){

		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// display background
		var background = this.add.sprite(0, 0, 'background');
		background.scale.setTo(10, 10);

		// Spelare
		this.player = new Player(this.game);
		this.game.add.existing(this.player);


		// Set peng props
		this.pengGroup = this.game.add.group();
		this.pengGroup.enableBody = true;
		this.outOfBoundsKill = true;

		//  Create our FolkTimer
		this.createFolk();

		// Set money text
		this.money = 0;
		this.moneyText = this.game.add.text(16, 16, 'Pengar: ' + this.money + ' kr', { fontSize: '32px', fill: '#000' });
	},
	update: function(){
		this.player.update();

		this.game.physics.arcade.overlap(	this.player,
																			this.pengGroup,
																			this.gotMoney,
																			null,
																			this);

	},
	createFolk: function(){
		var s = this.pengGroup.create(0, 0, 'peng');
		s.visible = false;

		var p = new Folk(this.game, s); // send some money with them
		this.game.add.existing(p);

		var timer = this.game.time.create(this.game);
		timer.add(1000, this.createFolk, this);
		timer.start();
	},
	gotMoney: function (player, peng){
		this.money += 1; // for now
		this.moneyText.text = 'Pengar: ' + this.money + ' kr';
		peng.kill();
	}
};
