import { Move } from "chess.js";
import React from "react";

interface MoveBoxProps {
  name: string;
  move: Move;
  onMouseEnter: (move: Move) => void;
}

const MoveBox = ({ name, move, onMouseEnter }: MoveBoxProps) => {
  return (
    <div className="move-box" onMouseEnter={() => onMouseEnter(move)}>
      {name}
    </div>
  );
};

export default MoveBox;
