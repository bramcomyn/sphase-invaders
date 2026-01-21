import { BULLET_DELAY_MS, BULLET_SPEED } from "../util/constants";
import { StateMachine } from "./state-machine";

export class BulletStateMachine implements StateMachine {

    private bulletDelay: number = 0;

    constructor(
        private scene: Phaser.Scene,
        private player: Phaser.Physics.Arcade.Sprite,
        private cursors: Phaser.Types.Input.Keyboard.CursorKeys,
        public bullets: Phaser.Physics.Arcade.Group
    ) {
        
    }

    update(time: number, delta: number): void {

        this.bulletDelay -= delta
        if (this.cursors.space.isDown && this.bulletDelay < 0) {
            this.fire(this.player.x, this.player.y);
            this.bulletDelay = BULLET_DELAY_MS;
        }
        
    }

    fire(x: number, y: number) {

        const bullet = this.bullets.create(x, y, "bullet");

        bullet.setCollideWorldBounds(true);
        bullet.body.onWorldBounds = true;
        
        bullet.setVelocityY(BULLET_SPEED);

    }

    destroyIfOutOfBounds(body: Phaser.Physics.Arcade.Body) {

        const gameObject = body.gameObject;
        if (gameObject && this.bullets.contains(gameObject))
            gameObject.destroy();
        
    }
    
}
