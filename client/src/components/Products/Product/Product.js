import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { postProductToCart } from '../../../redux/actions/carts';

import useStyles from './styles';

const Product = ({ product }) => {
    const cartId = useSelector(state => state.cart.id);
    const dispatch = useDispatch();
    const currency = "₺";
    const classes = useStyles();

    const onAddToCart = (productId) => {
        dispatch(postProductToCart({
            cartId:cartId,
            productId,
            quantity: 1 
        }));
    }

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" >
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
