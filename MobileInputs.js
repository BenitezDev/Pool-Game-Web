
//////////////////////////////////////////

var L = document.getElementById('L');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(L);

// listen to events...
mc.on("tap press", function(ev) {
    currentScene.car.moveLeft(currentScene.car);
    //myElement.textContent = ev.type +" gesture detected.";
    console.log(ev.type +" gesture detected.");
});


// function MoveLeft_1(){
//     currentScene.car.moveLeft(currentScene.car);
// }

function MoveRight_1(){

}

function MoveForward_1(){

}

function MoveBackward_1(){

}



function MoveLeft_2(){

}

function MoveRight_2(){

}

function MoveForward_2(){

}

function MoveBackward_2(){

}

function holdit(btn, action, start, speedup) {
    var t;

    var repeat = function () {
        action();
        t = setTimeout(repeat, start);
        start = start / speedup;
        
    }

    btn.mousedown = function() {
        repeat();
    }

    btn.mouseup = function () {
        clearTimeout(t);
    }

    //currentScene.car.moveLeft(currentScene.car);
    btn.

    console.log(btn.onclick);
    
};

/* to use */
//holdit(btn, function () { }, 1000, 2); /* x..1000ms..x..500ms..x..250ms..x */



