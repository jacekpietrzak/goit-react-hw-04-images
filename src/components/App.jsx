import { useState, useEffect } from 'react';
import { fetchImages } from '../Services/Api';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imgLargeSrc, setImgLargeSrc] = useState('');
  const [imgAlt, setImgAlt] = useState('');

  const loadImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetchImages(query, page);
      setImages(response.hits);
      setTotalHits(response.totalHits);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page !== 1) {
      loadMoreImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleLoadMore = () => {
    if (query.length !== 0) {
      setPage(page + 1);
    }
  };

  const loadMoreImages = async () => {
    setIsLoading(true);

    try {
      const response = await fetchImages(query, page);

      setImages([...images, ...response.hits]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    if (query.length !== 0) {
      console.log(
        'query from form submit:',
        typeof query,
        'query:',
        'query length:',
        query.length
      );
      loadImages();
    } else {
      alert('Type something');
    }
  };

  const handleInputChange = event => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleshowModal = event => {
    const imgAlt = event.target.alt;
    const imgLargeSrc = event.target.srcset;
    setShowModal(true);
    setImgAlt(imgAlt);
    setImgLargeSrc(imgLargeSrc);
  };

  const onModalClose = () => {
    setShowModal(false);
    setImgAlt('');
    setImgLargeSrc('');
  };

  return (
    <div className={css.App}>
      <Searchbar
        onSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
      />

      <ImageGallery images={images} handleshowModal={handleshowModal} />
      <Loader isLoading={isLoading} />

      {images.length > 0 && page * 12 < totalHits && (
        <Button
          buttonText={isLoading ? 'Loading...' : 'Load More'}
          handleLoadMore={handleLoadMore}
        />
      )}
      {showModal && (
        <Modal
          imgAlt={imgAlt}
          imgLargeSrc={imgLargeSrc}
          onModalClose={onModalClose}
        />
      )}
    </div>
  );
};

export default App;
