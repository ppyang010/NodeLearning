//请求处理程序
var exec = require("child_process").exec;//为了可以进行shell操作
var querystring=require("querystring");
const fs=require("fs");
const path=require("path");
const formidable = require("formidable");
function start(response){
    console.log("Request handler 'start' was called.");
    // exec("ls -lah",function(error, stdout, stderr){
    // response.writeHead(200,{"Content-Type":"text/plain"});
    // response.write(stdout);
    // response.end();
    // });
    var body ='<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';
      response.writeHead(200,{"Content-Type":"text/html"});
      response.write(body);
      response.end();
}

function upload(response,request){
    console.log("Request handler 'upload' was called.");
    response.writeHead(200,{"Content-Type":"text/plain"});
    var form=new formidable.IncomingForm();
    form.uploadDir = "./temp";//重设上传目录
    form.parse(request,function(err,fields, files){
        console.log("parsing done");
        fs.renameSync(files.upload.path,path.join(__dirname,"./temp/test.jpg"));
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write(`<img src="/show"/>`);
        response.end();
    })
}

function show(response){
    console.log("Request handler 'show' was called.");
    fs.readFile(path.join(__dirname,"./temp/test.jpg"),"binary",(err,data)=>{
        if(err){
            response.writeHead(500,{"Content-Type":"text/plain"});
            response.write(error +"\n");
            response.end();
        }else{
            response.writeHead(200,{"Content-Type":"image/png"})
            response.write(data,"binary");
            response.end();
        }

    });


}

exports.start=start;
exports.upload=upload;
module.exports.show=show;
