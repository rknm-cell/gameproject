import React, { useState } from "react";
import { Game } from "./game/gameEngine";

function GameView() {
    const [game, setGame] = useState()
  return
  
  <div id="Game-view">
    {game.board.map((pos))}
  </div>;
}

export default GameView;
