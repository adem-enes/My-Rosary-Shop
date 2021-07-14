import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { addCategory } from '../../../../ApiServices';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        marginTop: 50
    },
    button: {
        marginTop: '10px',
        width: '100%'
    },
    backButton: {
        marginTop: '10px',
        display:'flex',
        justifyContent:'center',
    }
}));

const Category = () => {
    const classes = useStyle();


    const addNewCategory = (event) => {
        addCategory({
            categoryName: event.target.categoryName.value,
        });

        setTimeout(() => window.location.reload(), 1000);
        event.preventDefault();
    }

    return (
        <Grid container className={classes.root}>
            <form style={{ width: '90%' }} onSubmit={addNewCategory}>
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            label="New Category"
                            type="text"
                            name="categoryName"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" color="primary" variant="contained"
                            className={classes.button}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}

export default Category;
