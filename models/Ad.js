"use strict"

const VALID_TYPES = ['classic', 'standout', 'premium'];

class Ad{
    constructor(type, value){
        if( !valid(type) ){
            throw 'Unkown ad type: ' + type;
        }

        this.type = type;

        if(value < 0){
            throw 'Illegal ad value: ' + value;
        }
        this.value = value;
    }
}

function valid(type){
    return VALID_TYPES.findIndex(type.toLowerCase()) == -1;
}

module.exports = Ad;