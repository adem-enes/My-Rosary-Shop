import React from 'react';
import { Typography, Button, Card, Grid, ButtonBase } from '@material-ui/core';
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
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} alt={item.productName} src={item.image} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={6} sm container>
                    <Grid item xs container direction="column" spacing={2} className={classes.cardContent}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1"> {item.productName}</Typography>
                            <Typography variant="body2" gutterBottom color="textSecondary">
                                {item.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" onClick={() => onRemoveFromCart(item.id)}
                                className={classes.removeButton}>
                                Remove
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid className={classes.cartActions}>
                        <Grid item>
                            <Typography variant="subtitle1" style={{ textAlign: 'right', margin: '10px' }}
                            >{item.price}{currency}</Typography>
                        </Grid>
                        <Grid item>
                            <div className={classes.buttons}>
                                <Button onClick={() => handleUpdateProducQty(item.id, item.productQuantity - 1)}
                                    type="button" size="small" >-</Button>
                                <Typography>{item.productQuantity}</Typography>
                                <Button onClick={() => handleUpdateProducQty(item.id, item.productQuantity + 1)}
                                    type="button" size="small" >+</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default CartItem;
