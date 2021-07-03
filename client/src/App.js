import React, { useEffect } from 'react';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from './redux/actions/products';
import { getUserToken } from './redux/actions/tokens';
import { getCart } from './redux/actions/carts';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = document.cookie.split('=').pop();
    dispatch(getProducts());
    checkToken ? dispatch(getCart(checkToken)) : dispatch(getUserToken());

  }, [dispatch]);

  const cartId = useSelector(state => state.cart.id);

  return (
    <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route exact path="/cart" >
            <Cart />
          </Route>
          <Route exact path="/checkout">
            <Checkout cartId={cartId}/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
