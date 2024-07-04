import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/books/`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching books');
  }
};

export const addReview = async (bookId: number, rating: number, text: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/reviews/`, {
      book: bookId,
      rating,
      text,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding review', error);
    throw error;
  }
};