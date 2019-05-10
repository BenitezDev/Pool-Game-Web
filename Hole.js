function Hole(position, radius){
    this.position = position;
    this.radius = radius;
    
}



Hole.prototype.start = function () {

}

Hole.prototype.update = function (){
    
    // Check if balls are inside the hole
    ballPools.forEach(ball => { 
        if(CheckCollisionBetweenCircles(this.position, this.radius, ball.position, ball.radius))
        {
            ballPools.splice(ballPools.indexOf(ball),1);
        }
        
    });
    
}


Hole.prototype.draw = function () {
    Canvas._ctx.beginPath();
    Canvas._ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    Canvas._ctx.stroke();
}

