Ad = require('../../models/Ad');

test('Creates an ad with valid type', () => {
    expect(() => {
        new Ad('classic', 150)
    }).toBeDefined();
});

test('Creates an ad with invalid type', () => {
    expect(() =>{
        new Ad("Invalid type", 150)
    }).toThrow("Unknown ad type: Invalid type");
});

test('Negative cost must throw', () => {
    expect(() => { 
        new Ad('classic', -150)
    }).toThrow('Illegal ad value: -150');
});

test('Types must be case insensitive', () => {
    expect(() => { 
        new Ad('PrEmIuM', 10)
    }).toBeDefined();
});