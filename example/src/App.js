/*eslint-disable*/
import React from "react"
import ReactDOM from "react-dom"
import Chess from "chess.js"
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import { Modal, Button } from "antd"

const confirm = Modal.confirm
const info = () => {
  message.info("Check")
}

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
function isfinish() {
  alert("You lose")
}
function ischeck() {
  alert("Check")
}

class Demo extends React.Component {
  chess = new Chess()

  state = {
    visible: false,
    visible2: false,
    fen: "",
    lastMove: null,
    score1: 10,
    score2: 10
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

  onMove = (from, to) => {
    const chess = this.chess
    const moves = chess.moves({ verbose: true })
    const move = moves[Math.floor(Math.random() * moves.length)]

    if (chess.move({ from, to, promotion: "q" })) {
      this.setState({ fen: chess.fen(), lastMove: [from, to] })

      setTimeout(this.randomMove, 500)
      if (this.chess.game_over() === true) {
        this.setState({ 
          visible: true,
          score1: this.state.score1+10 })
      }
 console.log(this.state.score1)
    }
  }

  randomMove = () => {
    const chess = this.chess
    const moves = chess.moves({ verbose: true })
    const move = moves[Math.floor(Math.random() * moves.length)]
    if (moves.length > 0) {
      chess.move(move.san)
      this.setState({ fen: chess.fen(), lastMove: [move.from, move.to] })
      if (this.chess.game_over() === true) {
        this.setState({ visible2: true,
        score2:this.state.score2+10})
      }
    }
    sleep(1500).then(() => {
      this.setState({ visible: false })
    })
  }

  reset = () => {
    this.chess.reset()
    this.setState({ fen: this.chess.fen()})
  }

  undo = () => {
    this.chess.undo()
    this.setState({ fen: this.chess.fen() })
  }

  showConfirm = () => {
    const chess = this.chess
    confirm({
      title: "Do you Want to delete these items?",
      content: "Some descriptions",
      onOk() {
        ;() => this.setState({ fen: chess.fen() })
      },
      onCancel() {
        console.log("Cancel")
      }
    })
  }

  render() {
    return (
      <div>
        <Chessground
          width={512}
          height={512}
          orientation={this.myColor()}
          turnColor={this.turnColor()}
          movable={this.calcMovable()}
          lastMove={this.state.lastMove}
          score1={this.state.score1}
          score2={this.state.score2}
          fen={this.state.fen}
          onMove={this.onMove}
          style={{ margin: "auto" }}
        />
            <div>Your score:{this.state.score1}</div>
        <Button onClick={() => this.reset()}>Reset</Button>
        <Button onClick={() => this.showConfirm()}>Resign</Button>
        <Button onClick={() => this.undo()}>Undo</Button>
        <Modal visible={this.state.visible} footer={null}>
          <p>Game over,you win</p>
        </Modal>
        <Modal visible={this.state.visible2} footer={null}>
          <p>Game over,computer wins</p>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, document.getElementById("root"))
