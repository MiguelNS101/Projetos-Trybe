const express = require('express');
// const bodyParser = require('body-parser');
const User = require('./controllers/userController');
const Category = require('./controllers/categoryController');
const Post = require('./controllers/postController');
const userMiddleware = require('./middlewares/userMiddleware');
const categoryMiddleware = require('./middlewares/categoryMiddleware');
const postMiddleware = require('./middlewares/postMiddleware');
const validateToken = require('./middlewares/validateMiddleware');

const router = express.Router();
// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/login', userMiddleware.validatePayload, User.login);

router.post('/user',
    userMiddleware.validateName,
    userMiddleware.validateEmail,
    userMiddleware.validatePassword,
    User.createUser);

router.get('/user',
    validateToken.TokenExists,
    validateToken.Validate,
    User.getAllUsers);

router.get('/user/:id',
    validateToken.TokenExists,
    validateToken.Validate,
    User.getUserById);

router.post('/categories',
    validateToken.TokenExists,
    validateToken.Validate,
    categoryMiddleware.validateName,
    Category.createCategory);

router.get('/categories',
    validateToken.TokenExists,
    validateToken.Validate,
    Category.getAllCategories);

router.post('/post',
    validateToken.TokenExists,
    validateToken.Validate,
    postMiddleware.validatePayload,
    Post.createPost);

router.get('/post',
    validateToken.TokenExists,
    validateToken.Validate,
    Post.getAllPosts);

router.get('/post/:id',
    validateToken.TokenExists,
    validateToken.Validate,
    Post.getPostByID);
module.exports = router;