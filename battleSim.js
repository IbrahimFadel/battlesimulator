"use strict";
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });
function preload() {
    game.load.image('basicUnit', 'assets/bullet153.png');
    game.load.image('nightUnit', 'assets/bullet147.png');
}
var Unit = /** @class */ (function () {
    function Unit(x, y, health, speed, damage, range) {
        this.basicUnit = game.add.sprite(x, y, 'basicUnit');
        game.physics.arcade.enable(this.basicUnit);
        this.health = health;
        this.speed = speed;
        this.damage = damage;
        this.range = range;
    }
    Unit.prototype.getRange = function () {
        return this.range;
    };
    Unit.prototype.getDamage = function () {
        return this.damage;
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
            //switch direction: to be implemented by ibrahim
            //this.nightUnit.body.velocity.y = this.speed;
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
    Unit.prototype.withinRange = function (arrayOfNights) {
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        var arrayOfNightsWithinRange = [];
        var unitX = this.basicUnit.x;
        var unitY = this.basicUnit.y;
        for (var _i = 0, arrayOfNights_1 = arrayOfNights; _i < arrayOfNights_1.length; _i++) {
            var night = arrayOfNights_1[_i];
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */
            var nightX = night.nightUnit.x;
            var nightY = night.nightUnit.y;
            var diffX = nightX - unitX;
            var diffY = nightY - unitY;
            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
            if (distance <= this.range) {
                arrayOfNightsWithinRange.push(night);
            }
        }
        return arrayOfNightsWithinRange;
    };
    Unit.prototype.closestUnit = function (arrayOfNights) {
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        var arrayOfNightsWithinRange = [];
        var unitX = this.basicUnit.x;
        var unitY = this.basicUnit.y;
        var closestNight = arrayOfNights[0];
        var closestDistance = Number.MAX_VALUE;
        for (var _i = 0, arrayOfNights_2 = arrayOfNights; _i < arrayOfNights_2.length; _i++) {
            var night = arrayOfNights_2[_i];
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */
            var nightX = night.nightUnit.x;
            var nightY = night.nightUnit.y;
            var diffX = nightX - unitX;
            var diffY = nightY - unitY;
            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
            if (distance < closestDistance) {
                closestNight = night;
                closestDistance = distance;
            }
        }
        return closestNight;
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
    return Unit;
}());
var Night = /** @class */ (function () {
    function Night(x, y, health, speed, damage, range) {
        this.nightUnit = game.add.sprite(x, y, 'nightUnit');
        game.physics.arcade.enable(this.nightUnit);
        this.health = health;
        this.speed = speed;
        this.damage = damage;
        this.range = range;
    }
    Night.prototype.getRange = function () {
        return this.range;
    };
    Night.prototype.getDamage = function () {
        return this.damage;
    };
    Night.prototype.setDirectionY = function (direction) {
        if (direction === 0) {
            //switch direction: to be implemented by ibrahim
            //this.nightUnit.body.velocity.y = this.speed;
            throw "TODO: Unimplemented";
        }
        else if (direction === 1) {
            this.nightUnit.body.velocity.y = this.speed;
        }
        else if (direction === -1) {
            this.nightUnit.body.velocity.y = 0 - this.speed;
        }
        else {
            throw "Programmer Error...";
        }
    };
    Night.prototype.setDirectionX = function (direction) {
        if (direction === 0) {
            //switch direction: to be implemented by ibrahim
            //this.nightUnit.body.velocity.y = this.speed;
            throw "TODO: Unimplemented";
        }
        else if (direction === 1) {
            this.nightUnit.body.velocity.x = this.speed;
        }
        else if (direction === -1) {
            this.nightUnit.body.velocity.x = 0 - this.speed;
        }
        else {
            throw "Programmer Error...";
        }
    };
    /**
     * For a given array of units, return an array of the ones that
     * are within range of this night
     *
     * @param arrayOfUnits : Array<Unit> array of units
     * @return Array<Unit> all units that are within range
     */
    Night.prototype.withinRange = function (arrayOfUnits) {
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        var arrayOfUnitsWithinRange = [];
        var nightX = this.nightUnit.x;
        var nightY = this.nightUnit.y;
        for (var _i = 0, arrayOfUnits_1 = arrayOfUnits; _i < arrayOfUnits_1.length; _i++) {
            var unit = arrayOfUnits_1[_i];
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */
            var unitX = unit.basicUnit.x;
            var unitY = unit.basicUnit.y;
            var diffX = unitX - nightX;
            var diffY = unitY - nightY;
            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
            if (distance <= this.range) {
                arrayOfUnitsWithinRange.push(unit);
            }
        }
        return arrayOfUnitsWithinRange;
    };
    /**
     * For a given array of units, return the closest
     * unit to the current night
     *
     * @param arrayOfUnits : Array<Unit> array of units
     * @return Unit the closest unit
     */
    Night.prototype.closestUnit = function (arrayOfUnits) {
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        var arrayOfUnitsWithinRange = [];
        var nightX = this.nightUnit.x;
        var nightY = this.nightUnit.y;
        var closestUnit = arrayOfUnits[0];
        var closestDistance = Number.MAX_VALUE;
        for (var _i = 0, arrayOfUnits_2 = arrayOfUnits; _i < arrayOfUnits_2.length; _i++) {
            var unit = arrayOfUnits_2[_i];
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */
            var unitX = unit.basicUnit.x;
            var unitY = unit.basicUnit.y;
            var diffX = unitX - nightX;
            var diffY = unitY - nightY;
            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
            if (distance < closestDistance) {
                closestUnit = unit;
                closestDistance = distance;
            }
        }
        return closestUnit;
    };
    Night.prototype.killNight = function () {
        this.nightUnit.kill();
        this.damage = 0;
    };
    Night.prototype.isAlive = function () {
        var alive = true;
        if (this.health <= 0) {
            alive = false;
        }
        return alive;
    };
    return Night;
}());
function a() {
    var a1;
    // a1 is accessible here
    // b1 is not accessible here
    var a2;
    // a2 is accessible here
    // b2 is not accessible here
    function b() {
        var b1;
        var b2;
        // a1 is accessible here
        // b1 is accessible here
        // a2 is not accessible
    }
}
var amountUnits = 50;
var amountKnights = 10;
var nightsAttacking = false;
var basicUnits = [];
var nightUnits = [];
var nightsAlive = true;
var unitsAlive = true;
var deadUnits = 0;
var deadNights = 0;
var amountUnitsDifference = amountUnits - 15;
var unitSpacing = 20;
var unitsPrinted = 0;
function create() {
    /*if(amountUnits > 0 && amountUnits <= 15) {
        for(let i : number = 0; i < amountUnits; i++) {
            basicUnits[i] = new Unit(200 + i * 25, 200, 100, 100, 0.95, 20);
        }
    }
    if(amountUnits > 15 && amountUnits <= 30) {
        for(let i : number = 0; i < amountUnits - amountUnitsDifference; i++) {
            basicUnits[i] = new Unit(200 + i * 25, 200, 100, 100, 0.95, 20);
            for(let i : number = 0; i < amountUnitsDifference; i++) {
                basicUnits[i] = new Unit(200 + i * 25, 200 + unitSpacing, 100, 100, 0.95, 20);
            }
        }
    }*/
    var y = 200;
    var xdiff = 0;
    for (var i = 0; i < amountUnits; i++) {
        if (i % 15 === 0) {
            y += 30;
            xdiff = 0;
        }
        basicUnits[i] = new Unit(250 + xdiff, y, 100, 100, 0.95, 100);
        xdiff += 25;
    }
    /*let y2 = 200;
    let xdiff2 = 0;
    for(let i : number = 0; i < amountUnits; i++) {
        if(i % 15 === 0) {
            y2 += 30;
            xdiff2 = 0;
        }
        basicUnits[i] = new Unit(250 + xdiff2, y2, 100, 100,0.95, 100);
        xdiff2 += 25;
    }*/
    for (var i = 0; i < amountKnights; i++) {
        nightUnits[i] = new Night(250 + i * 25, 400, 150, 60, 1, 60);
    }
    /*let y = 400;
    let xdiff = 0;
    for(let i : number = 0; i < amountKnights; i++) {
        let y = 400;
        let xdiff = 0;
        if(i % 15 === 0) {
            y += 30;
            xdiff = 0;
        }
        nightUnits[i] = new Night(250 + xdiff, y, 100, 100, 1, 100);
        xdiff += 25;
    }*/
}
function computeAverageNightUnitX(nightUnits) {
    //nightUnits[].x / nightUnits[].length
    var totalNightsPosX = 0;
    var nightsAlive = filterNightsAlive(nightUnits);
    for (var i = 0; i < nightsAlive.length; i++) {
        totalNightsPosX = totalNightsPosX + nightsAlive[i].nightUnit.x;
    }
    var nightsPosXAvg = totalNightsPosX / nightsAlive.length;
    return nightsPosXAvg;
}
function computeAverageBasicUnitX(basicUnits) {
    //nightUnits[].x / nightUnits[].length
    var totalUnitsPosX = 0;
    var unitsAlive = filterUnitsAlive(basicUnits);
    for (var i = 0; i < unitsAlive.length; i++) {
        totalUnitsPosX = totalUnitsPosX + unitsAlive[i].basicUnit.x;
    }
    var unitsPosXAvg = totalUnitsPosX / unitsAlive.length;
    return unitsPosXAvg;
}
function computeAverageNightUnitY(nightUnits) {
    //nightUnits[].x / nightUnits[].length
    var totalNightsPos = 0;
    var arrayNightsAlive = filterNightsAlive(nightUnits);
    var totalNightsPosY = 0;
    for (var i = 0; i < arrayNightsAlive.length; i++) {
        totalNightsPosY = totalNightsPosY + arrayNightsAlive[i].nightUnit.y;
    }
    var nightsPosYAvg = totalNightsPosY / arrayNightsAlive.length;
    return nightsPosYAvg;
}
function computeAverageBasicUnitY(basicUnits) {
    //nightUnits[].x / nightUnits[].length
    var unitsAlive = filterUnitsAlive(basicUnits);
    var totalUnitsPosY = 0;
    for (var i = 0; i < unitsAlive.length; i++) {
        totalUnitsPosY = totalUnitsPosY + unitsAlive[i].basicUnit.y;
    }
    var unitsPosYAvg = totalUnitsPosY / unitsAlive.length;
    return unitsPosYAvg;
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
 *
 * @param {Array<Night>} nightUnit
 * @return {Array<Night>}
 */
function filterNightsAlive(nightUnit) {
    var nightsAlive = [];
    for (var i = 0; i < nightUnits.length; i++) {
        if (nightUnits[i].isAlive() === true) {
            nightsAlive.push(nightUnits[i]);
        }
    }
    return nightsAlive;
}
/**
 * What does this method do
 *
 * the method within range computes wether or not nights are within range of the defending units.
 * this boolean returned can be used in the attack logic later.
 *
 * @param {number} range
 * @return {type}
 */
function nightsWithinRangeOfUnits() {
    var withinRange = false;
    var nightsPosYAvg = computeAverageNightUnitY(nightUnits);
    var unitsPosYAvg = computeAverageBasicUnitY(basicUnits);
    var diffAvgY = nightsPosYAvg - unitsPosYAvg;
    if (diffAvgY <= nightUnits[0].getRange()) {
        withinRange = true;
    }
    else {
        withinRange = false;
    }
    return withinRange;
}
function unitsWithinRangeOfNights() {
    var withinRange = false;
    var nightsPosYAvg = computeAverageNightUnitY(nightUnits);
    var unitsPosYAvg = computeAverageBasicUnitY(basicUnits);
    var diffAvgY = nightsPosYAvg - unitsPosYAvg;
    if (diffAvgY <= basicUnits[0].getRange()) {
        withinRange = true;
    }
    else {
        withinRange = false;
    }
    return withinRange;
}
function checkClosestUnit() {
    //var nightsPosYAvg = computeAverageNightUnitY(nightUnits);
    //var unitsPosYAvg = computeAverageBasicUnitY(basicUnits);
    //var nightsPosXAvg = computeAverageNightUnitX(nightUnits);
    //var unitsPosXAvg = computeAverageBasicUnitX(basicUnits);
    //var diffAvgY = nightsPosYAvg - unitsPosYAvg;
    //var diffAvgX = nightsPosXAvg - unitsPosXAvg;
    //var totalDiffXY = diffAvgY + diffAvgX;
    for (var i = 0; i < amountUnits; i++) {
    }
}
var unitsDying = false;
function handleMovement() {
    var nightsPosXAvg = computeAverageNightUnitX(nightUnits);
    var unitsPosXAvg = computeAverageBasicUnitX(basicUnits);
    var nightsPosYAvg = computeAverageNightUnitY(nightUnits);
    var unitsPosYAvg = computeAverageBasicUnitY(basicUnits);
    var diffAvgX = nightsPosXAvg - unitsPosXAvg;
    var diffAvgY = nightsPosYAvg - unitsPosYAvg;
    if (nightsAttacking) {
        for (var _i = 0, basicUnits_1 = basicUnits; _i < basicUnits_1.length; _i++) {
            var unit = basicUnits_1[_i];
            unit.basicUnit.body.immovable = true;
        }
        for (var _a = 0, _b = filterNightsAlive(nightUnits); _a < _b.length; _a++) {
            var night = _b[_a];
            var closestUnit = night.closestUnit(filterUnitsAlive(basicUnits));
            var closestUnitX = closestUnit.basicUnit.x;
            var closestUnitY = closestUnit.basicUnit.y;
            var nightX = night.nightUnit.x;
            var nightY = night.nightUnit.y;
            if (closestUnitX > nightX) {
                /*for(var i = 0; i < nightUnits.length; i++) {
                    nightUnits[i].nightUnit.speed
                }*/
                /* do not try to play with the velocity of the sprite's body in here */
                //night.nightUnit.body.speed =
                night.setDirectionX(1);
            }
            else {
                night.setDirectionX(-1);
            }
            if (closestUnitY > nightY) {
                night.setDirectionY(1);
            }
            else {
                night.setDirectionY(-1);
            }
        }
    }
    else {
        for (var _c = 0, _d = filterNightsAlive(nightUnits); _c < _d.length; _c++) {
            var night = _d[_c];
            night.nightUnit.body.immovable = true;
        }
        for (var _e = 0, _f = filterUnitsAlive(basicUnits); _e < _f.length; _e++) {
            var unit = _f[_e];
            var closestNight = unit.closestUnit(filterNightsAlive(nightUnits));
            var closestNightX = closestNight.nightUnit.x;
            var closestNightY = closestNight.nightUnit.y;
            var unitX = unit.basicUnit.x;
            var unitY = unit.basicUnit.y;
            if (closestNightX > unitX) {
                unit.setDirectionX(1);
            }
            else {
                unit.setDirectionX(-1);
            }
            if (closestNightY > unitY) {
                unit.setDirectionY(1);
            }
            else {
                unit.setDirectionY(-1);
            }
        }
    }
}
function debugKillClosestBasicToFirstNight() {
    var firstNight = nightUnits[0];
    var unit = firstNight.closestUnit(basicUnits);
    unit.basicUnit.kill();
}
function debugKillClosestBasicToNight(night) {
    var unit = night.closestUnit(basicUnits);
    unit.basicUnit.kill();
}
function update() {
    /* Movement logic begin */
    handleMovement();
    /* Movement logic end */
    /* Attack Logic begin*/
    for (var _i = 0, nightUnits_1 = nightUnits; _i < nightUnits_1.length; _i++) {
        var night = nightUnits_1[_i];
        var closestUnit = night.closestUnit(basicUnits);
        // Check if within range of night
        if (night.withinRange([closestUnit]).length > 0) {
            closestUnit.health = closestUnit.health - night.getDamage();
            if (closestUnit.health <= 0) {
                closestUnit.killUnit();
            }
            //console.log(closestUnit.health);
        }
    }
    for (var _a = 0, basicUnits_2 = basicUnits; _a < basicUnits_2.length; _a++) {
        var unit = basicUnits_2[_a];
        var closestNight = unit.closestUnit(nightUnits);
        // Check if within range of night
        if (unit.withinRange([closestNight]).length > 0) {
            closestNight.health = closestNight.health - unit.getDamage();
            if (closestNight.health <= 0) {
                closestNight.killNight();
            }
            //console.log(closestUnit.health);
        }
    }
    /*if() {
        if(deadUnits < amountUnits) {
            game.time.events.add(Phaser.Timer.SECOND, function() {

                for(let unit of basicUnits) {

                    unit.health = unit.health - nightUnits[0].getDamage();
                }
            });
        }
    }*/
    /*if(unitsWithinRangeOfNights() === true) {
        if(nightsAlive === true) {
            game.time.events.add(Phaser.Timer.SECOND, function() {
                for(let night of nightUnits) {
                    night.health = night.health - basicUnits[0].getDamage();
                    if (night.health <= 0 && nightsAlive === true) {
                        night.nightUnit.kill();
                        nightsAlive = false;
                    }
                }

            });
        }
    }*/
    /* Attack Logic end */
}
function render() {
}
//# sourceMappingURL=battleSim.js.map