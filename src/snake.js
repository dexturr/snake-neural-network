const DIRECTIONS = {
  UP: [0,0], // 0
  DOWN: [0,1], // 1
  LEFT: [1,0], // 2
  RIGHT: [1,1], // 3
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function distanceBetweenTwoPoints([x_1, y_1], [x_2, y_2]) {
  return Math.sqrt(Math.pow((x_1 - x_2), 2) + Math.pow((y_1, y_2), 2));
}

class Snake {

  constructor (score) {
    this.scoreModifiers = score
  }

  reset () {
    this.position = [1, 1]
    this.direction = 'right'
    this.foundPoint = false // TODO remove
  }

  move (game) {
    const { map } = game;
    const { tiles } = map;

    const currentSquare = tiles[this.position[0]][this.position[1]];
    const leftSquare = tiles[Math.max(this.position[0] - 1, 1)][this.position[1]];
    const rightSquare = tiles[Math.min(this.position[0] + 1, map.width - 1)][this.position[1]];
    const upSquare = tiles[this.position[0]][Math.min(this.position[1] + 1, map.height - 1)];
    const downSquare = tiles[this.position[0]][Math.max(this.position[1] - 1, 1)];

    const canMoveLeft = leftSquare.barrier;
    const canMoveRight = leftSquare.barrier;
    const canMoveUp = leftSquare.barrier;
    const canMoveDown = leftSquare.barrier;

    const foodIsAbove = this.position[1] <= game.food.position[1];
    const foodIsBelow = this.position[1] >= game.food.position[1];
    const foodIsRight = this.position[0] <= game.food.position[0];
    const foodIsLeft = this.position[0] >= game.food.position[0];
    
    const input = [
      canMoveLeft, 
      canMoveRight, 
      canMoveUp, 
      canMoveDown, 
      foodIsAbove,
      foodIsBelow, 
      foodIsRight, 
      foodIsLeft
    ];
    const output = this.brain.activate(input).map(o => Math.round(o)); // [ DIRECTION BIT 1, DIRECTION BIT 2 ]
    const resultantDirection = output.slice(0, 2);
    
    const moveUp = arraysEqual(resultantDirection, DIRECTIONS.UP);
    const moveDown = arraysEqual(resultantDirection, DIRECTIONS.DOWN);
    const moveLeft = arraysEqual(resultantDirection, DIRECTIONS.LEFT);
    const moveRight = arraysEqual(resultantDirection, DIRECTIONS.RIGHT);

    if (moveUp) {
      foodIsAbove
      this.position[1] = Math.max(this.position[1] - 1, 1);      
    } else if (moveDown) {
      this.position[1] = Math.min(this.position[1] + 1, map.height - 1);         
    } else if (moveLeft) {
      this.position[0] = Math.max(this.position[0] - 1, 1);      
    } else if (moveRight) {
      this.position[0] = Math.min(this.position[0] + 1, map.height - 1);              
    }
    if (arraysEqual(this.position, game.food.position)) {
      this.brain.score = this.brain.score + 100;
      this.foundPoint = true;
    } else {
      this.brain.score = (
        distanceBetweenTwoPoints([0, 0], [game.map.width, game.map.height]) -
        distanceBetweenTwoPoints(this.position, game.food.position)
      ) - game.turns;
    }
    

  }
}
