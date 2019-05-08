


function Car(img) {
    this.img = img;
    this.scale = 0.4;
    this.angle = 0;
    this.position = { x: 150, y: 100 };

    // Car Physics
    this.body = null; // aquí guardaremos la referencia al cuerpo físico del coche
    this.speed = 0.0;
    this.maxSpeed = 300000;
    this.engineOn = false;
    this.gear = 1; // marcha (1: hacia adelante, -1: hacia atrás)
    this.wheelRotationSpeed = 300000;
    this.wheelRelocationSpeed = 4.0; // velocidad con la que las ruedas se resituan en reposo

    // Wheels
    this.frontWheels = [
        this.frontLeftWheel = null,
        this.frontRightWheel = null
    ];
    this.rearWheels = [
        this.rearLeftWheel = null,
        this.rearRightWheel = null
    ];

    this.frontJoint = null;
    this.rearJoint = null;

    this.start();
}

Car.prototype.start = function () {
    // carruaje
    let defaultOptions = {
        density: 1.0,
        friction: 1.0,
        restitution: 0.5,

        linearDamping: 10.0,
        angularDamping: 10.0,

        type: b2Body.b2_dynamicBody
    };
    this.body = CreateBox(PoolGame.world, this.position.x, this.position.y, 65, 30, defaultOptions);
    // Physics properties


    // Fixture: define physics propierties (density, friction, restitution)
    this.fix_def = new b2FixtureDef();
    this.fix_def.density = defaultOptions.density;
    this.fix_def.friction = defaultOptions.friction;
    this.fix_def.restitution = defaultOptions.restitution;

    // Shape: 2d geometry (circle or polygon)
    this.fix_def.shape = new b2PolygonShape();
    // ruedas delanteras
    this.frontWheels[0] = CreateBox(PoolGame.world, this.position.x + 30, this.position.y - 35, 20, 5, {});
    this.frontWheels[1] = CreateBox(PoolGame.world, this.position.x + 30, this.position.y + 35, 20, 5, {});

    // ruedas traseras
    this.rearWheels[0] = CreateBox(PoolGame.world, this.position.x - 30, this.position.y - 35, 20, 5, {});
    this.rearWheels[1] = CreateBox(PoolGame.world, this.position.x - 30, this.position.y + 35, 20, 5, {});

    // inicializar ruedas delanteras
    for (let i in this.frontWheels) {
        let wheel = this.frontWheels[i];
        let jointDef = new b2RevoluteJointDef();
        jointDef.Initialize(this.body, wheel, wheel.GetWorldCenter());
        // máximo ángulo de giro que puede tener una rueda
        jointDef.lowerAngle = -Math.PI / 3; // -60 degrees
        jointDef.upperAngle = Math.PI / 3; // 60 degrees
        jointDef.enableLimit = true;
        jointDef.maxMotorTorque = 10.0;
        jointDef.enableMotor = true;
        this.frontWheels[i].joint = world.CreateJoint(jointDef);
    }
    // inicializar ruedas traseras
    for (let i in this.rearWheels) {
        let jointDef = new b2PrismaticJointDef();
        jointDef.Initialize(this.body, this.rearWheels[i], this.rearWheels[i].GetWorldCenter(),
            new b2Vec2(1, 0));
        jointDef.enableLimit = true;

        // car.rearWheels.frontXWheel.joint
        // rearJoint = world.CreateJoint(jointDef);
        this.rearWheels[i].joint = world.CreateJoint(jointDef);
    }
}

Car.prototype.update = function () {
    //this.angle = this.fixture.GetBody().GetAngle();

    console.log(this.speed);
    // Cálculo del giro
    let wheelRotationSpeed = 0.0;
    let wheelAngle = 0.0;

    if (input.isKeyPressed(KEY_LEFT)) {
        wheelAngle += this.frontWheels[0].joint.m_upperAngle;
        wheelRotationSpeed = this.wheelRotationSpeed;
    }
    if (input.isKeyPressed(KEY_RIGHT)) {
        wheelAngle += this.frontWheels[0].joint.m_lowerAngle;
        wheelRotationSpeed = this.wheelRotationSpeed;
    }

    if (!(input.isKeyPressed(KEY_LEFT) || input.isKeyPressed(KEY_RIGHT))) {
        wheelAngle = 0.0;
        wheelRotationSpeed = this.wheelRotationSpeed * this.wheelRelocationSpeed;
    }

    // Aplicación del giro
    for (let i in this.frontWheels) {
        let wheelJoint = this.frontWheels[i].joint;
        let angleDiff = wheelAngle - wheelJoint.GetJointAngle();
        wheelJoint.SetMotorSpeed(angleDiff * wheelRotationSpeed);
    }

    // Cálculo del movimiento
    if (!input.isKeyPressed(KEY_UP) || !input.isKeyPressed(KEY_DOWN)) {
        this.stopEngine();
    }
    if (input.isKeyPressed(KEY_UP)) {
        this.gear = 1;
        this.startEngine();
    }
    else if (input.isKeyPressed(KEY_DOWN)) {
        this.gear = -1;
        this.startEngine();
    }


    // Aplicación del giro
    for (let i in car.frontWheels) {
        let wheelJoint = this.frontWheels[i].joint;
        let angleDiff = wheelAngle - wheelJoint.GetJointAngle();
        wheelJoint.SetMotorSpeed(angleDiff * wheelRotationSpeed);
    }

    // Aplicación del movimiento de avance
    for (let i in this.rearWheels) {

        var direction = this.rearWheels[i].GetTransform().R.col2.Copy();
        direction.Multiply(this.speed);
        this.rearWheels[i].ApplyForce(direction, this.rearWheels[i].GetPosition());
    }
}


Car.prototype.draw = function () {

    Canvas.drawImage(this.img, this.position, this.angle, this.scale, { x: this.img.width / 2, y: this.img.height / 2 });
}

Car.prototype.startEngine = function () {
    this.engineOn = true;
    this.speed = this.gear * this.maxSpeed;

}

Car.prototype.stopEngine = function () {
    this.engineOn = false;
    this.speed = 0;
}