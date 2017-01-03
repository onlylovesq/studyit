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
    //课程列表
    static list(callback){
        
        let query = 'select course.cs_id,category.cg_id,category.cg_pid,lesson.ls_id,lesson.ls_cs_id,course.cs_name,course.cs_cover,teacher.tc_name,category.cg_name,lesson.ls_name from `course` left join `teacher`  on course.cs_tc_id = teacher.tc_id left join `category` on course.cs_cg_id = category.cg_id left join `lesson` on course.cs_id = lesson.ls_cs_id ';

        db.query(query,callback);
    }
}

module.exports = Courses;