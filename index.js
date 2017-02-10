"use strict"
var express = require('express');
var app = express();

var port = getPortFromCommandLine() || 9999;


app.get('/', function(req, res){
    res.send('Oi Tábata <3');
});

app.listen(port, function(){
    console.log('Started at ' + port);
})

function getPortFromCommandLine(){
    let result = null;

    let param = process.argv.slice(2,3);
    
    if( param  ){
        param = Number.parseInt(param, 10) 

        if( !Number.isNaN(param) &&  param > 1024 && param < 65535 ){
            result = param;
        }
    }

    return result;
}