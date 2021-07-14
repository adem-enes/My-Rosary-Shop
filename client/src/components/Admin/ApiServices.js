import axios from 'axios';
const url = 'http://localhost:3001';


export const login = (loginInfo) => axios.post(`${url}/users/login`,loginInfo);
export const updateProduct = (product) => axios.patch(`${url}/products/${product.id}`, product);
export const createProduct = (product) => axios.post(`${url}/products/`, product);
export const deleteProduct = (productId) => axios.delete(`${url}/products/${productId}`);
export const addCategory = (category) => axios.post(`${url}/categories/`, category);
export const getCategories = () => axios.get(`${url}/categories/`);
export const getOrders = () => axios.get(`${url}/orders/`);
export const getTheOrder = (orderId) => axios.get(`${url}/orders/${orderId}`);
export const getStatuses = () => axios.get(`${url}/statuses/`);


