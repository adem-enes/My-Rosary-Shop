import db from '../config/db.js';

export const productsInTheCarts = (req, res) => {
    let sql = "SELECT * FROM products_in_the_carts;";

    db.query(sql, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
}

export const sendProductToCart = (req, res) => {
    const { cartId, productId, quantity } = req.body;
    let sql = "INSERT INTO products_in_the_carts (cartId, productId, productQuantity) VALUES(?,?,?);";

    db.query(sql, [cartId, productId, quantity], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
}

export const addDelQty = (req, res) => {
    const { id } = req.params;
    const { qty, cartId } = req.body;
    let sql = 'UPDATE products_in_the_carts SET productQuantity = ? WHERE id = ? AND cartId = ?;'

    db.query(sql, [qty, id, cartId], (error, results) => {
        if (error) throw error;

        res.send({ message: 'Changes Made' });
    });
}

export const deleteProductFromCart = (req, res) => {
    const { id } = req.params;
    const { cartId } = req.body;
    let sql = 'DELETE FROM products_in_the_carts WHERE id = ? AND cartId = ?';

    db.query(sql, [id, cartId], (error, results) => {
        if (error) throw error;

        res.send({ message: `This id: ${id} deleted from this cart: ${cartId}` });
    });
}


const updateCart = (id) => {
    let sql = " UPDATE carts SET lastUpdatedTime = NOW()," +
        "totalPrice = (SELECT sum(products.price*products_in_the_carts.productQuantity) as totalPrice " +
        "FROM products_in_the_carts INNER JOIN products ON products.id = products_in_the_carts.productId WHERE cartId = carts.id) " +
        "WHERE id = ?;";
    db.query(sql, id);
}
