/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import Chess from 'chess.js'
import Chessground from 'react-chessground'
import 'react-chessground/dist/styles/chessground.css'
import { Statistic } from 'antd'

const Countdown = Statistic.Countdown
const deadline = Date.now()+1000*20

function onfinish() {
  alert("Times up,you lose")
}

class Demo extends React.Component {
  chess = new Chess()

  state = {
    fen: '',
    lastMove: null
  }

  turnColor() {
    return (this.chess.turn() === 'w') ? 'white' : 'black'
  }

  calcMovable() {
    const dests = {}
    this.chess.SQUARES.forEach(s => {
      const ms = this.chess.moves({square: s, verbose: true})
      if (ms.length) dests[s] = ms.map(m => m.to)
    })
    return {
      free: false,
      dests,
      color: this.myColor()
    }
  }
  myColor() {
    return 'white'
  }

  onMove = (from, to) => {
    const chess = this.chess
    if (chess.move({ from, to, promotion: 'q' })) {
      this.setState({ fen: chess.fen(), lastMove: [from, to] })
      setTimeout(this.randomMove, 500)
    }
  }

  randomMove = () => {
    const chess = this.chess
    const moves = chess.moves({ verbose: true })
    const move = moves[Math.floor(Math.random() * moves.length)]
    if (moves.length > 0) {
      chess.move(move.san)
      this.setState({ fen: chess.fen(), lastMove: [move.from, move.to] })
    }
  }
  reset = () =>{
    this.chess.reset()
    this.setState({fen: this.chess.fen()})
  }
  undo = () =>{
    this.chess.undo()
    this.setState({fen: this.chess.fen()})
  }
  render() {
    return <div><Chessground
        width={512}
        height={512}
        orientation={this.myColor()}
        turnColor={this.turnColor()}
        movable={this.calcMovable()}
        lastMove={this.state.lastMove}
        fen={this.state.fen}
        onMove={this.onMove}
        style={{ margin: 'auto' }}
      />
      <button onClick={() => this.reset() }>reset</button>
      <button onClick={() => this.undo() }>undo</button>
      <Countdown title="Timeleft" value={deadline} onFinish={onfinish} />
    </div>
  }
}

ReactDOM.render(<Demo />, document.getElementById('root'))
