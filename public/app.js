let board;
let game;

const socket = io();

window.onload = function () {initGame();};
let initGame = function() {
   let cfg = {
       draggable: true,
       position: 'start',
       onDrop: handleMove,
   };
   board = new ChessBoard('gameBoard', cfg);
   game = new Chess();
    
};

let handleMove = function(source, target ) {
    let move = game.move({from: source, to: target});
    if (move === null) { 
      return 'snapback';
    } else {
      socket.emit('movimiento', move);
    }
};

socket.on("movimiento", (move)=> {
  game.move(move);
  board.position(game.fen());
})