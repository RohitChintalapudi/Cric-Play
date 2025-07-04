import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/game";
import Errorpage from "./pages/404page";
import { useState } from "react";
import PlayerContext from "./pages/playercentext";

export default function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  return (
    <PlayerContext.Provider value={{ player1, setPlayer1, player2, setPlayer2 }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </PlayerContext.Provider>
  );
}
