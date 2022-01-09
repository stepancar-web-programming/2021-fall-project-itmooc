const mongoose = require('mongoose');

// const singleChoiceSchema = new mongoose.Schema(
//     {
//         question: { type: String, required: true },
//         variants: { type: Array.of(String), required: true },
//         answer: { type: Number, min: 0, max: 10, required: true }
//     },
//     { _id: false }
// );
//
// const multipleChoiceSchema = new mongoose.Schema(
//     {
//         question: { type: String, required: true },
//         variants: { type: Array.of(String), required: true },
//         answers: {
//             type: Array.of({
//                 type: Number,
//                 min: 0,
//                 max: 10
//             }),
//             required: true
//         }
//     },
//     { _id: false }
// );
//
// const fillInTheBlankSchema = new mongoose.Schema(
//     {
//         question: { type: String, required: true },
//         answer: { type: String, required: true }
//     },
//     { _id: false }
// );

const recordSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        score: { type: 'Number', min: 0 },
        timing: { type: 'Number', min: 0 }
    },
    { _id: false }
);

const quizSchema = new mongoose.Schema(
    {
        questions: { type: Array.of(mongoose.Schema.Types.Mixed) },
        contestants: { type: Array.of(recordSchema), default: [] },
        code: { type: String, minlength: 8, maxlength: 8 },
        password: { type: String, minlength: 8, maxlength: 8 },
        auth: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('quizes', quizSchema);
