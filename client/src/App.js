import React, { useEffect, useState } from 'react';
import { Products, Navbar, Cart, Checkout, TheProduct, Footer, Admin } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from './redux/actions/products';
import { getUserToken } from './redux/actions/tokens';
import { getCart } from './redux/actions/carts';
import { getCategories } from './redux/actions/justGet';
import { getCookie } from './assets/classes/cookies';

function App() {
  const dispatch = useDispatch();
  const [chooseFilter, setChooseFilter] = useState(-1);

  useEffect(() => {
    const checkToken = getCookie('tokenId')?.value;
    dispatch(getProducts());
    dispatch(getCategories());
    checkToken ? dispatch(getCart(checkToken)) : dispatch(getUserToken());
  }, [dispatch]);

  const cartId = useSelector(state => state.cart.id);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Products chooseFilter={chooseFilter}
            setChooseFilter={setChooseFilter} />
        </Route>
        <Route exact path="/cart" >
          <Cart />
        </Route>
        <Route exact path="/checkout">
          <Checkout cartId={cartId} />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/:id">
          <TheProduct />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
