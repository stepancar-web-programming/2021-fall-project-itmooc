require('dotenv').config();
require('../config/database').connect();

const Quiz = require('../models/quiz');

const createQuiz = async ({ questions, contestants }) => {
    return await Quiz.create({
        questions,
        contestants
    });
};

const addContestant = async ({ quizcontestant }) => {

};

module.exports = { createQuiz };
