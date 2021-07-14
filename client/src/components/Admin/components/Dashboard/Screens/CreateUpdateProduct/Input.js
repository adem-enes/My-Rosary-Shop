import React from 'react';
import { Grid, TextField, InputLabel } from '@material-ui/core';


const Input = ({ placeholder, label, name, sm = 12, type = 'text', required = false }) => {
    return (
        <Grid item xs={12} sm={sm}>
            <InputLabel style={{ color: '#000000' }}>{label}</InputLabel>
            <TextField
                placeholder={placeholder}
                name={name}
                type={type}
                fullWidth
                required={required}
                variant="outlined" />
        </Grid>
    )
}

export default Input;
