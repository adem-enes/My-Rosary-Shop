import db from '../config/db.js';


//Tables
export const createProductsTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS products(id INT NOT NULL AUTO_INCREMENT, productName VARCHAR(50) NOT NULL," +
        "image LONGTEXT NOT NULL, description VARCHAR(255) NOT NULL, price DOUBLE(10,2) NOT NULL DEFAULT 0," +
        "quantity INT NOT NULL DEFAULT 1, addedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "categoryId INT NOT NULL DEFAULT 0," +
        "PRIMARY KEY (id), FOREIGN KEY (categoryId) REFERENCES categories (id));";

    db.query(sql, (error, results) => {
        if (error) throw error;
    });
}
export const createCategoriesTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS categories(id INT NOT NULL AUTO_INCREMENT, categoryName VARCHAR(50), PRIMARY KEY (id))";

    db.query(sql, (error, results) => {
        if (error) throw error;
    });
}
export const createCartsTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS carts(id INT NOT NULL AUTO_INCREMENT," +
        "totalPrice  DOUBLE(10,2) NOT NULL DEFAULT 0," +
        "lastUpdatedTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));";

    db.query(sql, (error, results) => {
        if (error) throw error;
    });
}
export const productsInTheCarts = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS products_in_the_carts(id INT NOT NULL AUTO_INCREMENT," +
        "productId INT NOT NULL, productQuantity INT NOT NULL DEFAULT 1, cartId INT NOT NULL, " +
        "PRIMARY KEY (id), FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE, " +
        "FOREIGN KEY (cartId) REFERENCES carts(id) ON DELETE CASCADE);";

    db.query(sql, (error, results) => {
        if (error) throw error;
    });
}
export const createShippingMethodsTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS shipping_methods(id INT NOT NULL AUTO_INCREMENT, shippingCompany VARCHAR(50) NOT NULL," +
        "shippingPrice DOUBLE(10,2) NOT NULL DEFAULT 0, PRIMARY KEY (id));";

    db.query(sql, (error, results) => {
        if (error) throw error;
    });
}

export const statuses = (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS statuses(id INT NOT NULL AUTO_INCREMENT, status VARCHAR(50) NOT NULL UNIQE,PRIMARY KEY (id));";
    
    db.query(sql,(error, results) => {
        if (error) throw error;
    });
}

export const createOrdersTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS orders(id INT NOT NULL AUTO_INCREMENT, "+
        "customerName VARCHAR(45) NOT NULL, customerLastName VARCHAR(45) NOT NULL, " +
        "customerEmail VARCHAR(45) NOT NULL, customerPhoneNumber VARCHAR(45) NOT NULL, "+
        "address VARCHAR(45) NOT NULL, city VARCHAR(45) NOT NULL, state VARCHAR(45) NOT NULL, "+
        "country VARCHAR(45) NOT NULL, orderDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "+
        "shippingCompany VARCHAR(45) NOT NULL, shippingPrice DOUBLE(10,2) NOT NULL, "+
        "productsPrice DOUBLE(10,2) NOT NULL, totalPrice DOUBLE(10,2) NOT NULL, "+
        "status VARCHAR(50) NOT NULL, "+
        "PRIMARY KEY (id), " +
        "FOREIGN KEY (status) REFERENCES statuses (status) ON UPDATE CASCADE );";
        
    db.query(sql, (error, results) => {
        if (error) throw error;
    });
}

export const createAll = (req, res) => {
    createCategoriesTable();
    createProductsTable();
    createShippingMethodsTable();
    createCartsTable();
    productsInTheCarts();
    statuses();
    createOrdersTable();
    orderedProducts();

    res.send('All Done');
};


//Triggers
const triggerProductsInCartsAfterInsert = () => {
    let sql = `
        CREATE TRIGGER products_in_the_carts_AFTER_INSERT AFTER INSERT ON products_in_the_carts FOR EACH ROW
        BEGIN
            UPDATE carts SET lastUpdatedTime = NOW(),
                totalPrice = (SELECT sum(products.price*products_in_the_carts.productQuantity) as totalPrice
                    FROM products_in_the_carts INNER JOIN products ON products.id = products_in_the_carts.productId WHERE cartId = NEW.cartId)
                WHERE id = NEW.cartId;
        END
        `;
    db.query(sql, (error, results) => { if (error) throw error; });
}
const triggerProductsInCartsAfterUpdate = () => {
    let sql = `
        CREATE TRIGGER products_in_the_carts_AFTER_UPDATE AFTER UPDATE ON products_in_the_carts FOR EACH ROW
        BEGIN
            UPDATE carts SET lastUpdatedTime = NOW(),
                totalPrice = (SELECT sum(products.price*products_in_the_carts.productQuantity) as totalPrice
                    FROM products_in_the_carts INNER JOIN products ON products.id = products_in_the_carts.productId WHERE cartId = NEW.cartId)
                WHERE id = NEW.cartId;
        END
        `;

    db.query(sql, (error, results) => { if (error) throw error; });
}
const triggerProductsInCartsAfterDelete = () => {
    let sql = `
        CREATE TRIGGER products_in_the_carts_AFTER_DELETE AFTER DELETE ON products_in_the_carts FOR EACH ROW
        BEGIN
            UPDATE carts SET lastUpdatedTime = NOW(),
                totalPrice = (SELECT sum(products.price*products_in_the_carts.productQuantity) as totalPrice
                    FROM products_in_the_carts INNER JOIN products ON products.id = products_in_the_carts.productId WHERE cartId = OLD.cartId)
                WHERE id = OLD.cartId;
        END
            `;
    db.query(sql, (error, results) => { if (error) throw error; });
}

export const createAllTriggers = (req, res) => {
    triggerProductsInCartsAfterInsert();
    triggerProductsInCartsAfterUpdate();
    triggerProductsInCartsAfterDelete();

    res.send('All Triggers Created..');
}

//Events
const createDeleteCartEvent = () => {
    let sql = ` DROP EVENT IF EXIST delete_Cart_Event;
        CREATE EVENT delete_Cart_Event ON SCHEDULE EVERY 1 HOUR ENABLE
            DO BEGIN
                DELETE FROM carts WHERE lastUpdatedTime < DATE_SUB(NOW(), INTERVAL 6 HOUR);
            END;
    `;
}

export const createAllEvents = (req, res) => {
    createDeleteCartEvent();

    res.send('All Events Created');
}    

