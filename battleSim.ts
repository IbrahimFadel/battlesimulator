var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update
});

function preload() {
    game.load.image('basicUnit', 'assets/bullet153.png');
    game.load.image('knightUnit', 'assets/bullet147.png');
    game.load.image('musketUnit', 'assets/bullet112.png');
    game.load.image('uiPage', 'assets/sunset.png');
}

class Unit {
    public basicUnit: Phaser.Sprite;
    public health: number;
    private speed: number;
    private damage: number;
    private range: number;
    public team: number;
    private accuracy: number;

    constructor(x: number, y: number, health: number, speed: number, damage: number, range: number, team: number, sprite: string, accuracy : number) {
        this.basicUnit = game.add.sprite(x, y, sprite);
        game.physics.arcade.enable(this.basicUnit);
        this.health = health;
        this.speed = speed;
        this.damage = damage;
        this.range = range;
        this.team = team;
        this.accuracy = accuracy;
    }

    getRange() {
        return this.range;
    }

    getDamage() {
        return this.damage;
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
            //switch direction: to be implemented by ibrahim
            //this.nightUnit.body.velocity.y = this.speed;
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

            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY))
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
        var curremtUnitY: number = this.basicUnit.y;

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
            var diffY = curremtUnitY - unitY;

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
        let chance = this.accuracy/100;
        if (r < 1.1 - chance) {
            attackSuccess = true;
        }
        //console.log(chance);
        return attackSuccess;
    }

    checkMovementAbility() {
        let r = Math.random();
        let s = Math.random() * 0.01;
        let movementSuccess = false;
        if (r < s) {
            movementSuccess = true;
        } else {
            if(this.speed > 80) {
                this.speed = this.speed -= 100;
            } else {
                this.speed = this.speed += 50;
            }
        }
        //console.log(chance);
        return movementSuccess;
    }
}


var amountKnights: number = 20;
var amountMuskets: number = 20;
var nightsAttacking: boolean = true;
var allUnits: Array<Unit> = [];
var teamCount: number = 3;
var textEntered = "";
var textOnScreen: Phaser.Text | null;
var textAnyKey: Phaser.Text;
var amountUnits: number = 20;
var inputUsed: boolean = false;

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
    game.world.setBounds(-1600, 0, 2600, 600);
    handleTextCreate();
    game.add.image(-1600, 0, 'uiPage');
    game.add.image(-800, 0, 'uiPage');



    let y = 100;
    let xdiff = 0;
    for (let i: number = 0; i < amountUnits; i++) {
        if (i % 15 === 0) {
            y += 30;
            xdiff = 0;
        }
        allUnits.push(new Unit(250 + xdiff, y, 100, 50, 0.95, 60, 0, 'basicUnit', 90));
        xdiff += 25;
    }

    let knightY = 500;
    let nightxDiff = 0;
    for (let i: number = 0; i < amountKnights; i++) {
        if (i % 15 === 0) {
            knightY += 30;
            nightxDiff = 0;
        }
        allUnits.push(new Unit(250 + nightxDiff, knightY, 150, 50, 1, 60, 1, 'knightUnit', 80));
        nightxDiff += 25;
    }


    let musketY = 650;
    let musketxDiff = 0;
    for (let i: number = 0; i < amountMuskets; i++) {
        if (i % 15 === 0) {
            musketY += 30;
            musketxDiff = 0;
        }
        allUnits.push(new Unit(musketY, 200 + musketxDiff, musketY, 50, 2, 60, 2, 'musketUnit', 60));
        musketxDiff += 25;
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

var functionCalled: boolean = false;

function handleKeyPress() {
    game.input.keyboard.addCallbacks(null, null, null, function (KeyK: KeyboardEvent) {
        functionCalled = true;
        textAnyKey.kill();
    });
    return functionCalled;
}


function handleMovement() {
    handleKeyPress();
    for(let unit of filterUnitsAlive(allUnits)) {
        let unitSuccessfullyMoved = unit.checkMovementAbility();
        if(unitSuccessfullyMoved === true || unitSuccessfullyMoved === false) {
            if (functionCalled === true) {
                for (let i = 0; i < teamCount; i++) {
                    teamMove(allUnits, i);
                }
            }
        }
    }

}

function handleAttack() {
    for (let unit of filterUnitsAlive(allUnits)) {
        let unitsSuccessfullyAttacked = unit.checkAttackSuccess();
        if(unitsSuccessfullyAttacked === true) {
            for (let i = 0; i < teamCount; i++) {
                teamAttack(allUnits, i);
            }
        }
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

function update() {

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