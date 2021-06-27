// eslint-disable-next-line import/no-anonymous-default-export
export default (cart = {}, action) => {
    switch (action.type) {
        case 'FETCH_CART':
            return action.payload;
        case 'UPDATE_CART':
            return action.payload;
        default:
            return cart;
    }
}