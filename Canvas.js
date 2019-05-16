

function Canvas2D() {

  this._canvas = document.getElementById("myCanvas");
  this._ctx = this._canvas.getContext("2d");

  this.centerPoint = new Vector2(this._canvas.width/2, this._canvas.height/2);

}

Canvas2D.prototype.clear = function () {
  this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
};

Canvas2D.prototype.drawImage = function (image, position, angle, scale, origin) {

  if (!position) position = new Vector2();
  if (!origin) origin = new Vector2();

  this._ctx.save();
  this._ctx.translate(position.x, position.y);
  this._ctx.rotate(angle);

  this._ctx.scale(scale, scale);
  this._ctx.drawImage(image, -origin.x, -origin.y);
  this._ctx.restore();

};

Canvas2D.prototype.drawText = function (text, position, fontsize, color) {

  position = typeof position !== 'undefined' ? position : new Vector2();
  //fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";
  color = typeof color !== 'undefined' ? color : 'black';
  fontname = "Courier New";

  this._ctx.save();
  this._ctx.translate(position.x, position.y);
  this._ctx.font = fontsize + " " + fontname;
  this._ctx.fillStyle = color;
  this._ctx.fillText(text, 0, 0);
  this._ctx.restore();

}

let Canvas = new Canvas2D();
