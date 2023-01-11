const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const TokenExists = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ message: 'Token not found' });
    }
    next();
};

const Validate = async (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const decoded = jwt.verify(auth, secret);
        const user = await User.findOne({
            where: { email: decoded.data.email },
        });
        if (!user) {
        return res
            .status(401)
            .json({ message: 'Expired or invalid token' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = { TokenExists, Validate };