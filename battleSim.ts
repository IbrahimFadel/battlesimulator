var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('basicUnit', 'assets/bullet153.png');
    game.load.image('knightUnit', 'assets/bullet147.png');
}

class Unit {
    public basicUnit : Phaser.Sprite;
    public health : number;
    private speed : number;
    private damage : number;
    private range : number;
    public team : number;
    constructor(x : number, y : number, health : number, speed : number, damage : number, range: number, team : number, sprite : string) {
        this.basicUnit = game.add.sprite(x, y, sprite);
        game.physics.arcade.enable(this.basicUnit);
        this.health = health;
        this.speed = speed;
        this.damage = damage;
        this.range = range;
        this.team = team;
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

    /**
     * now we have 2 teams, but withinRange computes the distance
     * for a different kind of class, fior e.g oldUnit.withinRange(arrayOFNights)
     * newunit.withinrange(arrayOfUnitsOfOtherTeams)
     * for e.g if new unit belongs to team 0
     * then arrayOfUnitsOfOtherTeams contains units from team 1..2, and so on
     * @param {Array<Unit>} arrayOfUnits
     * @return {Array<Unit>}
     */
    withinRange(arrayOfUnits : Array<Unit>) : Array<Unit> {
        // let's say that this is unit1
        // and array of units is [unit1{team:0}, unit2{team:1}, unit3{team2}]
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        let arrayOfUnitsWithinRange : Array<Unit> = [];

        var currentUnitX : number = this.basicUnit.x;
        var currentUnitY : number = this.basicUnit.y;


        for(let unit of arrayOfUnits){
            if(unit === this){
                continue
            }
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */

            var unitX : number = unit.basicUnit.x;
            var unitY : number = unit.basicUnit.y;

            var diffX = currentUnitX - unitX;
            var diffY = currentUnitY - unitY;

            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY))
            if(distance <= this.range) {
                arrayOfUnitsWithinRange.push(unit);
            }
        }
        return arrayOfUnitsWithinRange;
    }

    closestUnit(arrayOfUnits : Array<Unit>) : Unit {
        /* 'this' is a reference to the current object (which is an instance of Night (the class))*/
        let arrayOfUnitsWithinRange : Array<Unit> = [];

        var currentUnitX : number = this.basicUnit.x;
        var curremtUnitY : number = this.basicUnit.y;

        var closestUnit = arrayOfUnits[0];
        var closestDistance = Number.MAX_VALUE;

        for(let unit of arrayOfUnits){
            /* In this loop, you're operating on
            * 1) unit, which is changing in the loop
            *  and
            *  2) this, the night which doesn't change
            * */
            if(unit === this){
                continue
            }

            var unitX : number = unit.basicUnit.x;
            var unitY : number = unit.basicUnit.y;

            var diffX = currentUnitX     - unitX;
            var diffY = curremtUnitY - unitY;

            var distance = Math.sqrt((diffX * diffX) + (diffY * diffY));
            if(distance < closestDistance) {
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
var allUnits : Array<Unit> = [];

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
        allUnits[i] = new Unit(250 + xdiff, y, 100, 100,0.95, 100, 0, 'basicUnit');
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
        allUnits[i] = new Unit(250 + i * 25, 400, 150, 60, 1, 60, 1, 'knightUnit');
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


/**
 *
 * @param {Array<Unit>} arrayOfUnits
 * @param teamNumber
 * @return {Array<Unit>}
 */
function filterForOtherTeams(arrayOfUnits : Array<Unit>, teamNumber : number) : Array<Unit> {
    let otherTeams : Array<Unit> = [];

    for(let i : number = 0; i < arrayOfUnits.length; i++) {
        if(arrayOfUnits[i].team != teamNumber) {
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
function filterForSameTeam(arrayOfUnits : Array<Unit>, teamNumber : number) : Array<Unit> {
    let otherTeams : Array<Unit> = [];

    for(let i : number = 0; i < arrayOfUnits.length; i++) {
        if(arrayOfUnits[i].team === teamNumber) {
            otherTeams.push(arrayOfUnits[i])
        }
    }
    return otherTeams
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
 * Sets team teamNum on the move towards other teams
 *
 * @param basicUnits
 * @param {number} teamNum
 */
function teamMove(basicUnits : Array<Unit>, teamNum: number){
    let basicUnitsFromOtherTeams = filterForOtherTeams(basicUnits, teamNum);
    let basicUnitsFromTeam = filterForSameTeam(basicUnits, teamNum);

    for(let unit of filterUnitsAlive(basicUnitsFromTeam)) {
        let closestUnit = unit.closestUnit(filterUnitsAlive(basicUnitsFromOtherTeams));

        let closestUnitX = closestUnit.basicUnit.x;
        let closestUnitY = closestUnit.basicUnit.y;

        let unitX = unit.basicUnit.x;
        let unitY = unit.basicUnit.y;

        if(closestUnitX > unitX) {
            /*for(var i = 0; i < nightUnits.length; i++) {
                nightUnits[i].nightUnit.speed
            }*/
            /* do not try to play with the velocity of the sprite's body in here */
            //night.nightUnit.body.speed =
            unit.setDirectionX(1)
        } else {
            unit.setDirectionX(-1)
        }

        if(closestUnitY > unitY) {
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
function teamAttack(basicUnits : Array<Unit>, teamNum : number){
    let basicUnitsFromOtherTeams = filterForOtherTeams(basicUnits, teamNum);
    let basicUnitsFromTeam = filterForSameTeam(basicUnits, teamNum);
    for(let unit of basicUnitsFromTeam) {
        let closestUnit = unit.closestUnit(basicUnitsFromOtherTeams);
        // Check if within range of night
        if(unit.withinRange([closestUnit]).length > 0){
            closestUnit.health = closestUnit.health - unit.getDamage();
            if(closestUnit.health <= 0) {
                closestUnit.killUnit();
            }
            //console.log(closestUnit.health);
        }
    }
}

function handleMovement(){


    //if(nightsAttacking) {
        teamMove(allUnits, 0);
    //}else{
        teamMove(allUnits, 1);
    //}
}

function update() {
    /* Movement logic begin */
    handleMovement();
    /* Movement logic end */

    /* Attack Logic begin*/

    //if(nightsAttacking) {
        teamAttack(allUnits, 0)
    //} else {
        teamAttack(allUnits, 1)
    //}
    /* Attack Logic end */
}

function render() {


}