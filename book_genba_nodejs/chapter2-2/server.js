var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var server = http.createServer();
server.on('request', doRequest);
server.listen(1337);

function doRequest(req, res){
    var path = url.parse(req.url);
    console.log(path);
    switch(path.pathname){
    case '/':
	fs.readFile('./index.html', 'UTF-8', doRead);
	var title="サンプルページ";
	var message = "これはサンプルページで用意したメッセージです";

	function doRead(err, data){
	    if(err) throw err;
	    var str = data.replace(/@@@title@@@/g, title).replace(/@@@message@@@/g,message);
	    res.setHeader('Content-Type', 'text/html');
	    res.write(str);
	    res.end();
	}
	break;

    case '/form':
	if(req.method == "POST"){
	    var reqBody = '';
	    req.on('data', function(data){
		reqBody += data;
	    });
	    req.on('end', function(){
		var form = qs.parse(reqBody);
		console.log(form);
		var input1 = form.input1;
		fs.readFile('./index.html', 'UTF-8', function(err, data){
		    var result = data.replace(/@@@@/g,"あなたは、"+ input1 +" と書きました。");
		    res.setHeader('Content-Type', 'text/html');
		    res.write(result);
		    res.end();
		});
	    });
	}else{
	    res.setHeader('Content-Type','text/plain');
	    res.end("ERRPR - CAN'T GET -");
	}
	break;

    case '/helo':
	res.setHeader('Content-Type', 'text/plain');
	res.end('HELO!');
	break;

    default:
	res.setHeader('Content-Type','text/plain');
	res.end('ERRPR - NO PAGE-');
	break;
    }
}

console.log('Server running at http://127.0.0.1:1337/');


		     

	 
	
