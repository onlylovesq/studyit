define(function (require, exports, module) {
    // let $ = require('jquery');
    require('validate');
    require('form');
    //表单元素
    $('#addTeacher').validate({
        onKeyup:true,//何种条件下触发验证
        sendForm:false,//阻止表单默认提交
        eachInvalidField:function(){
            //当元素不合法时,会触发此方法
            //$(this)指的不合法的表单
            $(this).parents('.form-group').removeClass('has-success').addClass('has-error');
            $(this).next().removeClass('glyphicon-ok').addClass('glyphicon-remove');
        },
        eachValidField:function(){
            $(this).parents('.form-group').addClass('has-success').removeClass('has-error');
            $(this).next().addClass('glyphicon-ok').removeClass('glyphicon-remove');
        },
        valid:function(){
            // 所有表单元素都合法才触发
			// jquery.form.js专门ajax提交表单的
            let url = $(this).attr('action').trim();
            // $(this) 指的form
            $(this).ajaxSubmit({
                url: url,
                type: 'post',
                success: function (data) {
                    if (data.code == 10000) {
                        location.reload();
                    }

                    alert(data.msg);
                }
            });
         
        }     
    });
});