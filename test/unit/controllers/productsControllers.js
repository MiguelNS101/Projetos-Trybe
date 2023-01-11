const { expect } = require('chai');
const sinon = require('sinon');

const Product = require('../../../controllers/Product');
const Service = require('../../../services/Product');

describe('Testar Controller de produtos', () => {
    const request = {};
    const response = {};
    const products = [
    {
        id: 1,
        name: 'product 1',
        quantity: 10,
    },
    ];

    describe('sucesso!', () => {

    before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(Service, 'getAll').resolves(products);
    });

    after(() => {
        Service.getAll.restore();
    }); 

    it('recebe todos os produtos', async () => {
        await Product.getAllProducts(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

});


describe('sucesso!', () => {

    before(async () => {
        request.params = {id: 1};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(Service, 'findById').resolves(products);
    });

    after(() => {
        Service.findById.restore();
    }); 

    it('recebe produtos por id', async () => {
        await Product.getProductById(request, response);
        expect(response.status.calledWith(200)).to.be.true;
        expect(response.json.calledWith(sinon.match.array)).to.be.true;
    });

});

describe('sucesso!', () => {

    before(async () => {
        // request.params = {id: 1};
        // response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();

        sinon.stub(Service, 'findById').resolves(false);
    });

    after(() => {
        Service.findById.restore();
    }); 

    it('recebe 404', async () => {
        await Product.getProductById(request, response);
        expect(response.status.calledWith(404)).to.be.true;
    });

});

describe('sucesso!', () => {

    before(async () => {
        request.params = {id: 1};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(Service, 'deleteById').resolves(false);
    });

    after(() => {
        Service.deleteById.restore();
    }); 

    it('delete produtos por id', async () => {
        await Product.deleteProduct(request, response);
        expect(response.status.calledWith(204)).to.be.false;
    });

});
});
