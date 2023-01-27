import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const fetchImages = async (topic, page, perPage) => {
  const API_KEY = '2208122-c38407f0c226da94dd817bfa0';
  const response = await axios.get(
    `/?key=${API_KEY}&q=${topic}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  return {
    hits: response.data.hits,
    totalHits: response.data.totalHits,
  };
};
