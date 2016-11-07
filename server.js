var http = require('http');
var url=require('url');

function start(route,handle){
	function onRequest(request,response){

		var pathname=url.parse(request.url).pathname;
        var postData="";
		console.log('request for '+pathname+' received');
        request.setEncoding("UTF-8");
        request.on("data",(postDataChunk)=>{
            postData += postDataChunk;
            console.log("Received POST data chunk '"+
            postDataChunk +"'.");
        });
        request.on("end",()=>{
            route(handle,pathname,response,postData);
        });
	}

	http.createServer(onRequest).listen(8888);
	// 终端打印如下信息
	console.log('Server running at http://127.0.0.1:8888/');
}
exports.start = start;
