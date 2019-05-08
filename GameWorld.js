// contain all objects of the game, in each frame update and draw them on canvas

let ballPools = [];

function GameWorld() {

}

GameWorld.prototype.start = function(){

  ballPools.push(
    new Ball(
      sprites.ball_1,
      { x: 400, y: 240 },
      { x: sprites.ball_1.width / 2, y: sprites.ball_1.height / 2 },
      68,
      0.3)
  );
  ballPools.push(
    new Ball(
      sprites.ball_2,
      { x: 450, y: 200 },
      { x: sprites.ball_2.width / 2, y: sprites.ball_2.height / 2 },
      68,
      0.3)
  );
  ballPools.push(
    new Ball(
      sprites.ball_3,
      { x: 300, y: 150 },
      { x: sprites.ball_3.width / 2, y: sprites.ball_3.height / 2 },
      68,
      0.3)
  );
}

GameWorld.prototype.update = function () {
  input.update();

  // Update all Balls
  ballPools.forEach(function (ball) { ball.update(); });

  input.postUpdate();
};

GameWorld.prototype.draw = function () {

  Canvas.drawImage(sprites.background, { x: 0, y: 0 }, 0,1,{ x: 0, y: 0 });

  // Draw all Balls
  ballPools.forEach(function (ball) { ball.draw(); });

  // Box2d Debug
  world.DrawDebugData();
};
