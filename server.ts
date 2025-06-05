import express from "express";
import ViteExpress from "vite-express";
import { DbTicTacToeApi } from "./src/db";
const app = express();
app.use(express.json())

const api = new DbTicTacToeApi()

const PORT = 3000;

app.get("/api/game/:gameId", async (req, res) => {
  const game = await api.getGame(req.params.gameId);
  res.json(game);
});
app.get("/api/games", async (req, res) => {
  const games = await api.getGames()
  res.json(games)
})

app.post("/api/game", async (req, res)=> {
    const game = await api.newGame()
    res.json(game)
})

app.post("/api/game/:gameId/move", async (req, res)=> {
  const game = await api.playerMove(req.params.gameId, req.body.pos)
  res.json(game)
})

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on ${PORT}`)
);
