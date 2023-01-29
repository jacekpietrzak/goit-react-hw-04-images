import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ imgAlt, imgLargeSrc, onModalClose }) => {
  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyPress = event => {
    if (event.keyCode === 27) {
      handleCloseModal();
    }
  };

  const onModalOverlayClick = () => {
    handleCloseModal();
  };

  const handleCloseModal = () => {
    onModalClose();
    document.removeEventListener('keydown', onKeyPress);
  };

  return (
    <>
      <div
        id="overlay"
        onClick={onModalOverlayClick}
        className={css.Overlay}
      ></div>
      <div>
        <img className={css.Modal} src={imgLargeSrc} alt={imgAlt} />
      </div>
    </>
  );
};

Modal.propTypes = {
  imgAlt: PropTypes.string.isRequired,
  imgLargeSrc: PropTypes.string.isRequired,
};

export default Modal;
