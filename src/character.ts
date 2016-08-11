declare var require: any;
let _ = require('lodash');

export interface CharacterSettings {
    src: string;
    width: number;
    height: number;
    speed: number;
    startX?: number;
    startY?: number;
    layer?: number;
    collisionPoints?: number[][];
}

export class Character {
    x: number;
    y: number;
    maxX: number;
    maxY: number;
    screenX: number;
    screenY: number;
    speed: number;
    layer: number;
    isLoaded: Boolean;
    image: HTMLImageElement;
    is: any;
    centerPosition: any;
    collisionPoints: number[][];
    // the size of the character on the screen, not the size of the image
    width: number;
    height: number;

    constructor(map, camera, settings: CharacterSettings) {
        this.x = settings.startX || 0;
        this.y = settings.startY || 0;
        this.width = settings.width;
        this.height = settings.height;
        this.maxX = map.width - this.width;
        this.maxY = map.height - this.height;
        this.speed = settings.speed;
        this.layer = settings.layer || 1;

        this.centerPosition = {
            x: (camera.width / 2) - (this.width / 2),
            y: (camera.height / 2) - (this.height / 2)
        }

        if (settings.collisionPoints) {
            this.collisionPoints = settings.collisionPoints;
        } else {
            this.collisionPoints = this.defaultCollisionPoints;
        }

        this.isLoaded = false;
        this.load(settings.src);
    }

    get defaultCollisionPoints(): number[][] {
        // configure default points
        // should be each corner of the character, and if the size is bigger than
        // a map tile then points in between to prevent corners being on a clear
        // tile, but the center being on an impassable
        return
    }

    move(deltaTime, deltaX, deltaY): void {
        this.x += deltaX * this.speed * deltaTime;
		this.y += deltaY * this.speed * deltaTime;
        // prevent moving beyond the map
        if (this.x > this.maxX) {
            this.x = this.maxX;
        } else if (this.x < 0) {
            this.x = 0
        };
        if (this.y > this.maxY) {
            this.y = this.maxY;
        } else if (this.y < 0) {
            this.y = 0
        };
    }

    load(src): void {
        let img = new Image();
        img.onload = () => {
            this.isLoaded = true;
        };
        img.src = src;
        this.image = img;
    }
}