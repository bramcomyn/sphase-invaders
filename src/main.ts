import "phaser";

const config: Phaser.Types.Core.GameConfig = {

    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",

    scene: {
        preload: preload,
        create: create,
    }
    
}

const game = new Phaser.Game(config);

function preload(this: Phaser.Scene) {
    this.load.image("spaceship", "assets/spaceship.png");
}

function create(this: Phaser.Scene) {
    this.add.image(400, 500, "spaceship");
}
