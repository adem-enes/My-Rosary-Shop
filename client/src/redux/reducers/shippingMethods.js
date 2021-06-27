// eslint-disable-next-line import/no-anonymous-default-export
export default (shipping_methods = [], action) => {
    switch (action.type) {
        case 'FETCH_SHIPPING_METHODS':
            return action.payload;
        case 'CREATE_SHIPPING_METHODS':
            return shipping_methods;
        default:
            return shipping_methods;
    }
}