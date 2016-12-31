const gm = require('gm');
const path = require('path');
const rootPath = path.join(__dirname,'../');

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

exports.crop = function(x,y,w,h,filename,callback){
    // 将裁切后的图片进存储时，需要明确后缀
    let fileExt = filename.slice(filename.lastIndexOf('.'));
    let fileName = Date.now();
    //gm插件用法(切记一定要先安装GraphicsMagick 然后配置好环境变量才可以使用gm)
    gm(rootPath+'/uploads/original/'+filename)
    .crop(w,h,x,y)
    .write(rootPath+'/uploads/thumbs/'+fileName+fileExt,()=>{
        callback(fileName+fileExt);
    });
}