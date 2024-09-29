// api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // Replace with your actual API URL

// Login function
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Register function
export const signup = async (email, password, name) => {
  try {
    const response = await axios.post(`${API_URL}/users`, { email, password, name });
    return response.data;
  } catch (error) {
    throw error;
  }
};