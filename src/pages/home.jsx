import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import PlayerContext from "../context/PlayerContext";

export default function Home() {
  const gamepage = useNavigate();
  const { player1, setPlayer1, player2, setPlayer2 } = useContext(PlayerContext);
  const isFormValid = player1.trim() !== "" && player2.trim() !== "";

  return (
    <div className="home-container">
      <h1 className="title">Cric Play</h1>
      <p className="tagline">Experience the Thrill of Cricket in Every Click!</p>
      <form className="forms">
        <div className="form-group">
          <label htmlFor="player1">Player 1</label>
          <input
            id="player1"
            type="text"
            className="form-group1"
            placeholder="Enter Player 1 Name"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="player2">Player 2</label>
          <input
            id="player2"
            type="text"
            className="form-group1"
            placeholder="Enter Player 2 Name"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          />
        </div>
      </form>
      <button 
        className="start-game" 
        onClick={() => gamepage("/game")}
        disabled={!isFormValid}
        style={{ opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? "pointer" : "not-allowed" }}
      >
        Start Game
      </button>
    </div>
  );
}
