/**
 * download1.js - 指定したURLからデータをダウンロードしながら標準出力に表示
 *
 * usage:
 *  node download1.js URL
 * 
*/

var url = require('url');
var http = require('http');
var fs = require('fs');

function download(urlStr){
    var u = url.parse(urlStr);
    
    console.log('--- urlStr ---');
    console.log(urlStr);
    console.log('--- u ---');
    console.log(u);
    console.log(u.hostname);
    console.log(u['hostname']);
//    var client = http.createClient(u.port || 80, u.hostname);
    var client = http.request(urlStr, function(res){
	console.log('STATUS:' + res.statusCode);
	console.log('HEADERS:' + JSON.stringify(res.headers));
	console.log(JSON.stringify(res.headers));
	res.setEncoding('utf8');
	var counter=0;
	var fd;
	fd = fs.openSync('save.jpg','w');
	res.on('data', function(chunk){
	    // console.log(chunk);
	    // console.log(fd);
	    fs.writeSync(fd, chunk, chunk.length, counter);
//	    console.log('<<<');
//	    console.log(chunk.length);
//	    console.log('>>>');
	    counter = counter + chunk.length;
	    console.log(counter);
	});
	res.on('end', function(){
	    fs.closeSync(fd);
	});
    });

//    client.write('data¥n');
//    client.write('data¥n');
    client.end();

/*    
    var request = client.request('GET',
				 u.pathname,
				 {
				     host: u.hostname
				 });
    console.log('--- u.pathname ---');
    console.log(u.pathname);
    console.log('--- u.hostname ---');
    console.log(u.hostname);
    request.end();
    request.on('response', function(response){
	console.log(response.statusCode);
	for( var i in response.headers){
	    console.log(i + ":" + response.headers[i]);
	}
	console.log('');

	response.setEncoding('UTF-8');
	response.on('data', function(chunk){
	    util.print(chunk);
	});

	response.on('end', function(){
	    console.log('on end');
	});
    });
*/
}

console.log('<<< process');
console.log(process.argv[0]);
console.log(process.argv[1]);
console.log(process.argv[2]);
console.log('>>> process');

download(process.argv[2]);

