
/**
 * Primary file for the API
 */

 //Dependencies
var http = require('http');

 //The Assignment:

//Please create a simple "Hello World" API. Meaning:

//1. It should be a RESTful JSON API that listens on a port of your choice (3000). 
var server = http.createServer((req, res)=>{
    //2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. 
    //This message can be anything you want.
    var messageJson = { "message": 'Hello World'}

    res.end(JSON.stringify(messageJson))
    //res.end('Hello World')

});


//Start the server and have it listen to port 3000
server.listen(3000,()=>{
    console.log('Server is listening on port 3000');
})
 
