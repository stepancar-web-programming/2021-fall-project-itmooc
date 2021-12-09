const mongoose = require('mongoose');

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

module.exports = { singleChoiceSchema, multipleChoiceSchema, fillInTheBlankSchema };
