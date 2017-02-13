"use strict"

let Ad = require('../models/Ad')
let Checkout = require('../models/Checkout');
let Config = require('../config/Config')

class CheckoutController{
    handle(req, res){
        if( !req.is('json') ){
            res.sendStatus(415);
            return;
        }

        try{
            let chk = this.validateData(req.body);
        }catch(e){
            res.status(400).send(e);
            return;
        }

        this.calculateTotal(chk);

        res.send(JSON.stringify(chk));
    }

    validateData(body){
        let valid = true;
        let error = "";

        let customer = body.customer;

        if( !customer || customer.length < 1 ){
            valid = false;
            error += "Must have a customer\n";
        }

        let ads = body.ads;
        if( !ads || ads.length < 1 ){
            valid = false;
            error += "Must have ads\n";
        }
   
        if( !valid ){
            throw error;
        }

        let result = new Checkout(customer);

        for(let ad of ads){
            result.addAd(new Ad(ad, Config.basePrices[ad]));
        }

        return result;
    }

    calculateTotal(chk){
        let total = 0;
        let customerSpecialConditions = Config.specialConditions[chk.customer];
        let adsByType = {};

        chk.ads.map((ad) => {
            let currentAds = adsByType[ad.type];

            if( !currentAds ){
                adsByType[ad.type] = [ad];
            }else{
                currentAds.concat(ad);
            }
        });

        adsByType.forEach((key, value) => {
            let specialCondition = Config.specialConditions[key];

            if( specialCondition ){
                total += specialCondition.calculateValue(value, Config.basePrices[key]);
            }else{
                total += value.length * Config.basePrices[key];
            }
        });

        chk.total = total;
    }
}

module.exports = CheckoutController;