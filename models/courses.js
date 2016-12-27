const db = require('../config/mysqlConnection');
class Courses{
    constructor(){

    }
    //添加课程
    static add(body,callback){
        let query = 'insert into `course` set ?';
        db.query(query,body,callback);
    }
    //查找课程
    static find(cs_id,callback){
        let query = 'select * from `course` where cs_id = '+cs_id;
        db.query(query,callback);
    }
    //更新课程
    static update(body,callback){
        let cs_id = body.cs_id;
        delete body.cs_id;
        let query = 'update `course` set ? where cs_id = ' + cs_id;
        db.query(query,body,callback);
    }
}

module.exports = Courses;