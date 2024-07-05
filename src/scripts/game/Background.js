import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Background {
    constructor() {
        this.speed = App.config.bgSpeed;
        this.container = new PIXI.Container();
        this.createSprites();
    }

    createSprites() {
        this.sprites = [];

        //render more background images at a time
        for (let i = 0; i < 10; i++) {
            this.createSprite(i);
        }
    }

    createSprite(i) {
        const sprite = App.sprite("bg");

        sprite.scale.y = 1.20;
        sprite.x = sprite.width * i;
        sprite.y = 0;
        this.container.addChild(sprite);
        this.sprites.push(sprite);
    }

    move(sprite, offset) {
        const spriteRightX = sprite.x + sprite.width;

        const screenLeftX  = 0;

        if (spriteRightX <= screenLeftX) {
            sprite.x += sprite.width * this.sprites.length;
        }
        
        sprite.x -= offset;
    }

    update(dt) {
        const offset = this.speed * dt;

        this.sprites.forEach(sprite => {
            this.move(sprite, offset);
        });
    }

    destroy() {
        this.container.destroy();
    }
}