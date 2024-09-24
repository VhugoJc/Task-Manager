import axios from 'axios';

const API_URL = 'http://localhost:8080/api/task'; // Replace with your actual API URL

// Get all tasks
export const getTasks = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get a single task by ID
export const getTaskById = async (taskId) => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to create a task
export const createTask = async (taskData, token) => {
    try {
      const response = await axios.post(API_URL, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create task');
    }
  };
  
// Update an existing task
export const updateTask = async (taskId, taskData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};