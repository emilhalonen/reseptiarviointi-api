const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');

const isPositiveInteger = (value) => {
    return Number.isInteger(value) && value > 0;
};

const register = async (req, res) => {
    const {
        kayttajaId,
        username,
        password
    } = req.body;

    if (!isPositiveInteger(kayttajaId) || !username || !password) {
        return res.status(400).json({
            message: 'kayttajaId, username and password are required'
        });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await authModel.createAuthUser({
            kayttajaId,
            username,
            passwordHash
        });

        res.status(201).json({
            user
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to register user'
        });
    }
};

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'username and password are required'
        });
    }

    try {
        const user = await authModel.getAuthUserByUsername(username);

        if (!user) {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatches) {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }

        const token = jwt.sign({
            userId: user.userId,
            kayttajaId: user.kayttajaId,
            username: user.username
        }, process.env.JWT_SECRET);

        res.status(200).json({
            token
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to login'
        });
    }
};

module.exports = {
    register,
    login
};
