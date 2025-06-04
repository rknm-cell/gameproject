import express from "express";
import ViteExpress from "vite-express";

const app = express();
const PORT = 3000;

app.get("/message", (_, res) => res.send("Hello from express!"));
app.get("/api/game/:gameId", async (req, res) => {
  const game = await api.getGame(req.params.gameId);
  res.json(game);
});

app.get("/api/game", async (req, res)=> {
    const game = await api.createGame()
    res.json(game)
})

app.get("/api/")
ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on ${PORT}`)
);
