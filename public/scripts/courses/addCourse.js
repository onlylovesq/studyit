define(function(require,exports,module){
    require('form');

    $('#addCourses').submit('on',function(){
        $(this).ajaxSubmit({
            url:'/courses/add',
            type:'post',
            success:function(data){
                
                alert(data.msg);
                if(data.code === 10000){
                    location.href = '/courses/basic/'+data.result.insertId;
                }
            }
        });

        return false;
    }); 
});