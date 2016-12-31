define(function(require,exports,module){
    
    require('form');

    let template = require('template');

    //模态框
    let lessonModal = $('#lesson');

    $('#addBtn').on('click',function(){
        //调用模板引擎
        let html = template('lessonTpl',{});
        //将表单元素追加
        lessonModal.find('form').html(html);
        //显示
        lessonModal.modal();

        return false;
    }) ;

    $('#addLesson').on('submit',function(){
        $(this).ajaxSubmit({
            url:'/courses/lesson',
            type:'post',
            success:function(data){
                lessonModal.modal('hide');
            }
        });

        return false;
    });
});