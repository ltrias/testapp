"use strict"

class Checkout{
    constructor(customer){
        this.customer = customer;
        this.ads = [];
        this.total = 0.0;
    }

    addAd(ads){
        this.ads.concat(ad);
    }

    set total(total){
        this.total = total;
    }

    get total(){
        return total;
    }
}

module.exports = Checkout;