define(function (require, exports, module) {

    // var $ = require('jquery');
    // require('bootstrap');

    var template = require('template');

    var teacherModal = $('#teacherModel');
    $('#teacherList').on('click', 'a.preview', function () {
        var tc_id = $(this).attr('data-id');
        $.ajax({
			url: '/teachers/preview',
			type: 'post',
			data: {tc_id: tc_id},
			success: function (info) {

				// 前端模板引擎
				var html = template('teacherTpl', info);
				teacherModal.find('table').html('');
				teacherModal.find('table').append(html);

				var jiguan = $('#jiguan').text().split(',');
				$.ajax({
					url:'/region',
					type:'get',
					success:function(msg){
						let province = msg.p['000000'][jiguan[0]];
						let city = msg.c[jiguan[0]][jiguan[1]];
						let district = msg.d[jiguan[1]][jiguan[2]];
						$('#jiguan').text(province+','+city+','+district);
					}
				});
				// 在展示模态前将数据请求过来
				teacherModal.modal();
			}
		});

        return false;
    });

});