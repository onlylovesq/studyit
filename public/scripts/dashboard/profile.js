define(function(require,exports,module){
    require('datepicker');
    require('language');

    $('.date').datetimepicker({
        initialDate:new Date(),
        format: 'yyyy-mm-dd',
        language:'zh-CN',
        autoclose:true,
        minView:2
    });
});