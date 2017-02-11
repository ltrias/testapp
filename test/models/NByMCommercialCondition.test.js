NByMCommercialCondition = require('../../models/NByMCommercialCondition');

test('Tryes to create condition with negative n ', () => {
    expect(() => {
        new NByMCommercialCondition(-1, 5);
    }).toThrow();
});

test('Tryes to create condition with negative m ', () => {
    expect(() => {
        new NByMCommercialCondition(2, -3);
    }).toThrow();
});

test('Calculate value with invalid original price', () => {
    expect(() => {
        new NByMCommercialCondition(3, 2).calculateValue([], -100.00);
    }).toThrow();
});

test('Calculate value with null original price', () => {
    expect(() => {
        new NByMCommercialCondition(3, 2).calculateValue([], null);
    }).toThrow();
});

test('Calculate value with equal n and m', () => {
    let cond = new NByMCommercialCondition(2, 2);

    expect(cond.calculateValue(['ad1', 'ad2'], 10.00)).toBe(20.00);
});

test('Calculate value with number of ads multiple of n', () => {
    let cond = new NByMCommercialCondition(3, 2);

    expect(cond.calculateValue(['ad1', 'ad2', 'ad3', 'ad4', 'ad5', 'ad6'], 10.00)).toBe(40.00);
});

test('Calculate value with number of ads not multiple of n', () => {
    let cond = new NByMCommercialCondition(4, 3);

    expect(cond.calculateValue(['ad1', 'ad2', 'ad3', 'ad4', 'ad5', 'ad6'], 10.00)).toBe(50.00);
});

test('Calculate value with empty ads', () => {
    let cond = new NByMCommercialCondition(3, 2);

    expect(cond.calculateValue([], 10)).toBe(0);
});