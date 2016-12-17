
// 配置文件
seajs.config({
	base:'/assets',
	alias:{
		jquery:'jquery/jquery.js',
		bootstrap:'bootstrap/js/bootstrap.js',
		validate:'jquery-validate/jquery-validate.js',
		form:'jquery-form/jquery.form.js'
	},
	//实现全局模块提前加载
	//在使用use后才会执行
	//但是提前于use
	preload:['/scripts/common','jquery','bootstrap']
});

seajs.use();