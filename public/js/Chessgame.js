const socket = io()
const chess = new Chess()
const boardElement = document.querySelector(".chessboard")

let dragPiece = null 
let sourceSquare = null 
let playerRole = null 
 
const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    
    board.forEach((row , rowindex) => {
        row.forEach((square , squareindex)=>{
            const squareElement = document.createElement("div")
            squareElement.classList.add("square", 
                (rowindex + squareindex)  % 2===0 ? 'light' : 'dark'
            )
            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;
            if (square) {
                 const pieceElement = document.createElement('div')
                 pieceElement.classList.add('piece', square.color === 'w'  ? 'white':'black')
                 
                 pieceElement.textContent = getPieceUnicode(square);
                 pieceElement.draggable = playerRole === square.color

                 pieceElement.addEventListener('dragstart', (event) => {
                   if (pieceElement.draggable) {
                    dragPiece = pieceElement
                    sourceSquare = {row : rowindex , col: squareindex}
                    event.dataTransfer.setData('text/plain', "")
                   }

                 })
                 squareElement.addEventListener('dragend', (event) => {
                   dragPiece = null
                   sourceSquare = null
                })
                squareElement.appendChild(pieceElement)
            }
            
 squareElement.addEventListener("dragover" ,(e)=>{
e.preventDefault()
 })

 squareElement.addEventListener("drop" ,(e)=>{
e.preventDefault()
if (dragPiece) {
    const targetSquare = {row : parseInt(squareElement.dataset.row), col: parseInt(squareElement.dataset.col)}
    handleMove(sourceSquare , targetSquare)
}
})
boardElement.appendChild(squareElement)
})
    });
    
 if (playerRole === "b") {
    boardElement.classList.add("flipped")
 }
 else{
    boardElement.classList.remove("flipped")
 }   
 
};
const handleMove = (source , target)=>{
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: 'q'
    }
        socket.emit('move', move)
}

const getPieceUnicode = (square)=>{
    const symbols = {
        'w': { 'k': '♔', 'q': '♕', 'r': '♖', 'b': '♗', 'n': '♘', 'p': '♙' },
        'b': { 'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♙' }
    };
    return symbols[square.color][square.type];
}

socket.on('playerRole', (role) => {
    playerRole = role
    renderBoard();
});
socket.on('spectatorRole', () => {
    playerRole = null
    renderBoard();
});
socket.on('boardState', (fen) => {
    chess.load(fen)
    renderBoard()
});

socket.on('move', (move) => {
    chess.move(move)
    renderBoard()
});

