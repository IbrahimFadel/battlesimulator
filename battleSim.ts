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
}

class Night {
    public nightUnit : Phaser.Sprite;
    public health : number;
    private speed : number;
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
}

var amountUnits : number = 10;
var amountKnights : number = 5;
var nightsAttacking : boolean = true;
var basicUnits : Array<Unit> = [];
var nightUnits : Array<Night> = [];

function create() {

    for(let i : number = 0; i < amountUnits; i++) {
        basicUnits[i] = new Unit(200 + i * 25, 200, 100, 100, 100, 20);
    }

    for(let i : number = 0; i < amountKnights; i++) {
        nightUnits[i] = new Night(250 + i * 25, 400, 150, 150, 150, 20);
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





function update() {
    var nightsPosXAvg = computeAverageNightUnitX(nightUnits);
    var unitsPosXAvg = computeAverageBasicUnitX(basicUnits);
    var nightsPosYAvg = computeAverageNightUnitY(nightUnits);
    var unitsPosYAvg = computeAverageBasicUnitY(basicUnits);

    var diffAvgX = nightsPosXAvg - unitsPosXAvg;
    var diffAvgY = nightsPosYAvg - unitsPosYAvg;

    console.log(diffAvgY);

    if(nightsAttacking) {
        for(let unit of basicUnits) {
            unit.basicUnit.body.immovable = true;
        }

        for(let night of nightUnits) {
            if(diffAvgX < 0) {
                night.nightUnit.body.velocity.x = 60;
            } else {
                night.nightUnit.body.velocity.x = -60;
            }

            if(diffAvgY < 0) {
                night.nightUnit.body.velocity.y = 60;
            } else {
                night.nightUnit.body.velocity.y = -60;
            }
        }
        for(let i = 0; i < basicUnits.length; i++) {
            if(basicUnits[i].basicUnit.health > 0) {
                if(diffAvgY = 20) {
                    basicUnits[i].basicUnit.health = basicUnits[i].basicUnit.health - 150;
                    console.log(basicUnits[i].basicUnit.health);
                }
            } else {
                basicUnits[i].basicUnit.kill();
            }
        }
    } else /* units are attacking */ {
        for(let night of nightUnits) {
            night.nightUnit.body.immovable = true;
        }

        for(let unit of basicUnits) {
            if(diffAvgY <= 20) {
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

function render() {


}