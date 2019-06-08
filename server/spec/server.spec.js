const Promise = require('bluebird');
const request = require('request')

let requestPromise = (Promise.promisify(request))

describe('Getting specific product inventory data with Promises', () => {

    it('should return prd specific records', () => {
        return requestPromise('http://localhost:4000/productInfo/?id=5000')
            .then(data => {
                expect(data).toBeDefined();
                let productInfo = JSON.parse(data.body);
                expect(productInfo.length).toEqual(4);
                expect(productInfo[0].ProductId).toEqual(5000);
                expect(productInfo[0].Quantity).toBeGreaterThan(0);
            })
    })
});
