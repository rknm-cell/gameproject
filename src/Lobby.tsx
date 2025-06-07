import { Link, useLoaderData } from "react-router";
import type { Game } from "./game/gameEngine";
import { useState } from "react";

function Lobby() {
  const { games: intialGames } = useLoaderData<{ games: Game[] }>();
  const [games] = useState<Game[]>(intialGames);

  return (
    <div id="Game-lobby" className="flex flex-col min-h-screen min-w-screen bg-zinc-500 bg-contain bg-[url(./assets/notepaper.jpg)]">
      <h2 className="flex justify-center text-zinc-500">Game Lobby</h2>
      <p className="flex justify-center text-zinc-500 ">Pick a game</p>
      {games.filter((game) => !game.endState).map((game, index) => (
        <div key={game.id} className="flex justify-center text-zinc-500 font-light">
          <Link to={`/game/${game.id}`}>Game {index + 1}</Link>
        </div>
      ))}
    </div>
  );
}

export default Lobby;
