import React from 'react';
import {
    Typography, Grid, TableContainer, Table,
    TableHead, TableBody, TableRow, TableCell, Paper
} from '@material-ui/core';

const Confirmation = ({ order }) => {
    const currency = "₺";

    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid container item xs={12}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Customer</Typography>
                        <Typography variant="body2">
                            {order.order.customerName} {order.order.customerLastName}
                        </Typography>
                        <Typography variant="body2">{order.order.customerEmail}</Typography>
                        <Typography variant="body2">{order.order.customerPhoneNumber}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
                        <Typography variant="h6">Address</Typography>
                        <Typography variant="body2">{order.order.address}</Typography>
                        <Typography variant="body2">
                            {order.order.city}/{order.order.state}
                        </Typography>
                        <Typography variant="body2">
                            {order.order.country}, {order.order.postalCode}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="right">Qty.</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.orderedProducts.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.productName}</TableCell>
                                        <TableCell align="center">
                                            <img src={row.image}
                                                alt={row.productName} height="30" />
                                        </TableCell>
                                        <TableCell align="right">{row.productQuantity}</TableCell>
                                        <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                                        <TableCell align="right">
                                            {ccyFormat(row.total)}
                                        </TableCell>
                                    </TableRow>
                                ))}

                                <TableRow >
                                    <TableCell rowSpan={3} />
                                    <TableCell rowSpan={3} />
                                    <TableCell rowSpan={3} />
                                    <TableCell >Subtotal</TableCell>
                                    <TableCell align="right">
                                        {ccyFormat(order.order.productsPrice)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Shipping</TableCell>
                                    <TableCell align="right">
                                        {ccyFormat(order.order.shippingPrice)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                        Total</TableCell>
                                    <TableCell align="right" style={{ fontWeight: 'bold' }}>
                                        {ccyFormat(order.order.totalPrice)}{currency}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} style={{textAlign:'center'}}>
                    <button style={{border: 'none'}}
                     onClick={() => window.print()}>Print The Page</button>
                </Grid>
            </Grid>
        </>
    )
}

export default Confirmation;
