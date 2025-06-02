
import { useState } from "react";
import { NewGame } from "./game/gameEngine";
import { playerMove } from "./game/gameEngine";

function App() {
  const [game, setGame] = useState(NewGame);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">TicTacToe</h1>
      <div>
        <h2>{game.player}</h2>
      </div>

      <div className="grid grid-flow-col grid-rows-3 gap-3">
        <div>
          <button onClick={() => playerMove(game, 0)}>{game.board[0]}</button>
          <button onClick={() => playerMove(1)}>{game.board[1]}</button>
          <button onClick={() => playerMove(2)}>{game.board[2]}</button>
        </div>
        <div>
          <button onClick={() => playerMove(0)}>{game.board[0]}</button>
          <button onClick={() => playerMove(1)}>{game.board[1]}</button>
          <button onClick={() => playerMove(2)}>{game.board[2]}</button>
        </div>
        <div>
          <button onClick={() => playerMove(0)}>{game.board[0]}</button>
          <button onClick={() => playerMove(1)}>{game.board[1]}</button>
          <button onClick={() => playerMove(2)}>{game.board[2]}</button>
        </div>
      </div>
      <button>New Game</button>
    </div>
  );
}

export default App;
