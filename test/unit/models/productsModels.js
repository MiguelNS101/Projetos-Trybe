const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const Product = require('../../../models/Product');


describe('endpoint /products', () => {

describe('sucesso!', () => {

    before(async () => {
        const products = [  [
            {
                "id": 1,
                "name": "produto A",
                "quantity": 10
            },
            {
                "id": 2,
                "name": "produto B",
                "quantity": 20
            }
        ]
        ];

        sinon.stub(connection, 'execute').resolves(products);
    });
    after(() => {
        connection.execute.restore();
    }); 

    it('recebe produtos', async () => {
        const response = await Product.getAll();
        expect(response).to.be.a('array');
        expect(response).to.have.lengthOf(2);
        expect(response[0]).to.have.property('id');
        expect(response[0]).to.have.property('name');
        expect(response[0]).to.have.property('quantity');
    });

});


describe('sucesso!', () => {

    before(async () => {
        const products = [[
            {
                "id": 1,
                "name": "produto A",
                "quantity": 10
            }
        ]];

        sinon.stub(connection, 'execute').resolves(products);
    });
    after(() => {
        connection.execute.restore();
    }); 

    it('recebe produtos por id', async () => {
        const response = await Product.findById(1);
        expect(response).to.be.an('array');
        expect(response[0]).to.have.property('id');
        expect(response[0]).to.have.property('name');
        expect(response[0]).to.have.property('quantity');
    });

});
});
