import React, { useState } from 'react';
import { Typography, Button, Divider, Grid, TextField } from '@material-ui/core';
import Review from './Review';
import Cards from 'react-credit-cards';
import useStyles from './styles';
import "react-credit-cards/es/styles-compiled.css";

const PaymentForm = ({ shippingData, backStep, nextStep, cartId }) => {
    const classes = useStyles();
    const [creditCart, setCreditCart] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    });
    const handleInputChange = (e) => setCreditCart({ ...creditCart, [e.target.name]: e.target.value });
    const handleInputFocus = (e) => setCreditCart({ ...creditCart, focus: e.target.name });

    const handleSubmit = async (event) => {
        event.preventDefault();

        // if (DidAPIAccept) {
        //     console.log(error);
        // } else {
        //TODO add to Order Table 
        // TODO If Bank api accept the payment
        const orderData = {
            customerName: shippingData.firstname,
            customerLastName: shippingData.lastname,
            customerEmail: shippingData.email,
            customerPhoneNumber: shippingData.phoneNumber,
            address: shippingData.address,
            city: shippingData.city,
            postalCode: shippingData.zip,
            state: shippingData.shippingSubdivision,
            country: shippingData.shippingCountry,
            shippingMethodId: shippingData.shipping.id,
            cartId: cartId
        }
        const cartData = {
            cartNumber: creditCart.number,
            cartName: creditCart.name,
            cartCvc: creditCart.cvc,
            cartExpiry: creditCart.expiry,
        }

        nextStep();
        // }
    }

    return (
        <>
            <Review shipping={shippingData.shipping} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment Methods</Typography>
            <Grid container id="PaymentForm" className={classes.root} spacing={2}>
                <Grid item className={classes.cartVisual} xs={12} sm={6}>
                    <Cards
                        cvc={creditCart.cvc}
                        expiry={creditCart.expiry}
                        focused={creditCart.focus}
                        name={creditCart.name}
                        number={creditCart.number}
                    />
                </Grid>
                <Grid container item xs={12} sm={6}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} className={classes.cartInfos}>
                            <Grid item xs={12} sm={12} style={{}}>
                                <TextField size="small" fullWidth
                                    variant="outlined"
                                    label="Card Number"
                                    type="tel"
                                    name="number"
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField size="small" fullWidth
                                    variant="outlined"
                                    label="Name on Cart"
                                    type="text"
                                    name="name"
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField size="small" fullWidth
                                    variant="outlined"
                                    label="Expire Date"
                                    type="tel"
                                    name="expiry"
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    InputProps={{ inputProps: { maxLength: 4 } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField size="small" fullWidth
                                    variant="outlined"
                                    label="CVC"
                                    type="tel"
                                    name="cvc"
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                            </Grid>
                        </Grid>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" color="secondary" size="small"
                                onClick={backStep}>
                                Back</Button>
                            <Button type="submit" variant="contained" color="primary">Pay</Button>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </>
    )
}

export default PaymentForm;
