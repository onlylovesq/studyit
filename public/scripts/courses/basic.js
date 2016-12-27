define(function(require,exports,module){
    require('form');
    // 提交表单
	$('#basicCourse').on('submit', function () {

		$(this).ajaxSubmit({
			url: '/courses/basic',
			type: 'post',
			success: function (data) {
				alert(data.msg);

				if(data.code == 10000) {
					location.href = '/course/picture/' + data.result.cs_id;
				}
			}
		});

		return false;
	});

    //获取子分类
    $('#topCategory').on('change',function(){
        var _this = $(this);
        $.ajax({
            url:'/courses/getChild',
            type:'post',
            data:{cg_id:$(this).val()},
            success:function(data){
                let html = '';
                for(var i=0; i<data.result.length; i++) {
					html += '<option value="'+ data.result[i].cg_id +'">' + data.result[i].cg_name + '</option>';
				}
                _this.next('select').html(html);
            }
        });
    }); 
});