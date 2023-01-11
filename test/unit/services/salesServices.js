const { expect } = require('chai');
const sinon = require('sinon');

const Sale = require('../../../models/Sale');
const Service = require('../../../services/Sale');

describe('Testar Services de Sale', () => {

describe('sucesso!', () => {

    before(async () => {
        const sales = [  [
            {
                "saleId": 1,
                "date": "2021-09-09T04:54:29.000Z",
                "productId": 1,
                "quantity": 2
            },
            {
                "saleId": 1,
                "date": "2021-09-09T04:54:54.000Z",
                "productId": 2,
                "quantity": 2
            }
        ]];

        sinon.stub(Sale, 'getAll').resolves(sales);
    });
    after(() => {
        Sale.getAll.restore();
    }); 

    it('recebe todos as Sales', async () => {
        const response = await Service.getAll();
        expect(response).to.be.a('array')
        expect(response).to.have.lengthOf(1);
        expect(response[0]).to.have.property('saleId');
        expect(response[0]).to.have.property('date');
        expect(response[0]).to.have.property('productId');
        expect(response[0]).to.have.property('quantity');
    });

});


describe('sucesso!', () => {

    before(async () => {
        const sales = [  [
            {
                "date": "2021-09-09T04:54:29.000Z",
                "productId": 1,
                "quantity": 2
            },
            {
                "date": "2021-09-09T04:54:54.000Z",
                "productId": 2,
                "quantity": 2
            }
        ]];

        sinon.stub(Sale, 'findById').resolves(sales);
    });
    after(() => {
        Sale.findById.restore();
    }); 

    it('recebe Sale por id', async () => {
        const response = await Service.findById(1);
        expect(response).to.be.a('array')
        expect(response).to.have.lengthOf(1);
        expect(response[0]).to.have.property('date');
        expect(response[0]).to.have.property('productId');
        expect(response[0]).to.have.property('quantity');
    });

});

// describe('sucesso!', () => {

//     before(async () => {
//         const sales = {
//             "id": 1,
//             "itemsSold": [
//             {
//                 "productId": 1,
//                 "quantity": 3
//             }
//             ]
//         };

//         sinon.stub(Sale, 'createSale').resolves(sales);
//     });
//     after(() => {
//         Sale.createSale.restore();
//     }); 

//     it('createSale', async () => {
//         const response = await Service.createSale([
//             {
//                 "productId": 1,
//                 "quantity": 3
//             }
//         ]);
//         expect(response).to.be.a('object');
//         expect(response).to.have.property('id');
//         expect(response).to.have.property('itemsSold');
//     });

// });
});
