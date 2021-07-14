import React from 'react';
import { Grid, Card, Button, ButtonBase, Typography } from '@material-ui/core';
import useStyles from './style';

const Products = ({ setActiveTab, setUpdateProduct, product }) => {
    const currency = "₺";
    const classes = useStyles();

    return (
        <Card>
            <Grid container spacing={2}>
                <Grid item >
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} alt={product.productName} src={product.image} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={6} sm container>
                    <Grid item xs container direction="column" spacing={2} className={classes.cardContent}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1"> {product.productName}</Typography>
                            <Typography variant="body2" gutterBottom color="textSecondary">
                                {product.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">{product.quantity} Adet</Typography>
                        </Grid>
                    </Grid>
                    <Grid className={classes.cartActions}>
                        <Grid item>
                            <Typography variant="subtitle1" style={{ textAlign: 'right', margin: '10px' }}
                            >{product.price}{currency}</Typography>
                        </Grid>
                        <Grid container item style={{alignItems:'flex-end', flexDirection:'column'}}>
                            <Grid item xs={12}>
                                <Button color="primary" variant="outlined" size="small"
                                    onClick={() => { setActiveTab(2); setUpdateProduct(product.id) }}
                                > Update </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>

    );
}
export default Products;