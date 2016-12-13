const express = require('express');
const path = require('path');
const glob = require('glob');
const bodyParser = require('body-parser');
const app = express();

//设置模板引擎
app.set('views',__dirname+'/views');
app.set('view engine','xtpl');

//解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

//设置静态服务器
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'uploads')));

glob.sync('./controllers/*.js').forEach(item=>{
    let temp = require(item);
    app.use(temp.prefix,temp);
});

app.use((req,res,next)=>{
    if(req.path === '/'){
        res.redirect('/index');
    }else{
        res.render('notfound');
    }
});

app.listen(3000);