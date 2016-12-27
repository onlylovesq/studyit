const db = require('../config/db');
class Category{
    constructor(){

    }
    //查询顶级类别
    static show(callback){
        let query = 'select * from `category` where cg_pid = 0';
        db.query(query,callback);
    }
    //添加类别
    static add(body,callback){
        let query = 'insert into `category` set ?';
        db.query(query,body,callback);
    }
    //查询类别列表
    static list(callback){
        let query = 'select * from `category`';
        db.query(query,callback);
    }
    //根据类别id查询类别
    static find(cg_id,callback){
        let query = 'select * from `category` where cg_id='+cg_id;
        db.query(query,callback);
    }
    //修改类别
    static update(body,callback){
        let cg_id = body.cg_id;
        delete body.cg_id;
        let query = 'update `category` set ? where cg_id = '+cg_id;
        db.query(query,body,callback);
    }
    //获取课程关联的类别id获取所有顶级类别和对应的兄弟类别
    static getParent(cs_cg_id,callback){
        let query = 'select * from `category` where cg_pid=0 union select * from `category` where cg_pid = (select cg_pid from `category` where cg_id = '+ cs_cg_id +')';

        db.query(query,callback);
    }
    //根据父级类别id获取类别
    static getChild(cg_id,callback){
        let query = 'select * from `category` where cg_pid = '+ cg_id;
        db.query(query,callback);
    }

}

module.exports = Category;