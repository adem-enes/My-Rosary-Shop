import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Product from './Product/Product';
import useStyles from './styles';

const Products = () => {
    const products = useSelector((state)=> state.products);
    const classes = useStyles();

    return(
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={3}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} small={6} md={3} large={4}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}
export default Products;