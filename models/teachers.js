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
}

module.exports = Teachers;
