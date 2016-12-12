const express = require('express');
const route = express.Router();
module.exports = route;
route.prefix = '/';

route.get('/',(req,res,next)=>{
    res.render('dashboard/index');
});

route.get('/settings',(req,res,next)=>{
    res.render('dashboard/settings');
});

route.get('/repass',(req,res,next)=>{
    res.render('dashboard/repass');
});