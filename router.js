const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./controllers/Product');
const Sale = require('./controllers/Sale');
const prodMiddleware = require('./middlewares/Product');
const SaleMiddleware = require('./middlewares/Sale');

const router = express.Router();
const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/products', Product.getAllProducts);

router.post('/products',
    jsonParser,
    prodMiddleware.validateName,
    prodMiddleware.validateQuantity,
    prodMiddleware.validateNameLenght,
    prodMiddleware.validateQuantityNum,
    Product.createProduct);

router.get('/products/:id', Product.getProductById);

router.put('/products/:id',
    jsonParser,
    prodMiddleware.validateName,
    prodMiddleware.validateQuantity,
    prodMiddleware.validateNameLenght,
    prodMiddleware.validateQuantityNum,
    Product.editProduct);

router.delete('/products/:id', Product.deleteProduct);

router.get('/sales', Sale.getAllSales);

router.post('/sales',
    jsonParser,
    SaleMiddleware.validateId,
    SaleMiddleware.validateQuantity,
    SaleMiddleware.validateQuantityNum,
    Sale.createSales);

router.put('/sales/:id',
    jsonParser,
    SaleMiddleware.validateId,
    SaleMiddleware.validateQuantity,
    SaleMiddleware.validateQuantityNum,
    Sale.editSales);

router.delete('/sales/:id', Sale.deleteSale);

router.get('/sales/:id', Sale.getSaleById);

module.exports = router;