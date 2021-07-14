import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './style';
import Product from './Product/Product';


const Products = ({ setActiveTab, setUpdateProduct }) => {
    const products = useSelector((state) => state.products);
    const classes = useStyles();


    return (
        <main className={classes.content}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{display:'flex', justifyContent:'center'}}>
                    <Button variant="contained" color="primary" className={classes.newButton}
                        onClick={() => setActiveTab(2)}>Create New Product</Button>
                </Grid>
                <Grid container item justify="center" spacing={1} xs={12} sm={12}
                    style={{ marginLeft: '10px' }}>
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6}>
                            <Product setActiveTab={setActiveTab}
                                setUpdateProduct={setUpdateProduct}
                                product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </main>
    );
}
export default Products;