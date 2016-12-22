define(function(require,exports,module){
    require('form');

    $('#addCategory').on('submit',function(){
        $(this).ajaxSubmit({
            url:'/courses/category/add',
            type:'post',
            success:function(data){
                alert(data.msg);
                if(data.code === 10000){
                    location.reload();
                }
            }
        });

        return false;
    });
});