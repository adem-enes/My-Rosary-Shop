import React from 'react';
import { TextField, Grid } from '@material-ui/core';

const FormInput = ({ name, label }) => {

    return (
        <Grid item xs={12} sm={6}>
            <TextField
                name={name}
                label={label}
                fullWidth
                required
            />
        </Grid>
    )
}

export default FormInput;
