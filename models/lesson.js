const db = require('../config/mysqlConnection');
class Lesson{
    constructor(){

    }
    //添加课时
    static add(body,callback){
        let query = 'insert into `lesson` set ?';
        db.query(query,body,callback);
    }    
    //根据课程id查询课时
    static find(ls_cs_id,callback){
        let query = 'select * from `lesson` where ls_cs_id='+ls_cs_id;
        db.query(query,callback);
    }
}

module.exports = Lesson;