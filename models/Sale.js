const connection = require('./connection');

const getAll = async () => {
    const [sales] = await connection.execute(
        `SELECT t2.sale_id, t1.date, t2.product_id, t2.quantity
        FROM StoreManager.sales AS t1
        INNER JOIN StoreManager.sales_products AS t2
        ON t1.id = t2.sale_id;`,
    );
    return sales;
};

const findById = async (id) => {
    const query = `
        SELECT t1.date, t2.product_id, t2.quantity
        FROM StoreManager.sales AS t1
        INNER JOIN StoreManager.sales_products AS t2
        ON t1.id = t2.sale_id and t2.sale_id = ?
    `;

    const [saleData] = await connection.execute(query, [id]);
    return saleData;
};

const getAllSales = async () => {
    const [sales] = await connection.execute(
        'SELECT * FROM StoreManager.sales;',
    );
    return sales;
};

const getAllSalesProd = async () => {
    const [sales] = await connection.execute(
        'SELECT * FROM StoreManager.sales_products;',
    );
    return sales;
};

const createSale = async (newId) => {
    const salesProducts = `
    INSERT INTO StoreManager.sales (id, date) VALUES (?,  (SELECT now()))
    `;
    await connection.execute(salesProducts, [newId]);
};

const createSaleItem = async (saleList, newId) => {
    saleList.forEach(async (item) => {
        const salesItem = `
            INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
            VALUES (?,  ?, ?)
            `;
        await connection.execute(salesItem, [newId, item.productId, item.quantity]);
    });
};

const deleteSaleItem = async (id) => {
    const salesItem = `
            DELETE FROM StoreManager.sales_products
            WHERE sale_id = ?
            `;
    await connection.execute(salesItem, [id]);
};

const deleteSales = async (id) => {
    const salesItem = `
            DELETE FROM StoreManager.sales
            WHERE id = ?
            `;
    const data = await connection.execute(salesItem, [id]);
    return data[0];
};

module.exports = {
    getAll,
    findById,
    createSale,
    createSaleItem,
    getAllSales,
    getAllSalesProd,
    deleteSaleItem,
    deleteSales,
};