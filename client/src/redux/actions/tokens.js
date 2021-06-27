import * as api from '../api';

export const getUserToken = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUserTokenandCart();

        dispatch({ type: 'FETCH_TOKEN', payload: data.token });
        dispatch({ type: 'FETCH_CART', payload: data.cart });
    } catch (error) {
        throw error;
    }
}