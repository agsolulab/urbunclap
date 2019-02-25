const mongoose = require('mongoose');
const Ans = require('./answer');
const Quiz = require('./quiz');
const quizQues = require('./quiz-qus');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    ques_title : String,
 
}) 
module.exports = mongoose.model('Ques',questionSchema);