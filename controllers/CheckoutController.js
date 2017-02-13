"use strict"

let Ad = require('../models/Ad')
let Checkout = require('../models/Checkout');
let Config = require('../config/Config')

/**
 * Handles checkout requests
 */
class CheckoutController{
    handle(req, res){
        console.log('Checkout request received');

        if( !req.is('json') ){
            res.sendStatus(415);
            return;
        }

        console.log('Content-type is valid');

        let chk = null;
        try{
            chk = this.validateData(req.body);
            console.log('Request data is valid: ' + JSON.stringify(chk));
        }catch(e){
            res.status(400).send(e);
            return;
        }
        
        this.calculateTotal(chk);

        res.send(JSON.stringify(chk));
    }

    /**
     * Converts the body of the request into a Checkout object, validating the input data
     */
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

    /**
     * Calculates the total value of the checkout according to special commercial conditions.
     * 
     * The value is updated in the Checkout object itfself.
     */
    calculateTotal(chk){
        let total = 0;
        let adsByType = {};

        chk.ads.map((ad) => {
            let currentAds = adsByType[ad.type];

            if( !currentAds ){
                adsByType[ad.type] = [ad];
            }else{
                currentAds = currentAds.concat(ad);
                adsByType[ad.type] = currentAds;
            }
        });

        let specialConditions = Config.specialConditions[chk.customer];

        for(let key of Object.keys(adsByType)){
            let specialCondition = null;

            if( specialConditions ){
                specialCondition = specialConditions[key];
            }

            if( specialCondition ){
                total += specialCondition.calculateValue(adsByType[key], Config.basePrices[key]);
            }else{
                total += adsByType[key].length * Config.basePrices[key];
            }
        }

        chk.total = total;
        console.log('Calculated checkout total: ' + chk.total);
    }
}

module.exports = CheckoutController;