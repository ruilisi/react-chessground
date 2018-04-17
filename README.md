<img src="https://github.com/rallets-network/react-chessground/raw/master/screenshot/chess.png" width="350px" />

**react-chessground** is a react wrapper of the awesome [Chessground](https://github.com/ornicar/chessground)

### Installation

```
npm install --save react-chessground
```

### Usage

```js
import Chessground from 'react-chessground'
import 'chessground.css'
import 'chessground-theme.css'

class Demo extends React.Component {
  render () {
    return <Chessground />
  }
}
```

You can grab CSS and image files from [example](https://github.com/rallets-network/react-chessground/tree/master/example)

### Documentation

Options of `Chessground` are mapped to properties of `react-chessground`

You can refer to documentation of `Chessground` for detailed configuration

- [Config documented types](https://github.com/ornicar/chessground/tree/master/src/config.ts)
- [Config default values](https://github.com/ornicar/chessground/tree/master/src/state.ts)

### Example

An example of playing with random opponent is provided in [example](https://github.com/rallets-network/react-chessground/tree/master/example)
