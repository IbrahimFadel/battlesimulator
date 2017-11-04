var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('basicUnit', 'assets/bullet153.png');
    game.load.image('nightUnit', 'assets/bullet147.png');
}

class Unit {
    constructor(x, y, health, speed, damage) {
        this.basicUnit = game.add.sprite(x, y, 'basicUnit');
        this.health = health;
        this.speed = speed;
        this.damage = damage;
    }
}

class Night {
    constructor(x, y, health, speed, damage) {
        this.nightUnit = game.add.sprite(x, y, 'nightUnit');
        this.health = health;
        this.speed = speed;
        this.damage = damage;
    }
}

var amountUnits = 10;
var amountKnights = 5;
var nightsDefendingTrueFalse = true;
var unitsDefendingTrueFalse = false;

function create() {

    for(let i = 0; i < amountUnits; i++) {
        var basicUnit = new Unit(200 + i * 25, 200, 100, 100, 100);
    }

    for(let i = 0; i < amountKnights; i++) {
        var nightUnit = new Night(250 + i * 25, 400, 100, 150, 150);
    }


    console.log(basicUnit.x);
    if(unitsDefendingTrueFalse === false ) {
        basicUnit.x = nightUnit.x - basicUnit.x;
        console.log(basicUnit.x);
    }

    if(nightsDefendingTrueFalse === true) {

    }

}

function update() {



}

function render() {


}

