CheckoutController = require('../../controllers/CheckoutController');

let controller = new CheckoutController();

test('Try to checkout without customer', () => {
    expect(() => {
        controller.validateData({});
    }).toThrow(/Must have a customer/);
});

test('Try to checkout with empty customer', () => {
    expect(() => {
        controller.validateData({"customer":""});
    }).toThrow(/Must have a customer/);
});

test('Try to checkout without ads', () => {
    expect(() => {
        controller.validateData({"customer":"customer"});
    }).toThrow(/Must have ads/);
});

test('Try to checkout with empty ads', () => {
    expect(() => {
        controller.validateData({"customer":"customer", "ads":[]});
    }).toThrow(/Must have ads/);
});

test('Successful data validation',() => {
    expect(controller.validateData({'customer':'customer', 'ads':['classic', 'standout']})).toMatchObject({
        'customer':'customer',
        'total': 0,
        'ads':[
            {
                'type':'classic',
                'value': 269.99
            },
            {
                'type':'standout',
                'value': 322.99
            }
        ]
    });
});

// test('',() => {
    
// });

// test('',() => {
    
// });

// test('',() => {
    
// });

// test('',() => {
    
// });