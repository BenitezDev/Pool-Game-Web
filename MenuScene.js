// contain all objects of the game, in each frame update and draw them on canvas





function MenuScene(active) {
    this.foo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    this.wat = 1029312093;
}

MenuScene.prototype.start = function () {


}

MenuScene.prototype.update = function () {


};


MenuScene.prototype.draw = function () {


    Canvas.drawText("INTROOOO", { x: 200, y: 240 }, "100px", 'pink');

};

MenuScene.prototype.unloadScene = function () {

    delete this.foo;
    delete this.wat;

}
