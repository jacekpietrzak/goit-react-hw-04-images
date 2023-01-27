import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';
import PropTypes from 'prop-types';

const Loader = ({ isLoading }) => {
  return isLoading
    ? Loading.standard({
        svgColor: '#3f51b5',
      })
    : Loading.remove();
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
