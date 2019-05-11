// contain all objects of the game, in each frame update and draw them on canvas





function MenuScene() {


    // PoolGame.ChangeSceneTo(scenesTAGs.GAME)
    this.startButton =
        new Button(
            new Vector2(Canvas._canvas.width / 2, Canvas._canvas.height / 2),
            sprites.start_game,
            sprites.start_game.width,
            sprites.start_game.height,
            //function () { console.log("algo") }
        );
    //this.startButton.onCLick = 

    this.optionsButton =
        new Button(
            new Vector2(
                Canvas._canvas.width / 2, (Canvas._canvas.height / 2) + 80),
            sprites.options,
            sprites.options.width,
            sprites.options.height,
            //function () { console.log("nada") }
        );

}

MenuScene.prototype.start = function () {


}

MenuScene.prototype.update = function () {

    this.startButton.update();
    this.optionsButton.update();
};


MenuScene.prototype.draw = function () {

    this.startButton.draw();
    this.optionsButton.draw();

};



MenuScene.prototype.unloadScene = function () {

}
