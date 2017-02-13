const request = require('request');

const PORT =  process.env.PORT || 9999;

const baseOptions = {
    url: 'http://localhost:' + PORT + '/checkout',
    port: process.env.PORT || 9999,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST'
}

function fetchData(payload){
    return new Promise((resolve, reject) => {
        var result = {};
        let options = safeCopy(baseOptions)
        options.body = payload;

        request.post(options, (error, response, body) => {
            result['error'] = error;
            result['response'] = response;
            result['body'] = body;

            if(error){
                console.log('Error fetching data: '+ error);
                reject(error);
            }

            resolve(result);
        });
    });
}

function safeCopy(obj){
    return JSON.parse(JSON.stringify(obj));
}

describe('Example scenarios validation, must be run with server running', () => {
    test('No special commercial condition', () => {
        return fetchData('{"customer":"default", "ads":["classic", "premium"]}').then( (r) => {
            expect(r.response.statusCode).toBe(200);
            expect(r.error).toBeNull();
            expect(r.body).toBeDefined();
            let parsedBody = JSON.parse(r.body);
            
            expect(parsedBody.total).toBe(664.98);
        });
    });

    test('Customer: Unilever', () => {
        return fetchData('{"customer":"unilever", "ads":["classic", "classic", "classic", "premium"]}').then( (r) => {
            expect(r.response.statusCode).toBe(200);
            expect(r.error).toBeNull();
            expect(r.body).toBeDefined();
            let parsedBody = JSON.parse(r.body);
            
            expect(parsedBody.total).toBe(934.97);
        });
    });

    test('Customer: Apple', () => {
        return fetchData('{"customer":"apple", "ads":["standout", "standout", "standout", "premium"]}').then( (r) => {
            expect(r.response.statusCode).toBe(200);
            expect(r.error).toBeNull();
            expect(r.body).toBeDefined();
            let parsedBody = JSON.parse(r.body);
            
            expect(parsedBody.total).toBe(1294.96);
        });
    });

    test('Customer: Nike', () => {
        return fetchData('{"customer":"nike", "ads":["premium", "premium", "premium", "premium"]}').then( (r) => {
            expect(r.response.statusCode).toBe(200);
            expect(r.error).toBeNull();
            expect(r.body).toBeDefined();
            let parsedBody = JSON.parse(r.body);
            
            expect(parsedBody.total).toBe(1519.96);
        });
    });
});