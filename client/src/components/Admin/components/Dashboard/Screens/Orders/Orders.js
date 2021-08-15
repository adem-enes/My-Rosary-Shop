import React, { useState, useEffect } from 'react';
import {
    TableContainer, Table, Collapse, Box,
    TableHead, TableBody, TableRow, TableCell, Paper, IconButton,
    CircularProgress
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { getOrders } from '../../../../ApiServices';
import useStyles from './style';
import { order } from '../../../../../../redux/api';

const Orders = ({ setActiveTab, setUpdateOrder }) => {
    const classes = useStyles();
    const currency = "₺";
    const [orders, setOrders] = useState();

    useEffect(() => {
        getOrders().then((response) => setOrders(response.data));
    }, []);

    const update = (orderId, cartId) => {
        console.log(orderId, cartId);
        setUpdateOrder({ orderId: orderId, cartId: cartId });
        setActiveTab(4);
    }

    const OrderTable = ({ order }) => {
        const [open, setOpen] = useState(false);
        const formatterTR = new Intl.DateTimeFormat('tr', { dateStyle: 'full' });
        const date = new Date(order.orderDate);
        const orderDate = formatterTR.format(date);

        return (
            <>
                <TableRow className={classes.root}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row" style={{ cursor: 'pointer' }}
                        onClick={() => update(order.id, order.cartId)}>{order.id}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.customerLastName}</TableCell>
                    <TableCell>{order.customerEmail}</TableCell>
                    <TableCell>{order.customerPhoneNumber}</TableCell>
                    <TableCell size="small">{orderDate}</TableCell>
                    <TableCell align="right">{order.totalPrice}{currency}</TableCell>
                </TableRow>
                <TableRow >
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1} >
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: 'bold' }}>Address</TableCell>
                                            <TableCell>Country</TableCell>
                                            <TableCell>Postal Code(zip)</TableCell>
                                            <TableCell>State(Province)</TableCell>
                                            <TableCell>City</TableCell>
                                            <TableCell width="200">Address</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell component="th" scope="row">
                                                {order.country}
                                            </TableCell>
                                            <TableCell>{order.postalCode}</TableCell>
                                            <TableCell>{order.state}</TableCell>
                                            <TableCell>{order.city}</TableCell>
                                            <TableCell colSpan={2}>{order.address}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    }

    return (
        <>{!orders ? <CircularProgress /> : (
            <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell style={{ fontWeight: 'bold' }}>Id#</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>Order Date</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="right">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <OrderTable key={order.id} order={order} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>)}
        </>
    )
}

export default Orders;
