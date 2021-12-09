const mongoose = require('mongoose');

const { singleChoiceSchema, multipleChoiceSchema, fillInTheBlankSchema } = require('./question');
const User = require('./user');

const recordSchema = new mongoose.Schema({
    user: { type: User },
    score: { type: 'Number' }
});

const quizSchema = new mongoose.Schema({
    questions: { type: Array.from([singleChoiceSchema, multipleChoiceSchema, fillInTheBlankSchema]) },
    contestants: { type: recordSchema }
});

module.exports = mongoose.model('quiz', quizSchema);
