"use strict"

class NByMCommercialCondition{
    constructor(n, m){
        if( !Number.isInteger(n) || !Number.isInteger(m) || n <= 0 || m <= 0 ){
            throw "Both M and N must be positive integers but were " + m + " and " + n;
        }
        this.n = n;
        this.m = m;
    }

    calculateValue(ads, originalPrice){
        if( Number.isNaN(Number.parseFloat(originalPrice)) || originalPrice < 0 ){
            throw "Invalid originalPrice: " + originalPrice;
        }

        let remainingAds = ads.length % this.n;
        let discountGroups = Math.floor((ads.length - remainingAds) / this.n);

        return (discountGroups * this.m + remainingAds) * originalPrice;
    }
}

module.exports = NByMCommercialCondition;