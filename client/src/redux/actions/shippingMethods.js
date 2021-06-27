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