"use strict"

class Checkout{
    constructor(customer){
        this.customer = customer;
        this.offers = [];
    }

    addOffer(offer){
        this.offers.concat(offer);
    }

    totalValue(){
        let result = 0.0;

        for(let offer of this.offers){
            result += offer.getCommercialValue();
        }

        return result;
    }

    toString(){
        return "Checkout of " + this.customer + " with value " + this.totalValue();
    }
}

module.exports = Checkout;