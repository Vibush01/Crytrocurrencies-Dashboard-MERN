import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; 

export const fetchCoins = async () => {
  try {
    // hits GET /api/coins
    const response = await axios.get(`${API_URL}/coins`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    throw error;
  }
};

// hits POST /api/history
export const saveSnapshot = async () => {
  try {
    const response = await axios.post(`${API_URL}/history`);
    return response.data;
  } catch (error) {
    console.error('Error saving snapshot:', error);
    throw error;
  }
};

// hits GET /api/history/:coinId
export const fetchCoinHistory = async (coinId) => {
  try {
    const response = await axios.get(`${API_URL}/history/${coinId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching history for ${coinId}:`, error);
    throw error;
  }
};