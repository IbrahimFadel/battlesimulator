var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('basicUnit', 'assets/bullet153.png');
    game.load.image('nightUnit', 'assets/bullet147.png');
}

class Unit {
    public basicUnit : Phaser.Sprite;
    public health : number;
    private speed : number;
    private damage : number;
    private range : number;
    constructor(x : number, y : number, health : number, speed : number, damage : number, range: number) {
        this.basicUnit = game.add.sprite(x, y, 'basicUnit');
        game.physics.arcade.enable(this.basicUnit);
        this.health = health;
        this.speed = speed;
        this.damage = damage;
        this.range = range;
    }

    getRange(){
        return this.range;
    }

    getDamage() {
        return this.damage;
    }

    setDirectionY(direction : number) {
        if (direction ===0) {
            //switch direction: to be implemented by ibrahim
            //this.nightUnit.body.velocity.y = this.speed;
            throw "TODO: Unimplemented"
        } else if (direction ===1){
            this.basicUnit.body.velocity.y = this.speed;
        } else if (direction === -1) {
            this.basicUnit.body.velocity.y = 0 - this.speed;
        } else {
            throw "Programmer Error..."
        }
    }

    setDirectionX(direction : number) {
        if (direction ===0) {
            //switch direction: to be implemented by ibrahim
            //this.nightUnit.body.velocity.y = this.speed;
            throw "TODO: Unimplemented"
        } else if (direction ===1){
            this.basicUnit.body.velocity.x = this.speed;
        } else if (direction === -1) {
            this.basicUnit.body.velocity.x = 0 - this.speed;
        } else{
            throw "Programmer Error..."
        }
    }

    withinRange(arrayOfNights : Array<Night>) : Array<Night> {
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        let arrayOfNightsWithinRange : Array<Night> = [];

        var unitX : number = this.basicUnit.x;
        var unitY : number = this.basicUnit.y;


        for(let night of arrayOfNights){
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */

            var nightX : number = night.nightUnit.x;
            var nightY : number = night.nightUnit.y;

            var diffX = nightX - unitX;
            var diffY = nightY - unitY;

            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY))
            if(distance <= this.range) {
                arrayOfNightsWithinRange.push(night);
            }
        }
        return arrayOfNightsWithinRange;
    }

    closestUnit(arrayOfNights : Array<Night>) : Night {
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        let arrayOfNightsWithinRange : Array<Night> = [];

        var unitX : number = this.basicUnit.x;
        var unitY : number = this.basicUnit.y;

        var closestNight = arrayOfNights[0];
        var closestDistance = Number.MAX_VALUE;

        for(let night of arrayOfNights){
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */



            var nightX : number = night.nightUnit.x;
            var nightY : number = night.nightUnit.y;

            var diffX = nightX - unitX;
            var diffY = nightY - unitY;

            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
            if(distance < closestDistance) {
                closestNight = night;
                closestDistance = distance;
            }
        }
        return closestNight;
    }

    killUnit() {
        this.basicUnit.kill();
        this.damage = 0;
    }

    isAlive() {
        let alive : boolean = true;
        if(this.health <= 0) {
            alive = false;
        }
        return alive;
    }

}

class Night {
    public nightUnit : Phaser.Sprite;
    public health : number;
    public speed : number;
    private damage : number;
    private range : number;
    constructor(x : number, y : number, health : number, speed : number, damage : number, range : number) {
        this.nightUnit = game.add.sprite(x, y, 'nightUnit');
        game.physics.arcade.enable(this.nightUnit);
        this.health = health;
        this.speed = speed;
        this.damage = damage;
        this.range = range;
    }

    getRange(){
        return this.range;
    }

    getDamage() {
        return this.damage;
    }

    setDirectionY(direction : number) : void {
        if (direction ===0) {
            //switch direction: to be implemented by ibrahim
            //this.nightUnit.body.velocity.y = this.speed;
            throw "TODO: Unimplemented"
        } else if (direction ===1){
            this.nightUnit.body.velocity.y = this.speed;
        } else if (direction === -1) {
            this.nightUnit.body.velocity.y = 0 - this.speed;
        } else {
            throw "Programmer Error..."
        }
    }

    setDirectionX(direction : number) : void {
        if (direction ===0) {
            //switch direction: to be implemented by ibrahim
            //this.nightUnit.body.velocity.y = this.speed;
            throw "TODO: Unimplemented"
        } else if (direction ===1){
            this.nightUnit.body.velocity.x = this.speed;
        } else if (direction === -1) {
            this.nightUnit.body.velocity.x = 0 - this.speed;
        } else{
            throw "Programmer Error..."
        }
    }



