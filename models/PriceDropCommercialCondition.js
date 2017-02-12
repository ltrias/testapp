"use strict"

class PriceDropCommercialCondition{
    constructor(minimumItems, newPrice){
        if( minimumItems < 0 ){
            throw "Minimum itens can not be negative: " + minimumItems;
        }
        this.minimumItems = minimumItems;
        this.newPrice = newPrice;
    }

    calculateValue(ads, originalPrice){
        if( Number.isNaN(Number.parseFloat(originalPrice)) || originalPrice < 0 ){
            throw "Invalid originalPrice: " + originalPrice;
        }

        let result = 0;

        if( ads.length > this.minimumItems){
            result = this.newPrice * ads.length;
        }else{
            result = originalPrice * ads.length;
        }

        return result;
    }
}

module.exports = PriceDropCommercialCondition;