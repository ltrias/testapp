"use strict"

/**
 * Represent a checkout operation by relating a customer to an ad set and a total value
 */
class Checkout{
    constructor(customer){
        this.customer = customer;
        this.ads = [];
        this.total = 0.0;
    }

    addAd(ad){
        this.ads = this.ads.concat(ad);
    }
}

module.exports = Checkout;