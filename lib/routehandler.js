/**
 * Strategy Pattern: Context
 * This maintains reference to the current routehandler
 * It allows client to request for the handler to use
 */

 //Denpendencies
 var routehandlers = require('./routehandlers')

 'use strict'


 function selectRouteHandler(url){
     let handlers = Object.keys(routehandlers);

     for(let i=0;i<handlers.length; i++){

        let handler = routehandlers[handlers[i]];
        if(handler.useThisHandler(url))
            return handler;

     }

 }

 module.exports = function getHandler(url){

    let selectedHander = selectRouteHandler(url);
    return selectedHander

 }