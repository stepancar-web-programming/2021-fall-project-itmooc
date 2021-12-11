require('dotenv').config();
require('../config/database').connect();

const Quiz = require('../models/quiz');

const validateQuestion = (question) => {
    switch (question.type) {
        case 'single':
            return question;
        case 'multiple':
            return question;
        default:
            return question;
    }
};

const randomNumber = () => {
    let s = Math.floor(Math.random() * 100000000).toString();
    while (s.length < 8) s = '0' + s;
    return s;
};

const generateCode = async () => {
    while (true) {
        const code = randomNumber();
        if (await Quiz.findOne({ code })) continue;
        return code;
    }
};

const checkQuiz = async ({ code, password }) => {
    const quiz = await Quiz.findOne({ code });
    if (quiz.password === password) return quiz;
    return null;
};

const createQuiz = async ({ questions, auth }) => {
    return await Quiz.create({
        questions: questions.map((question) => validateQuestion(question)),
        code: await generateCode(),
        auth,
        password: randomNumber()
    });
};

const addContestant = async ({ _id, contestant }) => {
    const quiz = await Quiz.findById(_id);
    quiz.contestants = [...quiz.contestants, contestant];
    return await quiz.save();
};

module.exports = { createQuiz, addContestant };