    /**
     * For a given array of units, return an array of the ones that
     * are within range of this night
     *
     * @param arrayOfUnits : Array<Unit> array of units
     * @return Array<Unit> all units that are within range
     */
    withinRange(arrayOfUnits : Array<Unit>) : Array<Unit> {
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        let arrayOfUnitsWithinRange : Array<Unit> = [];

        var nightX : number = this.nightUnit.x;
        var nightY : number = this.nightUnit.y;


        for(let unit of arrayOfUnits){
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */

            var unitX : number = unit.basicUnit.x;
            var unitY : number = unit.basicUnit.y;

            var diffX = unitX - nightX;
            var diffY = unitY - nightY;

            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY))
            if(distance <= this.range) {
                arrayOfUnitsWithinRange.push(unit);
            }
        }
        return arrayOfUnitsWithinRange;
    }

    /**
     * For a given array of units, return the closest
     * unit to the current night
     *
     * @param arrayOfUnits : Array<Unit> array of units
     * @return Unit the closest unit
     */
    closestUnit(arrayOfUnits : Array<Unit>) : Unit {
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        let arrayOfUnitsWithinRange : Array<Unit> = [];

        var nightX : number = this.nightUnit.x;
        var nightY : number = this.nightUnit.y;

        var closestUnit = arrayOfUnits[0];
        var closestDistance = Number.MAX_VALUE;

        for(let unit of arrayOfUnits){
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */



            var unitX : number = unit.basicUnit.x;
            var unitY : number = unit.basicUnit.y;

            var diffX = unitX - nightX;
            var diffY = unitY - nightY;

            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
            if(distance < closestDistance) {
                closestUnit = unit;
                closestDistance = distance;
            }
        }
        return closestUnit;
    }

    killNight () {
        this.nightUnit.kill();
        this.damage = 0;
    }

    isAlive() {
        let alive : boolean = true;
        if(this.health <= 0) {
            alive = false;
        }
        return alive;
    }
}

function a(){
    var a1
    // a1 is accessible here
    // b1 is not accessible here
    let a2
    // a2 is accessible here
    // b2 is not accessible here
    function b(){
        var b1
        let b2
        // a1 is accessible here
        // b1 is accessible here
        // a2 is not accessible
    }
}

