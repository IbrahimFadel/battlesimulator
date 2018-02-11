var game = new Phaser.Game(1900, 950, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.image('basicUnit', 'assets/bullet153.png');
    game.load.image('knightUnit', 'assets/bullet147.png');
    game.load.image('musketUnit', 'assets/bullet112.png');
    game.load.image('uiPage', 'assets/sunset.png');
    game.load.image('changeUnitButton', 'assets/spacebar.png');
}

class Unit {
    public basicUnit: Phaser.Sprite;
    public health: number;
    private speed: number;
    private damage: number;
    private range: number;
    public team: number;
    private accuracy: number;
    private originalSpeed: number;
    private sprite : string;
    constructor(x: number, y: number, health: number, speed: number, damage: number, range: number, team: number, sprite: string, accuracy: number) {
        this.basicUnit = game.add.sprite(x, y, sprite);
        game.physics.arcade.enable(this.basicUnit);
        this.health = health;
        this.speed = speed;
        this.originalSpeed = speed;
        this.damage = damage;
        this.range = range;
        this.team = team;
        this.accuracy = accuracy;
        this.sprite = sprite;
    }

    getRange() {
        return this.range;
    }

    getDamage() {
        return this.damage;
    }

    getHealth() {
        //for testing purposes
        return this.health;
    }

    setDirectionY(direction: number) {
        if (direction === 0) {
            //switch direction: to be implemented by ibrahim
            //this.nightUnit.body.velocity.y = this.speed;
            throw "TODO: Unimplemented"
        } else if (direction === 1) {
            this.basicUnit.body.velocity.y = this.speed;
        } else if (direction === -1) {
            this.basicUnit.body.velocity.y = 0 - this.speed;
        } else {
            throw "Programmer Error..."
        }
    }

    setDirectionX(direction: number) {
        if (direction === 0) {
            throw "TODO: Unimplemented"
        } else if (direction === 1) {
            this.basicUnit.body.velocity.x = this.speed;
        } else if (direction === -1) {
            this.basicUnit.body.velocity.x = 0 - this.speed;
        } else {
            throw "Programmer Error..."
        }
    }

    /**
     * now we have 2 teams, but withinRange computes the distance
     * for a different kind of class, fior e.g oldUnit.withinRange(arrayOFNights)
     * newunit.withinrange(arrayOfUnitsOfOtherTeams)
     * for e.g if new unit belongs to team 0
     * then arrayOfUnitsOfOtherTeams contains units from team 1..2, and so on
     * @param {Array<Unit>} arrayOfUnits
     * @return {Array<Unit>}
     */
    withinRange(arrayOfUnits: Array<Unit>): Array<Unit> {
        // let's say that this is unit1
        // and array of units is [unit1{team:0}, unit2{team:1}, unit3{team2}]
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        let arrayOfUnitsWithinRange: Array<Unit> = [];

        var currentUnitX: number = this.basicUnit.x;
        var currentUnitY: number = this.basicUnit.y;


        for (let unit of arrayOfUnits) {
            if (unit === this) {
                continue
            }
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */

            var unitX: number = unit.basicUnit.x;
            var unitY: number = unit.basicUnit.y;

            var diffX = currentUnitX - unitX;
            var diffY = currentUnitY - unitY;

            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
            if (distance <= this.range) {
                arrayOfUnitsWithinRange.push(unit);
            }
        }
        return arrayOfUnitsWithinRange;

    }

    closestUnit(arrayOfUnits: Array<Unit>): Unit | null {
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        let arrayOfUnitsWithinRange: Array<Unit> = [];

        var currentUnitX: number = this.basicUnit.x;
        var currentUnitY: number = this.basicUnit.y;

        var closestUnit = null;
        var closestDistance = Number.MAX_VALUE;

        for (let unit of arrayOfUnits) {
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */
            if (unit === this) {
                continue
            }

            var unitX: number = unit.basicUnit.x;
            var unitY: number = unit.basicUnit.y;

            var diffX = currentUnitX - unitX;
            var diffY = currentUnitY - unitY;

            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
            if (distance < closestDistance) {
                closestUnit = unit;
                closestDistance = distance;
            }
        }
        return closestUnit;
    }

    killUnit() {
        this.basicUnit.kill();
        this.damage = 0;
    }

    isAlive() {
        let alive: boolean = true;
        if (this.health <= 0) {
            alive = false;
        }
        return alive;
    }

