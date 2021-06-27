import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Review = () => {
    const cartItems = useSelector(state => state.cartItems);
    const cart = useSelector(state => state.cart);
    return (
        <>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {cartItems.map((product) => (
                    <ListItem style={{ padding: '10px 0px' }} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.productQuantity}`} />
                        <Typography variant="body2">{product.price} </Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0px' }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        {cart.totalPrice}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}

export default Review;
