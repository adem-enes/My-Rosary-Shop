import React, { useState, useEffect } from 'react';
import useStyles from './style';
import SideBar from './SideBar/SideBar';
import { Grid, SwipeableDrawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../../../redux/actions/products';
import { screens } from './Screen';

const Admin = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(0);
    const [openSide, setOpenSide] = useState(true);
    const [updateProduct, setUpdateProduct] = useState();
    const [updateOrder, setUpdateOrder] = useState();
    const props = {
        updateProduct, setUpdateProduct, activeTab, setActiveTab,
        updateOrder, setUpdateOrder
    };

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    useEffect(() => {
        console.log("Total Width: " + window.screen.availWidth );
        
    }, []);

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={openSide ? 2 : 1}>
                    <div className={openSide ? `${classes.nav}`
                        : `${classes.nav} ${classes.noDisplay}`}
                        style={{ margin: '10px 5px' }}>
                        <SideBar activeTab={activeTab} setActiveTab={setActiveTab}
                            setOpenSide={setOpenSide} />
                    </div>
                    <div className={!openSide ? classes.displayMenuIcon : classes.menuIcon}
                        onClick={() => setOpenSide((prev => !prev))}>
                        <MenuIcon />
                    </div>
                    {/* <div>
                        <SwipeableDrawer
                            anchor="left"
                            open={!openSide}
                            onClose={() => setOpenSide((prev => !prev))}
                            onOpen={() => setOpenSide((prev => !prev))}
                        >
                            <SideBar activeTab={activeTab} setActiveTab={setActiveTab}
                                setOpenSide={setOpenSide} />
                        </SwipeableDrawer>
                    </div> */}
                </Grid>
                <Grid item xs={12} sm={openSide ? 10 : 11}>
                    {screens(activeTab, props)}
                </Grid>
            </Grid>
        </div>
    )
}

export default Admin;
