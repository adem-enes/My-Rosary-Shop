import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Product from './Product/Product';
import useStyles from './styles';

import SideBar from './SideBar/SideBar';

const Products = ({ chooseFilter, setChooseFilter }) => {
    const products = useSelector((state) => state.products);
    const categories = useSelector(state => state.categories);
    const classes = useStyles();
    const [priceRange, setPriceRange] = useState({ min: 0, max: '' });
    const [searchText, setSearchText] = useState('');
    const [filterCategories, setFilterCategories] = useState(-1);

    const filtering = (products) => {
        switch (chooseFilter) {
            case 0:
                if (products.productName.toLowerCase().includes(searchText.toLowerCase())) {
                    return products;
                }
                break;
            case 1:
                if (products.price >= priceRange.min && products.price <= priceRange.max) {
                    return products;
                }
                break;
            case 2:
                if (filterCategories > 0) {
                    const category = categories?.find(category => filterCategories === category.id);
                    if (products.categoryName === category.categoryName) {
                        return products;
                    }
                }
                else if (filterCategories <= 0) return products;
                break;
            default:
                return products;
        }
    }

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container spacing={2}>
                <Grid container item justify="center" spacing={1} xs={12} sm={2} >
                    <SideBar setPriceRange={setPriceRange}
                        setChooseFilter={setChooseFilter}
                        categories={categories}
                        setFilterCategories={setFilterCategories}
                        filterCategories={filterCategories}
                        setSearchText={setSearchText} />
                </Grid>
                <Grid container item justify="center" spacing={2} xs={12} sm={10}
                    style={{ marginLeft: '10px' }}>
                    {products.filter((products) => {
                        return filtering(products);
                    })
                        .map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                <Product product={product} />
                            </Grid>
                        ))}
                </Grid>
            </Grid>
        </main>
    );
}
export default Products;