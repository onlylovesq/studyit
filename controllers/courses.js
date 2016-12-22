const express = require('express');
const cgModel = require('../models/category');
const route = module.exports = express.Router();
route.prefix = '/courses';

route.get('/',(req,res,next)=>{
    res.render('courses/list');
});

route.get('/add',(req,res,next)=>{
    res.render('courses/add');
});

route.get('/category',(req,res,next)=>{
    res.render('courses/category');
});

route.get('/category/add',(req,res,next)=>{
    cgModel.show((err,rows)=>{
        if(err){
            console.log(err);
            return;
        }

        res.render('courses/category_add',{categorys:rows});

    });
    
});

route.post('/category/add',(req,res,next)=>{
    let body = req.body;
    cgModel.add(body,(err,rows)=>{
        if(err){
            console.log(err);
            return;
        }

        res.json({
            code:10000,
            msg:'添加成功!',
            result:{}
        });
    });

});
