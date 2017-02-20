"use strict"

let NByMCommercialCondition = require('../models/NByMCommercialCondition');
let PriceDropCommercialCondition = require('../models/PriceDropCommercialCondition');

var Config = {
    /**
     * Here only to avoid querying a database on the test
     */
    specialConditions : {
        "unilever": {
            "classic": new NByMCommercialCondition(3, 2)
        },
        "apple":{
            "standout": new PriceDropCommercialCondition(0, 299.99)
        },
        "nike":{
            "premium": new PriceDropCommercialCondition(4, 379.99)
        },
        "ford":{
            "classic": new NByMCommercialCondition(5, 4),
            "standout": new PriceDropCommercialCondition(0, 309.99),
            "premium": new PriceDropCommercialCondition(3, 389.99)
        }
    },
    
    /**
     * Here only to avoid querying a database on the test
     */
    basePrices:{
        "classic": 269.99,
        "standout": 322.99,
        "premium": 394.99,
        "jora_membership": 99
    }
}

module.exports = Config;