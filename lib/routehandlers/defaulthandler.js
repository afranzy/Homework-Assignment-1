/**
 * Default request handler
 * 
 */

 // Dependencies


// Define container for library
var handler = {};

// Not-Found
handler = function (data, callback) {
  
    callback(404);
};


handler.useThisHandler = function(url){
    return true;
}

module.exports = handler;