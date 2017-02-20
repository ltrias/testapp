CheckoutController = require('../../controllers/CheckoutController');
Checkout = require('../../models/Checkout');
Product = require('../../models/Product');
Config = require('../../config/Config');

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
    }).toThrow(/Must have products/);
});

test('Try to checkout with empty ads', () => {
    expect(() => {
        controller.validateData({"customer":"customer", "ads":[]});
    }).toThrow(/Must have products/);
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

test('Calculate total without special conditions',() => {
    let chk = createCheckout('common client', 'classic', 'classic', 'standout');
    controller.calculateTotal(chk);

    expect(chk.total).toBe(862.97);
});

test('Calculate total with special conditions',() => {
    let chk = createCheckout('unilever', 'classic', 'classic', 'classic', 'classic');
    controller.calculateTotal(chk);

    expect(chk.total).toBe(809.97);
});

test('Calculate total with special and common conditions',() => {
    let chk = createCheckout('unilever', 'classic', 'classic', 'classic', 'classic', 'standout');
    controller.calculateTotal(chk);

    expect(chk.total).toBe(1132.96);
});

test('Calculate total with mixed special conditions',() => {
    let chk = createCheckout('ford', 'classic', 'classic', 'classic', 'classic', 'classic', 'classic', 'standout', 'premium', 'premium', 'premium');
    controller.calculateTotal(chk);

    expect(chk.total).toBe(2829.91);
});

function createCheckout(customer){
    let result = new Checkout(customer);
    let products = Array.from(arguments).slice(1);

    for(let p of products){
        result.addProduct(new Product(products, Config.basePrices[p]));
    }

    return result;
}