import React from 'react'
import PropTypes from 'prop-types'
import { Chessground as NativeChessground } from 'chessground'

export default class Chessground extends React.Component {

  static propTypes = {
    fen: PropTypes.string,
    orientation: PropTypes.string,
    turnColor: PropTypes.string,
    check: PropTypes.string,
    lastMove: PropTypes.array,
    coordinates: PropTypes.bool,
    resizable: PropTypes.bool,
    hightlight: PropTypes.object,
    movable: PropTypes.object,
    onChange: PropTypes.func,
    onMove: PropTypes.func,
    onDropNewPiece: PropTypes.func,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    coordinates: true,
    resizable: true,
    hightlight: {
      lastMove: true,
      check: true
    }
  }

  buildConfigFromProps(props) {
    const config = { events: {} }
    Object.keys(Chessground.propTypes).forEach(k => {
      const v = props[k]
      if (v) {
        const match = k.match(/^on([A-Z]\S*)/)
        if (match) {
          config.events[match[1].toLowerCase()] = v
        } else {
          config[k] = v
        }
      }
    })
    return config
  }

  componentDidMount() {
    this.cg = NativeChessground(this.el, this.buildConfigFromProps(this.props))
  }

  componentWillReceiveProps(nextProps) {
    this.cg.set(this.buildConfigFromProps(nextProps))
  }

  componentWillUnmount() {
    this.cg.destroy()
  }

  render() {
    const props = {}
    if (this.props.style) props.style = this.props.style
    return <div ref={el => this.el = el} {...props} />
  }
}
