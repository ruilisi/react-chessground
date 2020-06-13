# React Chessground

**react-chessground** is a react wrapper of the awesome [Chessground](https://github.com/ornicar/chessground)

<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/chess.png" width="400px" />

<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/initial.png" width="400px" />

<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/promotion.gif" width=400px />

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

Reset: Reset the board to the initial starting position.

```js
reset = () => {
    this.chess.reset()
    this.setState({ fen: this.chess.fen() })
  }
```

Undo: Take back the last half-move.

```js
undo = () => {
    this.chess.undo()
    this.setState({ fen: this.chess.fen() })
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
      selectVisible: false
    })
    setTimeout(this.randomMove, 500)
  }
 ```
<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/promotion.gif" width="400px" />
 
## Features

* Display last move and check

<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/chess.png" width="400px" />

*  Display move destinations, and premove destinations (hover effects possible)

<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/premove.png" width="400px" />

It's available to see more features in [Chessground](https://github.com/ornicar/chessground)

## Documentation

Options of `Chessground` are mapped to properties of `react-chessground`

You can refer to documentation of `Chessground` for detailed configuration

- [Config documented types](https://github.com/ornicar/chessground/tree/master/src/config.ts)
- [Config default values](https://github.com/ornicar/chessground/tree/master/src/state.ts)


An example of playing with random opponent is provided in [example](https://github.com/paiyou-network/react-chessground/tree/master/example)
