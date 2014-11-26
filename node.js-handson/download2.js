/**
 * download2.js - 指定したURLからデータをダウンロードしながら標準出力に表示
 *
 * usage:
 *  node download2.js URL1 URL2 URL3...
 * 
*/

var url = require('url');
var http = require('http');
var fs = require('fs');
var path = require('path');

function download(urlStr){
    var u = url.parse(urlStr);
    
    console.log('--- urlStr ---');
    console.log(urlStr);
    console.log('--- u ---');
    console.log(u);
    console.log(u.hostname);
    console.log(u['hostname']);
    var client = http.request(urlStr, function(res){
	console.log('STATUS:' + res.statusCode);
	console.log('HEADERS:' + JSON.stringify(res.headers));
	console.log(JSON.stringify(res.headers));
	res.setEncoding('utf8');
	var counter=0;
	var fd;
	fd = fs.openSync(path.basename(u.pathname),'w');
	res.on('data', function(chunk){
	    fs.write(fd, chunk, chunk.length, counter);
	    counter = counter + chunk.length;
	    process.stdout.write('.');
	});
	res.on('end', function(){
	    fs.close(fd);
	});
    });

    client.end();
}

var argv = process.argv;
for(var i=2, len=argv.length; i<len; i++){
    download(process.argv[i]);
}

	
