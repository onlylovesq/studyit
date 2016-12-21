define(function(require,exports,module){
    //引入datetimepicker日期插件
    require('datepicker');
    //汉化日期插件
    require('language');
    //引入表单提交插件
    require('form');
    // 引入省市县插件
    require('region');
    // 引入文件上传插件
	require('uploadify');
    // 引入ckeditor插件
    const ck = require('ckeditor');
    //ckeditor
    ck.replace('ckeditor');
    
    $('.date').datetimepicker({
        initialDate:new Date(),
        format: 'yyyy-mm-dd',
        language:'zh-CN',
        autoclose:true,
        minView:2
    });

    //省市县
    $('.hometown').region({
        url:'/region'
    });

    //表单提交(修改个人资料)
    $('#updateTeacher').on('submit',function(){
        
        //提交ckeditor数据
        for(instance in CKEDITOR.instances){
            CKEDITOR.instances[instance].updateElement();
        }
        
        $(this).ajaxSubmit({
            url:'/update',
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

    $('#upfile').uploadify({
        buttonText:'',
        height:'120px',
        fileObjName:'tc_avatar',
        swf: '/assets/uploadify/uploadify.swf', // flash文件路径
		uploader: '/upfile', // 后台接口
        itemTemplate: '<span></span>',
        onUploadSuccess:function(file, data){
            var data = JSON.parse(data);

			$('.preview img').attr('src', '/avatars/' + data.filename);
        }
    });

});