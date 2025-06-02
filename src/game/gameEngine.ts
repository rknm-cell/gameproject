

//tetris
//


// create types for board, player, blocks, score, endstate, clearstate,
type Cell = 'o' | 'x' | null;
type Board = Cell[][];
type Player = 'o' | 'x';
type EndState = 'o' | 'x' | 'tie';

//start game, player clicks the board and gets an o or x depending on them
//declare a gameboard with a type of Board and the board is null


const GameBoard: Board = [[null, null, null], [null, null, null], [null, null, null]];
const handleGameLogic = () => {
    return (

    )
};
    
const PlayerMove = (player<Player>, cell<Cell>) => {
    if (cell) return false;
    return player;
};






