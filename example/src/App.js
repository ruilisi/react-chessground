import React from "react"
import ReactDOM from "react-dom"
import Chess from "chess.js"
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import { Icon, List, Col, Row, Modal, Button, Avatar } from "antd"
import queen from "./images/wQ.svg"
import rook from "./images/wR.svg"
import bishop from "./images/wB.svg"
import knight from "./images/wN.svg"

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

class Demo extends React.Component {
  chess = new Chess()

  state = {
    selectVisible: false,
    visibleUserwin: false,
    visibleComwin: false,
    visibleDraw: false,
    userTimeout: false,
    comTimeout: false,
    isPaused: false,
    isPausedCom: true,
    time: 600,
    timeCom: 600,
    mytime: "",
    opptime: "",
    fen: "",
    lastMove: null,
    scoreUser: 10,
    scoreCom: 10,
    userHistory: [],
    pause: false
  }

  pendingMove = null

  tUser = setInterval(() => {
    const { isPaused, time } = this.state
    let min = Math.floor(time / 60)
    let sec = time - min * 60
    if (min < 10) {
      min = `0${min}`
    }
    if (sec < 10) {
      sec = `0${sec}`
    }
    const message = `${min}:${sec}`

    if (!isPaused && time > 0) {
      this.setState({ time: time - 1 })
    }

    this.setState({ mytime: message })
    return message
  }, 1000)

  tCom = setInterval(() => {
    const { isPausedCom, timeCom } = this.state
    let min = Math.floor(timeCom / 60)
    let sec = timeCom - min * 60
    if (min < 10) {
      min = `0${min}`
    }
    if (sec < 10) {
      sec = `0${sec}`
    }
    const message = `${min}:${sec}`

    if (!isPausedCom && timeCom > 0) {
      this.setState({ timeCom: timeCom - 1 })
    }

    this.setState({ opptime: message })
    return timeCom
  }, 1000)

  componentDidMount() {
    const message = document.getElementById("scroll")
    message.scrollTop = message.scrollHeight
  }

