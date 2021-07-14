import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Grid } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { postProductToCart } from '../../../redux/actions/carts';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Product = ({ product }) => {
    const cartId = useSelector(state => state.cart.id);
    const dispatch = useDispatch();
    const currency = "₺";
    const classes = useStyles();

    const onAddToCart = (productId) => {
        dispatch(postProductToCart({
            cartId: cartId,
            productId,
            quantity: 1
        }));
    }

    return (
        <Card className={classes.root}>
            <Grid style={{ display: 'flex', justifyContent: 'center' }}
                component={Link} to={`/${product.id}`}>
                <img className={classes.media} src={product.image} alt={product.name} />
            </Grid>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h3" >
                        {product.productName}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2"
                    color="textSecondary" component="p" />
            </CardContent>

            <CardActions disableSpacing className={classes.cardActions}>
                <Typography variant="h5" component="h2" className={classes.price}>
                    {product.price}{currency}
                </Typography>
                <IconButton className={classes.cardButton} aria-label="Add to Cart"
                    onClick={() => { onAddToCart(product.id, 1) }}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
