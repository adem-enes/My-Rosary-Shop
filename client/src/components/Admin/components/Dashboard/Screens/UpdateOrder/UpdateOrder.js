import React, { useEffect, useState } from 'react';
import {
    Grid, Typography, CircularProgress, Table, TableBody,
    TableHead, TableCell, Paper, TableRow, TableContainer
} from '@material-ui/core';
import { getTheOrder, getStatuses } from '../../../../ApiServices';

const UpdateOrder = ({ updateOrder }) => {
    const [order, setOrder] = useState();
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const currency = "₺";

    useEffect(() => {
        if (!order) getTheOrder(updateOrder.orderId, updateOrder.cartId)
            .then((response) => {
                setOrder(response.data.order);
                setOrderedProducts(response.data.orderedProducts);
            });
        if (statuses.length <= 0) getStatuses().then((response) => setStatuses(response.data));
    }, [updateOrder, order, statuses, orderedProducts]);

    const ccyFormat = (num) => {
        return `${num.toFixed(2)}`;
    }

    const update = () => (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                ID#: {order?.id}
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6">Customer</Typography>
                <Typography variant="body2">
                    {order?.customerName} {order?.customerLastName}
                </Typography>
                <Typography variant="body2">{order?.customerEmail}</Typography>
                <Typography variant="body2">{order?.customerPhoneNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
                <Typography variant="h6">Address</Typography>
                <Typography variant="body2">{order?.address}</Typography>
                <Typography variant="body2">
                    {order?.city}/{order?.state}
                </Typography>
                <Typography variant="body2">
                    {order?.country}, {order?.postalCode}</Typography>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper} style={{width: '90%'}}>
                    <Table aria-label="spanning table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Qty.</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderedProducts.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.productName}</TableCell>
                                    <TableCell align="right">{row.productQuantity}</TableCell>
                                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                                    <TableCell align="right">
                                        {ccyFormat(Number(row.total))}
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow >
                                <TableCell rowSpan={3} />
                                <TableCell rowSpan={3} />
                                <TableCell >Subtotal</TableCell>
                                <TableCell align="right">
                                    {ccyFormat(Number(order.productsPrice))}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Shipping</TableCell>
                                <TableCell align="right">
                                    {ccyFormat(order.shippingPrice)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                    Total</TableCell>
                                <TableCell align="right" style={{ fontWeight: 'bold' }}>
                                    {ccyFormat(order.totalPrice)}{currency}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
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
