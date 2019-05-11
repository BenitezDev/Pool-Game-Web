

function Game() {

}


Game.prototype.init = function () {
    this.gameWorld = new GameWorld();
}


Game.prototype.start = function () {

    PoolGame.init();

    PoolGame.SetupInput();
    PoolGame.PreparePhysics();
    PoolGame.CreateLimits();

    PoolGame.gameWorld.start();

    PoolGame.mainLoop();

}


Game.prototype.mainLoop = function () {

    Canvas.clear();

    // TODO: Calculate a better deltatime
    PoolGame.world.Step(0.16, 8, 3);
    PoolGame.world.ClearForces();

    PoolGame.gameWorld.update();
    PoolGame.gameWorld.draw();

    requestAnimationFrame(PoolGame.mainLoop);
}


let PoolGame = new Game();


Game.prototype.SetupInput = function () {

    // setup keyboard events
    SetupKeyboardEvents();

    // setup mouse events
    SetupMouseEvents();

}

Game.prototype.PreparePhysics = function () {

    // zero gravity (0,0)
    let gravity = new b2Vec2();

    PoolGame.world = CreateWorld(Canvas._ctx, gravity);

}

Game.prototype.CreateLimits = function () {

    this.limits = [
        // left
        CreateBox(this.world, 0, 240, 40, 165, { type: b2Body.b2_staticBody }),
        // right
        CreateBox(this.world, 800, 240, 40, 165, { type: b2Body.b2_staticBody }),
        // left up
        CreateBox(this.world, 220, 0, 150, 40, { type: b2Body.b2_staticBody }),
        // left down
        CreateBox(this.world, 220, 480, 150, 40, { type: b2Body.b2_staticBody }),
        // right up
        CreateBox(this.world, 583, 0, 150, 40, { type: b2Body.b2_staticBody }),
        // right down
        CreateBox(this.world, 583, 480, 150, 40, { type: b2Body.b2_staticBody }),
    ];

}