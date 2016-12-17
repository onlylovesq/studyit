define(function (require, exports, module) {

    // var $ = require('jquery');
    // require('bootstrap');

    $('#teacherList').on('click', 'a.preview', function () {
        $('#teacherModel').modal();
        return false;
    });

});