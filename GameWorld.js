// contain all objects of the game, in each frame update and draw them on canvas

let ballPools = [];
let car = null;
let holes = [];


function GameWorld() {

}

GameWorld.prototype.start = function () {

  car = new Car(sprites.car);

  ballPools.push(
    new Ball(
      sprites.ball_1,
      { x: 110, y: 110 },
      { x: sprites.ball_1.width / 2, y: sprites.ball_1.height / 2 },
      68,
      0.3)
  );
  console.log(ballPools[0]);
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

  // Holes
  holes.push(new Hole({ x: 0, y: 0 }, 25));
  holes.push(new Hole({ x: 400, y: 0 }, 5));
  holes.push(new Hole({ x: 800, y: 0 }, 25));
  holes.push(new Hole({ x: 0, y: 480 }, 25));
  holes.push(new Hole({ x: 400, y: 480 }, 5));
  holes.push(new Hole({ x: 800, y: 480 }, 25));

}

GameWorld.prototype.update = function () {
  input.update();

  car.update();
  // Update all Balls
  ballPools.forEach(function (ball) { ball.update(); });

  // Update holes
  holes.forEach(function (hole) { hole.update(); })

  input.postUpdate();
};

GameWorld.prototype.draw = function () {

  Canvas.drawImage(sprites.background, { x: 0, y: 0 }, 0, 1, { x: 0, y: 0 });

  car.draw();

  // Draw all Balls
  ballPools.forEach(function (ball) { ball.draw(); });

  // Holes
  holes.forEach(function (hole) { hole.draw(); });

  // Box2d Debug
  world.DrawDebugData();


};
