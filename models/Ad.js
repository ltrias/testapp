"use strict"

const VALID_TYPES = ['classic', 'standout', 'premium'];

class Ad{
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

function valid(type){
    return type && VALID_TYPES.indexOf(type.toLowerCase()) != -1;
}

module.exports = Ad;