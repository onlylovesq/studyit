const express = require('express');
const route = express.Router();
const region = require('../models/region.json');
const tcModel = require('../models/teachers');
const path = require('path');
const rootPath = path.join(__dirname,'../');
//引入上传包
const multer = require('multer');
//自定义存储路径
const storage = multer.diskStorage({
    //设置存储路径
    destination:function(req,file,cb){
        cb(null,rootPath+'uploads/avatars');
    },
    //设置文件名
    filename:function(req,file,cb){
        //原始名+时间+原始后缀
        let originalName = file.originalname;
        let lastIndex = originalName.lastIndexOf('.');
        let fileName = originalName.slice(0,lastIndex);
        let fileExt = originalName.slice(lastIndex);

        cb(null,fileName+'-'+Date.now()+fileExt);
    }
});

const upload = multer({storage:storage});

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

//省市县的请求
route.get('/region',(req,res,next)=>{
    res.json(region);
});

//修改个人中心资料
route.post('/update',(req,res,next)=>{
    let body = req.body;

    tcModel.update(body,(err,rows)=>{
        if(err){
            console.log(err);
            return;
        }

        res.json({
            code:10000,
            msg:'修改成功',
            result:{}
        });
    });
});

//上传头像
route.post('/upfile',upload.single('tc_avatar'),(req,res,next)=>{
    let body = {
        tc_id:req.session.loginfo.tc_id,
        tc_avatar:req.file.filename
    }
    //保存头像
    tcModel.update(body,(err,rows)=>{
        if(err){
            console.log(err);
            return;
        }

        res.json(req.file);
    });
});