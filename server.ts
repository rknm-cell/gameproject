import express from "express";
import { DbTicTacToeApi } from "./src/db";
import cors from "cors";
import type { Game } from "./src/game/gameEngine";
import { createServer } from "http";
import { Server } from "socket.io";
import { CLIENT_URL, PORT, SERVER_URL } from "./constants";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
  },
});

const makeLobbyId = (game: Game) => `lobby-${game.id}`

app.use(express.json());

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  })
);
const api = new DbTicTacToeApi();

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);

  socket.on("join", async (gameId: string) => {
    const game = await api.getGame(gameId);

    if (!game) {
      console.error("Game not found: ", gameId);
    }
    const lobbyId = makeLobbyId(game);
    socket.join(lobbyId)
    console.log(lobbyId)
    io.to(lobbyId).emit(`Lobby ${lobbyId}`)
  });
  
  socket.emit("Testconnection", { message: "Hello!" });

  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
  });
});

app.post("/api/game", async (req, res) => {
  const game = await api.newGame();
  res.json(game);
});

app.get("/api/games", async (req, res) => {
  const games = await api.getGames();
  res.json(games);
});

app.get("/api/game/:gameId", async (req, res) => {
  const game = await api.getGame(req.params.gameId);
  res.json(game);
});

app.post("/api/game/:gameId/move", async (req, res) => {
  // const game = await api.playerMove(req.params.gameId, req.body.pos);
  const gameId = req.params.gameId;
  const pos = req.body.pos;
  const updatedGame = await api.playerMove(gameId, pos);
  const lobbyId = makeLobbyId(updatedGame);
  io.to(lobbyId).emit("gameUpdate", updatedGame);
  res.json(updatedGame);
});

server.listen(PORT, () => console.log(`Server is listening on ${SERVER_URL}`));
