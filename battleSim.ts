var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('basicUnit', 'assets/bullet153.png');
}

class Unit {
    constructor(x : number, y : number, health : number, speed : number, damage : number) {
        this.basicUnit = game.add.sprite(x, y, 'basicUnit');
        this.health = health;
        this.speed = speed;
        this.damage = damage;
    }
}

var amount : number;

function create() {

    for(var i = 0; i < amount; i++) {
        new Unit(100 + i, 100 - i, 100, 100, 100);
    }
}

function update() {



}

function render() {


}

