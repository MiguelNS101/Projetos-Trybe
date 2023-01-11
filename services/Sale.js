const Sale = require('../models/Sale');

const serialize = (saleData) => saleData.map((item) => ({
    saleId: item.sale_id,
    date: item.date,
    productId: item.product_id,
    quantity: item.quantity,
}));

const getAll = async () => {
    const data = await Sale.getAll();

    return serialize(data);
};

const findById = async (id) => {
    const data = await Sale.findById(id);
    if (data.length === 0) return null;
    return serialize(data);
};

const createSale = async (saleList) => {
    const sales = await Sale.getAllSales();
    const newId = sales.length + 1;
    await Sale.createSale(parseInt(newId, 10));
    await Sale.createSaleItem(saleList, parseInt(newId, 10));
    return {
        id: parseInt(newId, 10),
        itemsSold: saleList,
    };
};

const editSale = async (id, saleList) => {
    const sales = await Sale.getAllSalesProd();
    const verifyExists = sales.find((obj) => obj.sale_id === id);
    let data;
    if (verifyExists === undefined) {
        await Sale.deleteSaleItem(id);
        await Sale.createSaleItem(saleList, id);
        data = {
            saleId: id,
            itemUpdated: saleList,
        };
    }
    return data;
};

const delSale = async (id) => {
    const sales = await Sale.getAllSalesProd();
    const verifyExists = sales.find((obj) => obj.sale_id === id);
    let data;
    if (verifyExists === undefined) {
        await Sale.deleteSaleItem(id);
        data = await Sale.deleteSales(id);
    }
    return data;
};

module.exports = {
    getAll,
    findById,
    createSale,
    editSale,
    delSale,
};
