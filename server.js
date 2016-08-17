var http = require('http');



function onRequest(request,response){
	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});
	// 发送响应数据 "Hello World"
	response.write('hello world\n');
	//response.end('Hello World\n');
	response.end();
}

http.createServer(onRequest).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');