
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


    //CreateBox(world, 5, 5, 2, 2, { type: b2Body.b2_staticBody });

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
    let gravity = new b2Vec2();

    this.world = CreateWorld(Canvas._ctx, gravity);
}

Game.prototype.CreateLimits = function () {
    this.limits = [
        // left
        CreateBox(this.world, 0, 4.8, 0.75, 3.5, { type: b2Body.b2_staticBody }),
        // right
        CreateBox(this.world, 16, 4.8, 0.75, 3.5, { type: b2Body.b2_staticBody }),
        // up left
        CreateBox(this.world, 4.4, 0, 3, 0.75, { type: b2Body.b2_staticBody }),
        // up right
        CreateBox(this.world, 11.65, 0, 3, 0.75, { type: b2Body.b2_staticBody }),
        // down left
        CreateBox(this.world, 4.4, 9.5, 3, 0.75, { type: b2Body.b2_staticBody }),
        // down right
        CreateBox(this.world, 11.65, 9.5, 3, 0.75, { type: b2Body.b2_staticBody }),
    ];
}