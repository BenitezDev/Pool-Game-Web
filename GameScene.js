// contain all objects of the game, in each frame update and draw them on canvas





function GameScene() {

  this.ballPools = [];
  this.holes = [];

  this.car = null;
  this.car2 = null;

}

GameScene.prototype.start = function () {

  // This scene requires Physics
  PoolGame.PreparePhysics();

  // Create the colliders of the Pool Table
  this.createTableColliders();

  // Create the cars
  this.car = new Car(
    sprites.car,
    { x: 150, y: 190 },
    KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN
  );
  this.car.body.SetUserData(this.car);

  this.car2 = new Car(
    sprites.car_2,
    { x: 150, y: 290 },
    KEY_A, KEY_D, KEY_W, KEY_S
  );
  this.car2.body.SetUserData(this.car2);

  // Create the ball pool
  this.ballPools.push(
    new Ball(
      sprites.ball_1,
      { x: 550, y: 240 },
      { x: sprites.ball_1.width / 2, y: sprites.ball_1.height / 2 },
      68,
      0.3)
  );
  this.ballPools.push(
    new Ball(
      sprites.ball_2,
      { x: 585, y: 220 },
      { x: sprites.ball_2.width / 2, y: sprites.ball_2.height / 2 },
      68,
      0.3)
  );
  this.ballPools.push(
    new Ball(
      sprites.ball_3,
      { x: 585, y: 260 },
      { x: sprites.ball_3.width / 2, y: sprites.ball_3.height / 2 },
      68,
      0.3)
  );

  this.ballPools.forEach(ball => { ball.collider.SetUserData(ball); });

  // Create the holes
  this.holes.push(new Hole({ x: 0, y: 0 }, 25));
  this.holes.push(new Hole({ x: 400, y: 0 }, 5));
  this.holes.push(new Hole({ x: 800, y: 0 }, 25));
  this.holes.push(new Hole({ x: 0, y: 480 }, 25));
  this.holes.push(new Hole({ x: 400, y: 480 }, 5));
  this.holes.push(new Hole({ x: 800, y: 480 }, 25));

}

GameScene.prototype.update = function () {

  // Cars
  this.car.update();
  this.car2.update();

  // Update all Balls
  this.ballPools.forEach(ball => ball.update());

  // Update holes. AKA check if a ball has entered a hole
  this.holes.forEach(hole => hole.update());

};


GameScene.prototype.draw = function () {

  // 1º background img
  Canvas.drawImage(sprites.background, { x: 0, y: 0 }, 0, 1, { x: 0, y: 0 });

  // 2º Cars
  this.car.draw();
  this.car2.draw();

  // 3º Draw all Balls
  this.ballPools.forEach(ball => ball.draw());

  // 4º Holes Debug
  this.holes.forEach(hole => hole.draw());

};


GameScene.prototype.createTableColliders = function () {

  this.tableColliders = [
    // left
    { body: CreateBox(PoolGame.world, 0, 240, 40, 165, { type: b2Body.b2_staticBody }), type: 'wall' },
    // right
    { body: CreateBox(PoolGame.world, 800, 240, 40, 165, { type: b2Body.b2_staticBody }), type: 'wall' },
    // left up
    { body: CreateBox(PoolGame.world, 220, 0, 150, 40, { type: b2Body.b2_staticBody }), type: 'wall' },
    // left down
    { body: CreateBox(PoolGame.world, 220, 480, 150, 40, { type: b2Body.b2_staticBody }), type: 'wall' },
    // right up
    { body: CreateBox(PoolGame.world, 583, 0, 150, 40, { type: b2Body.b2_staticBody }), type: 'wall' },
    // right down
    { body: CreateBox(PoolGame.world, 583, 480, 150, 40, { type: b2Body.b2_staticBody }), type: 'wall' },
  ];
  this.tableColliders.forEach(coll => { coll.body.SetUserData(coll); });

}


GameScene.prototype.unloadScene = function () {

  this.ballPools = [];
  this.holes = [];
  this.tableColliders = [];
  this.car = null;
  this.car2 = null;

}