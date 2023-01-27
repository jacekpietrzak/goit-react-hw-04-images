import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ buttonText, handleLoadMore }) => {
  return (
    <button onClick={handleLoadMore} className={css.Button}>
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
};

export default Button;
