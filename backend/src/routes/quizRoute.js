require('dotenv').config();
require('../config/database').connect();

const express = require('express');
const cors = require('cors');
const moment = require('moment');

const auth = require('../middlewares/auth');
const { checkUserPassword, isUserExisted, createUser } = require('../controllers/userController');
const { createQuiz } = require('../controllers/quizController');

const router = express.Router();

router.use(
    cors({
        origin: '*'
    })
);

router.post('/create-quiz', async (req, res) => {
    try {
        const { questions, auth } = req.body;
        const quiz = await createQuiz({ questions, auth });
        return res.status(201).json(quiz);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Плохой запрос.');
    }
});

router.post('/participant', async (req, res) => {
    try {
        const { code, password } = req.body;
        const quiz = await getQuiz({ code, password });
        if (!quiz) return res.status(400).send('Ваш пароль неверный');
        return res.status(200).json(quiz);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Плохой запрос.');
    }
});

router.post('/join', async (req, res) => {
    const { code } = req.body;
    const quiz = await findQuizByCode({ code });
    if (quiz?.auth) return res.status(401).send('');
    if (quiz?.password) return res.status(403).send('');
    if (quiz) return res.status(200).send('Поздравляем, ваш код присоединения правильный!');
    return res.status(404).send('There is not quiz using your code.');
});

module.exports = router;
