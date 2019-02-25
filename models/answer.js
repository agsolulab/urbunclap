const mongoose = require('mongoose');
const Ques = require('./question');
const Schema = mongoose.Schema;

var answerSchema = new Schema({

    ans_text : String,
    isCorrect: Boolean,
    ques_id : String,
        
    });

module.exports = mongoose.model('Ans', answerSchema);
