import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { TicTacToeApiClient } from "./api.ts";
import Lobby from "./Lobby.tsx";
import GameView from "./GameView.tsx";

const api = new TicTacToeApiClient();

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Lobby,
        loader: async () => {
          const games = await api.getGames();
          return { games };
        },
      },
      {
        path: "/game/:gameId",
        Component: GameView,
        loader: async ({ params }) => {
          if (params.gameId) {
            
            const game = await api.getGame(params.gameId);
            return { game };
          } else {
            console.error()
            return null
          }
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
