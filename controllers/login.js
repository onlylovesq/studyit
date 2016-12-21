const express = require('express');
const route = module.exports = express.Router();
const tcModel = require('../models/teachers');
route.prefix = '/login';

route.get('/',(req,res,next)=>{
    res.render('login/index',{});
});

route.post('/',(req,res,next)=>{
    let body = req.body;

    tcModel.authored(body,(err,rows)=>{
        if(err){
            console.log(err);
            return;
        }
        if(rows[0]){
            req.session.loginfo = rows[0];
            // req.session.cookie._expires = new Date(Date.now() + 90000000);
            res.json({
                code:10000,
                msg:'登录成功!',
                result:{}
            });
        }else{
            res.json({
                code:10001,
                msg:'用户名或密码错误,登录失败!',
                result:{}
            });
        }
        
        
        
    });
});
