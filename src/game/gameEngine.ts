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
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 9],
];

//start game, player clicks the board and gets an o or x depending on them
//declare a gameboard with a type of Board and the board is null

const BaseGame: Game = {
  board: [null, null, null, null, null, null, null, null, null],
  player: "x",
};

const NewGame = structuredClone(BaseGame);

export function playerMove(player: Player, pos: number) {
  //check for valid move
  if (NewGame.board[pos]) {
    return false;
  }
  //change cell to player
  NewGame.board[pos] = NewGame.player;
  // check for end state
  if (handleEndState(player)){
    return player
  };
  if (player === "x") {
    NewGame.player = "o";
  } else {
    NewGame.player = "x";
  }
  //change player
}
//check for win state



export function handleTieState(){
    return NewGame.board.some((element) => element === null);
}

export function handleEndState(player: Player){
    handleTieState()
    return winStates.some((winstate) => winstate.every(index => NewGame.board[index] === player))
}

