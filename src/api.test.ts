import { InMemoryTicTacToeApi } from "./api";
import { type Game } from "./game/gameEngine"

describe("InMemoryTicTacToeApi", () => {
  let api: InMemoryTicTacToeApi;

  beforeEach(() => {
    api = new InMemoryTicTacToeApi();
  });

  it("should create a new game", async () => {
    const game: Game = await api.newGame();
    expect(game).toBeDefined();
    expect(game.id).toBeDefined();
    expect(game.board).toEqual([null, null, null, null, null, null, null, null, null]);
    expect(game.currentPlayer).toBe("x");
  });

  it("should get an existing game", async () => {
    const newGame: Game = await api.newGame();
    const retrievedGame: Game = await api.getGame(newGame.id);
    expect(retrievedGame).toEqual(newGame);
  });

  it("should throw an error if game is not found", async () => {
    await expect(api.getGame("nonexistent-id")).rejects.toThrow("Game not found");
  });

  it("should make a player move", async () => {
    const game: Game = await api.newGame();
    const updatedGame: Game = await api.playerMove(game.id, 0);

    expect(updatedGame).toBeDefined();
    expect(updatedGame.board[0]).toBe("x");
    expect(updatedGame.currentPlayer).toBe("o");
  });

  // Additional test case to check for invalid move
  it("should handle invalid move", async () => {
    const game: Game = await api.newGame();
    await api.playerMove(game.id, 0); // First move

    // Attempt to move on the same spot
    const updatedGame: Game = await api.playerMove(game.id, 0);
    expect(updatedGame.board[0]).toBe("x"); // Should remain "x"
  });
});