"use strict"

/**
 * Represent a checkout operation by relating a customer to an ad set and a total value
 */
class Checkout{
    constructor(customer){
        this.customer = customer;
        this.product = [];
        this.total = 0.0;
    }

    addProduct(product){
        this.product = this.ads.concat(product);
    }
}

module.exports = Checkout;