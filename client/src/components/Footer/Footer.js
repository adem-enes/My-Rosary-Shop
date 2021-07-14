import React from 'react';
import {Typography, CssBaseline } from '@material-ui/core';
import useStyle from './style';

const Footer = () => {
    const classes = useStyle();



    return (
        <div className={classes.footer}>
            <CssBaseline />
            <Typography variant="h6" style={{textAlign: "center"}}>Footer</Typography>
        </div>

    )
}

export default Footer
