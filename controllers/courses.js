const express = require('express');
const cgModel = require('../models/category');
const common = require('../util/common');
const route = module.exports = express.Router();
const Q = require('q');
//将两个查询函数转成promise对象
let show = Q.denodeify(cgModel.show);
let find = Q.denodeify(cgModel.find);
route.prefix = '/courses';

route.get('/',(req,res,next)=>{
    res.render('courses/list');
});

route.get('/add',(req,res,next)=>{
    res.render('courses/add');
});

route.get('/category',(req,res,next)=>{
    cgModel.list((err,rows)=>{
        if(err){
            console.log(err);
            return;
        }

        let array = common.getTree(rows,0);
        res.render('courses/category',{categorys:array});
    });
    
});

//展示添加课程分类页面
route.get('/category/add',(req,res,next)=>{
    cgModel.show((err,rows)=>{
        if(err){
            console.log(err);
            return;
        }
        
        res.render('courses/category_add',{categorys:rows});

    });
    
});

//添加课程分类
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

//更新类别
route.post('/category/update',(req,res,next)=>{
    cgModel.update(req.body,(err,rows)=>{
        if(err){
            console.log(err);
            return;
        }

        res.json({
            code:10000,
            msg:'修改成功!',
            result:{}
        });
    });
});

//编辑展示
route.get('/category/edit/:cg_id',(req,res,next)=>{
    
    let cg_id = req.params.cg_id;
    var all = {};
    //编辑分类
    show()
    .then((data)=>{
            all.obj = data;
        },
        (err)=>{
            console.log(err); 
        })
    .then(()=>{
            return find(cg_id);
        })
    .then((child)=>{
        res.render('courses/category_add',{categorys: all.obj[0], child: child[0][0]});
        },
        (err)=>{
            console.log(err);
        }
    );
});
