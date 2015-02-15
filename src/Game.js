TS.Game = function(game){
	// define needed variables for TS.Game
	var player;

	var goodGroup;
	var badGroup;

	var moneyText;
	var wellbeingText;
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

		// create group for good things
		this.goodGroup = this.game.add.group();
		this.goodGroup.enableBody = true;
		this.goodGroup.outOfBoundsKill = true;

		// Create group for all bad things
		this.badGroup = this.game.add.group();
		this.badGroup.enableBody = true;
		this.badGroup.outOfBoundsKill = true;

		//  Start our folk-loop
		this.createFolk();

		// Set money and health text
		this.moneyText = this.game.add.text(16, 16, 'Pengar: ' + this.player.money + ' kr', { fontSize: '32px', fill: '#000' });
		this.wellbeingText = this.game.add.text(16, 40, 'Hälsa: ' + this.player.wellbeing, { fontSize: '32px', fill: '#000' });
	},
	update: function(){
		this.player.update();

		this.game.physics.arcade.overlap(	this.player,
																			this.goodGroup,
																			this.gotMoney,
																			null,
																			this);
		this.game.physics.arcade.overlap(	this.player,
																			this.badGroup,
																			this.gotHurt,
																			null,
																			this);

	},
	createFolk: function(){
		var naughtiness = this.game.rnd.integerInRange(0, 100);
		var stuff;

		if(naughtiness < 30)
			stuff = this.goodGroup.create(0, 0, 'peng');
		else if(naughtiness > 90)
			stuff = this.badGroup.create(0, 0, 'glob');

		var p = new Folk(this.game, stuff); // send some money with them
		this.game.add.existing(p);

		var timer = this.game.time.create(this.game);
		timer.add(this.game.rnd.integerInRange(500, 2000), this.createFolk, this);
		timer.start();
	},
	gotMoney: function (player, money){
		this.player.money += 1;
		this.moneyText.text = 'Pengar: ' + this.player.money + ' kr';
		money.kill();
	},
	gotHurt: function (player, hurtingThing){
		this.player.wellbeing -= 1;
		this.wellbeingText.text = 'Hälsa: ' + this.player.wellbeing;
		hurtingThing.kill();
	}
};
