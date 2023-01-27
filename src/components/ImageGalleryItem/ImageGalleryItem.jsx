import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imgSrc, imgLargeSrc, imgAlt, handleshowModal }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={handleshowModal}
        className={css.ImageGalleryItemImage}
        src={imgSrc}
        srcSet={imgLargeSrc}
        alt={imgAlt}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgLargeSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  handleshowModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
