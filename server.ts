import express from "express";
import ViteExpress from "vite-express";
import { InMemoryTicTacToeApi } from "./src/api";

const api = new InMemoryTicTacToeApi()

const app = express();
const PORT = 3000;
app.use(express.json())

app.get("/api/game/:gameId", async (req, res) => {
  const game = await api.getGame(req.params.gameId);
  res.json(game);
});

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
