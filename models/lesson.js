const db = require('../config/mysqlConnection');
class Lesson{
    constructor(){

    }
    //添加课时
    static add(body,callback){
        let ls_id = body.ls_id;
        delete body.ls_id;
        let query = '';
        if(ls_id){
            query = 'update `lesson` set ? where ls_id = ' + ls_id;
        }else{
            query = 'insert into `lesson` set ?';
        }
        
        db.query(query,body,callback);
    }    
    //根据课程id查询课时
    static find(ls_cs_id,callback){
        let query = 'select * from `lesson` where ls_cs_id='+ls_cs_id;
        db.query(query,callback);
    }
    //根据课时
    static show(ls_id,callback){
        let query = 'select * from `lesson` where ls_id = '+ls_id;
        db.query(query,callback);
    }

    //根据课程id查询课时数量
    static showCount(ls_cs_id,callback){
        let query = 'select count(*) as count from `lesson` where ls_cs_id = '+ls_cs_id;
        db.query(query,callback);
    }
}

module.exports = Lesson;