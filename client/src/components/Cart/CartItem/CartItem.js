import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { updateProductInCart } from '../../../redux/actions/carts';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const currency = "₺";
    const classes = useStyles();

    const handleUpdateProducQty = (id, productQuantity) => {
        dispatch(updateProductInCart(id, {
            productQuantity,
            cartId: item.cartId
        }));
    }

    const onRemoveFromCart = (id) => {
        dispatch(updateProductInCart(id, {
            productQuantity: 0,
            cartId: item.cartId
        }));
    }

    return (
        <Card>
            <CardMedia image={item.image} alt={item.productName} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.productName}</Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <Typography variant="h5">{item.price}{currency}</Typography>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => handleUpdateProducQty(item.id, item.productQuantity - 1)}>-</Button>
                    <Typography>{item.productQuantity}</Typography>
                    <Button type="button" size="small" onClick={() => handleUpdateProducQty(item.id, item.productQuantity + 1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;
