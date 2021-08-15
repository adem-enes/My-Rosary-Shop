import db from '../config/db.js';

export const getStatuses = (req, res) => {
    let sql = "SELECT * FROM statuses;";

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
        res.send(results);
    });
}

export const createStatuses = (req, res) => {
    let sql = "INSERT INTO statuses (status) VALUES" +
        "('Sipariş Alındı')," +
        "('Sipariş Onaylandı')," +
        "('Sipariş Kargoya Verildi')," +
        "('Sipariş Teslim Edildi');";
    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
        res.send({message: 'All Statuses Created'});
    });
}