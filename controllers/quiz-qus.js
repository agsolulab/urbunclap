const Ques = require('../models/question');
const Quiz = require('../models/quiz');
const quizQues = require('../models/quiz-qus');


exports.postquizQus = (req, res, next) => {
        
    quiz_id = req.body.quiz_id;
    ques_id = req.body.ques_id;

    const quizqus = new quizQues({
        quiz_id: quiz_id,
        ques_id:ques_id
    })
    quizqus.save()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.putquizQus = (req, res, next) => {
    const quiz_id = req.body.quiz_id;
    const ques_id = req.body.ques_id;

    quizques = {
        quiz_id : quiz_id,
        ques_id : ques_id
    }

    quizQues.findOneAndUpdate({ '_id': req.body._id }, { $set: quizques }, { new: true })
        .then(result => {
            console.log('Updated QUIZQUES');
            res.send(quizques);
        }).catch(err => console.log(err));

}

