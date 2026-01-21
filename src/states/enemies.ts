import { ENEMY_RELOAD_TIME_MS, ENEMY_SHIFT_MOVES, ENEMY_SHIFT_OFFSET_X, ENEMY_SHIFT_TIME_MS } from "../util/constants";
import { StateMachine } from "./state-machine";

export class EnemyStateMachine implements StateMachine {
    constructor(
        private scene: Phaser.Scene,
        public enemies: Phaser.Physics.Arcade.Group,

        private reloadTime: number = 0,
        private shiftTime: number = ENEMY_SHIFT_TIME_MS,
        private left: boolean = false,
        private moves: number = ENEMY_SHIFT_MOVES,
    ) {}

    update(time: number, delta: number): void {

        this.refreshEnemies(delta);
        this.shiftEnemies(delta)
        
    }

    private shiftEnemies(delta: number) {

        this.shiftTime -= delta;
        if (this.shiftTime <= 0) {
            this.switchSidesIfRequired();   
            this.move();
        }

    }

    private switchSidesIfRequired() {
        
        if (this.moves === 0) {
            this.left = !this.left;
            this.moves = ENEMY_SHIFT_MOVES;
        }

    }

    private move() {

        const offset = this.left ? -ENEMY_SHIFT_OFFSET_X : ENEMY_SHIFT_OFFSET_X;
        this.enemies.incX(offset);
        this.moves--;
        this.shiftTime = ENEMY_SHIFT_TIME_MS;

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

        this.enemies.create(600, 300, "enemy");
        this.enemies.create(700, 300, "enemy");

    }

    handleBulletHit(
        bullet: HandleBulletHitArgumentType,
        enemy: HandleBulletHitArgumentType
    ) {

        const enemySprite = enemy as Phaser.Physics.Arcade.Sprite;
        
        bullet.destroy();
        enemySprite.destroy();

    }
    
}

type HandleBulletHitArgumentType =
    Phaser.Types.Physics.Arcade.GameObjectWithBody | 
    Phaser.Tilemaps.Tile | 
    Phaser.Physics.Arcade.Body | 
    Phaser.Physics.Arcade.StaticBody;
