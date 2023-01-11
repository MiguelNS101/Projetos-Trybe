const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid fields', err: user });
        }

        const jwtConfig = {
            expiresIn: '7d',
            algorithm: 'HS256',
        };
        const token = jwt.sign({ data: user }, secret, jwtConfig);

        res.status(200).json({ token });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Internall Error', error: e.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user != null) {
            return res.status(409).json({ message: 'User already registered' });
        }

        const newUser = await User.create({ displayName, email, password, image });

        const jwtConfig = {
            expiresIn: '7d',
            algorithm: 'HS256',
        };
        const token = jwt.sign({ data: newUser }, secret, jwtConfig);

        res.status(201).json({ token });
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Internall Error', error: e.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: 'password' } });

        if (!users) {
            return res.status(400).json({ message: 'Invalid fields', err: users });
        }

        res.status(200).json(users);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Internall Error', error: e.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ 
            where: { id },
            attributes: { exclude: 'password' },
        });

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        res.status(200).json(user);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Internall Error', error: e.message });
    }
};

module.exports = {
    login,
    createUser,
    getAllUsers,
    getUserById,
};