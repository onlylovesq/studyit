//处理teacher数据表的数据
const db = require('../config/mysqlConnection');

//下一步通过db处理数据
exports.add = function(body,callback){
    //body即表单数据
    //插入操作
    let sql = db.query('insert into `teacher` set ?',body,callback);
}