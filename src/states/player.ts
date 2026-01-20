import { PLAYER_SPEED } from "../util/constants";

export enum PlayerState {
    
    Idle = "idle",
    MoveLeft = "move-left",
    MoveRight = "move-right" 

};

interface StateHandlers {

    onEnter: 
        (scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite) => void;
    onUpdate: 
        (scene: Phaser.Scene, player: Phaser.Physics.Arcade.Sprite, cursors: Phaser.Types.Input.Keyboard.CursorKeys) => PlayerState;
    onExit: 
        (scene: Phaser.Scene) => void;

};

export class PlayerStateMachine {
    
    constructor(
        private scene: Phaser.Scene,
        private player: Phaser.Physics.Arcade.Sprite,
        private cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        private state: PlayerState = PlayerState.Idle
    ) {}

    update(time: number, delta: number) {

        const next = states[this.state].onUpdate(this.scene, this.player, this.cursors);
        if (next !== this.state) {
            states[this.state].onExit(this.scene);
            states[next].onEnter(this.scene, this.player);
            this.state = next;
        }

    }

}

const states: Record<PlayerState, StateHandlers> = {

    "idle": {
        onEnter(scene, player) {
            player.anims.stop();
            player.setVelocityX(0);
        }, onUpdate(scene, player, cursors) {
            if (cursors.left.isDown) return PlayerState.MoveLeft;
            if (cursors.right.isDown) return PlayerState.MoveRight;
            return PlayerState.Idle;
        }, onExit(scene) {

        }
    },
    
    "move-left": {
        onEnter(scene, player) {
            player.anims.play("move-left");
            player.setVelocityX(-PLAYER_SPEED);
        }, onUpdate(scene, player, cursors) {
            if (!cursors.left.isDown) return PlayerState.Idle;
            return PlayerState.MoveLeft;
        }, onExit(scene) {

        }
    },
    
    "move-right": {
        onEnter(scene, player) {
            player.anims.play("move-right");
            player.setVelocityX(PLAYER_SPEED);
        }, onUpdate(scene, player, cursors) {
            if (!cursors.right.isDown) return PlayerState.Idle;
            return PlayerState.MoveRight;
        }, onExit(scene) {

        }
    }

}
