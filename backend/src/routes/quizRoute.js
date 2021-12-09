require('dotenv').config();
require('../config/database').connect();

const express = require('express');
const cors = require('cors');
const moment = require('moment');

const auth = require('../middlewares/auth');
const { checkUserPassword, isUserExisted, createUser } = require('../controllers/userController');
const {createQuiz} = require("../controllers/quizController");

const router = express.Router();

router.use(
    cors({
        origin: '*'
    })
);

router.post('/create-quiz', async (req, res) => {
    try {
        const quiz = req.body;
        const quiz = await createQuiz({ login, password, birthday, gender });
        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).send('Плохой запрос.');
    }
});

module.exports = router;
