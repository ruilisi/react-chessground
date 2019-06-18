import React from "react"
import ReactDOM from "react-dom"
import Chess from "chess.js"
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import { Modal, Button, Radio } from "antd"

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Demo extends React.Component {
  chess = new Chess()

  state = {
    visible: false,
    visible2: false,
    selectVisible: false,
    fen: "",
    lastMove: null,
    score1: 10,
    score2: 10
  }

  pendingMove = null

  onMove = (from, to) => {
    console.info(from, to)
    const { chess } = this
    const { score1 } = this.state
    const moves = chess.moves({ verbose: true })
    for (let i = 0, len = moves.length; i < len; i++) { /* eslint-disable-line */
      if (moves[i].flags.indexOf("p") !== -1) {
        this.pendingMove = [from, to]
        this.setState({
          selectVisible: true
        })
        return
      }
    }
    if (chess.move({ from, to, promotion: "q" })) {
      this.setState({ fen: chess.fen(), lastMove: [from, to] })
      setTimeout(this.randomMove, 500)
      if (this.chess.game_over() === true) {
        this.setState({
          visible: true,
          score1: score1 + 10
        })
      }
    }
  }

  onChange(e) {
    const { chess } = this
    const from = this.pendingMove[0]
    const to = this.pendingMove[1]
    chess.move({ from, to, promotion: e.target.value })
    this.setState({
      fen: chess.fen(),
      lastMove: [from, to],
      selectVisible: false
    })
    setTimeout(this.randomMove, 500)
  }

  randomMove = () => {
    const { chess } = this
    const { score2 } = this.state
    const moves = chess.moves({ verbose: true })
    const move = moves[Math.floor(Math.random() * moves.length)]
    if (moves.length > 0) {
      chess.move(move.san)
      this.setState({ fen: chess.fen(), lastMove: [move.from, move.to] })
      if (this.chess.game_over() === true) {
        this.setState({ visible2: true, score2: score2 + 10 })
      }
    }
    sleep(1500).then(() => {
      this.setState({ visible: false })
    })
  }

  reset = () => {
    this.chess.reset()
    this.setState({ fen: this.chess.fen() })
  }

  undo = () => {
    this.chess.undo()
    this.setState({ fen: this.chess.fen() })
  }

  turnColor() {
    return this.chess.turn() === "w" ? "white" : "black"
  }

  calcMovable() {
    const dests = {}
    this.chess.SQUARES.forEach(s => {
      const ms = this.chess.moves({ square: s, verbose: true })
      if (ms.length) dests[s] = ms.map(m => m.to)
    })
    return {
      free: false,
      dests,
      color: this.myColor()
    }
  }

  myColor() {
    return "white"
  }

  render() {
    const { fen, visible, visible2, selectVisible, lastMove, score1, score2 } = this.state
    return (
      <div>
        <Chessground
          width={512}
          height={512}
          orientation={this.myColor()}
          turnColor={this.turnColor()}
          movable={this.calcMovable()}
          lastMove={lastMove}
          score1={score1}
          score2={score2}
          fen={fen}
          onMove={this.onMove}
          style={{ margin: "auto" }}
        />
        <div>Your score:{score1}</div>
        <Button onClick={() => this.reset()}>Reset</Button>
        <Button onClick={() => this.undo()}>Undo</Button>
        <Modal visible={visible} footer={null}>
          <p>Game over,you win</p>
        </Modal>
        <Modal visible={visible2} footer={null}>
          <p>Game over, you lose</p>
        </Modal>
        <Modal visible={selectVisible} footer={null}>
          <div>
            <Radio.Group onChange={e => this.onChange(e)} defaultValue="a">
              <Radio.Button value="q">QUEEN</Radio.Button>
              <Radio.Button value="r">ROOK</Radio.Button>
              <Radio.Button value="b">BISHOP</Radio.Button>
              <Radio.Button value="n">KNIGHT</Radio.Button>
            </Radio.Group>
          </div>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, document.getElementById("root"))
