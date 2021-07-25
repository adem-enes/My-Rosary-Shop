import axios from 'axios';
const url = 'http://localhost:3001';

export const fetchProducts = () => axios.get(`${url}/products`);

export const fetchCart = (tokenId) => axios.get(`${url}/carts/${tokenId}`);
export const fetchUserTokenandCart = () => axios.post(`${url}/users/token`);

export const fetchAllProductsInCart = (cartId) => axios.get(`${url}/productsInCarts/cart/${cartId}`);
export const postProductsInCart = (updateCart) => axios.post(`${url}/productsInCarts/`, updateCart);
export const deleteAllProductsInCart = (cartId) => axios.delete(`${url}/productsInCarts/cart/${cartId}`);
export const updateProductsInCart = (prodInCartId, updateCart) => 
    axios.patch(`${url}/productsInCarts/${prodInCartId}`, updateCart);
export const deleteProductInCart = (prodInCartId, updateCart) => 
    axios.delete(`${url}/productsInCarts/${prodInCartId}`, updateCart);

export const fetchShippingMethods = () => axios.get(`${url}/shippings`);
export const fetchCategories = () => axios.get(`${url}/categories`);

export const order = (orderData) => axios.post(`${url}/orders/`, orderData);