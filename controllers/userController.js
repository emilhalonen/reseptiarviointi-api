const userModel = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();

        res.status(200).json({
            users
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to retrieve users'
        });
    }
};

const createUser = async (req, res) => {
    const {
        name,
        email
    } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: 'name and email are required'
        });
    }

    try {
        const user = await userModel.createUser({
            name,
            email
        });

        res.status(201).json({
            user
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to create user'
        });
    }
};

const updateUser = async (req, res) => {
    const userId = Number(req.params.id);
    const {
        name,
        email
    } = req.body;

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            message: 'id must be a positive integer'
        });
    }

    if (!name || !email) {
        return res.status(400).json({
            message: 'name and email are required'
        });
    }

    try {
        const user = await userModel.updateUser(userId, {
            name,
            email
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            user
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to update user'
        });
    }
};

const deleteUser = async (req, res) => {
    const userId = Number(req.params.id);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            message: 'id must be a positive integer'
        });
    }

    try {
        const wasDeleted = await userModel.deleteUser(userId);

        if (!wasDeleted) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            userId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to delete user'
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};
