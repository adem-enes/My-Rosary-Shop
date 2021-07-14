import React from 'react';
import useStyles from './style';
import CloseIcon from '@material-ui/icons/Close';
import { Grid, Typography } from '@material-ui/core';

const SideBar = ({ activeTab, setActiveTab, setOpenSide }) => {
    const classes = useStyles();

    return (
        <div className={classes.nav}>
            <Grid container>
                <Grid item xs={10} sm={10} >
                    <Typography variant='h5' style={{ cursor: 'pointer' }}
                        onClick={() => window.location.assign('/admin')}>Admin</Typography>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <CloseIcon className={classes.closeIcon} onClick={() => setOpenSide(prev => !prev)} />
                </Grid>
                <Grid item xs={12} sm={12} onClick={() => setActiveTab(0)}
                    className={activeTab === 0 ? `${classes.link} ${classes.activeLink}` : classes.link}>
                    <Typography variant='h6'>Products</Typography>
                </Grid>
                <Grid item xs={12} sm={12} onClick={() => setActiveTab(1)}
                    className={activeTab === 1 ? `${classes.link} ${classes.activeLink}` : classes.link}>
                    <Typography variant='h6'>Orders</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default SideBar;
