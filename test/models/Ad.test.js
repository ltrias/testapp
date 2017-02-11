Ad = require('../../models/Ad');

test('Creates an ad with valid type', () => {
    expect(() => {
        new Ad('classic', 150)
    }).toBeDefined();
});

test('Creates an ad with invalid type', () => {
    expect(() => { 
        new Ad('I don\'t care about your types', 150)
    }).toThrow();
});

test('Negative cost must throw', () => {
    expect(() => { 
        new Ad('classic', -150)
    }).toThrow();
});

test('Types must be case insensitive', () => {
    expect(() => { 
        new Ad('PrEmIuM', 10)
    }).toBeDefined();
});