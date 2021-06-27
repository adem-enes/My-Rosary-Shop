import db from '../config/db.js';

export const getUserToken = (req, res) => {
    let sql = "SELECT * FROM usersTokens;";

    db.query(sql, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
}

export const createUserToken = (req,res) => {

    let sql = "INSERT INTO usersTokens (userToken) VALUES(UUID());"

    db.query(sql, (error, results) => {
        if (error) throw error;
        const token = userToken(results.insertId, res);
    });    
}

const userToken = (tokenId, res) => {
    let sql = "SELECT * FROM usersTokens WHERE id = ?;" +
        "SELECT * FROM carts WHERE userTokenId = ?";
    const formatterTR = new Intl.DateTimeFormat('tr', {dateStyle: 'full'}); // OUTPUT: "22 Haziran 2021 Salı"
    const formatterEN = new Intl.DateTimeFormat('en-GB', {dateStyle: 'full'}); // OUTPUT: "Tuesday, 22 June 2021"
    
    db.query(sql,[tokenId, tokenId], (error,results) => {
        if (error) throw error;

        const token = results[0][0];
        const cart = results[1][0];
        
        const date = new Date(token.createdTime);
        token.createdTime = date.toString();
        token.dateTR = formatterTR.format(date);
        token.dateEN = formatterEN.format(date);
        token.expiredTime = new Date(date.setDate(date.getDate() + 7)).toString();
        
        res.send({token, cart});
    });
}