const mongoose = require('mongoose');
const Quiz = require('./quiz');
const Ques = require('./question');

const Schema = mongoose.Schema;

const quizqusSchema = new Schema({
    quiz_id: {type: mongoose.Schema.Types.ObjectId,ref: 'Quiz'},
    ques_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Ques'},

    
}) 
module.exports = mongoose.model('quizQues',quizqusSchema);

