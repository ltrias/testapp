"use strict"

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