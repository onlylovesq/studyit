define(function(require,exports,module){
    let $ = require('jquery');
    $('#addTeacher').on('submit',function(){
        
        let formData = $(this).serialize();

        $.ajax({
            url:'/teachers/add',
            data:formData,
            type:'post'
        });
        
        return false;
    });
});