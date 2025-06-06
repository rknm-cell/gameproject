import { Link, useLoaderData } from "react-router";
import type { Game } from "./game/gameEngine";
import { useState } from "react";

function Lobby() {
  const { games: intialGames } = useLoaderData<{ games: Game[] }>();
  const [games, setGames] = useState<Game[]>(intialGames);

  return (
    <div id="Game-lobby" className="">
      <h2 className="flex justify-center">Game Lobby</h2>
      <p className="flex justify-center">Pick a game</p>
      {games.filter((game) => !game.endState).map((game, index) => (
        <div key={game.id} className="flex justify-center font-bold">
          <Link to={`/game/${game.id}`}>Game {index + 1}</Link>
        </div>
      ))}
    </div>
  );
}

export default Lobby;
