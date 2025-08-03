const bcrypt = require('bcrypt')
const User = require('../models/userModel');

const SALT_ROUNDS = 10;

 const registerController = async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        return res.status(400).json({
            message: 'name , username and password are required.',
        });
    }

    try {
        const existingUser = await User.findOne({ username }).select('_id').lean().exec();
        if (existingUser) {
            return res.status(409).json({ message: 'User with this Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);


        const newUser = new User({
            name,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        const userResponse = {
            id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            createdAt: newUser.createdAt,
        };

        res.status(201).json({
            message: 'User registered successfully.',
            user: userResponse,
        });
    } catch (error) {
        console.error('Registration error:', error);

        // Handle duplicate key error (11000 = MongoDB duplicate index)
        if (error.code === 11000) {
            return res.status(409).json({ message: 'username is already in use.' });
        }

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ message: 'Validation failed', errors: messages });
        }

        // Fallback
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
};

module.exports = registerController;