    checkAttackSuccess() {
        let r = Math.random();
        let attackSuccess = false;
        let chance = this.accuracy / 100;
        if (r < chance) {
            attackSuccess = true;
        }
        //console.log(chance);
        return attackSuccess;
    }

    checkMovementAbility() {
        let r = Math.random();
        let unitStumbled = false;
        if (r < .05) {
            unitStumbled = true;
        }
        //console.log(chance);
        return unitStumbled;
    }

    outnumberedTrueFalse(teamNum: number) {
        let outnumbered = false;
        let enemiesNearby = unitsNearby(teamNum);
        if (enemiesNearby.length >= 2) {
            console.log("hey");
            outnumbered = true;
        }
        return outnumbered;
    }

    retreat(basicUnits: Array<Unit>, teamNum: number) {
        let basicUnitsFromTeam = filterForSameTeam(basicUnits, teamNum);
        let unitOutnumbered = this.outnumberedTrueFalse(2);


        if (unitOutnumbered === true) {
            let unitX = this.basicUnit.x;
            let unitY = this.basicUnit.y;


        }
    }

    getSpeed() {
        return this.speed;
    }

    stumble() {
        this.speed -= getRandomArbitrary(10, 30);
        var theUnit = this;
        game.time.events.add(Phaser.Timer.SECOND, function () {
            theUnit.speed = theUnit.originalSpeed;
        }, this);
    }

    stopIfWithinRange() {
        let closestUnit = this.closestUnit(filterUnitsAlive(filterForOtherTeams(allUnits, this.team)));

        if (closestUnit == null){
            return;
        }

        if(this.withinRange([closestUnit]).length > 0) {
            this.speed = 0;
        }else{
            this.speed = this.originalSpeed;
        }
    }

    getKey() {
        return this.sprite;
    }
}


var amountKnights: number = 20;
var amountMuskets: number = 15;
var nightsAttacking: boolean = true;
var allUnits: Array<Unit> = [];
var teamCount: number = 3;
var textEntered = "";
var textOnScreen: Phaser.Text | null;
var textAnyKey: Phaser.Text;
var amountUnits: number = 24;
var inputUsed: boolean = false;
var testUnit : Phaser.Sprite;
var graphics : Phaser.Graphics;
var drawing = false;
let SPAWNTEAM = 0;

let mySpawnArray = [
    {
        'health': 100,
        'speed' : 50,
        'damage' : 0.95,
        'range' : 15,
        'key' : 'basicUnit',
        'accuracy' : 0
    },
    {
        'health' : 150,
        'speed' : 50,
        'damage' : 1.5,
        'range' : 50,
        'key' : 'knightUnit',
        'accuracy' : 0
    },
    {
        'health' : 130,
        'speed' : 50,
        'damage' : 2,
        'range' : 70,
        'key' : 'musketUnit',
        'accuracy' : 0
    }
];

function handleTextCreate() {
    var style = {font: "10px Arial", fill: "#ffffff", align: "center"};
    textOnScreen = game.add.text(0 - 1600, 0, textEntered, style);

    var style1 = {font: "30px Arial", fill: "#ffffff", align: "center"};
    textAnyKey = game.add.text(300, 100, "Press any key to start!", style1);

    game.input.keyboard.addCallbacks(null, function (e: KeyboardEvent) {
        if (textOnScreen == null) {
            return
        }

        if (e.key === "Backspace") {
            textEntered = "";
        } else {
            textEntered = textEntered + e.key
        }

        if (e.key === "Enter") {

            textEntered = ""
        }

        textOnScreen.setText(textEntered);
        console.log(e);
        //parseInt(textEntered);
    });
}

function create() {
    handleTextCreate();
    game.add.image(-1600, 0, 'uiPage');
    game.add.image(-800, 0, 'uiPage');

    testUnit = game.add.sprite(0, 0, 'basicUnit');
    game.physics.enable(testUnit, Phaser.Physics.ARCADE);

    let changeUnitButton = game.add.sprite(200, 0, 'changeUnitButton');
    changeUnitButton.inputEnabled = true;

    changeUnitButton.events.onInputDown.add(changeUnit);

    game.input.onDown.add(myFunction);

    game.input.onDown.add(startDrawing);
    game.input.onUp.add(eraseLineAndPrint);

    graphics = game.add.graphics(0, 0);


    setInterval(function(){
        stumbleHandler();
    }, 1000)
}

function stumbleHandler(){
    // put stumble logic here
    for (let unit of filterUnitsAlive(allUnits)) {
        let unitStumbled = unit.checkMovementAbility();
        if (unitStumbled === true) {
            unit.stumble();
        }
    }
}

