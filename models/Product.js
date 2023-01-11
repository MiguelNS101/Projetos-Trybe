const connection = require('./connection');

const getAll = async () => {
    const [products] = await connection.execute(
        'SELECT id, name, quantity FROM StoreManager.products;',
    );
    return products;
};

const findById = async (id) => {
    const query = `
        SELECT id, name, quantity
        FROM StoreManager.products
        WHERE id = ?
    `;

    const [productData] = await connection.execute(query, [id]);
    return productData;
};

const createProd = async (name, quantity) => {
    const query = `
    INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)
    `;

    await connection.execute(query, [name, quantity]);

    const queryVerify = `
        SELECT id, name, quantity
        FROM StoreManager.products
        WHERE name = ?
    `;

    const [productData] = await connection.execute(queryVerify, [name]);
    return productData[0];
};

const editProd = async (id, name, quantity) => {
    const query = `
    UPDATE StoreManager.products
    SET name = ?, quantity = ?
    WHERE id = ?;
    `;

    await connection.execute(query, [name, quantity, id]);

    const queryVerify = `
        SELECT id, name, quantity
        FROM StoreManager.products
        WHERE id = ?
    `;

    const [productData] = await connection.execute(queryVerify, [id]);
    return productData[0];
};

const deleteProd = async (id) => {
    const query = `
    DELETE FROM StoreManager.products
    WHERE id = ?;
    `;

    await connection.execute(query, [id]);
};

module.exports = {
    getAll,
    findById,
    createProd,
    editProd,
    deleteProd,
};