  componentDidUpdate() {
    const message = document.getElementById("scroll")
    message.scrollTop = message.scrollHeight
  }

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
    const { scoreUser, scoreCom, time, timeCom } = this.state
    if (time < 1) {
      this.setState({ userTimeout: true })
    }
    if (timeCom < 1) {
      this.setState({ comTimeout: true })
    }
    if (chess.move({ from, to, promotion: "x" })) {
      this.setState({ fen: chess.fen(), lastMove: [from, to], isPaused: true, isPausedCom: false, userHistory: this.toDataSourse(chess.history()) })
      setTimeout(this.randomMove, 500)
      if (this.chess.in_checkmate() === true) {
        this.setState({
          visibleUserwin: true,
          scoreUser: scoreUser + 10,
          scoreCom: scoreCom - 5
        })
      }
      if (this.chess.in_stalemate() === true) {
        this.setState({
          visibleDraw: true
        })
      }
    }
  }

  randomMove = () => {
    const { chess } = this
    const { scoreUser, scoreCom, time, timeCom } = this.state
    const moves = chess.moves({ verbose: true })
    const move = moves[Math.floor(Math.random() * moves.length)]
    if (time < 1) {
      this.setState({ userTimeout: true })
    }
    if (timeCom < 1) {
      this.setState({ comTimeout: true })
    }
    if (moves.length > 0) {
      chess.move(move.san)
      this.setState({ fen: chess.fen(), lastMove: [move.from, move.to], isPaused: false, isPausedCom: true, userHistory: this.toDataSourse(chess.history()) })
      if (this.chess.game_over() === true) {
        this.setState({
          visibleComwin: true,
          scoreCom: scoreCom + 10,
          scoreUser: scoreUser - 5
        })
      }
      if (this.chess.in_stalemate() === true) {
        this.setState({
          visibleDraw: true
        })
      }
    }
    sleep(2000).then(() => {
      this.setState({ visibleUserwin: false, visibleComwin: false, visibleDraw: false, userTimeout: false, comTimeout: false })
    })
  }

  reset = () => {
    this.chess.reset()
    this.setState({ fen: this.chess.fen(), userHistory: this.chess.history() })
  }

  undo = () => {
    if (!this.chess.game_over()) {
      this.chess.undo()
      this.setState({ fen: this.chess.fen(), userHistory: this.toDataSourse(this.chess.history()) })
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
      selectVisible: false,
      userHistory: this.toDataSourse(chess.history())
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
      color: this.myColor()
    }
  }

  toDataSourse(h) {
    const data = []
    let k = 0
    for (let i = 0; i < h.length; ) {
      data[k] = []
      for (let j = 0; j < 2; j += 1) {
        if (h[i]) {
          data[k][j] = h[i]
        } else data[k][j] = null
        i += 1
      }
      k += 1
    }
    return data
  }

  myColor() {
    return "white"
  }

  render() {
    const {
      selectVisible,
      userTimeout,
      comTimeout,
      fen,
      visibleUserwin,
      visibleComwin,
      visibleDraw,
      lastMove,
      scoreUser,
      scoreCom,
      mytime,
      opptime,
      userHistory,
      pause
    } = this.state
    if (this.chessground) {
      this.chessground.cg.state.viewOnly = pause
    }
    return (
      <div style={{ background: "#2b313c", height: "100vh" }}>
        <Col span={6} push={3} style={{ top: "30%" }}>
          <p>
            <Button style={{ fontSize: 20, width: "11vw", height: "4vw", background: "#3c93b0", border: 0, color: "white" }} onClick={() => this.reset()}>
              Reset
            </Button>
          </p>
          <p>
            <Button style={{ fontSize: 20, width: "11vw", height: "4vw", background: "#3c93b0", border: 0, color: "white" }} onClick={() => this.undo()}>
              Undo
            </Button>
          </p>
          <p>
            <Button
              style={{ fontSize: 20, width: "11vw", height: "4vw", background: "#3c93b0", border: 0, color: "white" }}
              onClick={() => this.setState({ pause: !pause })}
            >
              {pause === true ? "Start" : "Pause"}
            </Button>
          </p>
        </Col>
        <Col span={12} style={{ top: "5%" }}>
          <Row style={{ marginLeft: "12%", paddingTop: "1%", paddingBottom: "3%", marginRight: "12%" }}>
            <Avatar shape="square" style={{ background: "#3c93b0" }} size="large" icon="user" />
            <span style={{ marginLeft: 10, color: "white", verticalAlign: "top" }}>test</span>
            <div style={{ color: "white", float: "right" }}>{opptime}</div>
          </Row>
          <Chessground
            width="38vw"
            height="38vw"
            orientation={this.myColor()}
            turnColor={this.turnColor()}
            movable={this.calcMovable()}
            viewOnly={!!pause}
            lastMove={lastMove}
            scoreUser={scoreUser}
            scoreCom={scoreCom}
            fen={fen}
            onMove={this.onMove}
            style={{ margin: "auto" }}
            ref={el => {
              this.chessground = el
            }}
          />
          <Row style={{ marginLeft: "12%", paddingTop: "3%", paddingBottom: "1%", marginRight: "12%" }}>
            <Avatar shape="square" style={{ background: "#3c93b0" }} size="large" icon="user" />
            <span style={{ marginLeft: 10, color: "white", verticalAlign: "top" }}>User</span>
            <div style={{ color: "white", float: "right" }}>{mytime}</div>
          </Row>
        </Col>
        <Col span={3} push={1} style={{ top: "10%" }}>
          <List
            id="scroll"
            header={<h3>History</h3>}
            size="small"
            style={{ height: "43vw", overflowY: "scroll", background: "white" }}
            bordered
            dataSource={userHistory}
            renderItem={item => (
              <List.Item>
                <Col span={10} style={{ textAlign: "center" }}>
                  {item[0]}
                </Col>
                <Col span={4} style={{ textAlign: "center" }}>
                  <Icon type="right" />
                </Col>
                <Col span={10} style={{ textAlign: "center" }}>
                  {item[1]}
                </Col>
              </List.Item>
            )}
          />
        </Col>

        <Modal visible={visibleUserwin} footer={null}>
          <p>Game over,you win by checkmate</p>
        </Modal>
        <Modal visible={visibleComwin} footer={null}>
          <p>Game over, you lose by checkmate</p>
        </Modal>
        <Modal visible={visibleDraw} footer={null}>
          <p>Game over, draw due to stalemate</p>
        </Modal>
        <Modal visible={userTimeout} footer={null}>
          <p>Game over, you lose due to time out</p>
        </Modal>
        <Modal visible={comTimeout} footer={null}>
          <p>Game over, you win due to Computer time out</p>
        </Modal>
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
