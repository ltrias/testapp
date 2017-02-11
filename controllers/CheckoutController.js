"use strict"

let CommercialCondition = require('../models/CommercialCondition');

/**
 * Here only to avoid querying a database on the test
 */
var specialConditions = {
    "unilever": {
        "classic": new 
    },
}

class CheckoutController{
    handle(req, res){
        console.log('Handling ' + req);
    }
}

module.exports = CheckoutController;