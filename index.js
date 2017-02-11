"use strict"
var express = require('express');
var app = express();
var controllers = {};
var port = process.env.PORT || 9999;

var CheckoutController = require('./controllers/CheckoutController');
controllers['checkout'] = new CheckoutController();

app.get('/checkout', function(req, res){
    controllers['checkout'].handle(req, res);
});

app.listen(port, function(){
    console.log('Started at ' + port);
})