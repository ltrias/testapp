CheckoutController = require('../../controllers/CheckoutController');

let controller = new CheckoutController();

test('Try to checkout without customer', () => {
    expect(() => {
        controller.validateData({});
    }).toThrowError(/Must have/);
});

test('Try to checkout with empty customer', () => {
    expect(() => {
        controller.validateData({"customer":""});
    }).toThrowError(/Must have/);
});

test('Try to checkout without ads', () => {
    expect(() => {
        controller.validateData({"customer":"customer"});
    }).toThrowError(/Must have/);
});

test('Try to checkout with empty ads', () => {
    expect(() => {
        controller.validateData({"customer":"customer", "ads":[]});
    }).toThrowError(/Must have/);
});