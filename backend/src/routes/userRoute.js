require('dotenv').config();
require('../config/database').connect();

const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const { checkUserPassword, isUserExisted, createUser } = require('../controllers/userController');

router.post('/sign-up', async (req, res) => {
    try {
        const { login, password, birthday, gender } = req.body;
        if (!(login && password && birthday && gender)) return res.status(400).send('Все данные необходимы.');

        if (new Date(birthday) >= Date.now())
            return res.status(400).send('Ваш день рождения должен быть раньше, чем сегодня.');

        if (await isUserExisted({ login }))
            return res.status(409).send('Пользователь уже существует. Пожалуйста, войдите.');

        const user = await createUser({ login, password, birthday, gender });
        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Плохой запрос.');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { login, password } = req.body;
        if (!(login && password)) res.status(400).send('Все данные необходимы.');

        const user = await checkUserPassword({ login, password });
        if (user) return res.status(200).json(user);

        return res.status(400).send('Неверные учетные данные.');
    } catch (err) {
        console.log(err);
        return res.status(400).send('Плохой запрос.');
    }
});

router.post('/join', async (req, res) => {
    const { code } = req.body;
    if (code === '15112000') return res.status(200).send('Right');
    return res.status(400).send('Wrong');
});

module.exports = router;
