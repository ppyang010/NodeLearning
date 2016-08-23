var exec = require("child_process").exec;//为了可以进行shell操作

function start(response){
	  console.log("Request handler 'start' was called.");
	   exec("ls -lah",function(error, stdout, stderr){
	    response.writeHead(200,{"Content-Type":"text/plain"});
	    response.write(stdout);
	    response.end();
	  });
}

function upload(response){
	  console.log("Request handler 'upload' was called.");
	  response.writeHead(200,{"Content-Type":"text/plain"});
	  response.write("Hello Upload");
	  response.end();
}


exports.start=start;
exports.upload=upload;