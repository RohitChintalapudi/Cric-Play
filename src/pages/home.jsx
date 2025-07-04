import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import PlayerContext from "./playercentext";

export default function Home() {
  const gamepage = useNavigate();
  const { setPlayer1, setPlayer2 } = useContext(PlayerContext);

  return (
    <div className="home-container">
      <h1 className="title">Cric Play</h1>
      <p className="tagline">Experience the Thrill of Cricket in Every Click!</p>
      <form className="forms">
        <div className="form-group">
          <label htmlFor="player1">Player 1:</label>
          <input
            id="player1"
            type="text"
            className="form-group1"
            placeholder="Enter Player 1 Name"
            onChange={(e) => setPlayer1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="player2">Player 2:</label>
          <input
            id="player2"
            type="text"
            className="form-group1"
            placeholder="Enter Player 2 Name"
            onChange={(e) => setPlayer2(e.target.value)}
          />
        </div>
      </form>
      <button className="start-game" onClick={() => gamepage("/game")}>
        Start Game
      </button>
    </div>
  );
}
