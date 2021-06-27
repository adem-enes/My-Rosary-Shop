import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CssBaseline } from '@material-ui/core';

import useStyle from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import { getShippingMethods } from '../../../redux/actions/shippingMethods';
import { useDispatch } from 'react-redux';

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
    const dispatch = useDispatch();
    const classes = useStyle();
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});

    useEffect(() => {
        dispatch(getShippingMethods());
    }, [dispatch]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const Form = () => activeStep === 0
        ? <AddressForm next={next} />
        : <PaymentForm shippingData={shippingData}
            backStep={backStep} nextStep={nextStep} />

    const Confirmation = () => (
        <div>Confirmation</div>
    )

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
                    {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout;