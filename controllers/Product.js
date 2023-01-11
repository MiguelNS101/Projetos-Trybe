const Product = require('../services/Product');

const getAllProducts = async (_req, res) => {
    const data = await Product.getAll();
    res.status(200).json(data);
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (!data) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(data);
};

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const data = await Product.createProd(name, quantity);
    if (!data) return res.status(409).json({ message: 'Product already exists' });
    res.status(201).json(data);
};

const editProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const data = await Product.editProduct(id, name, quantity);
    if (!data) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(data);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const data = await Product.deleteById(id);
    if (!data) return res.status(404).json({ message: 'Product not found' });
    res.status(204).json();
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
};
