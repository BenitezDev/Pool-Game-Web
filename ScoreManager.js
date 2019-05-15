









function ScoreManager(goal, position) {

    this.maxPoints = goal;
    this.currentPoints = 0;

    this.position = position;

    this.ballpool = [];

    this.start();
}

ScoreManager.prototype.start = function () {

    this.emptyBallsToShow = this.maxPoints - this.currentPoints;

    // All the balls have the same width and height
    this.origin = { x: sprites.ball_1.width / 2, y: sprites.ball_1.height / 2 };

    this.spaceBtwBalls = 35;

    this.fontsize = "25px";

    this.radius = 15;
    this.innerRadius = 1;
    this.outerRadius = 15;


    this.pi2 = Math.PI * 2;
}

ScoreManager.prototype.update = function () {



}

ScoreManager.prototype.draw = function () {

    // draw balls points:
    let i = 0;
    for (; i < this.currentPoints; ++i) {
        Canvas.drawImage(this.ballpool[i], { x: this.position.x + this.spaceBtwBalls * i, y: this.position.y }, 0, 0.2, this.origin);
    }

    for (let j = 0; j < this.maxPoints - this.currentPoints; ++j) {

        this.drawEmptyBall(i);
        i++;
    }




}



ScoreManager.prototype.drawEmptyBall = function (i) {
    Canvas._ctx.beginPath();

    this.gradient = Canvas._ctx.createRadialGradient(
        this.position.x + this.spaceBtwBalls * i - 4, this.position.y - 4, this.innerRadius,
        this.position.x + this.spaceBtwBalls * i, this.position.y, this.outerRadius);

    this.gradient.addColorStop(0.1, 'grey');
    this.gradient.addColorStop(1, 'black');

    Canvas._ctx.fillStyle = this.gradient;
    Canvas._ctx.arc(this.position.x + this.spaceBtwBalls * i, this.position.y, this.radius, 0, this.pi2);

    Canvas._ctx.fill();
    Canvas._ctx.closePath();


    // Canvas._ctx.beginPath();
    // Canvas._ctx.fillStyle = 'red';
    // Canvas._ctx.arc(this.position.x + this.spaceBtwBalls * i, this.position.y, 3, 0, 2 * Math.PI);
    // Canvas._ctx.fill();
    // Canvas._ctx.stroke();

}

ScoreManager.prototype.addOnePoint = function (img) {
    this.currentPoints++;
    this.ballpool.push(img);
}


ScoreManager.prototype.checkIfWin = function () {

}