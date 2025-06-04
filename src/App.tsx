import { useState } from "react";
import { newGame } from "./game/gameEngine";
import { playerMove } from "./game/gameEngine";

function App() {
  const [game, setGame] = useState(newGame);
  console.log(game);
  const handleMove = (index: number) => {
    if (!game.endState && !game.board[index]) {
      const currentGame = playerMove({ ...game }, index);
      if (currentGame) {
        setGame(currentGame);
      }
    }
  };

  const handleNewGame = () => {
    setGame(newGame);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">TicTacToe</h1>
      <div>
        <h2 className="text-lg">
          {game.endState
            ? `Winner: ${game.endState}`
            : `Current Player: ${game.player}`}
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {game.board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 border border-gray-400 rounded flex items-center justify-center text-2xl font-bold"
            onClick={() => handleMove(index)}
            disabled={cell || game.endState ? true : false}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={handleNewGame}
      >
        New Game
      </button>
    </div>
  );
}

export default App;
