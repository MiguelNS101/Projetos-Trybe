const { expect } = require('chai');
const sinon = require('sinon');

const Product = require('../../../models/Product');
const Service = require('../../../services/Product');

describe('Testar Services de produtos', () => {

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

        sinon.stub(Product, 'getAll').resolves(products);
    });
    after(() => {
        Product.getAll.restore();
    }); 

    it('recebe todos os produtos', async () => {
        const response = await Service.getAll();
        expect(response).to.be.a('array');
        expect(response).to.have.lengthOf(1);
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

        sinon.stub(Product, 'findById').resolves(products);
    });
    after(() => {
        Product.findById.restore();
    }); 

    it('recebe produtos por id', async () => {
        const response = await Service.findById(1);
        expect(response).to.be.an('object');
        expect(response).to.have.property('id');
        expect(response).to.have.property('name');
        expect(response).to.have.property('quantity');
    });

});

describe('sucesso!', () => {

    before(async () => {
        sinon.stub(Product, 'findById').resolves([]);
    });
    after(() => {
        Product.findById.restore();
    }); 

    it('recebe null', async () => {
        const response = await Service.findById();
        expect(response).to.be.null;
    });

});

// describe('sucesso!', () => {

//     before(async () => {
//         const products = { "id": 1, "name": "produto", "quantity": 10 };

//         sinon.stub(Product, 'createProd').resolves(products);
//     });
//     after(() => {
//         Product.createProd.restore();
//     }); 

//     it('CreateProd', async () => {
//         const response = await Service.createProd({ "name": "produto X", "quantity": 10 });
//         expect(response).to.be.a('object');
//         expect(response).to.have.property('id');
//         expect(response).to.have.property('name');
//         expect(response).to.have.property('quantity');
//     });

// });

// describe('sucesso!', () => {

//     before(async () => {
//         const products =
//         {
//             id: 1,
//             name: 'product 1',
//             quantity: 10,
//         };

//         sinon.stub(Product, 'editProd').resolves(products);
//     });
//     after(() => {
//         Product.editProd.restore();
//     }); 

//     it('Edit Prod', async () => {
//         const response = await Service.editProduct({ "name": "produto X", "quantity": 10 });
//         expect(response).to.be.a('object');
//         expect(response).to.have.property('id');
//         expect(response).to.have.property('name');
//         expect(response).to.have.property('quantity');
//     });

// });

// describe('sucesso!', () => {

//     before(async () => {
//         sinon.stub(Product, 'deleteProd').resolves();
//     });
//     after(() => {
//         Product.deleteProd.restore();
//     }); 

//     it('recebe null', async () => {
//         const response = await Service.deleteById(1);
//         expect(response).to.be.true;
//     });

// });
});
