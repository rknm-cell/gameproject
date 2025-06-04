//tetris
//

// create types for board, currentPlayer, blocks, score, endstate, clearstate,
export type Cell = "o" | "x" | null;
export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type Player = "o" | "x";
export type EndState = "o" | "x" | "tie" | undefined;

export type Game = {
  id: string;
  board: Board;
  currentPlayer: Player;
  endState?: EndState;
};

const winStates: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//start game, currentPlayer clicks the board and gets an o or x depending on them
//declare a gameboard with a type of Board and the board is null

const baseGame: Game = {
  id: crypto.randomUUID(),
  board: [null, null, null, null, null, null, null, null, null],
  currentPlayer: "x",
  endState: undefined,
};
//initialize newGame
export const newGame = structuredClone(baseGame);
export function createNewGame(): Game {
  return {
    id: crypto.randomUUID(),
    board: [null, null, null, null, null, null, null, null, null],
    currentPlayer: "x",
    endState: undefined,
  };
}

export function playerMove(game: Game, pos: number) {
  const newBoard = [...game.board] as Board;
  newBoard[pos] = game.currentPlayer;

  const newGame: Game = {
    ...game,
    board: newBoard,
  };
  // check for end state
  const endState = handleEndState(newGame);
  if (endState) {
    newGame.endState = endState;
  }

  //change currentPlayer
  newGame.currentPlayer = game.currentPlayer === "x" ? "o" : "x";
  return newGame;
}
//check for win state

export function handleEndState(game: Game): EndState {
  for (const winState of winStates) {
    const [a, b, c] = winState;
    if (
      game.board[a] &&
      game.board[a] === game.board[b] &&
      game.board[a] === game.board[c]
    )
      return game.board[a];
  }
  if (game.board.every((cell) => cell !== null)) {
    return "tie";
  }
  return undefined;
}
