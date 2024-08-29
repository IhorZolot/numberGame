import { useState } from 'react';
import { API } from '../config/gameConfig';
import ResultDisplay from './ResultDisplay';
import GuessInput from './GuessInput';

const GuessNumber = () => {
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = async () => {
    try {
      const response = await API.post('/start_game');
      setGameStarted(true);
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
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setGuess('')
  };

  return (
    <div>
      <h2>Вгадай число</h2>
      {gameStarted ? (
        <GuessInput
        guess={guess}
        setGuess={setGuess}
        handleSubmit={handleSubmit}
      />
      ) : (
        <button onClick={handleStartGame}>Почати гру</button>
      )}
      <ResultDisplay result={result} />
    </div>
  );
};

export default GuessNumber;
