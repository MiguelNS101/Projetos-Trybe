const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const Sale = require('../../../models/Sale');


describe('endpoint /Sale', () => {

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

        sinon.stub(connection, 'execute').resolves(sales);
    });
    after(() => {
        connection.execute.restore();
    }); 

    it('recebe vendas', async () => {
        const response = await Sale.getAll();
        expect(response).to.be.a('array')
        expect(response).to.have.lengthOf(2);
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

        sinon.stub(connection, 'execute').resolves(sales);
    });
    after(() => {
        connection.execute.restore();
    }); 

    it('recebe vendas por id', async () => {
        const response = await Sale.findById(1);
        expect(response).to.be.a('array')
        expect(response).to.have.lengthOf(2);
        expect(response[0]).to.have.property('date');
        expect(response[0]).to.have.property('productId');
        expect(response[0]).to.have.property('quantity');
    });

});
});
