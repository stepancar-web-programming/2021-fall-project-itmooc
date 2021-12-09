const mongoose = require('mongoose');

const User = require('./user');

const singleChoiceSchema = new mongoose.Schema({
    question: { type: String, required: true },
    variants: { type: Array.of(String), required: true },
    answer: { type: Number, required: true, min: 0, max: this.variants.length }
});

const multipleChoiceSchema = new mongoose.Schema({
    question: { type: String, required: true },
    variants: { type: Array.of(String), required: true },
    answers: {
        type: Array.of({
            type: Number,
            min: 0,
            max: this.variants.length
        }),
        required: true
    }
});

const fillInTheBlankSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const recordSchema = new mongoose.Schema({
    user: { type: User },
    score: { type: 'Number', min: 0 },
    timing: { type: 'Number', min: 0 }
});

const quizSchema = new mongoose.Schema(
    {
        questions: { type: Array.from([singleChoiceSchema, multipleChoiceSchema, fillInTheBlankSchema]) },
        contestants: { type: recordSchema },
        code: { type: String, minlength: 8, maxlength: 8, trim: true, index: true, required: true, sparse: true },
        passcode: { type: String, minlength: 8, maxlength: 8, trim: true, index: true, required: true, sparse: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('quiz', quizSchema);
