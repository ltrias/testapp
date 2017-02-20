Product = require('../../models/Product');

test('Creates an ad with valid type', () => {
    expect(() => {
        new Product('classic', 150)
    }).toBeDefined();
});

test('Creates an ad with invalid type', () => {
    expect(() =>{
        new Product("Invalid type", 150)
    }).toThrow("Unknown ad type: Invalid type");
});

test('Negative cost must throw', () => {
    expect(() => { 
        new Product('classic', -150)
    }).toThrow('Illegal ad value: -150');
});

test('Types must be case insensitive', () => {
    expect(() => { 
        new Product('PrEmIuM', 10)
    }).toBeDefined();
});