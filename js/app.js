// Defines the actor class with base actions a values
var Actor = function(sprite, startLine) {
    // The image/sprite for our actors, this uses a helper we've provided to easily load images
    this.sprite = sprite;
	this.x = 1;
	this.y = 1;
	this.speed = 1;
	this.resetStartingPoint(startLine);
};
// Draw the actor on the screen, required method for game
Actor.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Actor.prototype.resetStartingPoint = function(startLine){/*do nothing*/};


// Defines the enemy/s our player must avoid
var Enemy = function(startLine) {
	Actor.call(this, 'images/enemy-bug.png', startLine);
	this.resetSpeed();
	this.lineer = startLine;
};
Enemy.prototype = Object.create(Actor.prototype); 
Enemy.constructor = Enemy;
Enemy.prototype.resetSpeed = function() {
    this.speed = Math.floor((Math.random() * 10) + 5);
};
Enemy.prototype.resetStartingPoint = function(startLine){
	switch(startLine){
		case 1: this.x = 1; this.y = 60; break;
		case 2: this.x = 1; this.y = 140; break;
		case 3: this.x = 1; this.y = 220; break;
		default: break;
	}
};
// Update the enemy's position, required method for game Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for
    // all computers.
	this.x = (this.x + this.speed) + dt;
	if(this.x > ctx.canvas.width){
		this.x = 1;
		this.resetSpeed();
	}
};

// Define your own player class

// This class requires an update(), render() and a handleInput() method.
var Player = function() {
    Actor.call(this, 'images/char-boy.png');
	this.speed = 15;
	this.earnPoints = 0;
};
Player.prototype = Object.create(Actor.prototype); 
Player.prototype.update = function() {
	if(this.y < 20){
		this.earnPoints++; alert("Total Points Earn : " + this.earnPoints);
		this.resetStartingPoint();
	}
};
Player.constructor = Player;

Player.prototype.resetStartingPoint = function(startLine){
	this.x=Math.floor((Math.random() * 300) + 50);
	this.y=400;
};

Player.prototype.handleInput = function(pressedKey) {
	var lastXPos = this.x;
	var lastYPos = this.y;
	switch(pressedKey){
		case 'left': this.x = this.x - this.speed; break;
		case 'right': this.x = this.x + this.speed; break;
		case 'up': this.y = this.y - this.speed; break;
		case 'down': this.y = this.y + this.speed; break;
		default: break;
	}
	if(this.x > ctx.canvas.width-100 || this.x < 0 || this.y > ctx.canvas.height-200 || this.y < -10){
		this.x = lastXPos;
		this.y = lastYPos;
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3)];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

