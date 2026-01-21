import "phaser";
import { PlayerStateMachine } from "./states/player";
import { BulletStateMachine } from "./states/bullets";

const config: Phaser.Types.Core.GameConfig = {

    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",

    scene: {
        preload: preload,
        create: create,
        update: update
    },

    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
    
};

let player: Phaser.Physics.Arcade.Sprite;
let bullets: Phaser.Physics.Arcade.Group;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

let playerState: PlayerStateMachine;
let bulletState: BulletStateMachine;

const game = new Phaser.Game(config);

function preload(this: Phaser.Scene) {

    this.load.spritesheet("spaceship", "assets/spaceship.png", {
        frameWidth: 32,
        frameHeight: 32
    });

    this.load.spritesheet("bullet", "assets/bullet.png", {
        frameWidth: 32,
        frameHeight: 32
    });
    
}

function create(this: Phaser.Scene) {

    cursors = this.input.keyboard?.createCursorKeys()!;

    player = this.physics.add.sprite(400, 500, "spaceship");
    playerState = new PlayerStateMachine(this, player, cursors);
    player.setCollideWorldBounds(true);

    bullets = this.physics.add.group();
    bulletState = new BulletStateMachine(this, player, cursors, bullets);
    this.physics.world.on("worldbounds", bulletState.destroyIfOutOfBounds, bulletState);

    // TODO: update sprites to have real animations
    
    this.anims.create({
        key: "move-left",
        frames: this.anims.generateFrameNumbers("spaceship", { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "move-right",
        frames: this.anims.generateFrameNumbers("spaceship", { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });
    
}

function update(this: Phaser.Scene, time: number, delta: number) {

    // TODO: update game loop
    playerState.update(time, delta);
    bulletState.update(time, delta);
    
}
