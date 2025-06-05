import {jsonb, pgTable, varchar} from "drizzle-orm/pg-core";
import type { Board } from "../game/gameEngine";
export const gamesTable = pgTable("tic_tac_toe_games", {
    id: varchar({ length: 255}).primaryKey(),
    board: jsonb().$type<Board>().notNull(),
    currentPlayer: varchar({ length: 255 }).notNull(),
    endState: varchar({ length: 255}),
});
