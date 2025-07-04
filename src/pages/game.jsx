import { useContext, useState } from "react";
import PlayerContext from "./playercentext";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";

export default function Game() {
  const { player1, player2 } = useContext(PlayerContext);
  const navigate = useNavigate();
   const { width, height } = useWindowSize();

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [balls1, setBalls1] = useState(6);
  const [balls2, setBalls2] = useState(6);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  function handleHit() {
    const run = Math.floor(Math.random() * 7); 
    setCurrentScore(run);

    if (currentPlayer === 1) {
      setScore1((prev) => prev + run);
      setBalls1((prev) => {
        if (prev - 1 === 0) setCurrentPlayer(2);
        return prev - 1;
      });
    } else if (currentPlayer === 2) {
      setScore2((prev) => prev + run);
      setBalls2((prev) => {
        const remaining = prev - 1;
        if (remaining === 0) {
          decideWinner();
        }
        return remaining;
      });
    }
  }

  function decideWinner() {
    setGameOver(true);
    if (score1 > score2) setWinner(player1);
    else if (score2 > score1) setWinner(player2);
    else setWinner("It's a Tie!");
  }

  function handleNewGame() {
    navigate("/");
  }

  return (
    <div className="game-container">
      {gameOver && <Confetti width={width} height={height} />}
      <h1 className="title">Cric Play</h1>

      <p style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }} className="current-p">
        {gameOver
          ? "Game Over"
          : `Current Turn: ${
              currentPlayer === 1 ? player1  : player2 
            }`}
      </p>

      <div className="player-name">
        <p className="p1">{player1}</p>
        <p className="p2">{player2}</p>
      </div>

      <div className="score-container">
        <p>Score</p>
        <h3 className="scores">{currentScore}</h3>
      </div>

      <div className="total-score">
        <div className="p1-score">
          <p>Total Score </p>
          <p className="score-value">{score1}</p>
        </div>
        <div className="p2-score">
          <p>Total Score </p>
          <p className="score-value">{score2}</p>
        </div>
      </div>

      <div className="balls-remain">
        <div className="p1-balls">
          <p>Balls Remaining </p>
          <p className="balls">{balls1}</p>
        </div>
        <div className="p2-balls">
          <p>Balls Remaining </p>
          <p className="balls">{balls2}</p>
        </div>
      </div>

      <div>
        {!gameOver && (
          <button className="hit-button" onClick={handleHit}>
            Hit!
          </button>
        )}
      </div>

      {gameOver && (
        <div className="result-container">
          <h2>
            {winner === "It's a Tie!" ? winner : `${winner} wins the game`}
          </h2>
          <p className="celebration">Hooray! 🥳🥳🥳</p>
        </div>
      )}

      {gameOver && (<button className="newgame-button" onClick={handleNewGame}>
        New Game
      </button>)}
    </div>
  );
}
