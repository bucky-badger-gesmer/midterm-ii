import { useEffect, useRef, useState } from "react";
import { generateSecret } from "./generateSecret";
import { evaluateGuess } from "./evaluateGuess";
import "./App.css";

interface GuessRecord {
  guess: string;
  firmeCount: number;
  picoCount: number;
}

function App() {
  const [secret, setSecret] = useState(generateSecret);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessHistory, setGuessHistory] = useState<GuessRecord[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [error, setError] = useState("");
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTo({ top: historyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [guessHistory]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!/^\d{4}$/.test(currentGuess)) {
      setError("Please enter exactly 4 digits.");
      return;
    }

    if (new Set(currentGuess).size !== 4) {
      setError("Digits must not repeat.");
      return;
    }

    const { firmeCount, picoCount } = evaluateGuess(secret, currentGuess);
    setGuessHistory((prev) => [...prev, { guess: currentGuess, firmeCount, picoCount }]);
    setCurrentGuess("");

    if (firmeCount === 4) {
      setGameWon(true);
    }
  }

  function handlePlayAgain() {
    setSecret(generateSecret());
    setCurrentGuess("");
    setGuessHistory([]);
    setGameWon(false);
    setError("");
  }

  return (
    <div className="game">
      <h1>Pico Firme</h1>
      <p className="rules">
        Guess the 4-digit number (no repeated digits).
        <br />
        <strong>Firme</strong> = correct digit &amp; position.{" "}
        <strong>Pico</strong> = correct digit, wrong position.
      </p>

      {!gameWon && (
        <form onSubmit={handleSubmit} className="guess-form">
          <input
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value)}
            maxLength={4}
            placeholder="4 digits"
            autoFocus
          />
          <button type="submit">Guess</button>
        </form>
      )}

      {error && <p className="error">{error}</p>}

      {guessHistory.length > 0 && (
        <div className="history-scroll" ref={historyRef}>
          <table className="history">
            <thead>
              <tr>
                <th>#</th>
                <th>Guess</th>
                <th>Firme</th>
                <th>Pico</th>
              </tr>
            </thead>
            <tbody>
              {guessHistory.map((record, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{record.guess}</td>
                  <td className={`firme-cell${record.firmeCount === 0 ? ' zero' : ''}`}>{record.firmeCount}</td>
                  <td className={`pico-cell${record.picoCount === 0 ? ' zero' : ''}`}>{record.picoCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {gameWon && (
        <>
          <div className="confetti-wrapper">
            {Array.from({ length: 20 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
          <div className="win-message">
            <p>
              You guessed it in {guessHistory.length}{" "}
              {guessHistory.length === 1 ? "attempt" : "attempts"}!
            </p>
            <button onClick={handlePlayAgain}>Play Again</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
