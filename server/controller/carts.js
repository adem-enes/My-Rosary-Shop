import db from '../config/db.js';
//! Don't forget to put ';' any query end if you use + after that 

export const createCart = (req, res) => {
    let sql = "INSERT INTO carts VALUES ();";
    const { totalPrice } = req.body;

    db.query(sql, totalPrice, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
}

export const cartInfo = (req, res) => {
    const { id } = req.params;
    let sql = "SELECT * FROM carts WHERE id = ?;";

    db.query(sql, id, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
}
export const carts = (req, res) => {
    const { id } = req.params;
    let sql = "SELECT * FROM carts;";

    db.query(sql, id, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
}

export const deleteCart = (req, res) => {
    const { id } = req.params;
    let sql = "DELETE FROM carts WHERE id = ?;";

    db.query(sql, id);
}