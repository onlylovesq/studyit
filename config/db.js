const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'26751538sq',
    database:'itcast'
});

module.exports = connection;