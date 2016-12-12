const express = require('express');
const route = module.exports = express.Router();
route.prefix = '/login';

route.get('/',(req,res,next)=>{
    res.render('login/index',{});
});
