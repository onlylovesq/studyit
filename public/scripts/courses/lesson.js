define(function(require,exports,module){
    
    require('form');

    let template = require('template');

    //模态框
    let lessonModal = $('#lesson');
    let item = $('#item');
    let total = $('#total');

    $('#addBtn').on('click',function(){
        //调用模板引擎
        let html = template('lessonTpl',{});
        //将表单元素追加
        lessonModal.find('form').html(html);
        //显示
        lessonModal.modal();

        return false;
    }) ;

    //添加课时
    $('#addLesson').on('submit',function(){
        let lsName = $('[name="ls_name"]').val();	
		let lsMinutes = $('[name="ls_minutes"]').val();	
		let lsSeconds = $('[name="ls_seconds"]').val();
        let size = item.children().size()+1;
        $(this).ajaxSubmit({
            url:'/courses/lesson',
            type:'post',
            success:function(data){
                //添加成功,需要展示新添加数据
                let info = {
                    index:size,
                    lsName:lsName,
                    lsDuration:lsMinutes+':'+lsSeconds
                }
                //调用模板
                let html = template('itemTpl',info);
                //添加Dom
                item.append(html);
                //总课时
                total.text('课时:'+size);
                //隐藏模态框
                lessonModal.modal('hide');
            }
        });

        return false;
    });
});