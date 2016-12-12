const express = require('express');
const route = module.exports = express.Router();
route.prefix = '/user';

route.get('/',(req,res,next)=>{
    res.render('users/index');
});

route.get('/profile',(req,res,next)=>{
    res.render('users/profile');
});