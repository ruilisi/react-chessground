import React, { useState } from "react";
import ReactDOM from "react-dom";
import Chess, { ChessInstance, Move, Square } from "chess.js";

// @ts-ignore
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import { Col } from "antd";
// @eslint-ignore
import openings from "./openings.ts";

interface MoveCard {
  move: Move;
  name: string;
}

const getTrimmedFen = (fen: string) => {
  const splitFen = fen.split(" ");
  return `${splitFen[0]} ${splitFen[1]} ${splitFen[2]}`;
};

const Demo = () => {
  // @ts-ignore
  const [chess] = useState<ChessInstance>(new Chess());
  const [fen, setFen] = useState("");
  const [lastMove, setLastMove] = useState<Square[]>();
  const [cards, setCards] = useState<MoveCard[]>([]);

  const getCards = (): MoveCard[] => {
    const cards: MoveCard[] = [];
    chess.moves().forEach(move => {
      const possibleMove = chess.move(move);
      const trimmedFen = getTrimmedFen(chess.fen());
      const opening = openings[trimmedFen];
      if (opening) {
        cards.push({
          move: possibleMove,
          name: opening.name,
        });
      }

      chess.undo();
    });

    console.log(cards);

    return cards;
  };

  const onMove = (from: Square, to: Square) => {
    if (chess.move({ from, to })) {
      setFen(chess.fen());
      setLastMove([from, to]);
      setCards(getCards());
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
      <Col style={{ top: "10%", color: "#ffffff" }} span={6}>
        <div>
          {cards.map(card => (
            <div>{card.name}</div>
          ))}
        </div>
      </Col>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));
