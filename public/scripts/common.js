define(function(require,exports,module){
    // var $ = require('jquery');
    //进度条
    var NProgress = require('nprogress');
    //导航菜单
    $('.navs a').on('click',function(){

        let _this = $(this);
        // 链接
        if(_this.attr('href') != 'javascript:;'){
            return;
        }

		$(this).next('ul').slideToggle();
	});
    //选中状态
    $('.navs a').each(function(){
        let _this = $(this),
            href = _this.attr('href').slice(1),
            // 获取地址信息
            pathname = location.pathname;
        
        if(pathname.lastIndexOf(href) == 1){
            // 添加选中状态
            _this.addClass('active');
            _this.closest('ul').show();
            return false;
        }
    });

    NProgress.start();
    NProgress.done();
});