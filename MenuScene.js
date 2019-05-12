// contain all objects of the game, in each frame update and draw them on canvas





function MenuScene() {

    this.startButton = null;
    this.optionsButton = null;

    // new Button(
    //     new Vector2(Canvas._canvas.width / 2, Canvas._canvas.height / 2),
    //     sprites.start_game,
    //     sprites.start_game.width,
    //     sprites.start_game.height,
    //     1,
    //     PoolGame.ChangeSceneTo,
    //     scenesTAGs.GAME
    // );
    //this.startButton.onCLick = 

    // this.optionsButton =
    //     new Button(
    //         new Vector2(
    //             Canvas._canvas.width / 2, (Canvas._canvas.height / 2) + 80),
    //         sprites.options,
    //         sprites.options.width,
    //         sprites.options.height,
    //         //function () { console.log("nada") }
    //     );

}

MenuScene.prototype.start = function () {

    this.startButton =
        new Button(
            new Vector2(Canvas._canvas.width / 2, Canvas._canvas.height / 2),
            sprites.start_game,
            sprites.start_game.width,
            sprites.start_game.height,
            1,
            PoolGame.ChangeSceneTo,
            scenesTAGs.GAME
        );

    this.optionsButton =
        new Button(
            new Vector2(
                Canvas._canvas.width / 2, (Canvas._canvas.height / 2) + 80),
            sprites.options,
            sprites.options.width,
            sprites.options.height,
            1,
            null,
            "HOLA MUNDO"
        );

}

MenuScene.prototype.update = function () {


    this.optionsButton.update();
    this.startButton.update();

};


MenuScene.prototype.draw = function () {

    this.startButton.draw();
    this.optionsButton.draw();

};



MenuScene.prototype.unloadScene = function () {

    this.startButtonFunction = function () { };
    this.startButton = null;


    this.optionsButton = {}

}
