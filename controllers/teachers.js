const express = require('express');
const route = module.exports = express.Router();
route.prefix = '/teachers';

route.get('/',(req,res,next)=>{
    res.render('teachers/index',{});
});

route.get('/add',(req,res,next)=>{
    res.render('teachers/add',{});
});