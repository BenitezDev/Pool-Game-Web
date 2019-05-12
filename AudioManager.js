

function AudioManager() {

    this.backgroundAudio = null;
    this.loopBackground = null;

}




AudioManager.prototype.start = function () {

}


AudioManager.prototype.update = function () {

}


AudioManager.prototype.playFx = function (fx) {
    fx.play();
}


AudioManager.prototype.playBackgroundMusic = function (audio, loop) {

    this.backgroundAudio = audio;
    this.loopBackground = loop;

    this.backgroundAudio.play();
    this.backgroundAudio.loop = loop;
}