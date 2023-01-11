const Product = require('../models/Product');

const serialize = (productData) => productData.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
}));

const getAll = async () => {
    const data = await Product.getAll();

    return serialize(data);
};

const findById = async (id) => {
    const productData = await Product.findById(id);
    if (productData.length === 0) return null;
    const data = serialize(productData);
    return data[0];
};

const createProd = async (name, quantity) => {
    const products = await Product.getAll();
    const verifyExists = products.find((obj) => obj.name === name);
    let data;
    if (verifyExists === undefined) {
        const productData = await Product.createProd(name, quantity);
        data = productData;
    }
    return data;
};

const editProduct = async (id, name, quantity) => {
    const products = await Product.getAll();
    const verifyExists = products.find((obj) => obj.id === id);
    let data;
    if (verifyExists === undefined) {
        const productData = await Product.editProd(id, name, quantity);
        data = productData;
    }
    return data;
};

const deleteById = async (id) => {
    const products = await Product.getAll();
    const verifyExists = products.find((obj) => obj.id === parseInt(id, 10));
    if (verifyExists !== undefined) {
        await Product.deleteProd(id);
        return true;
    }
};
module.exports = {
    getAll,
    findById,
    createProd,
    editProduct,
    deleteById,
};
