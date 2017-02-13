"use strict"

/**
 * Represent a commercial condition where N have the price of M ads, usually M < N 
 */
class NByMCommercialCondition{
    constructor(n, m){
        if( !Number.isInteger(n) || !Number.isInteger(m) || n <= 0 || m <= 0 ){
            throw "Both M and N must be positive integers but were " + m + " and " + n;
        }
        this.n = n;
        this.m = m;
    }

    /**
     * Calculates the final value of the ad set considering the original ad value and commercial condition configuration 
     */
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