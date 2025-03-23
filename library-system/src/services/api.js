import axios from 'axios';

const API_URL = 'http://localhost:8000/';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const loginAdmin = (credentials) => {
  return api.post('admin/login/', credentials);
};

export const signupAdmin = (userData) => {
  return api.post('admin/signup/', userData);
};

export const getBooks = () => {
  return api.get('books/');
};

export const getBook = (id) => {
  return api.get(`books/${id}/`);
};

export const createBook = (bookData) => {
  return api.post('books/create/', bookData);
};

export const updateBook = (id, bookData) => {
  return api.put(`books/${id}/update/`, bookData);
};

export const deleteBook = (id) => {
  return api.delete(`books/${id}/delete/`);
};

export default api;
