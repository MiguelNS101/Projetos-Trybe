const validateId = async (req, res, next) => {
    const saleList = req.body;
    saleList.forEach((item) => {
        if (!item.productId) {
            return res.status(400).json({ message: '"productId" is required' });
        }
    });
    next();
};

const validateQuantity = async (req, res, next) => {
    const saleList = req.body;
    saleList.forEach((item) => {
        if (!item.quantity) {
            return res.status(400).json({ message: '"quantity" is required' });
        }
    });
    next();
};

const validateQuantityNum = async (req, res, next) => {
    const saleList = req.body;
    saleList.forEach((item) => {
        if (item.quantity <= 0) {
            return res.status(422).json({
                message: '"quantity" must be greater than or equal to 1',
            });
        }
    });
        next();
};

module.exports = { validateId, validateQuantity, validateQuantityNum };