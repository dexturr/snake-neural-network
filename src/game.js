class Game {

  constructor ({size, unit, frameRate, maxTurns, lowestScoreAllowed, score, onGameOver, map}) {
    this.size = size
    this.unit = unit
    this.unitsPerRow = this.size / this.unit
    this.frameRate = frameRate
    this.maxTurns = maxTurns
    this.lowestScoreAllowed = lowestScoreAllowed
    this.onGameOver = onGameOver
    this.status = 'IDLE'
    this.grid = []
    this.snake = new Snake(score)
    this.turns = 0
    this.map = map

    for (let x = 0; x < this.unitsPerRow; x++) {
      for (let y = 0; y < this.unitsPerRow; y++) {
        this.grid.push([x + 1, y + 1])
      }
    }
    
    const game = this

    new p5(p => {
      p.setup = () => {
        p.frameRate(game.frameRate)
        p.createCanvas(game.size, game.size)
      }

      p.drawFood = () => {
        p.fill('red')
        p.rect(
          game.food.position[0] * game.unit - game.unit,
          game.food.position[1] * game.unit - game.unit,
          game.unit,
          game.unit
        )
      }

      p.drawSnake = () => {
        p.fill('black')
        const s = game.snake.position         
        p.rect(
            s[0] * game.unit - game.unit,
            s[1] * game.unit - game.unit,
            game.unit,
            game.unit
          )
      }

      // p.drawMap = () => {
      //   for (let i = 0; i < this.unitsPerRow ; i++) {
      //     for (let j = 0; j < this.unitsPerRow; j++) {
      //       p.fill(game.map.map[i][j].color)
      //       p.rect(
      //         i * game.unit,
      //         j * game.unit,
      //         game.unit,
      //         game.unit
      //       )
      //     } 
      //   }
      // }

      p.draw = () => {
        if (['IDLE', 'GAME_OVER'].indexOf(game.status) !== -1) {
          p.background('#EEE')
          p.fill(0)
          p.textSize(15)
          p.text(game.snake.brain.score.toString(), 5, 20)
          return
        }

        p.background(255)

        game.snake.move(game)

        if (game.snake.isEating) {
          game.food = new Food([1, 1])
        }

        game.updateGameStatus()

        if (game.status === 'GAME_OVER') {
          return game.onGameOver()
        }

        // p.drawMap()
        p.drawSnake()
        p.drawFood()


        game.turns++
      }
    }, 'wrapper')
  }

  updateGameStatus () {
    const gameLastedLongEnough = this.turns > this.maxTurns
    if (gameLastedLongEnough || this.snake.foundPoint) {
      this.status = 'GAME_OVER'
    }
  }

  getAvailablePositions () {
    return this.grid.filter(position => {
      return !(
        this.snake.position[0] === position[0] 
          && this.snake.position[0] === position[1]
      );
    })
  }

  start () {
    this.turns = 0
    this.snake.reset()
    this.food = new Food([5, 5])
    this.status = 'RUNNING'
  }

}
