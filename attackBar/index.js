// The area you aim for is 5px wide (including outline) and is 1 pixel ahead
// The width of the box is 63 pixels and the height is 20
// It kinda overlaps 1 pixel with the one below/the pixel above
//
// The trail is grid locked, starting after the crit target, being 3 pixels wide, and having 5 pixel gap. Moves 8 pixels every 4 frames, or 2ppf (pixels per frame)
//
// You can only hit inside the box, If you don't it doesn't count as being clicked, and if you pass the target box, you miss.
let game = {
  canvas : document.createElement("canvas"),
  start : function () {
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.context = this.canvas.getContext("2d");
    this.canvas.style.imageRendering = "pixelated";
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  }
}

function attackBar(x, y, colours, startDistance) {
  this.width = 63 * 2;
  this.height = 20 * 2;
  this.x = x;
  this.y = y;
  this.ctx = game.context;
  this.startDistance = startDistance;

  this.distance = startDistance;
  this.moving = true;
  this.framesSincePressed = 0;
  this.accuracy = 0;

  this.update = function () {
    if (this.moving) {
      this.distance -= 2;
    } else {
      this.framesSincePressed ++;
    }

    if (this.distance < -100) {
      this.press()
    }
    this.ctx.fillStyle = colours.dark;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4)
    this.ctx.fillStyle = colours.light;
    this.ctx.fillRect(this.x + 2, this.y, 2 * 5, this.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x + 4, this.y + 2, 2 * 3, this.height - 4);

    // Trail
    //
    this.trail()
    this.cursor()
  }

  this.trail = function () {
    for (let i = Math.floor(this.distance/8)*8 -2; i < Math.floor(this.distance/8)*8 + 48; i += 8) {
      distanceFromCursor = i - this.distance;
      distanceFromCursor = distanceFromCursor / 32;
      this.ctx.fillStyle = `hsla(0, 0%, 100%, ${Math.max(1 - distanceFromCursor - this.framesSincePressed/20, 0) * 0.5})`
      this.ctx.fillRect(this.x + 16 + i*2, this.y, 2*3, this.height);
    }
  }

  this.cursor = function () {
    this.ctx.fillStyle = `hsla(0, 0%, 100%, ${Math.max(1 - this.framesSincePressed/15)})`;
    sizeModifier = this.framesSincePressed/1;
    this.ctx.fillRect(this.distance*2 + this.x - sizeModifier/2 + 2, this.y - sizeModifier / 2, 2*3 + sizeModifier, this.height + sizeModifier);
  }

  this.reset = function () {
    this.moving = true;
    this.distance = this.startDistance;
    this.framesSincePressed = 0;
    this.accuracy = 0;
  }

  this.press = function () {
    if (this.moving && this.distance <= 60) {
      this.moving = false;
      if (this.distance < -3) {
        this.distance = -100;
      }
      this.getAccuracy();
    }
  }

  this.getAccuracy = function () {
    framesOff = Math.abs(this.distance) / 2;
    if (framesOff === 0) {
      this.accuracy = 150;
    } else if (framesOff == 1) {
      this.accuracy = 120;
    } else if (framesOff == 2) {
      this.accuracy = 110;
    } else if (framesOff >= 100) {
      this.accuracy = 0; // Miss
    } else {
      this.accuracy = 100 - (framesOff * 2)
    }
  }
}
const update = function () {
  game.canvas.width = game.canvas.width;
  game.canvas.height = game.canvas.height;
  myAttackBar.update()
  if (myAttackBar.distance <= Math.random() * 30 - 5) {
    myAttackBar.press();
  }
  ralsAttackBar.update()
  if (ralsAttackBar.distance <= 0) {
    ralsAttackBar.press();
  }
}

game.start();
myAttackBar = new attackBar(80, 364, {dark: "#0503ca", light: "#139dd8"}, 256)
ralsAttackBar = new attackBar(80, 402, {dark: "#137c16", light: "#b6e32d"}, 192)
frameUpdate = setInterval(update, 15);
