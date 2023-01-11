const { BlogPost, PostCategory, Category, User } = require('../database/models');

const createPost = async (postPayload) => {
    const data = await BlogPost.create(postPayload);
    return data;
};

const createCategoryPost = async (postId, categoryPayload) => {
    categoryPayload.forEach(async (id) => {
        await PostCategory.create({ postId, categoryId: id });
    });
};

const getLength = async () => {
    const data = await Category.findAll();
    return data.length;
};

const getPostId = async () => {
    const data = await BlogPost.findAll();
    return data.length + 1;
};

const findAllCat = async () => {
    const data = await Category.findAll();
    return data;
};

const findUser = async (post) => {
    const { id } = post;
    const user = await User.findOne({ 
        where: { id },
        attributes: { exclude: 'password' },
    });
    return user.dataValues;
};

const findCategory = async (post) => {
    const [postsCategories] = await PostCategory.findAll({ where: { postId: post.id } });
    const id = postsCategories.dataValues.categoryId;
    const category = await Category.findOne({ 
        where: { id },
    });
    return [category.dataValues];
};

const findAll = async () => {
    const allPosts = await BlogPost.findAll();
    const allData = await allPosts.map(async (post) => {
        const postData = post.dataValues;
        const user = await findUser(post);
        const categories = await findCategory(post);
        const postResult = {
            ...postData,
            user,
            categories,
        };
        return postResult;
    });
    const result = await Promise.all(allData);
    return result;
};

const findById = async (id) => {
    const post = await BlogPost.findOne({ 
        where: { id },
    });
    if (!post) {
        return null;
    }
    const postData = post.dataValues;
    const user = await findUser(post);
        const categories = await findCategory(post);
        const postResult = {
            ...postData,
            user,
            categories,
        };
    return postResult;
};

module.exports = {
    createPost,
    createCategoryPost,
    getLength,
    getPostId,
    findAllCat,
    findAll,
    findById,
};