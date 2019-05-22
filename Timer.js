


function Timer(pos, size, maxSeconds, color){
    this.pos = pos;
    this.size = size;
    this.currentTime = maxSeconds;
    this.color = color;

    this.start();
}



Timer.prototype.start = function(){

}

Timer.prototype.update = function(){
    this.currentTime -= deltatimeSeconds;
    if(this.currentTime <= 0) alert("lololo");
}

Timer.prototype.draw = function(){
    Canvas.drawText(Math.trunc(this.currentTime),this.pos,this.size,this.color)
}