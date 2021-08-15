import db from '../config/db.js';


//Tables
export const createProductsTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS products(id INT NOT NULL AUTO_INCREMENT, productName VARCHAR(50) NOT NULL," +
        "image MEDIUMTEXT NOT NULL, description VARCHAR(255) NOT NULL, price DOUBLE(10,2) NOT NULL DEFAULT 0," +
        "quantity INT NOT NULL DEFAULT 1, addedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "categoryId INT NOT NULL DEFAULT 0," +
        "PRIMARY KEY (id), FOREIGN KEY (categoryId) REFERENCES categories (id));";

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
    });
}
export const createCategoriesTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS categories(id INT NOT NULL AUTO_INCREMENT, categoryName VARCHAR(50), PRIMARY KEY (id))";

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
    });
}
export const createCartsTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS carts(id INT NOT NULL AUTO_INCREMENT," +
        "totalPrice  DOUBLE(10,2) NOT NULL DEFAULT 0, userTokenId INT NOT NULL, " +
        "lastUpdatedTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id), " +
        "FOREIGN KEY (userTokenId) REFERENCES usersTokens(id) ON DELETE CASCADE);";

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
    });
}
export const productsInTheCarts = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS products_in_the_carts(id INT NOT NULL AUTO_INCREMENT," +
        "productId INT NOT NULL, productQuantity INT NOT NULL DEFAULT 1, cartId INT NOT NULL, " +
        "PRIMARY KEY (id), FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE, " +
        "FOREIGN KEY (cartId) REFERENCES carts(id) ON DELETE CASCADE);";

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
    });
}
export const createShippingMethodsTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS shipping_methods(id INT NOT NULL AUTO_INCREMENT, shippingCompany VARCHAR(50) NOT NULL," +
        "shippingPrice DOUBLE(10,2) NOT NULL DEFAULT 0, PRIMARY KEY (id));";

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
    });
}

export const statuses = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS statuses(id INT NOT NULL AUTO_INCREMENT, status VARCHAR(50) NOT NULL UNIQUE,PRIMARY KEY (id));";

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
    });
}

export const createOrdersTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS orders(id INT NOT NULL AUTO_INCREMENT, " +
        "customerName VARCHAR(45) NOT NULL, customerLastName VARCHAR(45) NOT NULL, " +
        "customerEmail VARCHAR(45) NOT NULL, customerPhoneNumber VARCHAR(45) NOT NULL, " +
        "address VARCHAR(45) NOT NULL, city VARCHAR(45) NOT NULL,postalCode INT NOT NULL, " +
        "state VARCHAR(45) NOT NULL, country VARCHAR(45) NOT NULL, " +
        "orderDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
        "shippingCompany VARCHAR(45) NOT NULL, shippingPrice DOUBLE(10,2) NOT NULL, " +
        "productsPrice DOUBLE(10,2) NOT NULL, totalPrice DOUBLE(10,2) NOT NULL, " +
        "status VARCHAR(50) NOT NULL, cartId INT NOT NULL, " +
        "PRIMARY KEY (id), " +
        "FOREIGN KEY (status) REFERENCES statuses (status) ON UPDATE CASCADE, " +
        "FOREIGN KEY (cartId) REFERENCES carts (id) ON DELETE CASCADE);";

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
    });
}

export const createUsersTokensTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS usersTokens(id INT NOT NULL AUTO_INCREMENT, " +
        "userToken VARCHAR(255) NOT NULL UNIQUE, createdTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
        "PRIMARY KEY (id));"

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
    });
}

export const createUsersTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS users(id INT NOT NULL AUTO_INCREMENT, " +
        "username VARCHAR(50) NOT NULL UNIQUE, firstName VARCHAR(50) NOT NULL, lastName VARCHAR(50) NOT NULL," +
        "emailAddress VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, authorization INT NOT NULL," +
        "userTokenId INT NOT NULL, registeredTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP," +
        "PRIMARY KEY (id), FOREIGN KEY (userTokenId) REFERENCES usersTokens (id), " +
        "FOREIGN KEY (authorization) REFERENCES authorizations (id));"


    //TODO : If someone on user table is deleted that userToken is going to deleted too.
    //TODO : Probably triggers can do it..

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
    });
}
export const createAuthorizationsTable = (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS authorizations(id INT NOT NULL AUTO_INCREMENT, " +
        "authName VARCHAR(50)NOT NULL UNIQUE, PRIMARY KEY (id));"

    db.query(sql, (error, results) => {
        if (error) console.log(error.message);
    });
}


export const createAll = (req, res) => {
    createCategoriesTable();
    createProductsTable();
    createShippingMethodsTable();
    createUsersTokensTable();
    createCartsTable();
    productsInTheCarts();
    statuses();
    createOrdersTable();
    // orderedProducts();
    createAuthorizationsTable();
    createUsersTable();

    res.send('All Done');
};


//Triggers
const triggerProductsInCartsAfterInsert = () => {
    let sql = `
        CREATE TRIGGER products_in_the_carts_AFTER_INSERT AFTER INSERT ON products_in_the_carts FOR EACH ROW
        BEGIN
            UPDATE carts SET lastUpdatedTime = NOW(),
                totalPrice = (SELECT ifnull(sum(products.price*products_in_the_carts.productQuantity),0) as totalPrice
                    FROM products_in_the_carts INNER JOIN products ON products.id = products_in_the_carts.productId WHERE cartId = NEW.cartId)
                WHERE id = NEW.cartId;
        END
        `;
    db.query(sql, (error, results) => { if (error) console.log(error.message); });
}
const triggerProductsInCartsAfterUpdate = () => {
    let sql = `
        CREATE TRIGGER products_in_the_carts_AFTER_UPDATE AFTER UPDATE ON products_in_the_carts FOR EACH ROW
        BEGIN
            UPDATE carts SET lastUpdatedTime = NOW(),
                totalPrice = (SELECT ifnull(sum(products.price*products_in_the_carts.productQuantity),0) as totalPrice
                    FROM products_in_the_carts INNER JOIN products ON products.id = products_in_the_carts.productId WHERE cartId = NEW.cartId)
                WHERE id = NEW.cartId;
        END
        `;

    db.query(sql, (error, results) => { if (error) console.log(error.message); });
}
const triggerProductsInCartsAfterDelete = () => {
    let sql = `
        CREATE TRIGGER products_in_the_carts_AFTER_DELETE AFTER DELETE ON products_in_the_carts FOR EACH ROW
        BEGIN
            UPDATE carts SET lastUpdatedTime = NOW(),
                totalPrice = (SELECT ifnull(sum(products.price*products_in_the_carts.productQuantity),0) as totalPrice
                    FROM products_in_the_carts INNER JOIN products ON products.id = products_in_the_carts.productId WHERE cartId = OLD.cartId)
                WHERE id = OLD.cartId;
        END
            `;
    db.query(sql, (error, results) => { if (error) console.log(error.message); });
}

const triggerUsersTokensAfterInsert = () => {
    let sql = `
        CREATE TRIGGER usersTokens_AFTER_INSERT AFTER INSERT ON usersTokens FOR EACH ROW 
        BEGIN
            INSERT INTO carts (userTokenId)VALUES (NEW.id);
        END;`

    db.query(sql, (error, results) => { if (error) console.log(error.message); });
}

export const createAllTriggers = (req, res) => {
    triggerProductsInCartsAfterInsert();
    triggerProductsInCartsAfterUpdate();
    triggerProductsInCartsAfterDelete();
    triggerUsersTokensAfterInsert();

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

