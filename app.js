const express = require('express');
const path = require('path');
const glob = require('glob');
//cookie中间件
const cookieParser = require('cookie-parser');
// session中间件
const session = require('express-session');
//post请求解析中间件
const bodyParser = require('body-parser');
const app = express();

// 指定模板放在哪里了？
app.set('views',__dirname+'/views');
// 指定使用哪个模板引擎
app.set('view engine','xtpl');

// 应用cookie中间件
// 此中间件就会在响应中设置cookie方法
app.use(cookieParser());

// 应用session中间件
// 请求上添加一个属性session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,  
  cookie: {maxAge: 60 * 60 * 24}
}));

//解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

//设置静态服务器
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'uploads')));

app.use((req,res,next)=>{
    let url = req.originalUrl;
    let loginfo = req.session.loginfo;
    // app.locals.demo = '你好';
	// express提供一个全局的对象
	// 在些对象的数据可以任何视图上获得

    app.locals.loginfo = loginfo;

    if(url != '/login' && !loginfo){
        return res.redirect('/login');
    }

    next();
});

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