import { useState } from 'react';
import { API } from '../config/gameConfig';
import ResultDisplay from './ResultDisplay';
import GuessInput from './GuessInput';
import './GuessNumber.css';

const GuessNumber = () => {
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const handleStartGame = async () => {
    try {
      const response = await API.post('/start_game');
      setGameStarted(true);
      setGameFinished(false);
      setResult(response.data.message);;
      setGuess('');
    } catch (error) {
      console.error('Error starting game:', error);
      setResult('Сталася помилка при початку гри.');
    }
  };

  const handleSubmit = async () => {
    if (guess.trim() === '') { 
      setResult('Будь ласка, введіть число.');
      return;
    }
    try {
      const response = await API.post('/guess', { guess });
      setResult(response.data.message.trim());
      if (response.data.message.trim() === 'Число вгадано') {
        setGameStarted(false);
        setGameFinished(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Сталася помилка при обробці запиту.');
    }
    setGuess('')
  };

  return (
    <div>
      <h2 className="game-title">Вгадай число</h2>
      {gameStarted ? (
        <GuessInput
        guess={guess}
        setGuess={setGuess}
        handleSubmit={handleSubmit}
      />
      ) : ( !gameFinished && 
        <button className="start-game-button" onClick={handleStartGame}>Почати гру</button>
      )}
      {gameFinished && (
        <div className="game-finished-container">
          <span className="game-title">Вітаю!</span>
          <ResultDisplay result={result} />
          <button className="play-again-button" onClick={handleStartGame}>Зіграємо ще</button>
        </div>
      )}
      {!gameFinished && <ResultDisplay result={result} />}
    </div>
  );
};

export default GuessNumber;
