const postService = require('../services/postService');
require('dotenv').config();

const createPost = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const date = new Date(Date.now());
        const postPayload = {
            id: (await postService.getPostId()),
            title,
            content,
            userId: (req.user.id),
            published: date.toISOString(),
            updated: date.toISOString(),
        };
        const result = await postService.createPost(postPayload);
        await postService.createCategoryPost(postPayload.id, categoryIds);
        res.status(201).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Internall Error', error: e.message });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await postService.findAllCat();

        res.status(200).json(categories);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Internall Error', error: e.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const result = await postService.findAll();
        res.status(200).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Internall Error', error: e.message });
    }
};

const getPostByID = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await postService.findById(id);
        if (result === null) {
            return res.status(404).json({ message: 'Post does not exist' });
        }
        res.status(200).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Internall Error', error: e.message });
    }
};

module.exports = {
    createPost,
    getAllCategories,
    getAllPosts,
    getPostByID,
};