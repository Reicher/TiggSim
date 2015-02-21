TS.Game = function(game){
	// define needed variables for TS.Game
	var player;
	var byPassers;

	var goodGroup;
	var badGroup;

	var clock;

	var coinSound1, coinSound2;
	var spitSound1, spitSound2;
};

TS.Game.prototype = {
	create: function(){

		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// display background
		var background = this.add.sprite(0, 0, 'background');
		background.scale.setTo(10, 10);

		this.coinSound1 = this.game.add.audio('coin1', 1, false);
		this.coinSound2 = this.game.add.audio('coin2', 1, false);
		this.spitSound1 = this.game.add.audio('spit1', 1, false);
		this.spitSound2 = this.game.add.audio('spit2', 1, false);

		// Spelare
		this.player = new Player(this.game);
		this.game.add.existing(this.player);

		// Clock (timer)
		this.clock = new Clock(this.game, 720, 50, 25000);
		this.game.add.existing(this.clock);

		// statusBox
		this.statusBox = new StatusBox(this.game, 20, 520, this.player.moneyGoal, this.player.maxHealth);
		this.game.add.existing(this.statusBox);

		// create group for good things
		this.goodGroup = this.game.add.group();
		this.goodGroup.enableBody = true;
		this.goodGroup.outOfBoundsKill = true;

		// Create group for all bad things
		this.badGroup = this.game.add.group();
		this.badGroup.enableBody = true;
		this.badGroup.outOfBoundsKill = true;

		//  Start our folk-loop
		this.byPassers = this.game.add.group();
		this.createFolk();

		// Show stuff
		this.game.world.alpha = 255;
	},
	update: function(){

		if(	 this.player.wellbeing <= 0
			|| this.clock.timeUp ){
			this.state.start('GameEnd', true, false, this.player.wellbeing, this.player.money, this.player.money >= this.player.moneyGoal);
		}

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

		this.byPassers.sort('y', Phaser.Group.SORT_ASCENDING);

	},
	createFolk: function(){
		var naughtiness = this.game.rnd.integerInRange(0, 100);
		var stuff;
		var throwSound;

		if(naughtiness < 40)
			stuff = this.goodGroup.create(0, 0, 'peng');
		else if(naughtiness > 80){
			stuff = this.badGroup.create(0, 0, 'glob');
			if(this.game.rnd.integerInRange(0, 1))
				stuff.throwSound = this.spitSound1;
			else
				stuff.throwSound = this.spitSound2;
		}

		var p = new People(this.game, stuff, throwSound);
		this.game.add.existing(p);
		this.byPassers.add(p);

		var timer = this.game.time.create(this.game);
		timer.add(this.game.rnd.integerInRange(200, 1500), this.createFolk, this);
		timer.start();
	},
	gotMoney: function (player, money){
		this.player.money += this.game.rnd.integerInRange(1, 15);
		this.statusBox.setMoney(this.player.money);
		money.kill();

		if(this.game.rnd.integerInRange(0, 1))
			this.coinSound1.play();
		else
			this.coinSound2.play();

	},
	gotHurt: function (player, hurtingThing){
		this.player.wellbeing -= 1;
		this.statusBox.setHealth(this.player.wellbeing);
		hurtingThing.kill();
	}
};
