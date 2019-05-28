
//////////////////////////////////////////
function holdit(btn, action, start, speedup) {
    var t;
    var repeat = function () {
        action();
        t = setTimeout(repeat, start);
        start = start / speedup;

    }

    btn.mousedown = function () {
        repeat();
    }

    btn.mouseup = function () {
        clearTimeout(t);
    }

    console.log(btn.onclick);

};

/////////////////////////////////////////////////////////////////
let movingfLeft = false;
let movingfRight = false;
let movingForware = false;
let movingBackwards = false;

function MobileInputs(){
    
    this.l1 = document.getElementById('L1');
    this.L1 = new Hammer.Manager(this.l1);
    this.L1.add(new Hammer.Press({
        event: 'press',
        pointer: 1,
        threshold: 1000,
        time: 1,
    }));

    this.r1 = document.getElementById('R1');
    this.R1 = new Hammer.Manager(this.r1);
    this.R1.add(new Hammer.Press({
        event: 'press',
        pointer: 1,
        threshold: 1000,
        time: 1,
    }));

    this.f1 = document.getElementById('F1');
    this.F1 = new Hammer.Manager(this.f1);
    this.F1.add(new Hammer.Press({
        event: 'press',
        pointer: 1,
        threshold: 1000,
        time: 1,
    }));

    this.b1 = document.getElementById('B1');
    this.B1 = new Hammer.Manager(this.b1);
    this.B1.add(new Hammer.Press({
        event: 'press',
        pointer: 1,
        threshold: 1000,
        time: 1,
    }));


    this.start();
}


MobileInputs.prototype.start = function (){

    this.L1.on("press", function (ev) {
           movingfLeft = true;
    });
    this.L1.on("pressup",function (ev) {
        movingfLeft = false;
    });

    this.R1.on("press", function (ev) {
        movingfRight = true;
    });
    this.R1.on("pressup",function (ev) {
        movingfRight = false;
    });

    this.F1.on("press", function (ev) {
        movingForware = true;
    });
    this.F1.on("pressup",function (ev) {
        movingForware = false;
    });
    
    this.B1.on("press", function (ev) {
        movingBackwards = true;
    });
    this.B1.on("pressup",function (ev) {
        movingBackwards = false;
    });

}


MobileInputs.prototype.update = function(){
    
    // Game Scene
    if(currentScene ==PoolGame.scenes[scenesTAGs.GAME]){
        // if(movingfLeft == true){
        //     currentScene.car.moveLeft(currentScene.car);
        // }
        // if(movingfRight == true){
        //     currentScene.car.moveRight(currentScene.car);
        // }
        // if(movingForware == true){
        //     currentScene.car.moveForward(currentScene.car);
        // }
        // if(movingBackwards == true){
        //     currentScene.car.moveBackward(currentScene.car);
        // }

        if(!movingfLeft && !movingfRight){
            currentScene.car.stopEngine();
        }
        currentScene.car.pressingForward = movingForware;
        currentScene.car.pressingBackward = movingBackwards;
        currentScene.car.pressingLeft = movingfLeft;
        currentScene.car.pressingRight = movingfRight;


    }
    
}

