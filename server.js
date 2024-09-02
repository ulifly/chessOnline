const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
app.use(express.static('public'));

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('un usuario se ha conectado 🫡 ✅');
  socket.on('movimiento', (move) => {
    console.log(move);
    socket.broadcast.emit("movimiento", move)
  });



  socket.on('disconnect', () => {
    console.log('usuario desconectado  ❌');
  });
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, () => {
  console.log(`servidor a la escucha en http://localhost:${port}`);
});