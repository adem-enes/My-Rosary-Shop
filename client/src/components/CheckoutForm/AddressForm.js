import React, { useState } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField } from '@material-ui/core';
import { Country, State } from 'country-state-city';
import { Link } from 'react-router-dom';

import FormInput from './CustomTextField';

const AddressForm = ({ next, shipping_methods }) => {
    const currency = "₺";

    const [country, setCountry] = useState('TR');
    const [states, setStates] = useState('25');
    const [shipping, setShipping] = useState(shipping_methods[0]?.id);

    const onSubmit = (event) => {
        const addressData = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            address: event.target.address.value,
            email: event.target.email.value,
            phoneNumber:event.target.phoneNumber.value,
            city: event.target.city.value,
            postalCode: event.target.zip.value,
            country: Country.getCountryByCode(country).name,
            state: State.getStateByCodeAndCountry(states, country).name,
            shipping: shipping_methods
                .find((method) => method.id === shipping),
        };

        next(addressData);
        event.preventDefault();
    }

    return (
        <>
            <Typography variant="h6" gutterBottom >Shipping Address</Typography>
            <form onSubmit={onSubmit} >
                <Grid container spacing={2}>
                    <FormInput name='firstName' label='First Name' />
                    <FormInput name='lastName' label='Last Name' />
                    <FormInput name='email' label='Email' />
                    <FormInput name='phoneNumber' label='Phone Number' />
                    <Grid item xs={12} sm={12}>
                        <TextField name="address" label="Address" fullWidth required />
                    </Grid>
                    <FormInput name='city' label='City' />
                    <FormInput name='zip' label='ZIP / Postal Code' />
                    <Grid item xs={12} sm={6}>
                        <InputLabel> Shipping Country</InputLabel>
                        <Select value={Country.getCountryByCode(country).isoCode} fullWidth
                            onChange={(event) => setCountry(event.target.value)} name="country">
                            {Country.getAllCountries().map((country, index) => (
                                <MenuItem key={index} value={country.isoCode}>
                                    {country.name}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel> Shipping State</InputLabel>
                        <Select value={State.getStateByCodeAndCountry(states, country).isoCode}
                            onChange={(event) => setStates(event.target.value)} fullWidth
                            name="state">
                            {State.getStatesOfCountry(country).map((state, index) => (
                                <MenuItem key={index} value={state?.isoCode}>
                                    {state?.name}</MenuItem>)
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel> Shipping Methods</InputLabel>
                        <Select value={shipping} fullWidth
                            onChange={(event) => setShipping(event.target.value)} name="shipping" >
                            {shipping_methods.map((method, index) => (
                                <MenuItem key={index} value={method.id}>
                                    {method.shippingCompany} - (
                                    {method.shippingPrice}{currency})</MenuItem>
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
        </>
    )
}

export default AddressForm;
