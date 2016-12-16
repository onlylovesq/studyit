const express = require('express');
const tcModel = require('../models/teachers');
const route = module.exports = express.Router();
route.prefix = '/teachers';

route.get('/',(req,res,next)=>{
    
    tcModel.show((err,rows)=>{
        res.render('teachers/index',{teachers:rows});
    });

});

route.get('/add',(req,res,next)=>{
    res.render('teachers/add',{});
});

route.get('/edit/:tc_id',(req,res,next)=>{
    let param = req.params.tc_id;
    tcModel.find(param,(err,rows)=>{
        if(err)
            return;
        res.render('teachers/add',{});
    });
});

route.post('/add',(req,res,next)=>{
    //post数据
    let body = req.body;
    //调用model进行数据存储
    tcModel.add(body,(err,rows)=>{
        if(err)
            return;
        //响应结果
        res.json({
            code:10000,
            msg:'添加成功!',
            result:{}
        });
    });
});