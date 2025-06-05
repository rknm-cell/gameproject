import { Link, useLoaderData } from "react-router";
import type { Game } from "./game/gameEngine";
import { useState } from "react";

function Lobby() {
  const { games: intialGames } = useLoaderData<{ games: Game[] }>();
  const [games, setGames] = useState<Game[]>(intialGames);

  return (
    <div>
      <h2>Game Lobby</h2>
      It's the game lobby, baby
      {games.map((game, index) => (
        <div key={game.id}>
          <Link to={`/game/${game.id}`}>Game {index + 1}</Link>
        </div>
      ))}
    </div>
  );
}

export default Lobby;
