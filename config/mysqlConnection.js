//数据库链接池
//1.性能提升了,因为请求的时候不用重复的创建新的链接
//2.不用手动的打开和关闭链接

const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'26751538sq',
    database:'itcast'
});

module.exports = {
    pool,
    query(){
        pool.query.apply(pool,arguments);
    }
}