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
  const [topic, setTopic] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(500);
  const [perPage, setPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imgLargeSrc, setImgLargeSrc] = useState('');
  const [imgAlt, setImgAlt] = useState('');

  const loadImages = async () => {
    setIsLoading(true);
    // this.setState({ isLoading: true });
    try {
      // const { topic, page, perPage } = this.state;

      const response = await fetchImages(topic, page, perPage);
      setImages(response.hits);
      setTotalHits(response.totalHits);
      setError(null);

      // this.setState({
      //   images: response.hits,
      //   error: null,
      //   totalHits: response.totalHits,
      // });
    } catch (error) {
      setError(error);

      // this.setState({ error: error });
      throw new Error(error);
    } finally {
      setIsLoading(false);

      // this.setState({ isLoading: false });
    }
  };

  const loadMoreImages = async () => {
    setIsLoading(true);

    // this.setState({ isLoading: true });
    try {
      // const { topic, page, perPage } = this.state;

      const response = await fetchImages(topic, page, perPage);

      setImages([...images, ...response.hits]);
      setError(null);

      // this.setState(prevState => {
      //   return {
      //     images: [...prevState.images, ...response.hits],
      //     error: null,
      //   };
      // });
    } catch (error) {
      setError(error);
      // this.setState({ error: error });
      throw new Error(error);
    } finally {
      setIsLoading(false);
      // this.setState({ isLoading: false });
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    loadImages();
  };

  const handleInputChange = event => {
    const value = event.target.value;
    if (value.length !== 0) {
      setTopic(value);
    }
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  // Component did update
  useEffect(() => {
    if (page !== 1) {
      loadMoreImages();
    }
  }, [page]);

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

      {images.length > 0 && page * perPage < totalHits && (
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
