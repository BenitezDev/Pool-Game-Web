
function Game(){

}


Game.prototype.init = function(){
    this.gameWorld = new GameWorld();
}

Game.prototype.SetupInput = function(){
    // setup keyboard events
    SetupKeyboardEvents();

    // setup mouse events
    SetupMouseEvents();
}

Game.prototype.start = function(){
    PoolGame.init();
    PoolGame.SetupInput();
    PoolGame.mainLoop();
}


Game.prototype.mainLoop = function(){
    Canvas.clear();
    PoolGame.gameWorld.update();
    PoolGame.gameWorld.draw();
    
    requestAnimationFrame(PoolGame.mainLoop);
}



let PoolGame = new Game();