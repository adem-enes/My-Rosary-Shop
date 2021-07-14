import * as api from '../api';

export const getShippingMethods = () => async (dispatch) => {
    try {
        const { data } = await api.fetchShippingMethods();

        dispatch({ type: 'FETCH_SHIPPING_METHODS', payload: data });
        return data;
    } catch (error) {
        throw error;
    }
}

export const getCategories = () => async (dispatch) => {
    try {
        const { data } = await api.fetchCategories();

        dispatch({ type: 'FETCH_CATEGORIES', payload: data });
        return data;
    } catch (error) {
        throw error;
    }
}