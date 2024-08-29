import PropTypes from 'prop-types';
import './ResultDisplay.css';
const ResultDisplay = ({result} ) => {
  return <div className="result-display">{result}</div>;
};

ResultDisplay.propTypes = {
  result: PropTypes.string.isRequired,
};

export default ResultDisplay;
