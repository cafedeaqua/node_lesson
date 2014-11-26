var http = require('http');
var fs = require('fs');
var url = require('url');
var jade = require('jade');

var index = fs.readFileSync("./index.jade",'utf8');
var style = fs.readFileSync("./style.css", 'utf8');

var server = http.createServer();
server.on('request', doRequest);
server.listen(1337);

function doRequest(req,res) {
    var path = url.parse(req.url);

    switch(path.pathname){
    case '/':
	var fn = jade.compile(index);
	var tmp = fn();

	res.setHeader('Content-Type', 'text/html');
	res.write(tmp);
	res.end();
	break;

    case '/style.css':
	res.setHeader('Content-Type', 'text/css');
	res.write(style);
	res.end();
	break;

    case '/favicon.ico':
	break;
    default:
	res.setHeader('Content-Type', 'text/plain');
	res.write('NO PAGE!');
	res.end();
	break;
    }
}
console.log('Server running at http://127.0.0.1:1337');
