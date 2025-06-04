import { useEffect, useMemo, useState } from "react";
import { newGame } from "./game/gameEngine";
import { TicTacToeApiClient } from "./api";
import {type Game} from "./game/gameEngine";

function App() {
  const api = useMemo(() => new TicTacToeApiClient(), [])
  const [gameState, setGameState] = useState<Game | undefined>();

  async function initializeGame(){
    const initialState = await api.newGame()
    setGameState(initialState)
  }
  useEffect(() => {
    initializeGame()
  }, []);

  

  async function handleMove(index: number){
      const game = await api.playerMove(gameState!.id, index);
      setGameState(game)
    
  };

  const handleNewGame = () => {
    setGameState(newGame);
  };
  if (!gameState) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-700">
      <h1 className="text-3xl font-bold mb-4">TicTacToe</h1>
      <div>
        <h2 className="text-lg">
          {gameState.endState
            ? `Winner: ${gameState.endState}`
            : `Current Player: ${gameState.player}`}
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {gameState.board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 border border-gray-400 rounded flex items-center justify-center text-2xl font-bold"
            onClick={() => handleMove(index)}
            disabled={cell || gameState.endState ? true : false}
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
