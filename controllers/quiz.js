const Quiz = require('../models/quiz');
const Ques = require('../models/question');
const Ans = require('../models/answer');
const quizQues = require('../models/quiz-qus');
const _ = require('lodash');


// Get Quiz Data
exports.getQuizDetails = (req, res, next) => {
    _id = req.body._id;
    quizQues.find({ 'quiz_id': _id })
        .populate("ques_id")
        .lean().exec()
        .then(questions => {
            console.log("questions", questions);
            questions.forEach((element, x) => {
                Ans.find({ 'ques_id': element.ques_id._id })
                    .then(result => {
                        if (!_.isEmpty(result)) {
                            element.answer = result;
                        }
                        if (x == (questions.length - 1)) {
                            res.send(questions);
                         }
                    });
            });

        })
        .catch(err => console.log(err));
};


//Get particular quiz
exports.getQuiz = (req, res, next) => {
    const _id = req.body._id;
    Quiz.findById(_id)
        .then(result => {

            console.log('222222222222222',typeof result._id);
            res.send(result);
        })
        .catch(err => console.log(err));
};




//Add Quiz Data
exports.postQuiz = (req, res, next) => {

    quiz_title = req.body.quiz_title;

    const quiz = new Quiz({
        quiz_title: quiz_title,
    })
    quiz.save()
        .then(result => {
            res.send(quiz);
        })
        .catch(err => {
            console.log(err);
        });
};


//Modify Quiz Data
exports.putQuiz = (req, res, next) => {
    const quiz_title = req.body.quiz_title;
    quizz = {
        quiz_title: quiz_title,
    }
    Quiz.findOneAndUpdate({ '_id': req.body._id }, { $set: products }, { new: true })
        .then(result => {
            console.log('Updated Quiz');
            res.send(quizz);
        }).catch(err => console.log(err));

}


//Delete Quiz Data
exports.deleteQuiz = (req, res, next) => {
    _id = req.body._id;
    Quiz.findOneAndRemove({ '_id': _id })
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.send({ 'Message': 'Delete' });
        })
        .catch(err => console.log(err));

}


