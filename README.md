<img src="https://github.com/paiyou-network/react-chessground/raw/master/screenshot/chess.png" width="350px" />
<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/promotion.gif" width=400px />

<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/undo.gif" width=400px />

<img src="https://github.com/paiyou-network/react-chessground/blob/master/screenshot/reset.gif" width=400px />



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

## Documentation
Options of `Chessground` are mapped to properties of `react-chessground`

You can refer to documentation of `Chessground` for detailed configuration

- [Config documented types](https://github.com/ornicar/chessground/tree/master/src/config.ts)
- [Config default values](https://github.com/ornicar/chessground/tree/master/src/state.ts)


An example of playing with random opponent is provided in [example](https://github.com/paiyou-network/react-chessground/tree/master/example)
