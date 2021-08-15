import db from '../config/db.js';

export const getCategories = (req, res) => {
    let sql = "SELECT * FROM categories";

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
        res.send(results);
    });
}

export const createCategory = (req, res) => {
    let sql = "INSERT INTO categories (categoryName) VALUES(?)";
    const { categoryName } = req.body;
    db.query(sql, categoryName, (error, results) => {
        if (error) console.log(error.message);
        res.send(results);
    });
}

export const deleteCategory = (req, res) => {
    let sql = "DELETE FROM categories WHERE id = ?";
    const { id } = req.params;

    db.query(sql, id, (error, results) => {
        if (error) console.log(error.message);
        res.send('Category deleted');
    });
}
