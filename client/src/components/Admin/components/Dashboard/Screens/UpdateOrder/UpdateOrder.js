import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { getTheOrder, getStatuses } from '../../../../ApiServices';

const UpdateOrder = ({ updateOrder }) => {
    const [order, setOrder] = useState();
    const [statuses, setStatuses] = useState();

    useEffect(() => {
        getTheOrder(updateOrder).then((response) => setOrder(response.data));
        getStatuses().then((response) => setStatuses(response.data));
    }, [updateOrder]);

    console.log(updateOrder);
    console.log(order);
    console.log(statuses);

    const update = () => (
        <Grid container>
            <Grid item xs={12}>
                <Typography>{order}</Typography>

            </Grid>
            <Grid item xs={12}>
                ID#: {order.id}
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6">Customer</Typography>
                <Typography variant="body2">
                    {order.customerName} {order.customerLastName}
                </Typography>
                <Typography variant="body2">{order.customerEmail}</Typography>
                <Typography variant="body2">{order.customerPhoneNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
                <Typography variant="h6">Address</Typography>
                <Typography variant="body2">{order.address}</Typography>
                <Typography variant="body2">
                    {order.city}/{order.state}
                </Typography>
                <Typography variant="body2">
                    {order.country}, {order.postalCode}</Typography>
            </Grid>
        </Grid>
    )

    return (
        <>
            {!order ? <CircularProgress /> : update()}
        </>
    )
}

export default UpdateOrder;
