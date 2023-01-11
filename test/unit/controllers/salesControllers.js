const { expect } = require('chai');
const sinon = require('sinon');

const Sale = require('../../../controllers/Sale');
const Service = require('../../../services/Sale');

describe('Testar Controller de Sale', () => {

    const request = {};
    const response = {};
    const sales = [
    {
        sale_id: 1,
        date: "2022-04-09T18:06:01.000Z",
        productId: 1,
        quantity: 5,
    }
];
describe('sucesso!', () => {

    before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(Service, 'getAll').resolves(sales);
    });
    after(() => {
        Service.getAll.restore();
    }); 

    it('recebe todos as Sales', async () => {
        await Sale.getAllSales(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

});


describe('sucesso!', () => {

    before(async () => {
        request.params = {id: 1};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(Service, 'findById').resolves(sales);
    });
    after(() => {
        Service.findById.restore();
    }); 

    it('recebe Sale por id', async () => {
        await Sale.getSaleById(request, response);
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
        await Sale.getSaleById(request, response);
        expect(response.status.calledWith(404)).to.be.true;
    });

});

describe('sucesso!', () => {

    before(async () => {
        request.params = {id: 1};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(Service, 'delSale').resolves(false);
    });
    after(() => {
        Service.delSale.restore();
    }); 

    it('delete Sale por id', async () => {
        await Sale.deleteSale(request, response);
        expect(response.status.calledWith(204)).to.be.true;
    });

});
});
