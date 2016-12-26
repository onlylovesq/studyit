exports.getTree = getTree;
//获取课程类别下的所有父子级对应的数据
function getTree(data,pid){
    var args = arguments;
    var array = [];
    (function(){
        var i = 0,len = data.length;
        for (; i < len; i++) {
            if(data[i]['cg_pid'] === pid){
                
                data[i].childs = [];

                if(args[2]){
                   args[2].push(data[i]);
                }else{
                   array.push(data[i]); 
                }

                getTree(data,data[i]['cg_id'],data[i].childs);
            }
        }

    })();

    return array;
}