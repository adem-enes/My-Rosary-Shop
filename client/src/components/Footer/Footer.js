import React from 'react';
import { Typography, CssBaseline, Grid, Container } from '@material-ui/core';
import useStyle from './style';

const Footer = () => {
    const classes = useStyle();



    return (
        <div className={classes.footer}>
            <CssBaseline />
            <Grid container style={{ height: '100%' }}>
                <Grid item xs={12} md={5} className={classes.footerHeader}>
                    <Typography variant="h5">TESBİHCİM OLTU</Typography>
                </Grid>
                <Grid container item xs={12} md={4} className={classes.footerAddress}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" >Belediye Pasajı</Typography>
                        <Typography variant="h6" >Belediye Pasajı</Typography>
                        <Typography variant="h6" >Belediye Pasajı</Typography>
                    </Grid>
                </Grid>

                <Grid container item xs={12} md={3} className={classes.footerPhnName} style={{ width: '100%' }}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" >İbrahim Yıldırım</Typography>
                        <Typography variant="h6" >Phone</Typography>
                    </Grid>
                </Grid>
            </Grid>

        </div>

    )
}

export default Footer
