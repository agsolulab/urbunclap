const express = require('express');
const router = express.Router();

const qusController = require('../controllers/question');
const quizController = require('../controllers/quiz');
const quiz_qusController = require('../controllers/quiz-qus');

router.get('/questions/:_id', qusController.getQuestionDetails);
router.get('/question', qusController.getQuestions);
router.post('/question', qusController.postQuestions);
router.put('/question/edit/:_id', qusController.putQuestionAns);
router.delete('/question/delete/:_id', qusController.deleteQuestionAns);

router.get('/quizes', quizController.getQuizDetails);
router.get('/quiz/:_id', quizController.getQuiz);
router.post('/quiz', quizController.postQuiz);
router.put('/quiz/edit/:_id', quizController.putQuiz);
router.delete('/quiz/delete/:_id', quizController.deleteQuiz);

router.post('/quiz-qus', quiz_qusController.postquizQus);
router.put('/quiz-qus/edit/:_id', quiz_qusController.putquizQus);



module.exports = router;