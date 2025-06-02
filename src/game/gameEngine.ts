

//tetris
//


// create types for board, player, blocks, score, endstate, clearstate,
type Cell = 'o' | 'x' | null;
type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
type Player = 'o' | 'x';
type EndState = 'o' | 'x' | 'tie' | undefined;

type Game = {
    board: Board,
    player: Player,
    endState?: EndState
};



//start game, player clicks the board and gets an o or x depending on them
//declare a gameboard with a type of Board and the board is null


const NewGame: Game = {board: [null, null, null, null, null, null, null, null, null], player: 'x'}


export function playerMove(player: Player, pos: number){
    //check for valid movie
    if (NewGame.board[pos]){ 
        return false };
    //change cell to player
   NewGame.board[pos] = NewGame.player;
   if (player === 'x'){
    NewGame.player = 'o'
   } else {
    NewGame.player = 'x'
   }
   //change player
}

export function handleWinState(newGameBoard){
    
}


export function checkEndState(newGameBoard: Board){
    let endState: EndState = undefined;

    return 
}











