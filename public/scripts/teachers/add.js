define(function(require,exports,module){
    let $ = require('jquery');
    $('#addTeacher').on('submit',function(){
        
        let formData = $(this).serialize();
        let url = $(this).attr('action').trim();

        $.ajax({
            url:url,
            data:formData,
            type:'post',
            success:function(data){
                if(data.code == 10000){
                    location.reload();
                }

                alert(data.msg);
            }
        });
        
        return false;
    });
});