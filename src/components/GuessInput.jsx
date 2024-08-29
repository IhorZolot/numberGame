import PropTypes from 'prop-types';
import './GuessInput.css';

const GuessInput = ({ guess, setGuess, handleSubmit }) => {
  return (
    <div className="guess-input">
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Введіть число"
      />
      <button onClick={handleSubmit}>Відправити</button>
    </div>
  );
};

GuessInput.propTypes = {
  guess: PropTypes.string.isRequired, 
  setGuess: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired, 
};

export default GuessInput;
