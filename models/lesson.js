const db = require('../config/mysqlConnection');
class Lesson{
    constructor(){

    }
    //添加课时
    static add(body,callback){
        let query = 'insert into `lesson` set ?';
        db.query(query,body,callback);
    }       
}

module.exports = Lesson;