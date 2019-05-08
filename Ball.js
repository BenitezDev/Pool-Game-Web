
function Ball(img, pos, ori, radius) {
    if (!pos) pos = new Vector2();
    this.position = pos;

    if (!ori) ori = new Vector2();
    this.origin = ori;

    this.img = img;

    // Physics properties
    let defaultOptions = {
        density: 1.0,
        friction: 1.0,
        restitution: 0.5,

        linearDamping: 0.0,
        angularDamping: 0.0,

        type: b2Body.b2_dynamicBody
    };

    // Fixture: define physics propierties (density, friction, restitution)
    this.fix_def = new b2FixtureDef();
    this.fix_def.density = defaultOptions.density;
    this.fix_def.friction = defaultOptions.friction;
    this.fix_def.restitution = defaultOptions.restitution;

    // Shape: 2d geometry (circle or polygon)
    this.fix_def.shape = new b2CircleShape(radius);

    // Body: position of the object and its type (dynamic, static o kinetic)
    this.body_def = new b2BodyDef();
    this.body_def.position.Set(4, 2.5);

    this.body_def.linearDamping = defaultOptions.linearDamping;
    this.body_def.angularDamping = defaultOptions.angularDamping;

    this.body_def.type = defaultOptions.type; // b2_dynamicBody
    this.body_def.userData = defaultOptions.user_data;

    this.collider = PoolGame.world.CreateBody(this.body_def);
    
    this.fixture = this.collider.CreateFixture(this.fix_def);

    // this.collider = CreateSphere(PoolGame.world, 7.9, 4.75, 1.3, this.defaultOptions);

}

Ball.prototype.update = function () {
    // TESTING



    if (input.isKeyPressed(KEY_LEFT))
        this.position.x--;

    if (input.isKeyPressed(KEY_RIGHT))
        this.position.x++;
}


Ball.prototype.draw = function () {
    Canvas.drawImage(this.img, this.position, this.origin);
}