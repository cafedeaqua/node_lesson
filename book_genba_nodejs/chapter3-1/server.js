var http = require('http');
var fs = require('fs');
var url = require('url');
var ejs = require('ejs');

var index = fs.readFileSync('./index.ejs', 'utf8');
var style = fs.readFileSync('./style.css','utf8');

var server = http.createServer();
server.on('request',doRequest);
server.listen(1337);

function doRequest(req,res){
    var path = url.parse(req.url);

    switch(path.pathname){
    case '/':
	var ck = req.headers.cookie;
	var tmp = ejs.render(index, {
	    title:"Index Page",
	    message:"クッキー:" + ck
	});
	res.setHeader('Content-Type', 'text/html');
	res.write(tmp);
	res.end();
	break;
	
    case '/style.css':
	res.setHeader('Content-Type','text/css');
	res.write(style);
	res.end();
	break;
    case '/favicon.ico':
	break;
    default:
	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Set-Cookie',['lasturl=' + path.pathname]);
	res.write('SET COOKIE');
	res.end();
	break;
    }
}

console.log('Server running at http://127.0.0.1:1337/');
