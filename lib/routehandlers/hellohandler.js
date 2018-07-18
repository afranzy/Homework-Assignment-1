/**
 * Handles request to Hello url
 */

// Define container for library
var handler = {};

// Hello
handler = function (data, callback) {
  
    callback(200,{"message": "Hello World"})
};

handler.useThisHandler = function (_url) {
    return (_url != 'undefined' && typeof (_url) == 'string' && _url == 'hello');
}


// Export the handler
module.exports = handler;