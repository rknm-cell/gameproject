//tetris
//

// create types for board, player, blocks, score, endstate, clearstate,
type Cell = "o" | "x" | null;
type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
type Player = "o" | "x";
type EndState = "o" | "x" | "tie" | undefined;

type Game = {
  board: Board;
  player: Player;
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

//start game, player clicks the board and gets an o or x depending on them
//declare a gameboard with a type of Board and the board is null

const baseGame: Game = {
  board: [null, null, null, null, null, null, null, null, null],
  player: "x",
};

export const newGame = structuredClone(baseGame);

export function playerMove(game: Game, pos: number) {
  //check for valid move

  if (game.board[pos]) {
    return false;

  }
  const newBoard = [...game.board];
  newBoard[pos] = game.player

  const newGame: Game = {
    ...game,
    board: newBoard,
  };
  // check for end state
  const endState = handleEndState(newGame)
  if (endState){
    newGame.endState = endState;
  };
  
  //change player
  newGame.player = game.player === "x" ? "o" : "x"
  return newGame;
}
//check for win state




export function handleEndState(game: Game): EndState{

  for (const winState of winStates) {
    const [a, b, c] = winState;
    if (game.board[a] && game.board[a] === game.board[b] && game.board[a] === game.board[c])
      return game.board[a];
  }
    if (game.board.every(cell => cell !== null)){
        return "tie";
    } 
    return undefined;
    
}

