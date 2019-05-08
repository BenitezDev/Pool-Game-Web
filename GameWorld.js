// contain all objects of the game, in each frame update and draw them on canvas

let ballPools = [];

function GameWorld() {
  // Balls:
  //this.ball_1 = new Ball();
  ballPools.push(
    new Ball(
      sprites.ball_1,
      { x: 400, y: 240 },
      { x: sprites.ball_1.width / 2, y: sprites.ball_1.height / 2 },
      1)
  );

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

  // Box2d Debug
  world.DrawDebugData();
};
