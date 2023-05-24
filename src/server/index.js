const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require("path");

const port = process.env.PORT || 3001;

const io = new Server(server, {
  cors: { origin: `https://localhost:${port}` },
});

app.use(cors({ origin: `https://localhost:${port}` }));
app.use(express.static(path.join(__dirname, "../../build")));
app.get("/", (req, res, next) => res.sendFile(__dirname + "./index.html"));

io.on("connection", (socket) => {
  console.log("User Conntected", socket.id);

  socket.on("room", (room) => {
    socket.join(room);
    console.log(
      `${socket.handshake.auth.player} (${socket.id}) joind room ${room}`
    );
  });

  socket.on("start-game", (room) => {
    io.to(room).emit("start-game-seq", true);
    console.log(`Starting game for ${room}`);
  });

  const gamefield = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let moveCount = 0;

  socket.on("player-moved", (data) => {
    moveCount += 1;
    console.log(moveCount);

    const haruPosition = {
      x: data.haruPosition.x + 1,
      y: data.haruPosition.y + 1,
    };
    const player = socket.handshake.auth.player;
    const currentPlayer = player === "player1" ? "player2" : "player1";
    gamefield[haruPosition.x][haruPosition.y] = player;

    io.to(socket.handshake.auth.room).emit("switch-player", {
      currentPlayer: currentPlayer,
    });

    // if (moveCount >= 3) {
    //   if (
    //     (gamefield[0][0] == player &&
    //       gamefield[0][1] == player &&
    //       gamefield[0][2] == player) ||
    //     (gamefield[1][0] == player &&
    //       gamefield[1][1] == player &&
    //       gamefield[1][2] == player) ||
    //     (gamefield[2][0] == player &&
    //       gamefield[2][1] == player &&
    //       gamefield[2][2] == player) ||
    //     (gamefield[0][2] == player &&
    //       gamefield[1][2] == player &&
    //       gamefield[2][2] == player) ||
    //     (gamefield[0][1] == player &&
    //       gamefield[1][1] == player &&
    //       gamefield[2][1] == player) ||
    //     (gamefield[0][0] == player &&
    //       gamefield[1][0] == player &&
    //       gamefield[2][0] == player) ||
    //     (gamefield[0][0] == player &&
    //       gamefield[1][1] == player &&
    //       gamefield[2][2] == player) ||
    //     (gamefield[0][2] == player &&
    //       gamefield[1][1] == player &&
    //       gamefield[2][0] == player)
    //   ) {
    //     io.to(socket.handshake.auth.room).emit("winner-detected", {
    //       player: player,
    //     });
    //   }
    // }

    socket.to(socket.handshake.auth.room).emit("move-done", {
      haruPosition: data.haruPosition,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
