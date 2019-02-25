const Ques = require('../models/question');
const Ans = require('../models/answer');
const Quiz = require('../models/quiz');
const quizQues = require('../models/quiz-qus');


//Get particular Question
exports.getQuestionDetails = (req, res, next) => {
   const _id = req.body._id;
   Ques.findById(_id)
      .then(result => {
         res.send(result);
      })
      .catch(err => console.log(err));
};


//Get All Questions
exports.getQuestions = (req, res, next) => {
   Ques.find()
      .then(result => {
         res.send(result);
      })
      .catch(err => console.log(err));
};



//Add Questions And Answers
exports.postQuestions = (req, res, next) => {
   const question = {
      ques_title: req.body.ques_title,
   }
   var tempArr = [];
   Ques(question).save()
      .then(result => {

         for (let i = 1; i <= 4; i++) {
            let tempObj = {};
            tempObj.ans_text = req.body['option' + i];
            if (req.body.correctans == "option" + i) {
               tempObj.isCorrect = true;
            } else {

               tempObj.isCorrect = false;
            }

            tempObj.ques_id = result._id;
            tempArr.push(tempObj);


         }
         Ans.insertMany(tempArr)
            .then(result1 => {
               res.send(result1);
            }).catch(err1 => {
               console.log(err);
            })

      })
      .catch(err => {
         console.log(err);
      });


};



exports.putQuestionAns = (req, res, next) => {
   questions = {
      ques_title: req.body.ques_title,
   }

   Ques.findOneAndUpdate({ '_id': req.body._id }, { $set: questions }, { new: true })
      .then(result => {
         var fetchD = Ans.find({ "ques_id": result._id });

         fetchD.exec(function (err1, story) {
            if (err1) {
               res.send(err1);
            } else {


               let tempArr = [];
               let tempId = [];
               let tempValue = [];
               for (var i = 0; i < story.length; i++) {
                  let tempObj = {};
                  let tempIds = {}
                  tempIds._id = story[i]._id;

                  tempObj.ans_text = req.body['option' + i];

                  if (req.body.correctans == "option" + i) {
                     tempObj.isCorrect = true;
                     temp_obj = {
                        updateOne: {
                           filter: { "_id": story[i]._id },
                           update: {
                              $set:
                                 { ans_text: req.body['option' + i], isCorrect: true }
                           }
                        }
                     }
                  }
                  else {
                     temp_obj = {
                        updateOne: {
                           filter: { "_id": story[i]._id },
                           update: {
                              $set:
                                 { ans_text: req.body['option' + i], isCorrect: false }
                           }
                        }
                     }
                     tempObj.isCorrect = false;
                  }

                  tempObj.quiz_id = req.params.id;
                  tempArr.push(tempObj);
                  console.log(tempArr)

                  tempValue.push(temp_obj)
                  tempId.push(tempIds);
               }

               Ans.bulkWrite(tempValue, function (err2, result1) {
                  if (err2) {

                     console.log("result", result1);
                  }
                  else {
                     res.send('UPDATED');

                  }
               })

            }

         });


      }

      ).catch(err => {
         console.log(err);
      });

}


//Delete QuestionsAnswers

exports.deleteQuestionAns = (req,res,next) => {
      Ques.findById(_id)
      .then(data => {
         Ques.findOneAndRemove({ '_id': _id })
         .then(result1 => {
            console.log('DESTROYED QUESTIONANS');
            Ans.remove({ 'ques_id': _id })
               .then(() => {
                  quizQues.remove({'ques_id': data._id })
                  .then(() => {
                     res.send('DELETED');
                  }).catch(err => console.log(err));
               }).catch(err => console.log(err));
            }).catch(err => console.log(err));
      }
         
      ).catch(err => console.log(err));
   }