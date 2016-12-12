define(function(require,exports,module){
    var $ = require('jquery');
    $('.navs a').on('click',function(){
		$(this).next('ul').slideToggle();
	});
    //选中状态
    $('.navs a').each(function(){
        let _this = $(this),
            href = _this.attr('href').slice(1),
            pathname = location.pathname;
        
        if(pathname.lastIndexOf(href) == 1){
            _this.addClass('active');
            _this.next('ul').show();
            return false;
        }
    });
});