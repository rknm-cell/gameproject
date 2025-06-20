import { useMemo, useState, useEffect, useCallback } from "react";
import { type Cell, type Game } from "./game/gameEngine";
// import { type Player } from "./game/gameEngine";
import { TicTacToeApiClient } from "./api";
import { useLoaderData } from "react-router";
import { io } from "socket.io-client";
import { SERVER_URL } from "../constants";


function GameView() {
  const api = useMemo(() => new TicTacToeApiClient(), []);

  const { game } = useLoaderData<{ game: Game }>();
  const [gameState, setGameState] = useState<Game>(game);

  // const [playerSymbol, setPlayerSymbol] = useState<Player>();
  // const [playerTurn, setPlayerTurn] = useState<boolean>();

  const playClickSound = useCallback(() => {
    const audio = new Audio('./assets/pencil_mark.mp3');
    audio.play().catch(error => console.log('Audio failed', error))

  }, []);
  

  useEffect(() => {
    const socket = io(SERVER_URL);
    // socket.on("playerAssignment", (symbol) => {
    //   setPlayerSymbol(symbol);
    //   setPlayerTurn(symbol === "x");
    // });

    // socket.on("gameState", (gameState) => {
    //   setGameState(gameState);
    //   setPlayerTurn(playerSymbol === gameState.currentPlayer);
    // });
    socket.on("invalidMove", (message) => {
      console.log(message);
    });

    socket.on("gameUpdate", (updatedGame: Game) => {
      setGameState(updatedGame);
    });
    socket.emit("join", game.id);

    return () => {
      socket.disconnect();
    };
  }, [game.id]);

  async function initializeGame() {
    const initialState = await api.newGame();
    setGameState(initialState);
  }

  async function handleMove(index: number) {
    playClickSound();
    
    // if (!playerTurn) {
    //   alert("Hold on! Wait a minute! It/'s not your turn yet");
    // }
    const game = await api.playerMove(gameState!.id, index);
    setGameState(game);
  }

  const handleNewGame = () => {
    initializeGame();
  };

  function handleRenderGameboard(gameState: Game) {
    return gameState.board.map((cell: Cell, index: number) => {
      const row = Math.floor(index / 3);
      const col = index % 3;

      const borders = [
        row > 0 ? "border-t" : "",
        row < 2 ? "border-b" : "",
        col > 0 ? "border-l" : "",
        col < 2 ? "border-r" : "",
      ].join(" ");

      return (
        <button
          key={index}
          className={`w-20 h-20 ${borders} bg-transparent flex text-zinc-500 items-center justify-center font-light text-3xl`}
          onClick={() => handleMove(index)}
          disabled={cell || gameState.endState ? true : false}
        >
          {cell}
        </button>
      );
    });
  }

  return (
    <div className="flex bg-zinc-500 bg-contain bg-[url(./assets/notepaper.jpg)]">

    <div
      id="div-tictactoe"
      className="flex flex-col items-center justify-center min-h-screen min-w-screen "
    >
      <h1 className="text-3xl font-bold mb-4 text-zinc-500">TicTacToe</h1>
      <div>
        <h2 className="text-xl mb-4 font-bold text-zinc-500 ">
          {gameState.endState
            ? `Winner: ${gameState.endState}`
            : `Current Player: ${gameState.currentPlayer}`}
        </h2>
      </div>
      <div className="relative ">
        <div
          id="gameboard-div-buttons"
          className="inset-0  grid grid-cols-3 gap-0 z-2"
          >
          
          {handleRenderGameboard(gameState)}
        </div>
      </div>

      <button
        className="mt-4 px-4 py-2 text-zinc-500 rounded font-rounded hover:font-bold focus:ring-1 focus:ring-zinc-500"
        onClick={handleNewGame}
        >
        New Game
      </button>
    </div>
        </div>
  );
}

export default GameView;
