import React, { useState } from 'react';
import {
    Divider, List, ListItem, Grid, TextField,
    Button, Typography, InputBase, FormControl,
    FormControlLabel, RadioGroup, Radio, Collapse
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SendIcon from '@material-ui/icons/Send';
import useStyles from './styles';

const Products = ({ setPriceRange, setChooseFilter, categories,
    filterCategories, setFilterCategories, setSearchText }) => {
    const classes = useStyles();
    const [price, setPrice] = useState({ min: 0, max: '' });
    const [openCategories, setOpenCategories] = useState(false);

    const handleSubmit = () => {
        setPriceRange({
            min: price.min,
            max: price.max
        })
        setChooseFilter(1);
    }

    const handleToggle = (value) => {
        setFilterCategories(Number(value));
        setChooseFilter(2);
    }

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="search">
                <Grid item sm={12} style={{ paddingLeft: 15 }}>
                    <Typography variant="h6">Search Item</Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onChange={(event) => {
                                setSearchText(event.target.value);
                                setChooseFilter(0);
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Grid>
            </List>
            <Divider /><Divider />
            <List component="nav" aria-label="categories">
                <Grid container item sm={12} style={{ paddingLeft: 15 }}
                    onClick={() => setOpenCategories(!openCategories)}>
                    <Grid item xs={10}>
                        <Typography variant="h6">Categories</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h6">
                            {openCategories ?
                                (<ExpandLessIcon />) :
                                (<ExpandMoreIcon />)
                            }
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item sm={12} style={{ paddingLeft: 15, display: 'flex' }} >
                    <Collapse in={openCategories}>
                        <FormControl component="fieldset" style={{ width: '100%' }}>
                            <RadioGroup aria-label="Categories" name="categories"
                                value={filterCategories.toString()}
                                onChange={(event) => handleToggle(event.target.value)}>
                                <FormControlLabel value="-1" control={<Radio />} label="All" />
                                {categories.map((category) => (
                                    <FormControlLabel value={`${category.id}`} key={category.id}
                                        control={<Radio />} label={category.categoryName} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Collapse>
                </Grid>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem >
                    <form>
                        <Grid container spacing={1}>
                            <Grid item sm={12}>
                                <Typography variant="h6">Price Range</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField name="min" size="small" placeholder="min"
                                    variant="outlined" fullWidth
                                    onChange={(event) => setPrice((props) => (
                                        {
                                            ...props, min: event.target.value !== '' ?
                                                event.target.value : 0
                                        }))} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField name="max" size="small" placeholder="max"
                                    variant="outlined" fullWidth type="tel"
                                    onChange={(event) => setPrice((props) => (
                                        { ...props, max: event.target.value }))} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button size="large"
                                    disabled={(!(price.min >= 0 && price.max !== ''
                                        && price.max / price.min >= 1))}
                                    onClick={handleSubmit} variant="outlined"
                                    style={{ width: '100%' }}><SendIcon /></Button>
                            </Grid>
                        </Grid>
                    </form>
                </ListItem>
            </List>
        </div>
    );
}
export default Products;