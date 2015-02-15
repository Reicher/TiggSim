var pEng = {
	particles: [], //all active particles are stored here
	
	particleInfo: { //config info for different types of particles
		blood: {
		
			color: [ //colors
				{r: 250, g: 0, b: 0},
				{r: 225, g: 0, b: 0},
				{r: 200, g: 0, b: 0}
			],
			
			opacity: [.25, .5, .75], //opacities
			
			size: [1, 2, 3, 4, 6], //sizes (width & height)
			
			weight: [1, 2, 3, 4], //weights (how fast particle will fall)
			
			fadeRate: 4, //how many seconds it takes particle's opacity to fade to 0 (if undefined particle will not fade)
			
			maxLifespan: 4000, //how long before particle is deleted (if undefined particle will not die)
			
			speed: 450, //movement speed
			
			elasticity: .5, //bounciness (between 0 and 1, 1 is max bounciness)
			
			floor: 100 //how far particle can drop beyond origin if it has positive weight (use ceil for negative weight)
			
		},
		fire: {
			 //you can also specify different layers of particles for more versatility
			 //when a particle is instantiated a layer will be selected randomly
			layers: {
				inner: {
					color: [
						{r: 255, g: 155, b: 125},
						{r: 255, g: 155, b: 50}
					],
					speed: 50,
					weight: -1,
					fadeRate: 2
				},
				middle: {
					color: [
						{r: 255, g: 235, b: 75}, 
						{r: 255, g: 160, b: 60}
					],
					speed: 100,
					weight: -2,
					fadeRate: 2
				},
				outer: {
					color: [
						{r: 255, g: 155, b: 50}, 
						{r: 255, g: 100, b: 10}, 
						{r: 155, g: 65, b: 0}, 
						{r: 255, g: 95, b: 15}
					],
					speed: 200,
					weight: -2,
					fadeRate: 3
				},
				sparks: {
					color: [
						{r: 255, g: 235, b: 95}, 
						{r: 200, g: 105, b: 35}
					],
					speed: 400,
					weight: 0,
					fadeRate: .5,
					size: [1, 2, 4]
				},
				smoke: {
					color: [
						{r: 100, g: 100, b: 100}, 
						{r: 50, g: 50, b: 50}, 
						{r: 25, g: 25, b: 25}
					],
					speed: 50,
					weight: -8,
					fadeRate: 6,
					size: [4, 6]
				}
			},
			//the following properties will only be used if they are not specified in the selected layer
			size: [1, 2, 3, 4],
			opacity: [.25, .5, .75]
		},
		smoke: {
			color: [
				{r: 100, g: 100, b: 100}, 
				{r: 50, g: 50, b: 50}, 
				{r: 25, g: 25, b: 25}
			],
			opacity: [.25, .5],
			size: [1, 2, 3, 4, 6, 8], 
			weight: [-10, -6, -4],
			fadeRate: [1, 2, 4, 6], 
			speed: [50, 100]
		},
		explosion: {
			layers: {
				inner: {
					color: [
						{r: 255, g: 255, b: 180}, 
						{r: 255, g: 255, b: 230}
					],
					speed: 400,
					weight: -2,
					size: [2, 4, 6]
				},
				sparks: {
					color: [
						{r: 255, g: 235, b: 95}, 
						{r: 200, g: 105, b: 35}
					],
					speed: 2000,
					weight: 0,
					size: [2, 4, 6]
				}, 
				middle: {
					color: [
						{r: 255, g: 235, b: 75},
						{r: 255, g: 160, b: 60}
					],
					speed: 800,
					weight: -2,
					size: [2, 4, 6]
				}, 
				outer: {
					color: [
						{r: 255, g: 155, b: 50},
						{r: 255, g: 100, b: 10},
						{r: 155, g: 65, b: 0}, 
						{r: 255, g: 95, b: 15}
					],
					speed: 1200,
					weight: -2,
					size: [2, 4, 6]
				}, 
				smoke: {
					color: [
						{r: 155, g: 155, b: 155}, 
						{r: 55, g: 55, b: 55}, 
						{r: 0, g: 0, b: 0}
					],
					speed: 1200,
					weight: -8,
					size: [2, 4, 6]
				}
			},
			opacity: [.25, .5, .75],
			maxLifespan: [100, 250, 500],
			fadeRate: .25
		},
		splash: {
			color: [
				{r: 65, g: 175, b: 250},
				{r: 45, g: 175, b: 215},
				{r: 45, g: 25, b: 225}
			],
			opacity: [.25, .5, .75],
			size: [1, 2, 3, 4, 6], 
			weight: 1,
			fadeRate: 4, 
			speed: 450, 
			elasticity: 1, 
			floor: 100,
			yVel: -1
		},
		snow: {
			color: {r: 255, g: 255, b: 255},
			opacity: [.25, .5, .75],
			size: [1, 2, 3], 
			weight: .1,
			fadeRate: [10, 20], 
			speed: 50,
			yVel: 1,
			deleteOffScreen: false
		},
		rain: {
			color: [
				{r: 65, g: 175, b: 250},
				{r: 45, g: 175, b: 215},
				{r: 45, g: 25, b: 225}
			],
			opacity: [.25, .5, .75],
			size: [1, 2, 3], 
			weight: 1,
			fadeRate: [12, 14, 16], 
			speed: 150,
			yVel: 1,
			xVel: 0,
			deleteOffScreen: false
		},
		fireflies: {
			color: [
				{r: 255, g: 145, b: 130},
				{r: 255, g: 225, b: 60},
				{r: 255, g: 245, b: 185}
			],
			opacity: [.25, .5, .75],
			size: [2, 4, 6], 
			fadeRate: [10, 14, 16], 
			speed: 50,
		}
	},
	createParticles: function(type, x, y, count, radius) {
		for (var i = 0; i <= count; i ++) {
			var currentX = x, currentY = y;
			if (typeof radius != 'undefined') {
				currentX = Math.floor(x - radius + Math.random() * radius * 2);
				currentY = Math.floor(y - radius + Math.random() * radius * 2);
			}
			pEng.particles.push(new pEng.Particle(currentX, currentY, type));
		}
	},
	Particle: function(x, y, type, xVel, yVel) {
		this.x = x;
		this.y = y;
		this.initialX = this.x;
		this.initialY = this.y;
		this.type = type;
		if (typeof xVel != 'undefined') {
			this.xVel = xVel;
		}
		if (typeof yVel != 'undefined') {
			this.yVel = yVel;
		}
		
		if (typeof pEng.particleInfo[this.type].layers != 'undefined') {
			var layer = pEng.objRand(pEng.particleInfo[this.type].layers);
			for (var key in pEng.particleInfo[this.type].layers[layer]) {
				if (pEng.particleInfo[this.type].layers[layer][key] instanceof Array) {
					this[key] = pEng.arrayRand(pEng.particleInfo[this.type].layers[layer][key]);
				} else {
					this[key] = pEng.particleInfo[this.type].layers[layer][key];
				}
			}
		}
		
		for (var key in pEng.particleInfo[this.type]) {
			if (key != 'layers') {
				if (typeof this[key] == 'undefined') {
					if (pEng.particleInfo[this.type][key] instanceof Array) {
						this[key] = pEng.arrayRand(pEng.particleInfo[this.type][key]);
					} else {
						this[key] = pEng.particleInfo[this.type][key];
					}
				}
			}
		}
		
		if (typeof this.xVel == 'undefined') {
			this.xVel = Math.random() - Math.random();
		} 
		if (typeof this.yVel == 'undefined'){
			this.yVel = Math.random() - Math.random();
		}
		if (typeof this.color == 'undefined') {
			this.color = {r: 0, g: 0, b: 0};
		}
		if (typeof this.opacity == 'undefined') {
			this.opacity = 1;
		}
		if (typeof this.size == 'undefined') {
			this.size = 1;
		}
		if (typeof this.weight == 'undefined') {
			this.weight = 0;
		}
		if (typeof this.speed == 'undefined') {
			this.speed = 0;
		}
		if (typeof this.deleteOffScreen == 'undefined') {
			this.deleteOffScreen = true;
		}
		
		this.width = this.size;
		this.height = this.size;
		
		this.spawnTime = Date.now();
	},
	updateParticles: function(mod) {
		pEng.arrayPack(pEng.particles);
		for (var key in pEng.particles) {
			if (!pEng.particles[key].kill) {
				pEng.particles[key].update(mod);
			}	
		}
	},
	drawParticles: function() {
		for (var key in pEng.particles) {
			if (!pEng.particles[key].kill) {
				pEng.particles[key].draw();
			}
		}
	},
	arrayPack: function(arr) {
		var source = 0, destination = 0, length = arr.length;
		for (var key in arr) {
			var current = arr[source];
			if (!current.kill) {
				if (source != destination) {
					arr[destination] = current;
				}
				destination ++;
			}
			source ++;
		}
		destination --;
		arr.length = destination > 0 ? destination : 0;
	},
	arrayRand: function(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	},
	objRand: function(obj) {
		var arr = [];
		for (var key in obj) {
			arr.push(key);
		}
		return pEng.arrayRand(arr);
	},
	init: function(canvas, ctx) {
		pEng.Particle.prototype.update = function(mod) {
			if (this.deleteOffScreen) {
				if ( 
					this.x + this.width < 0 ||
					this.y + this.height < 0 || 
					this.x > canvas.width || 
					this.y > canvas.height
				) {
					this.kill = true; //delete if off canvas
					return;
				}
			}
			
			if (this.opacity <= .25) {
				this.kill = true; //delete if faded out
				return;
			} else {
				if (typeof this.fadeRate != 'undefined') {
					this.opacity -= mod / this.fadeRate; //fade 
				}
			}
			
			if (typeof this.maxLifespan != 'undefined') {
				if (Date.now() - this.spawnTime >= this.maxLifespan) {
					this.kill = true; //delete if reaches lifespan
					return;
				}
			}
			
			this.yVel += this.weight * mod; //accelerate yVel
			
			if (typeof this.floor != 'undefined') {
				if (this.y >= this.initialY + this.floor) { //if at floor level
					this.y = this.initialY + this.floor;
					if (typeof this.elasticity != 'undefined') { //bounce
						if (this.yVel < .5) {
							this.yVel = 0;
						}
						this.yVel *= -1 * this.elasticity;
						this.xVel /= 1.5;
					} else {
						this.yVel = 0;
					}
				} 
			}
			
			if (typeof this.ceil != 'undefined') {
				if (this.y <= this.initialY + this.ceil) { //if at ceiling level
					this.y = this.initialY + this.ceil;
					if (typeof this.elasticity != 'undefined') { //bounce
						if (this.yVel < .5) {
							this.yVel = 0;
						}
						this.yVel *= -1 * this.elasticity;
						this.xVel /= 1.5;
					} else {
						this.yVel = 0;
					}
				} 
			}
			
			if (typeof this.func != 'undefined') { //run function if defined
				this.func(mod);
			}
			
			//update position
			this.x += this.xVel * this.speed * mod;
			this.y += this.yVel * this.speed * mod;
		}
		pEng.Particle.prototype.draw = function() {
			ctx.fillStyle = 'rgba(' + this.color.r + ', ' + this.color.g + ', ' + this.color.b + ', ' + this.opacity + ')';
			ctx.fillRect(Math.round(this.x), Math.round(this.y), this.width, this.height);
		}
	}
}