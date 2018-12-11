class Tile {
    constructor(color, barrier) {
        this.color = color;
        this.barrier = barrier;
    }
}

const TILE_OPTIONS = [
    new Tile('white', false),
    new Tile('black', true),
    new Tile('green', false),
    new Tile('yellow', false),
    new Tile('reg', false),
    new Tile('blue', false),
    new Tile('grey', false),
    new Tile('pink', false),
    new Tile('orange', false)
]

class GameMap {
    constructor(width, height) {
        this.squares = this.generateWhiteMap(width, height);
        this.width = width;
        this.height = height;
    }

    generateWhiteMap(width, height) {
        // Want [x][y] for convention
        const randomMap = [];
        for (let i = 0; i < width; i++) {
            randomMap[i] = [];        
            for (let j = 0; j < height; j++) {
                randomMap[i][j] = TILE_OPTIONS[0];
            }
        }
        return randomMap;
    }
}