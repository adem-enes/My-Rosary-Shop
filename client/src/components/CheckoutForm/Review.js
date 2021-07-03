import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Review = ({ shipping }) => {
    const cartItems = useSelector(state => state.cartItems);
    const cart = useSelector(state => state.cart);
    const currency = "₺";

    return (
        <>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {cartItems.map((product) => (
                    <ListItem style={{ padding: '0px' }} key={product.productName}>
                        <ListItemText primary={product.productName} secondary={`Quantity: ${product.productQuantity}`} />
                        <Typography variant="body2">{currency}{product.price * product.productQuantity}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '0px' }}>
                    <ListItemText primary="Shipping" secondary={shipping.shippingCompany} />
                    <Typography variant="body2">{currency}{shipping.shippingPrice}</Typography>
                </ListItem>
                <ListItem style={{ padding: '10px 0px' }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                        {currency}{cart.totalPrice + shipping.shippingPrice}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}

export default Review;
