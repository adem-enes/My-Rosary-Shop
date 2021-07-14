import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './styles';
import logo from '../../assets/images/commerce.png';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const totalItems = useSelector((state) => state.cartItems.length);
    const classes = useStyles();
    const location = useLocation();

    return (
        <div className={classes.grow}>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar className={classes.toolbar}>
                    <img src={logo} alt="" height="40px" className={classes.image} />
                    <Typography component={Link} to="/" variant="h6"
                        className={classes.title} color="inherit">
                        Tesbihcim Oltu
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' &&
                        <div className={classes.button}>
                            <IconButton component={Link} to="/cart"
                                aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;
