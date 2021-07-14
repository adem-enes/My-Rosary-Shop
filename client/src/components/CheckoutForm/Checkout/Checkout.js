import React, { useState, useEffect } from 'react';
import {
    Paper, Stepper, Step, StepLabel,
    Typography, CssBaseline, CircularProgress
} from '@material-ui/core';

import useStyle from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import Confirmation from '../Confirmation';

import { useDispatch, useSelector } from 'react-redux';
import { getShippingMethods } from '../../../redux/actions/justGet';
import { getAllProductsInCart } from '../../../redux/actions/carts';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cartId }) => {
    const dispatch = useDispatch();
    const classes = useStyle();
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const shipping_methods = useSelector((state) => state.shippingMethods);
    const [order, setOrder] = useState({});

    useEffect(() => {
        dispatch(getShippingMethods());
        dispatch(getAllProductsInCart(cartId));

    }, [dispatch, cartId]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const Form = () => activeStep === 0
        ? <AddressForm next={next} shipping_methods={shipping_methods} />
        : <PaymentForm shippingData={shippingData} cartId={cartId}
            backStep={backStep} nextStep={nextStep} setOrder={setOrder} />

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ?
                        (order ? <Confirmation order={order} /> : <CircularProgress />)
                        : <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout;
