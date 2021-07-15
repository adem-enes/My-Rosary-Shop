import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import productsRoute from './routes/products.js';
import createTheTablesRoute from './routes/createTheTables.js';
import cartsRoute from './routes/carts.js';
import categoriesRoute from './routes/categories.js';
import productsInCartsRoute from './routes/productsInCarts.js';
import shippingMethodsRoute from './routes/shippingMethods.js';
import ordersRoute from './routes/orders.js';
import statusesRoute from './routes/statuses.js';
import usersRoute from './routes/users.js';
import db from './config/db.js';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50000 }));

app.use('/products', productsRoute);
app.use('/createTables', createTheTablesRoute);
app.use('/carts', cartsRoute);
app.use('/categories', categoriesRoute);
app.use('/productsInCarts', productsInCartsRoute);
app.use('/shippings', shippingMethodsRoute);
app.use('/orders', ordersRoute);
app.use('/statuses', statusesRoute);
app.use('/users',usersRoute);



app.listen('3001', (req, res) => {
    console.log('Server Running');
});
