import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid, Button, Typography, CircularProgress,
    Dialog, DialogActions, DialogTitle, DialogContent
} from '@material-ui/core';


import useStyles from './style';
import { getProducts } from '../../redux/actions/products';
import { getCart, postProductToCart } from '../../redux/actions/carts';
import { getCookie } from '../../assets/classes/cookies';

const TheProduct = () => {
    const currency = "₺";
    const dispatch = useDispatch();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const productId = parseInt(location.pathname.split('/').pop());
    const product = useSelector(state => state.products?.find(p => p.id === productId));
    const cartId = useSelector(state => state.cart.id);
    const classes = useStyles();

    const onAddToCart = (productId) => {
        dispatch(postProductToCart({
            cartId: cartId,
            productId,
            quantity: 1
        }));
    }

    useEffect(() => {
        if (!product) {
            const checkToken = getCookie('tokenId')?.value;
            dispatch(getCart(checkToken));
            dispatch(getProducts())
        }
    }, [product, dispatch]);

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />

            {!product ? (
                <CircularProgress />
            ) : (
                <>
                    <Grid container spacing={3} className={classes.root}>
                        <Grid item xs={12} sm={6} style={{ height: '100%' }}>
                            <img className={classes.media}
                                src={product.image} alt={product.productName}
                                onClick={() => setOpen(true)} />
                        </Grid>
                        <Grid container item xs={12} sm={6} style={{ minHeight: 150, maxHeight: 300 }}>
                            <Grid item xs={12} style={{ height: 0 }}>
                                <Typography variant="h4" >
                                    {product.productName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{ height: 0 }}>
                                <Typography variant="body1" component="p" >
                                    {product.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h4" component="h4" >
                                    {product.price}{currency}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} style={{alignContent:'flex-end'}}>
                                <Button className={classes.emptyButton} type="button" variant="outlined"
                                    color="primary" onClick={() => onAddToCart(product.id, 1)}>
                                    Add To Cart
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                    <div>
                        <Dialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title"
                            open={open}>
                            <DialogTitle id="customized-dialog-title" onClose={() => setOpen(false)}>
                                {product.productName}
                            </DialogTitle>
                            <DialogContent dividers>
                                <img src={product.image} alt={product.productName} />
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={() => setOpen(false)} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </>
            )}
        </main>
    )
}

export default TheProduct;
