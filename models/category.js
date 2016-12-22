const db = require('../config/db');
class Category{
    constructor(){

    }

    static show(callback){
        let query = 'select * from `category` where cg_pid = 0';
        db.query(query,callback);
    }

    static add(body,callback){
        let query = 'insert into `category` set ?';
        db.query(query,body,callback);
    }
}

module.exports = Category;