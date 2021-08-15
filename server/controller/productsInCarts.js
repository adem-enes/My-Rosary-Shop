import db from '../config/db.js';

export const productsInTheCarts = (req, res) => {
    let sql = "SELECT * FROM products_in_the_carts;";

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
        res.send(results);
    });
}

export const allProductsInTheCart = (req, res) => {
    const { cartId } = req.params;
    getCartAndItsProducts(cartId, res);
}

export const sendProductToCart = (req, res) => {
    const { cartId, productId, quantity } = req.body;
    let sql = "INSERT INTO products_in_the_carts (cartId, productId, productQuantity) VALUES(?,?,?);";

    db.query(sql, [cartId, productId, quantity], (error, results) => {
        if (error) console.log(error.message);

        getCartAndItsProducts(cartId, res);
    });
}

export const addDelQty = (req, res) => {
    const { id } = req.params;
    const { productQuantity, cartId } = req.body;
    let sql = productQuantity != 0 ?
        'UPDATE products_in_the_carts SET productQuantity = ? WHERE id = ? AND cartId = ?;':
        'DELETE FROM products_in_the_carts WHERE id = ?;';
        
    productQuantity !=0 ? 
        db.query(sql, [productQuantity, id, cartId], (error, results) => {
            if (error) console.log(error.message);

            getCartAndItsProducts(cartId, res);
        }):
        db.query(sql, id, (error, results) => {
            if (error) console.log(error.message);

            getCartAndItsProducts(cartId, res);
        });
}

export const deleteProductFromCart = (req, res) => {
    const { id } = req.params;
    const { cartId } = req.body;
    let sql = 'DELETE FROM products_in_the_carts WHERE id = ? AND cartId = ?';

    db.query(sql, [id, cartId], (error, results) => {
        if (error) console.log(error.message);

        getCartAndItsProducts(cartId, res);
    });
}

export const deleteAllProductsFromCart = (req, res) => {
    const { cartId } = req.params;
    let sql = 'DELETE FROM products_in_the_carts WHERE cartId = ?';

    db.query(sql, [cartId], (error, results) => {
        if (error) console.log(error.message);

        getCartAndItsProducts(cartId, res);
    });
}

const getCartAndItsProducts = (cartId, res) => {
    let sql = 'SELECT * FROM carts WHERE id=?;' +
    'SELECT pitc.*, p.productName, p.image, p.description, p.price  FROM products_in_the_carts as pitc LEFT JOIN products as p ' +
    'ON p.id = pitc.productId WHERE cartId = ?;';

    db.query(sql, [cartId, cartId], (error, results) => {
        if (error) console.log(error.message);

        const updatedCart = results[0][0];
        const productsInTheCarts = results[1];

        res.send({cart: updatedCart, productsInTheCarts});
    });
}

const updateCart = (id) => {
    let sql = " UPDATE carts SET lastUpdatedTime = NOW()," +
        "totalPrice = (SELECT sum(products.price*products_in_the_carts.productQuantity) as totalPrice " +
        "FROM products_in_the_carts INNER JOIN products ON products.id = products_in_the_carts.productId WHERE cartId = carts.id) " +
        "WHERE id = ?;";
    db.query(sql, id);
}
