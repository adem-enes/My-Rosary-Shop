import React, { useState } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import Review from './Review';

const PaymentForm = ({ shippingData, backStep, nextStep }) => {

    const [creditCart, setCreditCart] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    });
    const handleSubmit = async (event, elements) => {
        event.preventDefault();

        // if (DidAPIAccept) {
        //     console.log(error);
        // } else {
            //TODO add to Order Table 
            // TODO If Bank api accept the payment
            const orderData = {
                // line_items: cartItems,
                customer: {
                    firstname: shippingData.firstname,
                    lastname: shippingData.lastname,
                    email: shippingData.email,
                },
                shipping: {
                    name: 'Primary',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    country_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry,
                },
                // fulfillment: { shipping_method: shippingData.shippingOption },
                // payment: {
                //     gateway: 'stripe',
                //     stripe: {
                //         payment_method_id: paymentMethod.id,
                //     }
                // }
            }

            nextStep();
        // }
    }

    return (
        <>
            <Review />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment Methods</Typography>
            
        </>
    )
}

export default PaymentForm;
