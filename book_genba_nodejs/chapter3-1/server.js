var http = require('http');
var fs = require('fs');
var url = require('url');
var ejs = require('ejs');
var cookie = require('cookie');

var index = fs.readFileSync('./index.ejs', 'utf8');
var style = fs.readFileSync('./style.css','utf8');

var server = http.createServer();
server.on('request',doRequest);
server.listen(1337);

function doRequest(req,res){
    var path = url.parse(req.url);

    switch(path.pathname){
    case '/':
	var message = "クッキーはありません。";
	if( req.headers.cookie != null){
	    var ck = cookie.parse(req.headers.cookie);
	    message = "クッキー：" + ck.lasturl + "," + ck.lasttime;
	}
	    var tmp = ejs.render(index, {
		title:"Index Page",
		message:message
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
    case '/time':
	var d = new Date().toDateString();
	var ck1 = cookie.serialize('lasttime', d, {
	    maxAge : 100
	});
	res.setHeader('Set-Cookie', ck1);
	res.setHeader('Content-Type', 'text/plain');
	res.write('SET URL-COOKIE');
	res.end();
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
