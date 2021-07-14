// eslint-disable-next-line import/no-anonymous-default-export
export default (shipping_methods = [], action) => {
    switch (action.type) {
        case 'FETCH_SHIPPING_METHODS':
            return action.payload;
        default:
            return shipping_methods;
    }
}