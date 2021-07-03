import React, { useEffect } from 'react';
import { Container, Typography, Button, Grid, List, ListItem, ListItemText, Divider } from '@material-ui/core';
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
        <Grid container className={classes.root} spacing={2}>
            <Grid container item spacing={2} xs={12} sm={8}>
                {cartItems.map((item) => (
                    <Grid item xs={12} sm={12} key={item.id}>
                        <CartItem item={item} />
                    </Grid>
                ))}
            </Grid>
            <Grid container item className={classes.cardDetails} xs={12} sm={4}>
                <Grid item>
                    <Typography variant="h4" >Products</Typography>
                    <List disablePadding>
                        {cartItems.map((product) => (
                            <ListItem style={{ padding: '0px' }} key={product.name}>
                                <ListItemText secondary={product.productName}/>
                                <Typography variant="body2">{currency}{product.price*product.productQuantity}</Typography>
                            </ListItem>
                        ))}
                        <Divider />
                        <ListItem style={{ padding: '10px 0px' }}>
                            <ListItemText primary="SubTotal" />
                            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                                {currency}{cart.totalPrice}
                            </Typography>
                        </ListItem>
                    </List>
                </Grid>
                <Grid container item className={classes.buttons} spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Button className={classes.emptyButton} type="button" variant="outlined" color="secondary"
                            onClick={handleEmptyCart}>Empty Cart</Button></Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Button className={classes.checkoutButton} type="button" variant="contained" color="primary"
                            component={Link} to='/checkout'>Checkout</Button></Grid>
                </Grid>

            </Grid>
        </Grid>
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
