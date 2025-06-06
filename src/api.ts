import { SERVER_URL } from "../constants";
import { type Game, newGame, playerMove } from "./game/gameEngine";

export interface TicTacToeApi {
  newGame(): Promise<Game>;
  playerMove(gameId: string, pos: number): Promise<Game>;
  getGame(gameId: string): Promise<Game>;
  getGames(): Promise<Game[]>;
}

export class InMemoryTicTacToeApi implements TicTacToeApi {
  private games: Map<string, Game> = new Map();

  async newGame(): Promise<Game> {
    const game = newGame;
    this.games.set(game.id, game);
    return game;
  }
  

  async getGame(gameId: string): Promise<Game> {
    const game = this.games.get(gameId);
    if (!game) {
      throw new Error("Game not found");
    }
    return game;
  }

  async getGames(): Promise<Game[]>{
    
    return Promise.resolve(Array.from(this.games.values()))
    
  }

  async playerMove(
    gameId: string,
    pos: number
  ): Promise<Game> {
    const game = await this.getGame(gameId);
    const newGame = playerMove(game, pos);
    this.games.set(gameId, newGame);
    return newGame;
  }
}

export class TicTacToeApiClient implements TicTacToeApi {

  


  async newGame(): Promise<Game> {
    const response = await fetch(`${SERVER_URL}/api/game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const game = await response.json();
    return game;
  }
  async getGame(gameId: string): Promise<Game> {
    const response = await fetch(`${SERVER_URL}/api/game/${gameId}`);
    const game = await response.json();
    return game;
  }
  

  async getGames():Promise<Game[]>{
    const response = await fetch(`${SERVER_URL}/api/games`)
    const games = await response.json()
    return games
  }

  async playerMove(gameId: string, pos: number): Promise<Game> {
    const response = await fetch(`${SERVER_URL}/api/game/${gameId}/move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pos }),
    });
    const game = await response.json();
    return game;
  }
}
