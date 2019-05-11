

// Detect collision between circles
function CheckCollisionBetweenCircles(pos1, r1, pos2, r2) {

    let dx = pos2.x - pos1.x;
    let dy = pos2.y - pos1.y;
    let r = r1 + r2;

    return ((dx * dx + dy * dy) <= r * r);
}


function PointInsideRectangle(point, rectangle) {

    return point.x >= (rectangle.position.x) &&
        point.x <= (rectangle.position.x + rectangle.width) &&
        point.y >= (rectangle.position.y) &&
        point.y <= (rectangle.position.y + rectangle.height);
}
