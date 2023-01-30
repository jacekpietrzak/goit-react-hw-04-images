import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, handleshowModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images &&
        images.map(image => {
          return (
            <ImageGalleryItem
              imgSrc={image.webformatURL}
              imgLargeSrc={image.largeImageURL}
              imgAlt={image.tags}
              key={image.id}
              handleshowModal={handleshowModal}
            />
          );
        })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  handleshowModal: PropTypes.func.isRequired,
};

export default ImageGallery;
