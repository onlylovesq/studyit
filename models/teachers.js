//处理teacher数据表的数据
const db = require('../config/mysqlConnection');
class Teachers{
    constructor(){

    }
    //下一步通过db处理数据
    static add(body,callback){
        //body即表单数据
        //插入操作
        db.query('insert into `teacher` set ?',body,callback);
    }

    //查询数据
    static show(callback){
        db.query('select * from `teacher`',callback);
    }

    //查询单个数据
    static find(tc_id,callback){
        let query = 'select * from `teacher` where tc_id = '+tc_id;
        db.query(query,callback);
    }

    //判断用户登录
    static authored(body,callback){
        let tc_name = body.tc_name;
        let tc_pass = body.tc_pass;

        let query = 'select * from `teacher` where tc_name="'+tc_name+'" and tc_pass="'+tc_pass+'"';

        db.query(query,callback);
    }

    //编辑讲师
    static edit(body,callback){
        let tc_id = body.tc_id;
        //body包含了tc_id 但是在update语句中不可以修改id 所以要删除
        delete body.tc_id;
        let query = "update `teacher` set ? where tc_id = "+tc_id;
        db.query(query,body,callback);
    }

    //修改讲师个人资料
    static  update(body,callback){
        let tc_id = body.tc_id;
        delete body.tc_id;
        let query = "update `teacher` set ? where tc_id = "+tc_id;
        db.query(query,body,callback);
    }

}

module.exports = Teachers;
