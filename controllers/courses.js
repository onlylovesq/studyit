const express = require('express');
const cgModel = require('../models/category');
const csModel = require('../models/courses');
const tcModel = require('../models/teachers');
const common = require('../util/common');
const route = module.exports = express.Router();
const Q = require('q');
//将两个查询函数转成promise对象
let show = Q.denodeify(cgModel.show);
let find = Q.denodeify(cgModel.find);
let csAdd = Q.denodeify(csModel.add);
let csFind = Q.denodeify(csModel.find);
let tcShow = Q.denodeify(tcModel.show);
let cgGetParent = Q.denodeify(cgModel.getParent);
let cgGetChild = Q.denodeify(cgModel.getChild);
let csUpdate = Q.denodeify(csModel.update);

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

//添加课程
route.post('/add',(req,res,next)=>{
    let body = req.body;
    csAdd(body)
        .then((rows)=>{
                    res.json(
                        {
                            code:10000,
                            msg:'添加成功',
                            result:{
                                insertId:rows[0].insertId
                            }
                        }
                    )
              },
              (err)=>{
                    console.log(err);
                    return;
                }
            );
});

//课程主页
route.get('/basic/:cs_id',(req,res,next)=>{

    let cs_id = req.params.cs_id;

    let data = {};
    let cs_cg_id = '';
    csFind(cs_id)
        .then((result)=>{
            data.course = result[0][0];
            cs_cg_id = result[0][0]['cs_cg_id'];
            return result;
        })
        .then((result)=>{
            return tcShow().then();
        })
        .then((rows)=>{
            data.teachers = rows[0];
        })
        .then(()=>{
            return cgGetParent(cs_cg_id);
        })
        .then((cats)=>{
            let parents = [];
            let childs = [];
            let obj = cats[0];
            for(var i = 0;i<obj.length;i++){
                if(obj[i]['cg_pid'] === 0){
                    parents.push(obj[i]);
                    continue;
                }
                childs.push(obj[i]);
            }

            let category = {
                parents : parents,
                childs:childs
            }

            //处理分类数据
            data.category = category;
            res.render('courses/basic',data);

        }).catch((err)=>{
            console.log(err);
            return;
        });
    
    
});

//更新数据
route.post('/basic',(req,res,next)=>{
    let cs_id = req.body.cs_id;
    csUpdate(req.body)
        .then((rows)=>{
            res.json({
                code: 10000,
                msg: '添加成功',
                result: {
                    cs_id: cs_id
                }   
            });
        })
        .catch((err)=>{
            console.log(err);
            return;
        });
});

//获取子类别
route.post('/getChild',(req,res,next)=>{
    let cg_id = req.body.cg_id;
    cgGetChild(cg_id)
        .then((rows)=>{
            res.json({
                code:10000,
                msg:'获取成功!',
                result:rows[0]
            });
        })
        .catch((err)=>{
            console.log(err);
            return;
        });
});

// 添加封面图
route.get('/picture/:cs_id', function (req, res) {

	res.render('courses/picture');
});