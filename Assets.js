// Load all the assets before starting starting the game

var sprites = {};
var assetsStillLoading = 0;

function assetsLoadingLoop(callback) {

    if (assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    }
    else {
        callback();
    }

}

function loadAssets(callback) {

    function loadSprite(fileName) {

        //Canvas.drawText(1 + "%");

        assetsStillLoading++;

        let spriteImage = new Image();
        spriteImage.src = "./assets/sprites/" + fileName;

        spriteImage.onload = function () {
            assetsStillLoading--;
        }

        return spriteImage;

    }

    sprites.background = loadSprite('background.png');
    sprites.car = loadSprite('car_1.png');
    sprites.car_2 = loadSprite('car_2.png');
    sprites.wheel = loadSprite('wheel.png')
    sprites.ball_1 = loadSprite('ball_1.png');
    sprites.ball_2 = loadSprite('ball_2.png');
    sprites.ball_3 = loadSprite('ball_3.png');
    sprites.start_game = loadSprite('start_game.png');
    sprites.options = loadSprite('options.png');
    assetsLoadingLoop(callback);

}