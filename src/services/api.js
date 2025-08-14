import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Using JSONPlaceholder for demo
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.message);
    
    // Handle common error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken');
      // You could dispatch a logout action here
    }
    
    return Promise.reject(error);
  }
);

// API Methods
export const apiService = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      throw new Error(`GET ${url} failed: ${error.message}`);
    }
  },

  // POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw new Error(`POST ${url} failed: ${error.message}`);
    }
  },

  // PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw new Error(`PUT ${url} failed: ${error.message}`);
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw new Error(`DELETE ${url} failed: ${error.message}`);
    }
  },

  // PATCH request
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await api.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw new Error(`PATCH ${url} failed: ${error.message}`);
    }
  },
};

// Specific API endpoints for the RPG game
export const gameApi = {
  // Player endpoints
  getPlayer: (playerId) => apiService.get(`/users/${playerId}`),
  updatePlayer: (playerId, playerData) => apiService.put(`/users/${playerId}`, playerData),
  createPlayer: (playerData) => apiService.post('/users', playerData),
  deletePlayer: (playerId) => apiService.delete(`/users/${playerId}`),

  // Inventory endpoints
  getInventory: (playerId) => apiService.get(`/users/${playerId}/albums`), // Using albums as inventory items
  addInventoryItem: (playerId, item) => apiService.post(`/users/${playerId}/albums`, item),
  updateInventoryItem: (itemId, itemData) => apiService.put(`/albums/${itemId}`, itemData),
  removeInventoryItem: (itemId) => apiService.delete(`/albums/${itemId}`),

  // Quest endpoints
  getQuests: () => apiService.get('/posts'), // Using posts as quests
  getQuest: (questId) => apiService.get(`/posts/${questId}`),
  createQuest: (questData) => apiService.post('/posts', questData),
  updateQuest: (questId, questData) => apiService.put(`/posts/${questId}`, questData),
  deleteQuest: (questId) => apiService.delete(`/posts/${questId}`),

  // Comments as quest progress/notes
  getQuestComments: (questId) => apiService.get(`/posts/${questId}/comments`),
  addQuestComment: (questId, comment) => apiService.post(`/posts/${questId}/comments`, comment),
};

export default api;