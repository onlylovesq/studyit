const express = require('express');
const route = express.Router();
const tcModel = require('../models/teachers');
module.exports = route;
route.prefix = '/';

route.get('/',(req,res,next)=>{
    res.render('dashboard/index');
});

route.get('/settings',(req,res,next)=>{
    // 根据用户登录信息再次查询结果
    let tc_id = req.app.locals.loginfo.tc_id;//或者req.session.loginfo.tc_id

    tcModel.find(tc_id,(err,rows)=>{
        if(err){
            console.log(err);
            return;
        }

        res.render('dashboard/settings',rows[0]);
    }); 
});

route.get('/repass',(req,res,next)=>{
    res.render('dashboard/repass');
});