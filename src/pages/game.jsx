import { useContext, useState } from "react";
import PlayerContext from "../context/PlayerContext";
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
  const [hitHistory, setHitHistory] = useState([]);

  function handleHit() {
    const run = Math.floor(Math.random() * 7); 
    setCurrentScore(run);
    setHitHistory((prev) => [run, ...prev].slice(0, 6));

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
        if (remaining === 0 || score2 + run > score1) {
          decideWinner(score2 + run);
        }
        return remaining;
      });
    }
  }

  function decideWinner(finalScore2) {
    setGameOver(true);
    const s1 = score1;
    const s2 = finalScore2 !== undefined ? finalScore2 : score2;
    if (s1 > s2) setWinner(player1);
    else if (s2 > s1) setWinner(player2);
    else setWinner("It's a Tie!");
  }

  function handleNewGame() {
    navigate("/");
  }

  return (
    <div className="game-container">
      {gameOver && <Confetti width={width} height={height} />}
      <h1 className="title">Cric Play</h1>

      <p className="current-p">
        {gameOver
          ? "Match Finished"
          : `Current Turn: ${
              currentPlayer === 1 ? player1  : player2 
            }`}
      </p>

      {currentPlayer === 2 && !gameOver && (
        <div className="target-container">
          <p style={{ fontWeight: 800, color: '#1e3a2a' }}>
            TARGET: {score1 + 1} | NEED {score1 + 1 - score2} FROM {balls2} BALLS
          </p>
        </div>
      )}

      <div className="player-name">
        <div className={`p1 ${currentPlayer === 1 ? 'active' : ''}`} style={{ border: currentPlayer === 1 ? '4px solid var(--secondary)' : 'none' }}>
          {player1}
        </div>
        <div className={`p2 ${currentPlayer === 2 ? 'active' : ''}`} style={{ border: currentPlayer === 2 ? '4px solid var(--secondary)' : 'none' }}>
          {player2}
        </div>
      </div>

      <div className="score-container">
        <p>Last Hit</p>
        <h3 className="scores">{currentScore}</h3>
      </div>

      <div className="hit-history">
        {hitHistory.map((run, index) => (
          <div key={index} className={`hit-badge ${run === 4 ? 'four' : run === 6 ? 'six' : run === 0 ? 'wicket' : ''}`}>
            {run === 0 ? 'W' : run}
          </div>
        ))}
      </div>

      <div className="stats-grid">
        <div className="p1-stats">
          <div className="p1-score">
            <p>{player1} Score</p>
            <p className="score-value">{score1}</p>
          </div>
          <div className="p1-balls">
            <p>Balls Left</p>
            <p className="balls">{balls1}</p>
          </div>
        </div>

        <div className="vs-indicator" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', opacity: 0.2 }}>
          VS
        </div>

        <div className="p2-stats">
          <div className="p2-score">
            <p>{player2} Score</p>
            <p className="score-value">{score2}</p>
          </div>
          <div className="p2-balls">
            <p>Balls Left</p>
            <p className="balls">{balls2}</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        {!gameOver && (
          <button className="hit-button" onClick={handleHit} style={{ background: 'var(--accent)', scale: '1.2' }}>
            HIT!
          </button>
        )}
      </div>

      {gameOver && (
        <div className="result-container">
          <h2>
            {winner === "It's a Tie!" ? winner : `${winner} wins the match!`}
          </h2>
          <p className="celebration">
            {winner === player1 || winner === player2 ? "What a performance!" : "What a nail-biter!"}
          </p>
        </div>
      )}

      {gameOver && (
        <button className="newgame-button" onClick={handleNewGame}>
          Play Again
        </button>
      )}
    </div>
  );
}
