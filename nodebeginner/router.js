function route(handle, pathname, response){
    console.log("Abount to route a request for " + pathname);
    if(typeof handle[pathname] === 'function' ){
	return handle[pathname](response);
    }else{
	console.log("No request handler found for " + pathname);
	return "404 Not Found";
    }
}

exports.route = route;