var amountUnits : number = 50;
var amountKnights : number = 10;
var nightsAttacking : boolean = false;
var basicUnits : Array<Unit> = [];
var nightUnits : Array<Night> = [];
var nightsAlive = true;
var unitsAlive = true;
var deadUnits : number = 0;
var deadNights : number = 0;
var amountUnitsDifference : number = amountUnits - 15;
var unitSpacing : number = 20;
var unitsPrinted : number = 0;

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

    let y = 200;
    let xdiff = 0;
    for(let i : number = 0; i < amountUnits; i++) {
        if(i % 15 === 0) {
            y += 30;
            xdiff = 0;
        }
        basicUnits[i] = new Unit(250 + xdiff, y, 100, 100,0.95, 100);
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

    for(let i : number = 0; i < amountKnights; i++) {
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

function computeAverageNightUnitX(nightUnits : Array<Night>) : number {
    //nightUnits[].x / nightUnits[].length
    var totalNightsPosX = 0;
    let nightsAlive = filterNightsAlive(nightUnits);


    for(let i = 0; i < nightsAlive.length; i++) {
            totalNightsPosX = totalNightsPosX + nightsAlive[i].nightUnit.x;
    }
    var nightsPosXAvg = totalNightsPosX / nightsAlive.length;
    return nightsPosXAvg;
}

function computeAverageBasicUnitX(basicUnits : Array<Unit>) : number {
    //nightUnits[].x / nightUnits[].length
    let totalUnitsPosX = 0;
    let unitsAlive = filterUnitsAlive(basicUnits);

    for(let i = 0; i < unitsAlive.length; i++) {
        totalUnitsPosX = totalUnitsPosX + unitsAlive[i].basicUnit.x;
    }
    var unitsPosXAvg = totalUnitsPosX / unitsAlive.length;
    return unitsPosXAvg;
}


function computeAverageNightUnitY(nightUnits : Array<Night>) : number {
    //nightUnits[].x / nightUnits[].length
    var totalNightsPos = 0;
    let arrayNightsAlive = filterNightsAlive(nightUnits);

    var totalNightsPosY = 0;
    for(let i = 0; i < arrayNightsAlive.length; i++) {
        totalNightsPosY = totalNightsPosY + arrayNightsAlive[i].nightUnit.y;
    }
    var nightsPosYAvg = totalNightsPosY / arrayNightsAlive.length;
    return nightsPosYAvg;
}

function computeAverageBasicUnitY(basicUnits : Array<Unit>) : number {
    //nightUnits[].x / nightUnits[].length

    let unitsAlive = filterUnitsAlive(basicUnits);

    var totalUnitsPosY = 0;
    for(let i = 0; i < unitsAlive.length; i++) {
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
function filterUnitsAlive(basicUnits : Array<Unit>) {
    let unitsAlive : Array<Unit> = [];

    for(let i = 0; i < basicUnits.length; i++) {
        if(basicUnits[i].isAlive() === true) {
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

function filterNightsAlive(nightUnit : Array<Night>) {
    let nightsAlive : Array<Night> = [];

    for(let i = 0; i < nightUnits.length; i++) {
        if(nightUnits[i].isAlive() === true) {
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

    if(diffAvgY <= nightUnits[0].getRange()) {
        withinRange = true;
    } else {
        withinRange = false;
    }
    return withinRange;
}

function unitsWithinRangeOfNights() {
    var withinRange = false;

    var nightsPosYAvg = computeAverageNightUnitY(nightUnits);
    var unitsPosYAvg = computeAverageBasicUnitY(basicUnits);

    var diffAvgY = nightsPosYAvg - unitsPosYAvg;

    if(diffAvgY <= basicUnits[0].getRange()) {
        withinRange = true;
    } else {
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

    for(let i : number = 0; i < amountUnits; i++) {

    }

}

var unitsDying = false;

function handleMovement(){
    var nightsPosXAvg = computeAverageNightUnitX(nightUnits);
    var unitsPosXAvg = computeAverageBasicUnitX(basicUnits);
    var nightsPosYAvg = computeAverageNightUnitY(nightUnits);
    var unitsPosYAvg = computeAverageBasicUnitY(basicUnits);

    var diffAvgX = nightsPosXAvg - unitsPosXAvg;
    var diffAvgY = nightsPosYAvg - unitsPosYAvg;


    if(nightsAttacking) {
        for(let unit of basicUnits) {
            unit.basicUnit.body.immovable = true;
        }

        for(let night of filterNightsAlive(nightUnits)) {
            let closestUnit = night.closestUnit(filterUnitsAlive(basicUnits));

            let closestUnitX = closestUnit.basicUnit.x;
            let closestUnitY = closestUnit.basicUnit.y;

            let nightX = night.nightUnit.x;
            let nightY = night.nightUnit.y;

            if(closestUnitX > nightX) {
                /*for(var i = 0; i < nightUnits.length; i++) {
                    nightUnits[i].nightUnit.speed
                }*/
                /* do not try to play with the velocity of the sprite's body in here */
                //night.nightUnit.body.speed =
                night.setDirectionX(1)
            } else {
                night.setDirectionX(-1)
            }

            if(closestUnitY > nightY) {
                night.setDirectionY(1)
            } else {
                night.setDirectionY(-1)
            }
        }
    } else /* units are attacking */ {
        for(let night of filterNightsAlive(nightUnits)) {
            night.nightUnit.body.immovable = true;
        }

        for(let unit of filterUnitsAlive(basicUnits)) {
            let closestNight = unit.closestUnit(filterNightsAlive(nightUnits));

            let closestNightX = closestNight.nightUnit.x;
            let closestNightY = closestNight.nightUnit.y;

            let unitX = unit.basicUnit.x;
            let unitY = unit.basicUnit.y;

            if(closestNightX > unitX) {
                unit.setDirectionX(1)

            } else {
                unit.setDirectionX(-1)
            }

            if(closestNightY > unitY) {
                unit.setDirectionY(1)
            } else {
                unit.setDirectionY(-1)
            }
        }
    }
}

function debugKillClosestBasicToFirstNight(){
    let firstNight = nightUnits[0];
    let unit = firstNight.closestUnit(basicUnits);
    unit.basicUnit.kill();
}

function debugKillClosestBasicToNight(night : Night){
    let unit = night.closestUnit(basicUnits);
    unit.basicUnit.kill();
}

function update() {
    /* Movement logic begin */
    handleMovement();
    /* Movement logic end */

    /* Attack Logic begin*/




    for(let night of nightUnits) {
        let closestUnit = night.closestUnit(basicUnits);
        // Check if within range of night
        if(night.withinRange([closestUnit]).length > 0){
            closestUnit.health = closestUnit.health - night.getDamage();
            if(closestUnit.health <= 0) {
                closestUnit.killUnit();
            }
            //console.log(closestUnit.health);
        }
    }

    for(let unit of basicUnits) {
        let closestNight = unit.closestUnit(nightUnits);
        // Check if within range of night
        if(unit.withinRange([closestNight]).length > 0){
            closestNight.health = closestNight.health - unit.getDamage();
            if(closestNight.health <= 0) {
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