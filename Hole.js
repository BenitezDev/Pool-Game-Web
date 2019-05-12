

function Hole(position, radius) {

    this.position = position;
    this.radius = radius;

    this.sfx = audio.hit;
}

Hole.prototype.start = function () {

}

Hole.prototype.update = function () {

    // Check if a ball has entered a hole
    currentScene.ballPools.forEach(ball => {
        if (CheckCollisionBetweenCircles(this.position, this.radius, ball.position, ball.radius * ball.scale)) {

            currentScene.ballPools.splice(currentScene.ballPools.indexOf(ball), 1);
            PoolGame.world.DestroyBody(ball.collider);
            audioManager.playFx(this.sfx);

        }

    });

}


Hole.prototype.draw = function () {

    Canvas._ctx.beginPath();
    Canvas._ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    Canvas._ctx.stroke();

}

