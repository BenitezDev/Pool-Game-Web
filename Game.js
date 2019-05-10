
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

    //CreateBox(PoolGame.world, 5, 5, 2, 2, { type: b2Body.b2_staticBody });
    // CreateSphere(world, 7.9, 4.75, 1.3, { type: b2Body.b2_staticBody });
    PoolGame.mainLoop();
}


Game.prototype.mainLoop = function () {
    Canvas.clear();

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
    // gravity vector
    let gravity = new b2Vec2(1,1);

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