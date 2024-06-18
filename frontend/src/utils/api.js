import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const signupUser = async (userData) => {
  try {
    const response = await api.post('/signup', userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Error signing up');
  }
};