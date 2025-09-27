
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books'; // Thay bằng URL deploy sau

export const getBooks = (params) => axios.get(API_URL, { params });
export const createBook = (data) => axios.post(API_URL, data);
export const updateBook = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);
export const getStats = (params) => axios.get(`${API_URL}/stats`, { params });