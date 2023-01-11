const postService = require('../services/postService');

const validateId = async (categoryId) => {
    const categoryLength = await postService.getLength();
    const a = categoryId.every((id) => id <= categoryLength);
    return a;
};

const validatePayload = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const validated = await validateId(categoryIds);

    if (!validated) {
        return res.status(400).json({ message: '"categoryIds" not found' });
    }
    next();
};

module.exports = { validatePayload, validateId };