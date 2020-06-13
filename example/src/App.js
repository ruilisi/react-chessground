import React from "react"
import ReactDOM from "react-dom"
import Chess from "chess.js"
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import { Col, Modal } from "antd"
import queen from "./images/wQ.svg"
import rook from "./images/wR.svg"
import bishop from "./images/wB.svg"
import knight from "./images/wN.svg"

class Demo extends React.Component {
  chess = new Chess()

  state = {
    selectVisible: false,
    fen: "",
    lastMove: null
  }

  pendingMove = null

  onMove = (from, to) => {
    const { chess } = this
    const moves = chess.moves({ verbose: true })
    for (let i = 0, len = moves.length; i < len; i++) { /* eslint-disable-line */
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        this.pendingMove = [from, to]
        this.setState({
          selectVisible: true
        })
        return
      }
    }
    if (chess.move({ from, to, promotion: "x" })) {
      this.setState({ fen: chess.fen(), lastMove: [from, to] })
      setTimeout(this.randomMove, 500)
    }
  }

  randomMove = () => {
    const { chess } = this
    const moves = chess.moves({ verbose: true })
    const move = moves[Math.floor(Math.random() * moves.length)]
    if (moves.length > 0) {
      chess.move(move.san)
      this.setState({ fen: chess.fen(), lastMove: [move.from, move.to] })
    }
  }

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
      color: "white"
    }
  }

  render() {
    const { selectVisible, fen, lastMove } = this.state
    return (
      <div style={{ background: "#2b313c", height: "100vh" }}>
        <Col span={6} />
        <Col span={12} style={{ top: "10%" }}>
          <Chessground
            width="38vw"
            height="38vw"
            turnColor={this.turnColor()}
            movable={this.calcMovable()}
            lastMove={lastMove}
            fen={fen}
            onMove={this.onMove}
            style={{ margin: "auto" }}
            ref={el => {
              this.chessground = el
            }}
          />
        </Col>
        <Col span={6} />
        <Modal visible={selectVisible} footer={null} closable={false}>
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <span role="presentation" onClick={() => this.promotion("q")}>
              <img src={queen} alt="" style={{ width: 50 }} />
            </span>
            <span role="presentation" onClick={() => this.promotion("r")}>
              <img src={rook} alt="" style={{ width: 50 }} />
            </span>
            <span role="presentation" onClick={() => this.promotion("b")}>
              <img src={bishop} alt="" style={{ width: 50 }} />
            </span>
            <span role="presentation" onClick={() => this.promotion("n")}>
              <img src={knight} alt="" style={{ width: 50 }} />
            </span>
          </div>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, document.getElementById("root"))
