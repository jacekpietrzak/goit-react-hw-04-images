import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchImages = async (query, page) => {
  const API_KEY = '2208122-c38407f0c226da94dd817bfa0';
  const response = await axios.get(
    `/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return {
    hits: response.data.hits,
    totalHits: response.data.totalHits,
  };
};
