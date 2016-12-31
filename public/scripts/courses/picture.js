define(function(require,exports,module){
    
    // 引入文件上传插件
	require('uploadify');
    //引入裁剪插件
    require('Jcrop');
    //引入提交表单插件
    require('form');

    let preview = $('.preview img');
    let jcrop_api;

    function imgCrop(){

        if(jcrop_api){
            jcrop_api.destroy();
        }

        preview.Jcrop({
            boxWidth:400,
            aspectRatio:2
        },function(){

            jcrop_api = this;

            //在回调函数中设置默认选区
            let width = this.ui.stage.width;
            let height = this.ui.stage.height;

            let x,y,w,h;

            x = 0;
            y = (height - width/2)/2;
            w = width;
            h = width/2;

            this.newSelection();
            this.setSelect([x,y,w,h]);

            //将插件修改了 因此可以添加thumb:'.thumb'
            thumbnail = this.initComponent('Thumbnailer', { width: 240, height: 120, thumb: '.thumb' });
            //将预览区域和缩略图区域重合
            $('.jcrop-thumb').css({
                left:0,
                top:0
            });
        });
    }

    //给图片的父元素添加事件
    preview.parent().on('cropmove cropend',function(selection, coords, c){
        $('#x').val(c.x);
		$('#y').val(c.y);
		$('#w').val(c.w);
		$('#h').val(c.h);
    });

    //裁切
    $('#cutBtn').on('click',function(){

        let status = $(this).attr('data-status');

        if(status === 'cut'){
            imgCrop();
            $(this).val('保存图片').attr('data-status','save');
            return;
        }

        $('#coords').ajaxSubmit({
            url:'/courses/crop',
            type:'post',
            success:function(data){
                alert(data.msg);
                if(data.code === 10000){
                    location.href = '/courses/lesson/'+data.result.cs_id;
                }
            }
        });
        return false;
    });

    $('#upfile').uploadify({
		width: '85px',
		height: 'auto',
		fileObjName: 'upfile', // 上传文件的key，相当于file表单name
		formData: {cs_id: $('#csId').val()}, // 参数，相当于jquery的data
		buttonClass: 'btn btn-success btn-sm',
		fileSizeLimit: '2MB',
		fileTypeExts:  '*.gif; *.jpg; *.png',
		buttonText: '选择图片',
		swf: '/assets/uploadify/uploadify.swf',
        itemTemplate: '<span></span>',
		uploader:'/courses/upfile',
		onUploadSuccess: function (file, data) {

			var data = JSON.parse(data);
			// 预览图片
			preview.attr('src', '/original/' + data.filename);
            //将图片路径存入表单
            $('#cover').val(data.filename);
            //改变按钮状态
            $('#cutBtn').prop('disabled',false);
            $('#cutBtn').val('保存图片').attr('data-status','save');
            //调用裁切
            imgCrop();
			
		}
	});

});