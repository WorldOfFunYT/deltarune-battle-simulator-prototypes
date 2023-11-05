// The area you aim for is 5px wide (including outline) and is 1 pixel ahead
// The width of the box is 63 pixels and the height is 20
// It kinda overlaps 1 pixel with the one below/the pixel above
//


let game = {
  canvas : document.createElement("canvas"),
  start : function () {
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.context = this.canvas.getContext("2d");
    this.canvas.style.height = "50vh";
    this.canvas.style.imageRendering = "pixelated";
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  }
}

function attackBar(width, height, x, y, colours) {
  this.width = width * 2;
  this.height = height * 2;
  this.x = x;
  this.y = y;
  ctx = game.context;
  ctx.fillStyle = colours.dark;
  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.fillStyle = "black";
  ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4)
  ctx.fillStyle = colours.light;
  ctx.fillRect(this.x + 2, this.y, 2 * 5, this.height);
  ctx.fillStyle = "black";
  ctx.fillRect(this.x + 4, this.y + 2, 2 * 3, this.height - 4)
}


game.start();
myAttackBar = new attackBar(63, 20, 80, 364, {dark: "#0503ca", light: "#139dd8"})

