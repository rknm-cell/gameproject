import { useMemo, useState, useEffect } from "react";
import { type Game } from "./game/gameEngine";
import { TicTacToeApiClient } from "./api";
import { useLoaderData } from "react-router";
import { io } from "socket.io-client";
import { SERVER_URL } from "../constants";

function GameView() {
  const api = useMemo(() => new TicTacToeApiClient(), []);

  const { game } = useLoaderData<{ game: Game }>();
  const [gameState, setGameState] = useState<Game>(game);

  useEffect(() => {
    const socket = io(SERVER_URL);
    socket.on("gameUpdate", (updatedGame: Game) => {
      setGameState(updatedGame);
      socket.emit("join", game.id);
      
    });

    return () => {
      socket.disconnect();
    };
  }, [game.id]);

  async function initializeGame() {
    const initialState = await api.newGame();
    setGameState(initialState);
  }

  async function handleMove(index: number) {
    const game = await api.playerMove(gameState!.id, index);
    setGameState(game);
  }

  const handleNewGame = () => {
    initializeGame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-300 bg-contain bg-[url(./assets/notepaper.jpg)]">
      <h1 className="text-3xl font-bold mb-4 text-gray-600">TicTacToe</h1>
      <div>
        <h2 className="text-xl mb-4 font-bold text-gray-600 ">
          {gameState.endState
            ? `Winner: ${gameState.endState}`
            : `Current Player: ${gameState.currentPlayer}`}
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {gameState.board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 border bg-blue-900 m-2 border-blue-950 shadow-2xl rounded flex text-2xl text-gray-200 items-center justify-center font-bold"
            onClick={() => handleMove(index)}
            disabled={cell || gameState.endState ? true : false}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-400 text-white rounded font-rounded hover:bg-blue-700 hover:font-bold focus:ring-1 focus:ring-blue-400"
        onClick={handleNewGame}
      >
        New Game
      </button>
    </div>
  );
}

export default GameView;
