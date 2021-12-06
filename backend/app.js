require('dotenv').config();
require('./src/config/database').connect();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const User = require('./src/models/user');
const auth = require('./src/middlewares/auth');

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(
    cors({
        origin: '*'
    })
);

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // All information is required
        if (!(email && password && name)) res.status(400).send('Все данные необходимы.');

        // Check email is existed or not?
        const oldUser = await User.findOne({ email });
        if (oldUser) return res.status(409).send('Пользователь уже существует. Пожалуйста, войдите.');

        // Encrypted password
        let encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        // Add token to user
        user.token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
            expiresIn: '2h'
        });
        await res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // All information is required
        if (!(email && password)) res.status(400).send('Все данные необходимы.');

        // Check password
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            user.token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
                expiresIn: '2h'
            });
            await res.status(200).json(user);
        }

        // Wrong password case
        await res.status(400).send('Неверные учетные данные.');
    } catch (err) {
        console.log(err);
    }
});

app.post('/join', async (req, res) => {
    const { code } = req.body;
    if (code === '15112000') return res.status(200).send('Right');
    return res.status(400).send('Wrong');
});

app.use('*', (req, res) => {
    res.status(404).json({
        success: 'false',
        message: 'Page not found',
        error: {
            statusCode: 404,
            message: 'Вы достигли маршрута, который не определен на этом сервере.'
        }
    });
});

module.exports = app;
