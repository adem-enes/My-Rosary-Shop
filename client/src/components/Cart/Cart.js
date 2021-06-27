import React, { useEffect } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';

import { deleteAllProductFromCart, getAllProductsInCart } from '../../redux/actions/carts';


const Cart = () => {
    const currency = "₺";
    const dispatch = useDispatch();
    const classes = useStyles();
    const cart = useSelector((state) => state.cart);
    const cartItems = useSelector((state) => state.cartItems);

    useEffect(() => {
        cart && dispatch(getAllProductsInCart(cart.id));
    }, [dispatch, cart]);


    const handleEmptyCart = () => {
        dispatch(deleteAllProductFromCart(cart.id));
    }

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in the cart
            <Link to="/" className={classes.link}> start adding some.</Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cartItems.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4"> SubTotal: {cart.totalPrice}{currency} </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary"
                        onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary"
                        component={Link} to='/checkout'>Checkout</Button>
                </div>

            </div>
        </>
    );

    if (!cartItems) return 'Loading';

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
            {!cartItems.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart;
