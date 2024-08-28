import { useState } from 'react';
import { API } from '../config/gameConfig';

const GuessNumber = () => {
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = async () => {
    try {
      await API.post('/start_game');
      setGameStarted(true);
      setResult('');
      setGuess('');
    } catch (error) {
      console.error('Error starting game:', error);
      setResult('Сталася помилка при початку гри.');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await API.post('/guess', { guess });
      setResult(response.data.message);
      if (response.data.message === 'Число вгадано') {
        setGameStarted(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Сталася помилка при обробці запиту.');
    }
    setGuess('')
  };

  return (
    <div>
      <h1>Вгадай число</h1>
      {gameStarted ? (
        <>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button onClick={handleSubmit}>Відправити</button>
        </>
      ) : (
        <button onClick={handleStartGame}>Почати нову гру</button>
      )}
      <div>{result}</div>
    </div>
  );
};

export default GuessNumber;
