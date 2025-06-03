import { useState } from "react";
import { NewGame } from "./game/gameEngine";
import { playerMove } from "./game/gameEngine";

function App() {
  const [game, setGame] = useState(NewGame);
  console.log(game);
  const handleMove = (index: number) => {
    playerMove(game, index);
    setGame({ ...game });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">TicTacToe</h1>
      <div>
        <h2>{game.player}</h2>
      </div>

      <div className="grid grid-flow-col grid-rows-3 gap-3">
        <div id="first row">
          <button onClick={() => handleMove(0)}>{game.board[0]}</button>
          <button onClick={() => handleMove(1)}>{game.board[1]}</button>
          <button onClick={() => handleMove(2)}>{game.board[2]}</button>
        </div>
        <div id="second row">
          <button onClick={() => handleMove(3)}>{game.board[3]}</button>
          <button onClick={() => handleMove(4)}>{game.board[4]}</button>
          <button onClick={() => handleMove(5)}>{game.board[5]}</button>
        </div>
        <div id="third row">
          <button onClick={() => handleMove(6)}>{game.board[6]}</button>
          <button onClick={() => handleMove(7)}>{game.board[7]}</button>
          <button onClick={() => handleMove(8)}>{game.board[8]}</button>
        </div>
      </div>
      {/* <button>New Game</button> */}
    </div>
  );
}

export default App;