/**
 *
 * @param {Array<Unit>} arrayOfUnits
 * @param teamNumber
 * @return {Array<Unit>}
 */
function filterForOtherTeams(arrayOfUnits: Array<Unit>, teamNumber: number): Array<Unit> {
    let otherTeams: Array<Unit> = [];

    for (let i: number = 0; i < arrayOfUnits.length; i++) {
        if (arrayOfUnits[i].team != teamNumber) {
            otherTeams.push(arrayOfUnits[i])
        }
    }
    return otherTeams
}

function getRandomArbitrary(min : number, max : number) {
    return Math.random() * (max - min) + min;
}

/**
 *
 * @param {Array<Unit>} arrayOfUnits
 * @param teamNumber
 * @return {Array<Unit>}
 */
function filterForSameTeam(arrayOfUnits: Array<Unit>, teamNumber: number): Array<Unit> {
    let sameTeam: Array<Unit> = [];

    for (let i: number = 0; i < arrayOfUnits.length; i++) {
        if (arrayOfUnits[i].team === teamNumber) {
            sameTeam.push(arrayOfUnits[i])
        }
    }
    return sameTeam
}

/**
 * Given an array of mixed alive and dead units,
 * returns an array of only the units alive
 *
 * @param {Array<Unit>} basicUnits
 * @return {Array<Unit>}
 */
function filterUnitsAlive(basicUnits: Array<Unit>) {
    let unitsAlive: Array<Unit> = [];

    for (let i = 0; i < basicUnits.length; i++) {
        if (basicUnits[i].isAlive() === true) {
            unitsAlive.push(basicUnits[i]);
        }
    }
    return unitsAlive;
}

/**
 * Sets team teamNum on the move towards other teams
 *
 * @param basicUnits
 * @param {number} teamNum
 */
function teamMove(basicUnits: Array<Unit>, teamNum: number) {
    let basicUnitsFromOtherTeams = filterForOtherTeams(basicUnits, teamNum);
    let basicUnitsFromTeam = filterForSameTeam(basicUnits, teamNum);

    for (let unit of filterUnitsAlive(basicUnitsFromTeam)) {
        let closestUnit = unit.closestUnit(filterUnitsAlive(basicUnitsFromOtherTeams));

        if (closestUnit === null) {
            continue
        }


        let closestUnitX = closestUnit.basicUnit.x;
        let closestUnitY = closestUnit.basicUnit.y;

        let unitX = unit.basicUnit.x;
        let unitY = unit.basicUnit.y;

        if (closestUnitX > unitX) {
            unit.setDirectionX(1)
        } else {
            unit.setDirectionX(-1)
        }

        if (closestUnitY > unitY) {
            unit.setDirectionY(1)
        } else {
            unit.setDirectionY(-1)
        }
    }
}

/**
 * Function makes teamNum  attack everybody else
 *
 * @param basicUnits : Array<Units> all the units
 * @param teamNum : number the attacking team
 */
function teamAttack(basicUnits: Array<Unit>, teamNum: number) {
    let basicUnitsFromOtherTeams = filterForOtherTeams(basicUnits, teamNum);
    let basicUnitsFromTeam = filterForSameTeam(basicUnits, teamNum);
    for (let unit of basicUnitsFromTeam) {
        let closestUnit = unit.closestUnit(basicUnitsFromOtherTeams);
        // Check if within range of night
        if (closestUnit && unit.withinRange([closestUnit]).length > 0) {
            closestUnit.health = closestUnit.health - unit.getDamage();
            if (closestUnit.health <= 0) {
                closestUnit.killUnit();
            }
            //console.log(closestUnit.health);
        }
    }
}

function unitsNearby(teamNum: number) {
    let enemiesNearby: Array<Unit> = [];
    for (let unit of allUnits) {
        let test = unit.closestUnit(filterForOtherTeams(allUnits, teamNum));
        if (test = unit) {

        }
        enemiesNearby.push(test);
    }
    return enemiesNearby;
}

var functionCalled: boolean = false;

function handleKeyPress() {
    game.input.keyboard.addCallbacks(null, function () {
    }, function () {
    }, function (KeyK: KeyboardEvent) {
        functionCalled = true;
        textAnyKey.kill();
    });
    return functionCalled;
}


