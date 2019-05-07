// contain all objects of the game, in each frame update and draw them on canvas

let ballPools = [];

function GameWorld() {
  // Balls:
  //this.ball_1 = new Ball();
  ballPools.push(new Ball(sprites.ball_1, { x: 70, y: 70 }, { x: sprites.ball_1.width / 2, y: sprites.ball_1.height / 2 }));
  ballPools.push(new Ball(sprites.ball_2, { x: 140, y: 140 }, { x: sprites.ball_2.width / 2, y: sprites.ball_2.height / 2 }));
  //ballPools.push(new Ball(100, 250));
}

GameWorld.prototype.update = function () {
  input.update();
  // Update all Balls
  ballPools.forEach(function (ball) { ball.update(); });

  input.postUpdate();
};

GameWorld.prototype.draw = function () {
  Canvas.drawImage(sprites.background, { x: 0, y: 0 }, { x: 0, y: 0 });

  // Draw all Balls
  ballPools.forEach(function (ball) { ball.draw(); });

};
