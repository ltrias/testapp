"use strict"

/**
 * Represents a commercial condition where the unit cost of ads are lowered if more than a specific amount of ads is acquired
 */
class PriceDropCommercialCondition{
    constructor(minimumItems, newPrice){
        if( minimumItems < 0 ){
            throw "Minimum itens can not be negative: " + minimumItems;
        }
        this.minimumItems = minimumItems;
        this.newPrice = newPrice;
    }

    /**
     * Calculates the final value of the ad set considering the original ad value and the amount of ads acquired 
     */
    calculateValue(ads, originalPrice){
        if( Number.isNaN(Number.parseFloat(originalPrice)) || originalPrice < 0 ){
            throw "Invalid originalPrice: " + originalPrice;
        }

        let result = 0;

        if( ads.length >= this.minimumItems){
            result = this.newPrice * ads.length;
        }else{
            result = originalPrice * ads.length;
        }

        return result;
    }
}

module.exports = PriceDropCommercialCondition;