function handleMovement() {
    handleKeyPress();
    for (let unit of filterUnitsAlive(allUnits)) {
        unit.stopIfWithinRange();
        if (functionCalled === true) {
            for (let i = 0; i < teamCount; i++) {
                teamMove(allUnits, i);
            }
        }
    }

}

function handleAttack() {
    for (let unit of filterUnitsAlive(allUnits)) {
        let unitsSuccessfullyAttacked = unit.checkAttackSuccess();
        if (unitsSuccessfullyAttacked === true) {

        }
    }

    for (let i = 0; i < teamCount; i++) {
        teamAttack(filterUnitsAlive(allUnits), i);
    }
}

function doOverlap() {
    for (let unit of allUnits) {
        //at every iteration of the loop
        //unit takes on a new unit from allUnits
        //let dog of dogs
        //let cat of cats
        //let person of people
        for (let otherUnit of allUnits) {
            if (otherUnit == unit) {
                continue
            }
            game.physics.arcade.collide(otherUnit.basicUnit, unit.basicUnit, function (unit1: Phaser.Sprite, unit2: Phaser.Sprite) {

            });
        }
        //overlap(:sprite, :sprite)

    }
}

let permMouseX = -1;
let permMouseY = -1;

let test = false;
function startDrawing() {
    permMouseX = game.input.mousePointer.x;
    permMouseY = game.input.mousePointer.y;

    graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);

    drawing = true;
    test = true
}

function eraseLineAndPrint() {
    if(test === true) {
        graphics.clear();

        drawing = false;

        let diffX = testUnit.x - permMouseX;
        let diffY = testUnit.y - permMouseY;
        let unitsPossible = Math.sqrt((diffX * diffX) + (diffY * diffY)) / 15;

        let xInc = diffX/unitsPossible
        let yInc = diffY/unitsPossible
        let x = permMouseX;
        let y = permMouseY;
        let count = 0;
        while (count < unitsPossible){
            allUnits.push(new Unit(
                x,
                y,
                mySpawnArray[SPAWNTEAM].health,
                mySpawnArray[SPAWNTEAM].speed,
                mySpawnArray[SPAWNTEAM].damage,
                mySpawnArray[SPAWNTEAM].range,
                SPAWNTEAM,
                mySpawnArray[SPAWNTEAM].key,
                mySpawnArray[SPAWNTEAM].accuracy)
            );

            x = x + xInc;
            y = y + yInc;
            count = count + 1;
        }

        allUnits.push(new Unit(
            testUnit.x,
            testUnit.y,
            mySpawnArray[SPAWNTEAM].health,
            mySpawnArray[SPAWNTEAM].speed,
            mySpawnArray[SPAWNTEAM].damage,
            mySpawnArray[SPAWNTEAM].range,
            SPAWNTEAM,
            mySpawnArray[SPAWNTEAM].key,
            mySpawnArray[SPAWNTEAM].accuracy)
        );
        test = false;
    }
}

function changeUnit() {


        if(SPAWNTEAM < teamCount - 1) {
            SPAWNTEAM++;
        } else {
            SPAWNTEAM = 0;
        }

    testUnit.loadTexture(mySpawnArray[SPAWNTEAM].key);
}

function myFunction() {
    //let myStringArray = ["basicUnit","knightUnit", "musketUnit"];
   // sprite = myStringArray[counter];
        allUnits.push(new Unit(
            testUnit.x,
            testUnit.y,
            mySpawnArray[SPAWNTEAM].health,
            mySpawnArray[SPAWNTEAM].speed,
            mySpawnArray[SPAWNTEAM].damage,
            mySpawnArray[SPAWNTEAM].range,
            SPAWNTEAM,
            mySpawnArray[SPAWNTEAM].key,
            mySpawnArray[SPAWNTEAM].accuracy));
}

function update() {
    testUnit.x = game.input.mousePointer.x;
    testUnit.y = game.input.mousePointer.y;

    if(drawing === true) {
        graphics.clear();

        graphics.beginFill(0xFF3300);
        graphics.lineStyle(10, 0xffd900, 1);

        graphics.moveTo(permMouseX, permMouseY);
        graphics.lineTo(testUnit.x, testUnit.y);
    }


    //game.input.keyboard.addCallbacks(null, null, null, function(KeyK : KeyboardEvent) {
    //});
    if (inputUsed === false) {
        //game.camera.x += 0 - 1600;
    }
    handleMovement();

    handleAttack();

    doOverlap();

}

function render() {
    //game.debug.cameraInfo(game.camera, 0 - 1600, 0);

}