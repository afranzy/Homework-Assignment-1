
/**
 * Primary file for the API
 */

//Dependencies
// Dependencies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var helpers = require('./lib/helpers');

var routehandler = require('./lib/routehandler')

//The Assignment:

//Please create a simple "Hello World" API. Meaning:

//1. It should be a RESTful JSON API that listens on a port of your choice (3000). 
//Instantiate Http server
var server = http.createServer((req, res) => {
    //2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. 
    //This message can be anything you want.
    // Parse the url
    var parsedUrl = url.parse(req.url, true);

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    console.log('trimmedPath: ' + trimmedPath)

    // Get the query string as an object
    var queryStringObject = parsedUrl.query;

    // Get the HTTP method
    var method = req.method.toLowerCase();
    console.log('method: ' + method);

    //Get the headers as an object
    var headers = req.headers;

    // Get the payload,if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();

        // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
        // var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        var chosenHandler = routehandler(trimmedPath);
        //console.log('chosenHandler: ' + JSON.stringify(chosenHandler));

        // Construct the data object to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, function (statusCode, payload) {

            // Use the status code returned from the handler, or set the default status code to 200
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            // Use the payload returned from the handler, or set the default payload to an empty object
            payload = typeof (payload) == 'object' ? payload : {};

            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log(trimmedPath, statusCode);
        });

    });

});


//Start the server and have it listen to port 3000
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})

