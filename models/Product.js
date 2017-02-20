"use strict"

const VALID_TYPES = ['classic', 'standout', 'premium', 'jora_membership'];

/**
 * Represents an product.
 * 
 * Type and value are the only attributes necessary for the test purpose,
 * in real use cases other attributes would be needed. 
 */
class Product{
    constructor(type, value){
        if( !valid(type) ){
            throw 'Unknown ad type: ' + type;
        }

        this.type = type;

        if(value < 0){
            throw 'Illegal ad value: ' + value;
        }

        this.value = value;
    }
}

/**
 * Checks whether the parameter is one of the known ad types
 * 
 * @returns true if the parameter is a known ad type
 */
function valid(type){
    return type && VALID_TYPES.indexOf(type.toLowerCase()) != -1;
}

module.exports = Product;