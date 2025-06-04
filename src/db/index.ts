import { drizzle } from "drizzle-orm/postgres-js";
import { config } from 'dotenv';
import type { TicTacToeApi } from "../api";
import { createNewGame, playerMove, type Board, type EndState, type Game, type Player } from "../game/gameEngine";
import { gamesTable } from "./schema";
import { eq } from "drizzle-orm";

config({path: '.env'});

const db = drizzle(process.env.DATABASE_URL!);


export class DbTicTacToeApi implements TicTacToeApi {

    async newGame(): Promise<Game> {
        const game = createNewGame()
        const values: typeof gamesTable.$inferInsert = game
        await db.insert(gamesTable).values(values)
        return game
    }

     async playerMove(gameId: string, pos: number): Promise<Game> {
        const game = await this.getGame(gameId)
        const newGame = playerMove(game, pos)
        const values: typeof gamesTable.$inferInsert = newGame
        await db.update(gamesTable).set(values).where(eq(gamesTable.id, gameId))
        return newGame
    }

    async getGame(gameId: string): Promise<Game>{
        const results = await db.select().from(gamesTable).where(eq(gamesTable.id, gameId))
        if (results.length === 0) {
            throw new Error('Game not found')
        }
        const game = results[0]
        return {
            id: game.id,
            currentPlayer: game.currentPlayer as Player,
            board: game.board as Board,
            endState: game.endState as EndState,

        }
    }
}