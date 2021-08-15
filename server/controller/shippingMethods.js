import db from '../config/db.js';


export const getShippings = (req, res) => {
    let sql = "SELECT * FROM shipping_methods;";

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
        res.send(results);
    });
}

export const createShipment = (req, res) => {
    const { shippingCompany, shippingPrice } = req.body;
    let sql = "INSERT INTO shipping_methods (shippingCompany, shippingPrice) VALUES(?,?)";

    db.query(sql, [shippingCompany, shippingPrice], (error, results) => {
        if (error) console.log(error.message);
        res.send({message: 'New Shipping Method added.'});
    });
}

export const updateShipment = (req, res) => {
    const {id } = req.params;
    const { shippingPrice } = req.body;
    let sql = "UPDATE shipping_methods SET shippingPrice = ? WHERE id = ?";

    db.query(sql, [shippingPrice, id], (error, results) => {
        if (error) console.log(error.message);
        res.send({message: "Shipping Method's price updated"});
    });
}

export const deleteShipmentMethod = (req, res) => {
    const { id } = req.params;
    let sql = "DELETE FROM shipping_methods WHERE id = ?";

    db.query(sql, id, (error, results) => {
        if (error) console.log(error.message);
        res.send({message: 'Shipping Method deleted.'});
    });
}