const mongoose = require('mongoose');
const Ques = require('./question');
const quizQues = require('./quiz-qus');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    quiz_title : String,
}) 
module.exports = mongoose.model('Quiz',quizSchema);