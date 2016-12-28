define(function(require,exports,module){
    
    // 引入文件上传插件
	require('uploadify');

    var preview = $('.preview img');

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
			
		}
	});

});