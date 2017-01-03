define(function(require,exports,module){
    
    require('form');

    let template = require('template');

    //模态框
    let lessonModal = $('#lesson');
    let item = $('#item');
    let total = $('#total');
    let save = $('#save');
    
    
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
        //按钮状态
        let key = save.attr('data-key');
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
                if(key){
                    //替换
                    item.find('li').eq(key).find('span.name').text(lsName);
                    item.find('li').eq(key).find('span.duration').text(lsMinutes + ':' + lsSeconds);
                }else{
                    //添加Dom
                    item.append(html);
                }
                
                //总课时
                total.text('课时:'+size);
                //隐藏模态框
                lessonModal.modal('hide');
            }
        });

        return false;
    });

    
    $('#addLesson').on('click','input[type="checkbox"]',function(){
        if($(this).is(':checked')){
            $(this).val(1);
        }else{
            $(this).val(0);
        }
    });

    item.on('click','.btn',function(){
        let _this = $(this),
            parent = _this.parents('li'),
            ls_id = parent.attr('data-id'),
            key = parent.index();

        //编辑
        if(_this.is('.edit')){
            //改变标识
            save.attr('data-key',key);

            $.ajax({
                url:'/courses/lesson/edit',
                type:'post',
                data:{ls_id:ls_id},
                success:function(data){
                    //调用模板引擎
                    //data需要处理,将时长拆开
                    let dateTime = data.ls_video_duration.split(':');
                    data.ls_minutes = dateTime[0];
                    data.ls_seconds = dateTime[1];
                    let html = template('lessonTpl',data);
                    $('#addLesson').html(html);
                    lessonModal.modal();
                }
            });
        }

        if(_this.is('.preview')) {
			alert('预览')
		}

		if(_this.is('.delete')) {
			alert('删除');
		}
    });
});