// eslint-disable-next-line import/no-anonymous-default-export
export default (categories = [], action) => {
    switch (action.type) {
        case 'FETCH_CATEGORIES':
            return action.payload;
        default:
            return categories;
    }
}