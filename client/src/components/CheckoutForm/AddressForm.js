import React, { useState } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Country, State } from 'country-state-city';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

import FormInput from './CustomTextField';

const AddressForm = ({ next }) => {
    const methods = useForm();
    const shipping_methods = useSelector((state) => state.shippingMethods);

    const [country, setCountry] = useState('TR');
    const [states, setStates] = useState('25');

    // console.log(State.getStatesOfCountry('TR'));
    // console.log(Country.getCountryByCode('TR'));

    return (
        <>{!shipping_methods.length ? 'Loading' : (
            <>
                <Typography variant="h6" gutterBottom >Shipping Address</Typography>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit = ((data) => next({ ...data }))}>
                        <Grid container spacing={2}>
                            <FormInput name='firstName' label='First Name' />
                            <FormInput name='lastName' label='Last Name' />
                            <FormInput name='address1' label='Address' />
                            <FormInput name='email' label='Email' />
                            <FormInput name='City' label='City' />
                            <FormInput name='zip' label='ZIP / Postal Code' />
                            <Grid item xs={12} sm={6}>
                                <InputLabel> Shipping Country</InputLabel>
                                <Select value={Country.getCountryByCode(country).isoCode} fullWidth
                                    onChange={(event) => setCountry(event.target.value)}>
                                    {Country.getAllCountries().map((country, index) => (
                                        <MenuItem key={index} value={country.isoCode}>{country.name}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel> Shipping State</InputLabel>
                                <Select value={State.getStateByCodeAndCountry(states, country).isoCode} fullWidth
                                    onChange={(event) => setStates(event.target.value)}>
                                    {State.getStatesOfCountry(country).map((state, index) => (
                                        <MenuItem key={index} value={state?.isoCode}>{state?.name}</MenuItem>)
                                    )}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel> Shipping Methods</InputLabel>
                                <Select value={shipping_methods[0].shippingCompany} fullWidth >
                                    {shipping_methods.map((methods, index) => (
                                        <MenuItem key={index} value={methods.shippingCompany}>{methods.shippingCompany}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button component={Link} to="/cart" variant="outlined" color="secondary">
                                Back to Cart</Button>
                            <Button type="submit" variant="contained" color="primary">Next</Button>
                        </div>
                    </form>
                </FormProvider>
            </>
        )
        }</>
    )
}

export default AddressForm;
