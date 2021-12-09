const mongoose = require('mongoose');
const { singleChoiceSchema, multipleChoiceSchema, fillInTheBlankSchema } = require('./question');

const quizSchema = new mongoose.Schema({
    questions: { type: Array.from([singleChoiceSchema, multipleChoiceSchema, fillInTheBlankSchema]) }
});

module.exports = mongoose.model('quiz', quizSchema);
