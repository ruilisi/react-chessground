<img src="https://github.com/paiyou-network/react-chessground/raw/master/screenshot/chess.png" width="350px" />
<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/promotion.gif" width=400px />

<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/undo.gif" width=400px />

<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/reset.gif" width=400px />


# React Chessground
<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/chess.png" width="400px" />

**react-chessground** is a react wrapper of the awesome [Chessground](https://github.com/ornicar/chessground)


## Installation

```
npm install --save react-chessground
```

## Example

- An example of playing with random opponent is provided in [example](https://github.com/paiyou-network/react-chessground/tree/master/example)

## Usage

```js
import Chessground from 'react-chessground'
import 'react-chessground/dist/styles/chessground.css'

class Demo extends React.Component {
  render () {
    return <Chessground />
  }
}
```

## Properties

* `onMove` - _function_ Function is called when user moves a piece to a new position. Receives two parameters:
  * `from` - _string_ Previous square position
  *  `to` - _string_ New square position
* `randomMove` - _function_ Function is called when computer moves a piece to a new position. Contains two objects:
  *  `moves` - _object_ Stores all valid moves
  *  `move` - _object_ Generates a move chosen from `moves` randomly
* `promotion` - _function_ Provides choices for pawn's promotion. Receive one parameter:
  * `e` - _string_ Stores pieces user might want to choose upon promotion
* `reset` - _function_ Function is called when reset button clicked
* `undo` - _function_ Function is called when undo button clicked. Disabled when game is over
* `myColor` - _string_ Color for user.(default: `white`)

Reset: Reset the board to the initial starting position.

```js
reset = () => {
    this.chess.reset()
    this.setState({ fen: this.chess.fen(), userHistory: this.chess.history() })
  }
```

Undo: Take back the last half-move.

```js
undo = () => {
    if (!this.chess.game_over()) {
      this.chess.undo()
      this.setState({ fen: this.chess.fen(), userHistory: this.chess.history() })
    }
  }
 ```
 Promotion: Provides choices for pawn's promotion. 
 
 ```js
 promotion(e) {
    const { chess } = this
    const from = this.pendingMove[0]
    const to = this.pendingMove[1]
    chess.move({ from, to, promotion: e })
    this.setState({
      fen: chess.fen(),
      lastMove: [from, to],
      selectVisible: false,
      userHistory: chess.history()
    })
    setTimeout(this.randomMove, 500)
  }
 ```
<img src="https://github.com/rallets-network/react-chessground/blob/master/screenshot/promotion.gif" width="400px" />

History: Returns a list containing the moves of the current game. Options is an optional parameter which may contain a 'verbose' flag. See .moves() for a description of the verbose move fields.

<img src="https://github.com/rallets-network/react-chessground/blob/master/screenshot/history.png" width="400px" />

## Features

* Move pieces by click
* Move pieces by drag'n drop
* drop off revert or trash
* Premove by click or drag
* Animation of pieces: moving and fading away

You can see more features in [Chessground](https://github.com/ornicar/chessground)

## Documentation

Options of `Chessground` are mapped to properties of `react-chessground`

You can refer to documentation of `Chessground` for detailed configuration

- [Config documented types](https://github.com/ornicar/chessground/tree/master/src/config.ts)
- [Config default values](https://github.com/ornicar/chessground/tree/master/src/state.ts)


An example of playing with random opponent is provided in [example](https://github.com/paiyou-network/react-chessground/tree/master/example)
