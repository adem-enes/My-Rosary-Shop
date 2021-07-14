import db from '../config/db.js';
import generatePdf from '../components/pdf-generator.js';
import sendMail from '../components/mail-sender.js';

export const getOrders = (req, res) => {
    let sql = "SELECT * FROM orders";

    db.query(sql, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
}

export const createOrder = (req, res) => {
    const {
        customerName, customerLastName, customerEmail, customerPhoneNumber,
        address, city, postalCode, state, country, statusId,
        shippingMethodId, cartId } = req.body;

    let sqlOrder = "INSERT INTO orders (customerName, customerLastName, customerEmail," +
        " customerPhoneNumber, address, city, postalCode, state, country, status, shippingCompany, " +
        " shippingPrice, productsPrice, totalPrice ) " +
        "SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Sipariş Alındı'," +
        " shippingCompany, shippingPrice, totalPrice as cartsTotalPrice, " +
        " sum(carts.totalPrice + shipping_methods.shippingPrice) as totalPrice " +
        "FROM shipping_methods, carts WHERE shipping_methods.id = ? AND carts.id = ?;"

    db.query(sqlOrder, [customerName, customerLastName, customerEmail, customerPhoneNumber,
        address, city, postalCode, state, country, shippingMethodId, cartId], (error, results) => {
            if (error) throw error;
            callIt(res, cartId, results.insertId);
        });
    // TODO after this create new function to get order infos and all products that ordered..
    // TODO to get created order id results.insertId is the answer
    // TODO the query is ready just there is an error. Find it..
}
const callIt = (res, cartId, orderId) => {
    const formatterTR = new Intl.DateTimeFormat('tr', { dateStyle: 'full' });
    let sql = "SELECT p.id as productId, p.productName, p.image, " +
        " p.price, pinthec.productQuantity FROM products as p " +
        " LEFT JOIN products_in_the_carts as pinthec ON" +
        " p.id = pinthec.productId WHERE cartId = ?; " +
        "SELECT * FROM orders WHERE id = ?;";
    db.query(sql, [cartId, orderId], (error, results) => {
        const theOrder = {
            orderedProducts: results[0],
            order: results[1][0]
        };
        const date = new Date(theOrder.order.orderDate);
        const orderDate = formatterTR.format(date);

        theOrder.order.productsPrice = theOrder.order.productsPrice.toFixed(2);
        theOrder.order.orderDateTr = orderDate;
        
        theOrder.orderedProducts.map((product) => {
            const newOne = product;
            newOne.total = (newOne.price * newOne.productQuantity).toFixed(2);
            return newOne;
        });

        generatePdf(theOrder, 'invoice3')
            .then(sendMail(theOrder.order, 'Order Accepted', 'OrderAcc'));

        res.send(theOrder);
    });
}

export const callOrder = (req, res) => {
    const { id } = req.params;
    let sql = "SELECT * FROM orders WHERE id = ?;";

    db.query(sql, [id], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
}

export const callOrderWithProducts = (req, res) => {
    const { cartId, orderId } = req.params;
    let sql = "SELECT p.id, p.productName, p.image, " +
        " p.price, pinthec.productQuantity FROM products as p " +
        " LEFT JOIN products_in_the_carts as pinthec ON" +
        " p.id = pinthec.productId WHERE cartId = ?; " +
        "SELECT * FROM orders WHERE id = ?;";

    db.query(sql, [cartId, orderId], (error, results) => {
        const theOrder = {
            orderedProducts: results[0],
            order: results[1][0]
        };
        theOrder.orderedProducts.map((product) => {
            product.total = (product.price * product.productQuantity).toFixed(2);
        });

        generatePdf(theOrder, 'invoice3')
            .then(sendMail(theOrder.order, 'Order Accepted', 'OrderAcc'));

        res.send(theOrder);
    });

    // TODO callIt and callOrderWithProducts is same functions be careful delete one of them..
}

export const updateStatusOfOrder = (req, res) => {
    const { orderId, statusId } = req.params;
    let sql = "UPDATE orders SET status = (SELECT status FROM statuses WHERE id = ?) " +
        "WHERE id = ? ;" +
        "SELECT * FROM orders WHERE id = ?;" +
        "SELECT * FROM statuses ORDER BY id ASC;";

    db.query(sql, [statusId, orderId, orderId], (error, results) => {
        const updatedResult = results[0];
        const order = results[1][0];
        const statuses = results[2];

        if (updatedResult.changedRows != 0) {
            switch (order.status) {
                case statuses[1].status:
                    const pdfName = order.id + "-" + order.customerEmail + ".pdf";
                    sendMail(order, 'Order Approved', 'OrderApp', pdfName);
                    break;
                case statuses[2].status:
                    sendMail(order, 'Order Shipped', 'OrderShip');
                    break;
                case statuses[3].status:
                    sendMail(order, 'Order Arrived', 'OrderComp');
                    break;
                default:
                    break;
            }
        }
        res.send(results);
    });
}
