const { Category } = require('../database/models');
require('dotenv').config();

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const newCategory = await Category.create({ name });
        const result = {
            id: newCategory.id,
            name: newCategory.name,
        };
        res.status(201).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Internall Error', error: e.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        res.status(200).json(categories);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Internall Error', error: e.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
};