"use strict";
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
    game.load.image('changeUnitButton', 'assets/spacebar.png');
}
var Unit = /** @class */ (function () {
    function Unit(x, y, health, speed, damage, range, team, sprite, accuracy) {
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
    Unit.prototype.getRange = function () {
        return this.range;
    };
    Unit.prototype.getDamage = function () {
        return this.damage;
    };
    Unit.prototype.getHealth = function () {
        //for testing purposes
        return this.health;
    };
    Unit.prototype.setDirectionY = function (direction) {
        if (direction === 0) {
            //switch direction: to be implemented by ibrahim
            //this.nightUnit.body.velocity.y = this.speed;
            throw "TODO: Unimplemented";
        }
        else if (direction === 1) {
            this.basicUnit.body.velocity.y = this.speed;
        }
        else if (direction === -1) {
            this.basicUnit.body.velocity.y = 0 - this.speed;
        }
        else {
            throw "Programmer Error...";
        }
    };
    Unit.prototype.setDirectionX = function (direction) {
        if (direction === 0) {
            throw "TODO: Unimplemented";
        }
        else if (direction === 1) {
            this.basicUnit.body.velocity.x = this.speed;
        }
        else if (direction === -1) {
            this.basicUnit.body.velocity.x = 0 - this.speed;
        }
        else {
            throw "Programmer Error...";
        }
    };
    /**
     * now we have 2 teams, but withinRange computes the distance
     * for a different kind of class, fior e.g oldUnit.withinRange(arrayOFNights)
     * newunit.withinrange(arrayOfUnitsOfOtherTeams)
     * for e.g if new unit belongs to team 0
     * then arrayOfUnitsOfOtherTeams contains units from team 1..2, and so on
     * @param {Array<Unit>} arrayOfUnits
     * @return {Array<Unit>}
     */
    Unit.prototype.withinRange = function (arrayOfUnits) {
        // let's say that this is unit1
        // and array of units is [unit1{team:0}, unit2{team:1}, unit3{team2}]
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        var arrayOfUnitsWithinRange = [];
        var currentUnitX = this.basicUnit.x;
        var currentUnitY = this.basicUnit.y;
        for (var _i = 0, arrayOfUnits_1 = arrayOfUnits; _i < arrayOfUnits_1.length; _i++) {
            var unit = arrayOfUnits_1[_i];
            if (unit === this) {
                continue;
            }
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */
            var unitX = unit.basicUnit.x;
            var unitY = unit.basicUnit.y;
            var diffX = currentUnitX - unitX;
            var diffY = currentUnitY - unitY;
            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
            if (distance <= this.range) {
                arrayOfUnitsWithinRange.push(unit);
            }
        }
        return arrayOfUnitsWithinRange;
    };
    Unit.prototype.closestUnit = function (arrayOfUnits) {
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        var arrayOfUnitsWithinRange = [];
        var currentUnitX = this.basicUnit.x;
        var currentUnitY = this.basicUnit.y;
        var closestUnit = null;
        var closestDistance = Number.MAX_VALUE;
        for (var _i = 0, arrayOfUnits_2 = arrayOfUnits; _i < arrayOfUnits_2.length; _i++) {
            var unit = arrayOfUnits_2[_i];
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */
            if (unit === this) {
                continue;
            }
            var unitX = unit.basicUnit.x;
            var unitY = unit.basicUnit.y;
            var diffX = currentUnitX - unitX;
            var diffY = currentUnitY - unitY;
            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
            if (distance < closestDistance) {
                closestUnit = unit;
                closestDistance = distance;
            }
        }
        return closestUnit;
    };
    Unit.prototype.killUnit = function () {
        this.basicUnit.kill();
        this.damage = 0;
    };
    Unit.prototype.isAlive = function () {
        var alive = true;
        if (this.health <= 0) {
            alive = false;
        }
        return alive;
    };
    Unit.prototype.checkAttackSuccess = function () {
        var r = Math.random();
        var attackSuccess = false;
        var chance = this.accuracy / 100;
        if (r < chance) {
            attackSuccess = true;
        }
        //console.log(chance);
        return attackSuccess;
    };
    Unit.prototype.checkMovementAbility = function () {
        var r = Math.random();
        var unitStumbled = false;
        if (r < .05) {
            unitStumbled = true;
        }
        //console.log(chance);
        return unitStumbled;
    };
    Unit.prototype.outnumberedTrueFalse = function (teamNum) {
        var outnumbered = false;
        var enemiesNearby = unitsNearby(teamNum);
        if (enemiesNearby.length >= 2) {
            console.log("hey");
            outnumbered = true;
        }
        return outnumbered;
    };
    Unit.prototype.retreat = function (basicUnits, teamNum) {
        var basicUnitsFromTeam = filterForSameTeam(basicUnits, teamNum);
        var unitOutnumbered = this.outnumberedTrueFalse(2);
        if (unitOutnumbered === true) {
            var unitX = this.basicUnit.x;
            var unitY = this.basicUnit.y;
        }
    };
    Unit.prototype.getSpeed = function () {
        return this.speed;
    };
    Unit.prototype.stumble = function () {
        this.speed -= getRandomArbitrary(10, 30);
        var theUnit = this;
        game.time.events.add(Phaser.Timer.SECOND, function () {
            theUnit.speed = theUnit.originalSpeed;
        }, this);
    };
    Unit.prototype.stopIfWithinRange = function () {
        var closestUnit = this.closestUnit(filterUnitsAlive(filterForOtherTeams(allUnits, this.team)));
        if (closestUnit == null) {
            return;
        }
        if (this.withinRange([closestUnit]).length > 0) {
            this.speed = 0;
        }
        else {
            this.speed = this.originalSpeed;
        }
    };
    Unit.prototype.getKey = function () {
        return this.sprite;
    };
    return Unit;
}());
var amountKnights = 20;
var amountMuskets = 15;
var nightsAttacking = true;
var allUnits = [];
var teamCount = 3;
var textEntered = "";
var textOnScreen;
var textAnyKey;
var amountUnits = 24;
var inputUsed = false;
var testUnit;
var graphics;
var drawing = false;
function handleTextCreate() {
    var style = { font: "10px Arial", fill: "#ffffff", align: "center" };
    textOnScreen = game.add.text(0 - 1600, 0, textEntered, style);
    var style1 = { font: "30px Arial", fill: "#ffffff", align: "center" };
    textAnyKey = game.add.text(300, 100, "Press any key to start!", style1);
    game.input.keyboard.addCallbacks(null, function (e) {
        if (textOnScreen == null) {
            return;
        }
        if (e.key === "Backspace") {
            textEntered = "";
        }
        else {
            textEntered = textEntered + e.key;
        }
        if (e.key === "Enter") {
            textEntered = "";
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
    var changeUnitButton = game.add.sprite(200, 0, 'changeUnitButton');
    changeUnitButton.inputEnabled = true;
    changeUnitButton.events.onInputDown.add(changeUnit);
    game.input.onDown.add(myFunction);
    game.input.onDown.add(startDrawing);
    game.input.onUp.add(eraseLineAndPrint);
    graphics = game.add.graphics(0, 0);
    var knightY = 500;
    var nightxDiff = 0;
    for (var i = 0; i < amountKnights; i++) {
        if (i % 15 === 0) {
            knightY += 30;
            nightxDiff = 0;
        }
        allUnits.push(new Unit(250 + nightxDiff, knightY, 150, 50, 1.5, 50, 1, 'knightUnit', 100));
        nightxDiff += 25;
    }
    var musketY = 650;
    var musketxDiff = 0;
    for (var i = 0; i < amountMuskets; i++) {
        if (i % 15 === 0) {
            musketY += 30;
            musketxDiff = 0;
        }
        allUnits.push(new Unit(musketY, 200 + musketxDiff, 130, 50, 2, 50, 2, 'musketUnit', 100));
        musketxDiff += 25;
    }
    setInterval(function () {
        stumbleHandler();
    }, 1000);
}
function stumbleHandler() {
    // put stumble logic here
    for (var _i = 0, _a = filterUnitsAlive(allUnits); _i < _a.length; _i++) {
        var unit = _a[_i];
        var unitStumbled = unit.checkMovementAbility();
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
function filterForOtherTeams(arrayOfUnits, teamNumber) {
    var otherTeams = [];
    for (var i = 0; i < arrayOfUnits.length; i++) {
        if (arrayOfUnits[i].team != teamNumber) {
            otherTeams.push(arrayOfUnits[i]);
        }
    }
    return otherTeams;
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
/**
 *
 * @param {Array<Unit>} arrayOfUnits
 * @param teamNumber
 * @return {Array<Unit>}
 */
function filterForSameTeam(arrayOfUnits, teamNumber) {
    var sameTeam = [];
    for (var i = 0; i < arrayOfUnits.length; i++) {
        if (arrayOfUnits[i].team === teamNumber) {
            sameTeam.push(arrayOfUnits[i]);
        }
    }
    return sameTeam;
}
/**
 * Given an array of mixed alive and dead units,
 * returns an array of only the units alive
 *
 * @param {Array<Unit>} basicUnits
 * @return {Array<Unit>}
 */
function filterUnitsAlive(basicUnits) {
    var unitsAlive = [];
    for (var i = 0; i < basicUnits.length; i++) {
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
function teamMove(basicUnits, teamNum) {
    var basicUnitsFromOtherTeams = filterForOtherTeams(basicUnits, teamNum);
    var basicUnitsFromTeam = filterForSameTeam(basicUnits, teamNum);
    for (var _i = 0, _a = filterUnitsAlive(basicUnitsFromTeam); _i < _a.length; _i++) {
        var unit = _a[_i];
        var closestUnit = unit.closestUnit(filterUnitsAlive(basicUnitsFromOtherTeams));
        if (closestUnit === null) {
            continue;
        }
        var closestUnitX = closestUnit.basicUnit.x;
        var closestUnitY = closestUnit.basicUnit.y;
        var unitX = unit.basicUnit.x;
        var unitY = unit.basicUnit.y;
        if (closestUnitX > unitX) {
            unit.setDirectionX(1);
        }
        else {
            unit.setDirectionX(-1);
        }
        if (closestUnitY > unitY) {
            unit.setDirectionY(1);
        }
        else {
            unit.setDirectionY(-1);
        }
    }
}
/**
 * Function makes teamNum  attack everybody else
 *
 * @param basicUnits : Array<Units> all the units
 * @param teamNum : number the attacking team
 */
function teamAttack(basicUnits, teamNum) {
    var basicUnitsFromOtherTeams = filterForOtherTeams(basicUnits, teamNum);
    var basicUnitsFromTeam = filterForSameTeam(basicUnits, teamNum);
    for (var _i = 0, basicUnitsFromTeam_1 = basicUnitsFromTeam; _i < basicUnitsFromTeam_1.length; _i++) {
        var unit = basicUnitsFromTeam_1[_i];
        var closestUnit = unit.closestUnit(basicUnitsFromOtherTeams);
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
function unitsNearby(teamNum) {
    var enemiesNearby = [];
    for (var _i = 0, allUnits_1 = allUnits; _i < allUnits_1.length; _i++) {
        var unit = allUnits_1[_i];
        var test = unit.closestUnit(filterForOtherTeams(allUnits, teamNum));
        if (test = unit) {
        }
        enemiesNearby.push(test);
    }
    return enemiesNearby;
}
var functionCalled = false;
function handleKeyPress() {
    game.input.keyboard.addCallbacks(null, function () {
    }, function () {
    }, function (KeyK) {
        functionCalled = true;
        textAnyKey.kill();
    });
    return functionCalled;
}
function handleMovement() {
    handleKeyPress();
    for (var _i = 0, _a = filterUnitsAlive(allUnits); _i < _a.length; _i++) {
        var unit = _a[_i];
        unit.stopIfWithinRange();
        if (functionCalled === true) {
            for (var i = 0; i < teamCount; i++) {
                teamMove(allUnits, i);
            }
        }
    }
}
function handleAttack() {
    for (var _i = 0, _a = filterUnitsAlive(allUnits); _i < _a.length; _i++) {
        var unit = _a[_i];
        var unitsSuccessfullyAttacked = unit.checkAttackSuccess();
        if (unitsSuccessfullyAttacked === true) {
        }
    }
    for (var i = 0; i < teamCount; i++) {
        teamAttack(filterUnitsAlive(allUnits), i);
    }
}
function doOverlap() {
    for (var _i = 0, allUnits_2 = allUnits; _i < allUnits_2.length; _i++) {
        var unit = allUnits_2[_i];
        //at every iteration of the loop
        //unit takes on a new unit from allUnits
        //let dog of dogs
        //let cat of cats
        //let person of people
        for (var _a = 0, allUnits_3 = allUnits; _a < allUnits_3.length; _a++) {
            var otherUnit = allUnits_3[_a];
            if (otherUnit == unit) {
                continue;
            }
            game.physics.arcade.collide(otherUnit.basicUnit, unit.basicUnit, function (unit1, unit2) {
            });
        }
        //overlap(:sprite, :sprite)
    }
}
var permMouseX = -1;
var permMouseY = -1;
function startDrawing() {
    permMouseX = game.input.mousePointer.x;
    permMouseY = game.input.mousePointer.y;
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);
    drawing = true;
}
function eraseLineAndPrint() {
    graphics.clear();
    drawing = false;
    var diffX = testUnit.x - permMouseX;
    var diffY = testUnit.y - permMouseY;
    var unitsPossible = Math.sqrt((diffX * diffX) + (diffY * diffY)) / 15;
    var xInc = diffX / unitsPossible;
    var yInc = diffY / unitsPossible;
    var x = permMouseX;
    var y = permMouseY;
    var count = 0;
    while (count < unitsPossible) {
        allUnits.push(new Unit(x, y, mySpawnArray[SPAWNTEAM].health, mySpawnArray[SPAWNTEAM].speed, mySpawnArray[SPAWNTEAM].damage, mySpawnArray[SPAWNTEAM].range, SPAWNTEAM, mySpawnArray[SPAWNTEAM].key, mySpawnArray[SPAWNTEAM].accuracy));
        x = x + xInc;
        y = y + yInc;
        count = count + 1;
    }
    allUnits.push(new Unit(testUnit.x, testUnit.y, mySpawnArray[SPAWNTEAM].health, mySpawnArray[SPAWNTEAM].speed, mySpawnArray[SPAWNTEAM].damage, mySpawnArray[SPAWNTEAM].range, SPAWNTEAM, mySpawnArray[SPAWNTEAM].key, mySpawnArray[SPAWNTEAM].accuracy));
}
var SPAWNTEAM = 0;
var mySpawnArray = [
    {
        'health': 100,
        'speed': 50,
        'damage': 0.95,
        'range': 15,
        'key': 'basicUnit',
        'accuracy': 100
    },
    {
        'health': 150,
        'speed': 50,
        'damage': 1.5,
        'range': 50,
        'key': 'knightUnit',
        'accuracy': 100
    },
    {
        'health': 130,
        'speed': 50,
        'damage': 2,
        'range': 70,
        'key': 'musketUnit',
        'accuracy': 0
    }
];
function changeUnit() {
    if (SPAWNTEAM < teamCount - 1) {
        SPAWNTEAM++;
    }
    else {
        SPAWNTEAM = 0;
    }
    testUnit.loadTexture(mySpawnArray[SPAWNTEAM].key);
}
function myFunction() {
    //let myStringArray = ["basicUnit","knightUnit", "musketUnit"];
    // sprite = myStringArray[counter];
    allUnits.push(new Unit(testUnit.x, testUnit.y, mySpawnArray[SPAWNTEAM].health, mySpawnArray[SPAWNTEAM].speed, mySpawnArray[SPAWNTEAM].damage, mySpawnArray[SPAWNTEAM].range, SPAWNTEAM, mySpawnArray[SPAWNTEAM].key, mySpawnArray[SPAWNTEAM].accuracy));
}
function update() {
    testUnit.x = game.input.mousePointer.x;
    testUnit.y = game.input.mousePointer.y;
    if (drawing === true) {
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
//# sourceMappingURL=battleSim.js.map