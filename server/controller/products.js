import db from '../config/db.js';

export const getAllProducts = (req, res) => {
    let sql = "SELECT products.*, categories.categoryName FROM products LEFT JOIN categories" +
        " ON products.categoryId =  categories.id";

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
        res.send(results);
    });
}

export const createProduct = (req, res) => {
    let sql = "INSERT INTO products (productName, image, description, price, quantity, categoryId) VALUES(?,?,?,?,?,?);"
    const { productName, image, description, price, quantity, categoryId } = req.body;

    db.query(sql, [productName, image, description, price, quantity, categoryId], (error, results) => {
        if (error) console.log(error.message);
        res.send({ message: 'Product Created Successfully' });
    });
}

export const deleteProduct = (req, res) => {
    let sql = "DELETE FROM products WHERE id = ?;";
    const { id } = req.params;

    db.query(sql, id, (error, results) => {
        if (error) console.log(error.message);
        res.send({ message: 'Product deleted' });
    });
}

export const getTheProduct = (req, res) => {
    const { id } = req.params;
    let sql = "SELECT * FROM products WHERE id = ?";

    db.query(sql, id, (error, results) => {
        if (error) console.log(error.message);
        results.length == 0 ? res.send({ message: "There is no product like this." })
            : res.send(results);
    });
}

export const updateProduct = (req, res) => {
    let sql = "UPDATE products SET  categoryId=?, productName=?, image=?, " +
        "description=?, price=?, quantity=? WHERE id=?";
    const { productName, image, description, price, quantity, categoryId } = req.body;
    const { id } = req.params;

    //!I need to find which one or ones has changed so I can update them...
    //I randomly put productName in there I really need to do this ↑ thing..
    db.query(sql, [categoryId, productName,
        image, description, price, quantity, id], (error, results) => {
            if (error) console.log(error.message);
            res.send({ message: 'Product Updated' });
        });
}
