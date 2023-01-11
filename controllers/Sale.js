const Sale = require('../services/Sale');

const getAllSales = async (_req, res) => {
    const data = await Sale.getAll();
    res.status(200).json(data);
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const data = await Sale.findById(id);
    if (!data) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(data);
};

const createSales = async (req, res) => {
    const saleList = req.body;
    const data = await Sale.createSale(saleList);
    res.status(201).json(data);
};

const editSales = async (req, res) => {
    const saleList = req.body;
    const { id } = req.params;
    const data = await Sale.editSale(id, saleList);
    res.status(200).json(data);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;
    const data = await Sale.delSale(id);
    if (data.affectedRows === 0) return res.status(404).json({ message: 'Sale not found' });
    res.status(204).json();
};

module.exports = {
    getAllSales,
    getSaleById,
    createSales,
    editSales,
    deleteSale,
};
