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

				// 在展示模态前将数据请求过来
				teacherModal.modal();
			}
		});

        return false;
    });

});