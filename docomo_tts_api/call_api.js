var https = require('https');
var fs = require('fs');
var argv = require('argv');

argv.option([
    {
	name: 'apikey',
	short: 'a',
	type: 'string',
	description: '[Mondatory] API KEY provided from docomo Developer support',
	example: "'"+ argv.name + " --apikey=value' or '" + argv.name + " -a value'"
    },
    {
	name: 'savefile',
	short: 's',
	type: 'string',
	description: '[Mondatory] Filename to save',
	example: "'"+ argv.name + " --savefile=value' or '" + argv.name + " -s value'"
    },
    {
	name: 'text',
	short: 't',
	type: 'string',
	description: '[Mondatory] Text to input TextToSpeech',
	example: "'"+ argv.name + " --text=value' or '" + argv.name + " -t value'"
    }
]);

var args = argv.run();

if( args.options.apikey === undefined || args.options.savefile === undefined
  || args.options.text === undefined ){
    console.log("Please add mondatory arguments. You can use help option('-h')");
    process.exit(0);
}

var apiKey = args.options.apikey;
var saveFile = args.options.savefile;
var speechText = args.options.text;

var docomo_api_url  = "https://api.apigw.smt.docomo.ne.jp/virtualNarrator/v1/textToSpeech?APIKEY="

var json = '{'+
    '  "Command": "AP_Synth",'+
    '  "SpeechRate": "1.15",'+
    '  "AudioFileFormat": "0",'+
    '  "TextData": "'+ speechText +'"'+
    '}';

var options = {
    hostname: 'api.apigw.smt.docomo.ne.jp',
    path: '/virtualNarrator/v1/textToSpeech?APIKEY='+apiKey,
    method: 'POST',
    headers: {
	'Content-Type':'application/json',
    }
};

var req = https.request(options, function(res){
    res.setEncoding('binary')
    var contentLength = res.headers['x-content-length'];
    var responseData = '';
    res.on('data', function(chunk){
	responseData += chunk;
	process.stdout.write('.');
    });
    res.on('end', function(){
	var counter = fs.writeFile(saveFile, responseData, 'binary');
	console.log("DONE.");
	console.log("Save to "+saveFile);
    });
});

req.write(json);
req.end();
console.log('Invoke web api.');

