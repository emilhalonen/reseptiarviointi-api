require('dotenv').config();

const express = require('express');
const pool = require('./config/database');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', authMiddleware, recipeRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/reviews', authMiddleware, reviewRoutes);

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API is running'
    });
});

app.get('/api/database-check', async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT DATABASE() AS databaseName');

        res.json({
            status: 'ok',
            databaseName: rows[0].databaseName
        });
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});
