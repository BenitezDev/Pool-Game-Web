

function Car(img, pos, KEY_LEFT, KEY_RIGHT, KEY_UP, KEY_DOWN) {

    this.img = img;
    this.wheelImg = sprites.wheel;
    this.scale = 0.20;
    this.angle = 90;
    this.position = pos;

    // Car movement inputs
    this.KEY_LEFT = KEY_LEFT;
    this.KEY_RIGHT = KEY_RIGHT;
    this.KEY_UP = KEY_UP;
    this.KEY_DOWN = KEY_DOWN;

    // Car Physics
    this.body = null;
    this.speed = 0.0;
    this.maxSpeed = 300000;
    this.engineOn = false;
    this.gear = 1; // gear (-1: forward, 1: backward)
    this.wheelRotationSpeed = 2;
    this.wheelRelocationSpeed = 0.3;

    // Front Wheels
    this.frontLeftWheel = null;
    this.frontRightWheel = null;

    // Rear Wheels
    this.rearLeftWheel = null;
    this.rearRightWheel = null;

    // Wheels packs
    this.frontWheels = [];
    this.rearWheels = [];

    this.wheels = [];

    // Joints
    this.frontJoint = null;
    this.rearJoint = null;

    this.start();

}

Car.prototype.start = function () {

    // Collider tag
    this.type = 'car';

    // Chassis
    let chassisOptions = {
        density: 1,
        friction: 1.0,
        restitution: 0.5,

        linearDamping: 10.0,
        angularDamping: 10.0,

        type: b2Body.b2_dynamicBody
    };
    this.body = CreateBox(PoolGame.world, this.position.x, this.position.y, 15, 45, chassisOptions);

    // Wheels
    let frontWheelsOptions = {
        density: 10,
        friction: 1.0,
        restitution: 0.5,

        linearDamping: 1.0,
        angularDamping: 1.0,

        type: b2Body.b2_dynamicBody
    };
    let rearWheelsOptions = {
        density: 100,
        friction: 1.0,
        restitution: 0.5,

        linearDamping: 1.0,
        angularDamping: 1,

        type: b2Body.b2_dynamicBody
    };

    this.frontLeftWheel = CreateBox(PoolGame.world, this.position.x + 20, this.position.y - 18, 5, 10, frontWheelsOptions);
    this.frontRightWheel = CreateBox(PoolGame.world, this.position.x + 20, this.position.y + 18, 5, 10, frontWheelsOptions);

    this.rearLeftWheel = CreateBox(PoolGame.world, this.position.x - 20, this.position.y + 18, 5, 10, rearWheelsOptions);
    this.rearRightWheel = CreateBox(PoolGame.world, this.position.x - 20, this.position.y - 18, 5, 10, rearWheelsOptions);

    this.wheels.push(this.frontLeftWheel);
    this.wheels.push(this.frontRightWheel);
    this.wheels.push(this.rearLeftWheel);
    this.wheels.push(this.rearRightWheel);

    this.frontWheels.push(this.frontLeftWheel);
    this.frontWheels.push(this.frontRightWheel);

    this.rearWheels.push(this.rearLeftWheel);
    this.rearWheels.push(this.rearRightWheel);

    // Rotate the car to look right
    this.body.SetAngle(Math.PI / 2);
    this.wheels.forEach(wheel => { wheel.SetAngle(Math.PI / 2); });

    //  Initialize front wheels
    for (let i in this.frontWheels) {
        let wheel = this.frontWheels[i];
        let jointDef = new b2RevoluteJointDef();
        jointDef.Initialize(this.body, wheel, wheel.GetWorldCenter());
        // wheel maximum steering angle
        jointDef.lowerAngle = -Math.PI / 4; // -45 degrees
        jointDef.upperAngle = Math.PI / 4; // 45 degrees
        jointDef.enableLimit = true;
        jointDef.maxMotorTorque = 30000.0;
        jointDef.enableMotor = true;
        this.frontWheels[i].joint = world.CreateJoint(jointDef);
    }

    // Initialize rear wheels
    for (let i in this.rearWheels) {
        let jointDef = new b2PrismaticJointDef();
        jointDef.Initialize(this.body, this.rearWheels[i], this.rearWheels[i].GetWorldCenter(), new b2Vec2(1, 0));
        jointDef.enableLimit = true;
        this.rearWheels[i].joint = world.CreateJoint(jointDef);
    }

}

Car.prototype.update = function () {

    // Calculate wheel rotation
    let wheelRotationSpeed = 0.0;
    let wheelAngle = 0.0;

    if (input.isKeyPressed(this.KEY_LEFT)) {
        wheelAngle += this.frontLeftWheel.joint.m_lowerAngle;
        wheelRotationSpeed = this.wheelRotationSpeed;
    }
    if (input.isKeyPressed(this.KEY_RIGHT)) {
        wheelAngle += this.frontLeftWheel.joint.m_upperAngle;
        wheelRotationSpeed = this.wheelRotationSpeed;
    }

    if (!(input.isKeyPressed(this.KEY_LEFT) || input.isKeyPressed(this.KEY_RIGHT))) {
        wheelAngle = 0.0;
        wheelRotationSpeed = this.wheelRotationSpeed * this.wheelRelocationSpeed;
    }

    // Apply rotation
    for (let i in this.frontWheels) {
        let wheelJoint = this.frontWheels[i].joint;
        let angleDiff = wheelAngle - wheelJoint.GetJointAngle();
        wheelJoint.SetMotorSpeed(angleDiff * wheelRotationSpeed);
    }

    // Calculate movement
    if (!input.isKeyPressed(this.KEY_UP) || !input.isKeyPressed(this.KEY_DOWN)) {
        this.stopEngine();
    }
    if (input.isKeyPressed(this.KEY_UP)) {
        this.gear = -1;
        this.startEngine();
    }
    else if (input.isKeyPressed(this.KEY_DOWN)) {
        this.gear = 1;
        this.startEngine();
    }

    // Apply motor movement of the wheels. Four-wheel drive
    for (let i in this.wheels) {
        var direction = this.wheels[i].GetTransform().R.col2.Copy();
        direction.Multiply(this.speed);
        this.wheels[i].ApplyForce(direction, this.wheels[i].GetPosition());
    }

}


Car.prototype.draw = function () {

    // 1º Draw wheels
    this.wheels.forEach(wheel => {
        Canvas.drawImage(this.wheelImg, wheel.GetPosition(), wheel.GetAngle(), this.scale, { x: this.wheelImg.width / 2, y: this.wheelImg.height / 2 });
    });

    // 2º Draw chassis
    Canvas.drawImage(this.img, this.body.GetPosition(), this.body.GetAngle(), this.scale, { x: this.img.width / 2, y: this.img.height / 2 });
}

Car.prototype.startEngine = function () {

    this.engineOn = true;
    this.speed = this.gear * this.maxSpeed;

}

Car.prototype.stopEngine = function () {

    this.engineOn = false;
    this.speed = 0;

}