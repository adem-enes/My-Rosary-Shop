// eslint-disable-next-line import/no-anonymous-default-export
export default (token = {}, action) => {
    switch (action.type) {
        case 'FETCH_TOKEN':
            document.cookie=`tokenId=${action.payload.id};expires=${action.payload.expiredTime};`;
            return action.payload;
        default:
            return token;
    }
}