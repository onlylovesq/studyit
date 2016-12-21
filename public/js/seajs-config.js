
// 配置文件
seajs.config({
	base:'/assets',
	alias:{
		jquery:'jquery/jquery.js',
		bootstrap:'bootstrap/js/bootstrap.js',
		validate:'jquery-validate/jquery-validate.js',
		form:'jquery-form/jquery.form.js',
		nprogress:'nprogress/nprogress.js',
		datepicker:'bootstrap-datetimepicker/js/bootstrap-datetimepicker.js',
		language:'bootstrap-datetimepicker/js/bootstrap-datetimepicker.zh-CN.js',
		template:'artTemplate/template-native.js',
		ckeditor:'ckeditor/ckeditor.js'
	},
	//实现全局模块提前加载
	//在使用use后才会执行
	//但是提前于use
	preload:['/scripts/common','jquery','bootstrap']
});

seajs.use();