// eslint-disable-next-line import/no-anonymous-default-export
export default (cartItems = [], action) => {
    switch (action.type) {
        case 'FETCH_CARTITEMS':
            return action.payload;
        case 'UPDATE_CARTITEMS':
            return action.payload;
        default:
            return cartItems;
    }
}