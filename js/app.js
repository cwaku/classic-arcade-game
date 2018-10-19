const modal = document.querySelector('.modal'),
button = document.querySelector('button');

// Enemies our player must avoid
var Enemy = function(sprite, x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = x;
  this.sprite = sprite;
  this.y = y;
  this.speed = Math.floor(Math.random()*600);

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   // You should multiply any movement by the dt parameter
   // which will ensure the game runs at the same speed for
   // all computers.
   this.x += this.speed * dt;
   if (this.x > 500) {
     this.x = Math.floor(Math.random() - 90);
     this.y = Math.floor(Math.random() * (180) + 55)
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player class
class Player{
  constructor(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
  }
  update() {
    if(this.y > 400 ) {
      this.y = 400;
    } else if(this.x > 420) {
      this.x = 420;
    } else if(this.x < -16) {
      this.x = -16;
    } else if(this.y < 10) {
      this.y = -5;
      this.x = 200;
    }
  };
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  //Function  to handle input of player
  handleInput(keyPressed, startGame) {
    if(keyPressed == 'left' && this.x > 0) {
      this.x -= 102;
    } else if(keyPressed == 'right' && this.x < 405) {
      this.x += 102;
    } else if(keyPressed == 'up' && this.y > 0) {
      this.y -= 83;
    } else if(keyPressed == 'down' && this.y < 405) {
      this.y += 83;
      }
  }

update(){
  if (this.y < 0){
    modal.classList.remove('hide');
    btn.onclick = function() {
      modal.classList.add('hide');
      player.x = 202;
      player.y = 405;
    }
  }
}}

// Now instantiate your object.
// Place all enemy objects in an array called allEnemies

const allEnemies = [];
for(let i = 0; i < 6; i++) {
   allEnemies.push(new Enemy('images/enemy-bug.png', Math.random()-80, Math.floor(Math.random() * (180) + 55)));
}


// Place the player object in a variable called player
const player = new Player('images/char-boy.png', 200, 400);

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