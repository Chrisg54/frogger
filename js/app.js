// Enemies our player must avoid
var Enemy = function(order, x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.order = order;
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var newx = (this.x += (dt + this.speed));

    //if the enemy is within the game boundry set with new position.
    //if not it'll start from the beginning with a new speed.
    if (newx < 550)
        this.x = newx;
    else {
        this.speed = Math.random() * (5 - 1) + 1;
        this.x = 0;
    }

        

    this.y = (this.order * 75);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check to see if the enemey hits the player
Enemy.prototype.checkCollision = function(playerx, playery) {
    //This conditional checks to see if the player is within a rectanglar portion of the enemy
    if ((this.x + 60 >= playerx && this.x - 40 <= playerx) && (playery + 60 > this.y && playery < this.y + 40))
        return true;
    else
        return false;
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Enemies our player must avoid
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

//The only reason this is here is so the engine doesn't break
Player.prototype.update = function() {
// noop
};

//Set the start position of the player
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 375;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handles the player key pressed. The second conditionals within the key conditions check to see 
//if the player is within that particular boundry. If so go ahead an update with the new position
Player.prototype.handleInput = function(key) {
    if (key) {
       
        if (key === 'left') {
            if (this.x - 101 > -3)
                this.x -= 101;
        }

        if (key === 'right') {
            if (this.x + 101 < (500))
                this.x += 101;
        }   

        if (key === 'down') {
            if (this.y + 83 < (450))
                this.y += 83;
        }  

        if (key === 'up') {
            if (this.y - 83 > 0)
                this.y -= 83;
        } 

        this.render();
    }
};


// This class renders the gems that are collected by the player
var Gem = function(color) {
    this.sprite = 'images/Gem-' + color + '.png';
    this.x = 0;
    this.y = 0; 
    this.width = 83;
    this.height = 101;   
};

//Update the gem's position
Gem.prototype.update = function(x, y) {
    this.x = x;
    this.y = y;
};

// Draw the gem on the screen, required method for game
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

//Check to see if the player has landed on a gem
Gem.prototype.checkCollision = function(playerx, playery) {
    //This conditional checks to see if the player is within a rectanglar portion of the enemy
    if ((playerx > (this.x - 20) && playerx < (this.x + this.width)) && (playery + 100 > this.y && playery + 100 < this.y + this.height))
        return true;
    else
        return false;
}

// Find which row the player is in and redraw that row then remove gem
Gem.prototype.score = function(y) {
    
    var row = 1;
    y += 100;
    if (y > this.height && y < (this.height * 2)) {
        row = 1;
    }

    if (y > (this.height * 2) && y < (this.height * 3)) {
        row = 2;
    }

    if (y > (this.height * 3) && y < (this.height * 4)) {
        row = 3;
    }

    for (col = 0; col < 5; col++) {
        ctx.drawImage(Resources.get('images/stone-block.png'), col * 101, row * this.height);
    }
    
    //Remove the gem by drawing outside of the canvas
    this.update(-100, -100);

    score += 1;

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(1, 0, 83, 2);
var enemy2 = new Enemy(2, 0, 83 * 2, 1);
var enemy3 = new Enemy(3, 0, 83 * 3, 4);

var allEnemies = [enemy1, enemy2, enemy3];

// Game gems
var gem1 = new Gem('Blue');
gem1.update(parseInt((Math.random() * (5 - 0) + 0)) * 102, 1 * 100);
var gem2 = new Gem('Green');
gem2.update(parseInt((Math.random() * (5 - 0) + 0)) * 102, 2 * 92);
var gem3 = new Gem('Orange');
gem3.update(parseInt((Math.random() * (5 - 0) + 0)) * 102, 3 * 90);

var allGems = [gem1, gem2, gem3];

// The player
var player = new Player();
player.reset();

// The score
var score = 1;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


