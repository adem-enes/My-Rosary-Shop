import * as api from '../api';

export const getCart = (tokenId) => async (dispatch) => {
    try {
        const { data } = await api.fetchCart(tokenId);

        dispatch({ type: 'FETCH_CART', payload: data })
    } catch (error) {
        throw error;
    }
}

export const getAllProductsInCart = (cartId) => async (dispatch) => {
    try {
        const { data } = await api.fetchAllProductsInCart(cartId);

        dispatch({ type: 'FETCH_CARTITEMS', payload: data.productsInTheCarts });
    } catch (error) {
        throw error;
    }
}

export const postProductToCart = (cartItems) => async (dispatch) => {
    try {
        const { data } = await api.postProductsInCart(cartItems);

        dispatch({ type: 'UPDATE_CART', payload: data.cart });
        dispatch({ type: 'UPDATE_CARTITEMS', payload: data.productsInTheCarts });
    } catch (error) {
        throw error;
    }
}
export const updateProductInCart = (prodInCartId, cartItems) => async (dispatch) => {
    try {
        const { data } = await api.updateProductsInCart(prodInCartId, cartItems);

        dispatch({ type: 'UPDATE_CART', payload: data.cart });
        dispatch({ type: 'UPDATE_CARTITEMS', payload: data.productsInTheCarts });
    } catch (error) {
        throw error;
    }
}
export const deleteProductFromCart = (prodInCartId, cartItems) => async (dispatch) => {
    try {
        const { data } = await api.deleteProductInCart(prodInCartId, cartItems);

        dispatch({ type: 'UPDATE_CART', payload: data.cart });
        dispatch({ type: 'UPDATE_CARTITEMS', payload: data.productsInTheCarts });
    } catch (error) {
        throw error;
    }
}

export const deleteAllProductFromCart = (cartId) => async (dispatch) => {
    try {
        const { data } = await api.deleteAllProductsInCart(cartId);

        dispatch({ type: 'UPDATE_CART', payload: data.cart });
        dispatch({ type: 'UPDATE_CARTITEMS', payload: data.productsInTheCarts });
    } catch (error) {
        throw error;
    }
}