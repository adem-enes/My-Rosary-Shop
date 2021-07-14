import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Button, InputLabel, Select, FormControl } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ImageBase64 from '../../../../../../assets/classes/base64';
import { updateProduct, createProduct, deleteProduct } from '../../../../ApiServices';
import useStyles from './style';
import Input from './Input';

const CreateUpdateProduct = ({ productId, setActiveTab }) => {
    const currency = "₺";
    const product = useSelector(state => state.products?.find(p => p.id === productId));
    const categories = useSelector(state => state.categories);
    const classes = useStyles();
    const [image, setImage] = useState(product?.image || '');

    const handleSubmit = (event) => {
        product ?
            updateProduct({
                id: product.id,
                productName: event.target.productName.value || product.productName,
                description: event.target.description.value || product.description,
                quantity: event.target.quantity.value || product.quantity,
                price: event.target.price.value || product.price,
                image: image,
                categoryId: event.target.category.value === '' ? product.categoryId
                    : Number(event.target.category.value)
            }) :
            createProduct({
                productName: event.target.productName.value,
                description: event.target.description.value,
                quantity: event.target.quantity.value,
                price: event.target.price.value,
                image: image,
                categoryId: Number(event.target.category.value)
            });

        setTimeout(() => window.location.reload(), 1000);
        event.preventDefault();
    }
    const SelectMenu = () => (
        <FormControl variant="outlined" style={{ width: '100%' }}>
            <Select native name="category" required={product ? false : true}>
                <option value=""></option>
                {categories && categories.map((category) => (
                    <option key={category.id}
                        value={category.id}>{category.categoryName}</option>
                ))}
            </Select>
        </FormControl>
    );

    return (
        <main className={classes.content}>
            <>
                <Grid container spacing={2} style={{ minHeight: '80.5vh' }}>
                    <Grid item xs={12} sm={6} >
                        <img className={classes.media}
                            src={image} alt={product?.productName || 'No Image '} />
                    </Grid>
                    <Grid container item xs={12} sm={6}>
                        <form onSubmit={handleSubmit}>
                            <Grid container item xs={12} spacing={2} style={{ height: 300 }}>
                                <Input label="Product Name" name="productName"
                                    placeholder={product?.productName}
                                    required={product ? false : true} />
                                <Input label="Description" name="description"
                                    placeholder={product?.description}
                                    required={product ? false : true} />
                                <Input label="Quantity" name="quantity" sm={6} type="tel"
                                    placeholder={`${product?.quantity || 0}`}
                                    required={product ? false : true} />
                                <Input label={`Price (${currency})`} name="price" sm={6} type="tel"
                                    placeholder={`${product?.price || 0}${currency}`}
                                    required={product ? false : true} />

                                <Grid container item xs={12} spacing={1}>
                                    <Grid item xs={12} sm={8}>
                                        <InputLabel style={{ color: '#000000' }}>Category</InputLabel>
                                        <SelectMenu />
                                    </Grid>
                                    <Grid item xs={12} sm={4} style={{
                                        display: 'flex',
                                        alignItems: 'flex-end', justifyContent: 'center'
                                    }}>
                                        <Button onClick={() => setActiveTab(3)}
                                            variant="outlined" color="primary">New Category</Button>
                                    </Grid>
                                </Grid>

                                <ImageBase64 multiple={false} required={product ? false : true}
                                    onDone={({ base64 }) => setImage(base64)} />
                                <Grid item xs={12} sm={12} className={classes.updateButton}>
                                    <Button type="submit" variant="outlined" color="primary">
                                        {product ? 'Update' : 'Create'}</Button>
                                </Grid>
                                {product ? (
                                    <Grid item xs={12} sm={12} className={classes.updateButton}>
                                        <Button color="secondary" variant="outlined" size="small"
                                            onClick={() => {
                                                deleteProduct(product.id);
                                                setTimeout(() => window.location.reload(), 1000);
                                            }}>
                                            <DeleteOutlineIcon style={{ fontSize: 30 }} />
                                        </Button>
                                    </Grid>
                                ) : null}
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </>
        </main>
    )
}

export default CreateUpdateProduct;
