import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Chess, { ChessInstance, Move, Square } from "chess.js";
import "./index.css";

// @ts-ignore
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import { Col } from "antd";
// @eslint-ignore
import openings from "./openings.ts";

import undo from "./images/undo-4-32.png";
import rewind from "./images/rewind-32.png";

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
  const [currentOpeningName, setCurrentOpeningName] = useState("");

  useEffect(() => {
    setCards(getCards());
  }, []);

  const getCards = (): MoveCard[] => {
    const cards: MoveCard[] = [];
    chess.moves().forEach((move) => {
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

  const getCurrentOpeningName = (): string => {
    console.log(openings[getTrimmedFen(chess.fen())]);
    return openings[getTrimmedFen(chess.fen())]?.name ?? " ";
  };

  const setState = () => {
    setFen(chess.fen());
    setCards(getCards());
    setCurrentOpeningName(getCurrentOpeningName());
  };

  const onMove = (from: Square, to: Square) => {
    if (chess.move({ from, to })) {
      setLastMove([from, to]);
      setState();
    }
  };

  const turnColor = () => {
    return chess.turn() === "w" ? "white" : "black";
  };

  const calcMovable = () => {
    const dests = new Map();
    chess.SQUARES.forEach((s) => {
      const ms = chess.moves({ square: s, verbose: true });
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to),
        );
    });

    return {
      free: false,
      dests,
    };
  };

  const onBackClick = () => {
    const move = chess.undo();
    if (!move) return;

    setLastMove([move.from, move.to]);
    setState();
  };

  const onResetClick = () => {
    chess.reset();

    setLastMove([]);
    setState();
  };

  return (
    <div style={{ height: "100vh" }}>
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
        <div className="opening-name">{currentOpeningName}</div>
        <div className="buttons">
          <button onClick={onResetClick}>
            <img src={rewind}></img>
          </button>
          <button onClick={onBackClick}>
            <img src={undo}></img>
          </button>
        </div>
      </Col>
      <Col span={6} />
      <Col style={{ top: "10%", paddingLeft: 20 }} span={6}>
        <div>
          {cards.map((card, i) => (
            <div key={i}>{card.name}</div>
          ))}
        </div>
      </Col>
    </div>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));
