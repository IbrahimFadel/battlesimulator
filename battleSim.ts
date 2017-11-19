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

var amountUnits : number = 15;
var amountKnights : number = 5;
var nightsAttacking : boolean = true;
var basicUnits : Array<Unit> = [];
var nightUnits : Array<Night> = [];
var nightsAlive = true;
var unitsAlive = true;
var deadUnits : number = 0;
var deadNights : number = 0;

function create() {

    for(let i : number = 0; i < amountUnits; i++) {
        basicUnits[i] = new Unit(200 + i * 25, 200, 100, 100, 1, 60);
    }

    for(let i : number = 0; i < amountKnights; i++) {
        nightUnits[i] = new Night(250 + i * 25, 400, 150, 60, 1, 60);
    }
}

function computeAverageNightUnitX(nightUnits : Array<Night>) : number {
    //nightUnits[].x / nightUnits[].length
    var totalNightsPosX = 0;
    for(let i = 0; i < nightUnits.length; i++) {
        totalNightsPosX = totalNightsPosX + nightUnits[i].nightUnit.x;
    }
    var nightsPosXAvg = totalNightsPosX / nightUnits.length;
    return nightsPosXAvg;
}

function computeAverageBasicUnitX(basicUnits : Array<Unit>) : number {
    //nightUnits[].x / nightUnits[].length
    var totalUnitsPosX = 0;
    for(let i = 0; i < basicUnits.length; i++) {
        totalUnitsPosX = totalUnitsPosX + basicUnits[i].basicUnit.x;
    }
    var unitsPosXAvg = totalUnitsPosX / basicUnits.length;
    return unitsPosXAvg;
}


function computeAverageNightUnitY(nightUnits : Array<Night>) : number {
    //nightUnits[].x / nightUnits[].length
    var totalNightsPosY = 0;
    for(let i = 0; i < nightUnits.length; i++) {
        totalNightsPosY = totalNightsPosY + nightUnits[i].nightUnit.y;
    }
    var nightsPosYAvg = totalNightsPosY / nightUnits.length;
    return nightsPosYAvg;
}

function computeAverageBasicUnitY(basicUnits : Array<Unit>) : number {
    //nightUnits[].x / nightUnits[].length
    var totalUnitsPosY = 0;
    for(let i = 0; i < basicUnits.length; i++) {
        totalUnitsPosY = totalUnitsPosY + basicUnits[i].basicUnit.y;
    }
    var unitsPosYAvg = totalUnitsPosY / basicUnits.length;
    return unitsPosYAvg;
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

        for(let night of nightUnits) {
            if(diffAvgX < 0) {
                /*for(var i = 0; i < nightUnits.length; i++) {
                    nightUnits[i].nightUnit.speed
                }*/
                /* do not try to play with the velocity of the sprite's body in here */
                //night.nightUnit.body.speed =
                night.setDirectionX(1)
            } else {
                night.setDirectionX(-1)
            }

            if(diffAvgY < 0) {
                night.setDirectionY(1)
            } else {
                night.setDirectionY(-1)
            }
        }
    } else /* units are attacking */ {
        for(let night of nightUnits) {
            night.nightUnit.body.immovable = true;
        }

        for(let unit of basicUnits) {
            if(diffAvgX < 0) {
                unit.basicUnit.body.velocity.x = -60;

            } else {
                unit.basicUnit.body.velocity.x = 60;
            }

            if(diffAvgY < 0) {
                unit.basicUnit.body.velocity.y = -60;
            } else {
                unit.basicUnit.body.velocity.y = 60;
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



    let theFirstNight : Night = nightUnits[2];
    for(let night of nightUnits) {
        let closestUnit = night.closestUnit(basicUnits);
        // Check if within range of night
        if(night.withinRange([closestUnit]).length > 0){
            closestUnit.health = closestUnit.health - night.getDamage();
            if(closestUnit.health <= 0) {
                closestUnit.basicUnit.kill();
                console.log("Hi");
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