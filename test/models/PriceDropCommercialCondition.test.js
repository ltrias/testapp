PriceDropCommercialCondition = require('../../models/PriceDropCommercialCondition');

test('Tryes to create condition with negative minimum itens ', () => {
    expect(() => {
        new PriceDropCommercialCondition(-1, 10.00);
    }).toThrow('Minimum itens can not be negative: -1');
});

test('Calculate value with invalid original price', () => {
    expect(() => {
        new PriceDropCommercialCondition(5, 10.00).calculateValue([], -100);
    }).toThrow('Invalid originalPrice: -100');
});

test('Calculate value with null original price', () => {
    expect(() => {
        new PriceDropCommercialCondition(5, 10.00).calculateValue([], null);
    }).toThrow('Invalid originalPrice: null');
});

test('Calculate value with empty ads', () => {
    let cond = new PriceDropCommercialCondition(5, 10);

    expect(cond.calculateValue([], 10)).toBe(0);
});

test('Calculate value with less ads than minimum', () => {
    let cond = new PriceDropCommercialCondition(3, 10);

    expect(cond.calculateValue(['ad1', 'ad2'], 15)).toBe(30);
});

test('Calculate value with more ads than minimum', () => {
    let cond = new PriceDropCommercialCondition(2, 10);

    expect(cond.calculateValue(['ad1', 'ad2', 'ad3'], 15)).toBe(30);
});