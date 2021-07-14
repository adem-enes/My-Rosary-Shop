import { combineReducers } from "redux";

import products from './products';
import token from './tokens';
import cart from './carts';
import cartItems from './cartItems';
import shippingMethods from './shippingMethods';
import categories from './categories';

export default combineReducers({
    products,
    token,
    cart,
    cartItems,
    shippingMethods,
    categories
})