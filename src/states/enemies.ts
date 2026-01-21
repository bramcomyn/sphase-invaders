import { ENEMY_RELOAD_TIME_MS } from "../util/constants";
import { StateMachine } from "./state-machine";

export class EnemyStateMachine implements StateMachine {
    constructor(
        private scene: Phaser.Scene,
        public enemies: Phaser.Physics.Arcade.Group,
        private reloadTime: number = 0
    ) {}

    update(time: number, delta: number): void {

        this.refreshEnemies(delta);
        
    }

    private refreshEnemies(delta: number) {

        if (this.enemies.getLength() == 0) {
            if (this.reloadTime <= 0) {
                this.createEnemies();
                this.reloadTime = ENEMY_RELOAD_TIME_MS;
            } else {
                this.reloadTime -= delta;
            }
        }

    }

    private createEnemies() {

        this.enemies.create(100, 300, "enemy");
        this.enemies.create(700, 300, "enemy");

    }

    handleBulletHit(
        bullet: HandleBulletHitArgumentType,
        enemy: HandleBulletHitArgumentType
    ) {

        bullet.destroy();
        
        const enemySprite = enemy as Phaser.Physics.Arcade.Sprite;
        // TODO: play destruction animation
        enemySprite.destroy();
    }
    
}

type HandleBulletHitArgumentType =
    Phaser.Types.Physics.Arcade.GameObjectWithBody | 
    Phaser.Tilemaps.Tile | 
    Phaser.Physics.Arcade.Body | 
    Phaser.Physics.Arcade.StaticBody;
