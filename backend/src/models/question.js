const mongoose = require('mongoose');

const trueFalseSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: Boolean, default: true }
});

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

const quizSchema = new mongoose.Schema({
    questions: { type: Array.from([trueFalseSchema, singleChoiceSchema, multipleChoiceSchema, fillInTheBlankSchema]) }
});

module.exports = mongoose.model('quiz', quizSchema);
