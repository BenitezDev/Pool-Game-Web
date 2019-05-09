


function Car(img) {
    this.img = img;
    this.wheelImg = sprites.wheel;
    this.scale = 0.25;
    this.angle = 0;
    this.position = { x: 150, y: 200 };


    // Car Physics
    this.body = null; // aquí guardaremos la referencia al cuerpo físico del coche
    this.speed = 0.0;
    this.maxSpeed = 300000;
    this.engineOn = false;
    this.gear = 1; // marcha (-1: hacia adelante, 1: hacia atrás)
    this.wheelRotationSpeed = 2;
    this.wheelRelocationSpeed = 0.3; // velocidad con la que las ruedas se resituan en reposo

    // Front Wheels
    this.frontLeftWheel = null;
    this.frontRightWheel = null;
    // Rear Wheels
    this.rearLeftWheel = null;
    this.rearRightWheel = null;

    // Wheels packs
    this.frontWheels = [];
    this.rearWheels = [];

    // Joints
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

    // Chasis
    this.body = CreateBox(PoolGame.world, this.position.x, this.position.y, 20, 60, defaultOptions);

    // Wheels
    this.frontLeftWheel = CreateBox(PoolGame.world, this.position.x - 30, this.position.y - 35, 4, 13, {});
    this.frontRightWheel = CreateBox(PoolGame.world, this.position.x + 30, this.position.y - 35, 4, 13, {});

    this.rearLeftWheel = CreateBox(PoolGame.world, this.position.x - 30, this.position.y + 35, 4, 13, {});
    this.rearRightWheel = CreateBox(PoolGame.world, this.position.x + 30, this.position.y + 35, 4, 13, {});

    this.frontWheels.push(this.frontLeftWheel);
    this.frontWheels.push(this.frontRightWheel);

    this.rearWheels.push(this.rearLeftWheel);
    this.rearWheels.push(this.rearRightWheel);

    // Inicializar ruedas delanteras
    for (let i in this.frontWheels) {
        let wheel = this.frontWheels[i];
        let jointDef = new b2RevoluteJointDef();
        jointDef.Initialize(this.body, wheel, wheel.GetWorldCenter());
        // máximo ángulo de giro que puede tener una rueda
        jointDef.lowerAngle = -Math.PI / 3; // -60 degrees
        jointDef.upperAngle = Math.PI / 3; // 60 degrees
        jointDef.enableLimit = true;
        jointDef.maxMotorTorque = 30000.0;
        jointDef.enableMotor = true;
        this.frontWheels[i].joint = world.CreateJoint(jointDef);
    }

    // inicializar ruedas traseras
    for (let i in this.rearWheels) {
        let jointDef = new b2PrismaticJointDef();
        jointDef.Initialize(this.body, this.rearWheels[i], this.rearWheels[i].GetWorldCenter(),
            new b2Vec2(1, 0));
        jointDef.enableLimit = true;
        this.rearWheels[i].joint = world.CreateJoint(jointDef);
    }
}

Car.prototype.update = function () {
    //this.angle = this.fixture.GetBody().GetAngle();

    // Cálculo del giro
    let wheelRotationSpeed = 0.0;
    let wheelAngle = 0.0;

    if (input.isKeyPressed(KEY_LEFT)) {
        wheelAngle += this.frontLeftWheel.joint.m_lowerAngle;
        wheelRotationSpeed = this.wheelRotationSpeed;
    }
    if (input.isKeyPressed(KEY_RIGHT)) {
        wheelAngle += this.frontLeftWheel.joint.m_upperAngle;
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
        this.gear = -1;
        this.startEngine();
    }
    else if (input.isKeyPressed(KEY_DOWN)) {
        this.gear = +1;
        this.startEngine();
    }


    // Aplicación del giro
    for (let i in this.frontWheels) {
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