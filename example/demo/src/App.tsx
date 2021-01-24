import React, { useState } from "react";
import ReactDOM from "react-dom";
import Chess, { ChessInstance, Square } from "chess.js";

// @ts-ignore
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import { Col } from "antd";

const Demo = () => {
  // @ts-ignore
  const [chess] = useState<ChessInstance>(new Chess());
  const [fen, setFen] = useState("");
  const [lastMove, setLastMove] = useState<Square[]>();

  const onMove = (from: Square, to: Square) => {
    if (chess.move({ from, to })) {
      setFen(chess.fen());
      setLastMove([from, to]);
    }
  };

  const turnColor = () => {
    return chess.turn() === "w" ? "white" : "black";
  };

  const calcMovable = () => {
    const dests = new Map();
    chess.SQUARES.forEach(s => {
      const ms = chess.moves({ square: s, verbose: true });
      if (ms.length) dests.set(s, ms.map(m => m.to));
    });

    return {
      free: false,
      dests,
    };
  };

  return (
    <div style={{ background: "#2b313c", height: "100vh" }}>
      <Col span={6} />
      <Col span={12} style={{ top: "10%" }}>
        <Chessground
          width="50vw"
          height="50vw"
          turnColor={turnColor()}
          movable={calcMovable()}
          lastMove={lastMove}
          fen={fen}
          onMove={onMove}
          style={{ margin: "auto" }}
        />
      </Col>
      <Col span={6} />
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));
