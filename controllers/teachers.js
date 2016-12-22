const express = require('express');
const tcModel = require('../models/teachers');
const route = module.exports = express.Router();
route.prefix = '/teachers';

route.get('/',(req,res,next)=>{
    
    tcModel.show((err,rows)=>{
        let date = [];
        rows.forEach(function(item,index){
            date.push(new Date().getFullYear()-(new Date(item.tc_brithday).getFullYear()));
        });
        res.render('teachers/index',{teachers:rows,date:date});
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

        res.render('teachers/add',{teacher:rows[0]});
    });
});
//添加讲师
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
//编辑讲师
route.post('/edit',(req,res,next)=>{
    let body = req.body;

    tcModel.edit(body,(err,rows)=>{
        if(err)
            return;
        
        res.json({
            code:10000,
            msg:'修改成功!',
            result:{}
        });
    });
});

//查看讲师
route.post('/preview',(req,res,next)=>{
    let tc_id = req.body.tc_id;

    tcModel.find(tc_id,(err,rows)=>{
        if(err)
            return;
        res.json(rows[0]);
    });
}); 