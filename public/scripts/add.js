define(function(require,exports,module){
    let $ = require('jquery');
    $('#addTeacher').on('submit',function(){
        
        let formData = $(this).serialize();

        $.ajax({
            url:'/teacher/add',
            data:formData,
            method:'post'
        });

    });
});