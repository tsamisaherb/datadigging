//Making a server and requesting information

var http = require('http'); //need a http
var fs = require('fs'); //fs is file system
var url = require('url'); //need a url to run

//Creating a server. This is so much easier than illustrator
//I hate illustrator
//It's the wurst.

http.createServer(function(request, response){

	//Parse request with the file name
	var pathname = url.parse(request.url).pathname;

	//Print the name of the file
	console.log("the file currently running is: " + pathname);
	//Was for debugging.

	//Read the file from the file system (FS)
	fs.readFile(pathname.substr(1), function(err, data){
		//If there's an error reading the file
		//err is basically NullException class
		if(err)
		{
			console.log(err);
			//This usually is 404: not found
			response.writeHead(404, {'Content-Type': 'text/html'});
			//Content-type is how you are writing the error
		}
		else //otherwise you hve found the page!
		{
			//HTTP status should be 200 which means OK
			response.writeHead(200, {'Content-Type': 'text/html'});

			//Write the content of the file to the response body
			response.write(data.toString());
		}

		//end the rresponse
		response.end();

	});
}).listen(8081); //8081 is the name of the server

//console will print running server
console.log('Server running at http://127.0.0.1:8081/');