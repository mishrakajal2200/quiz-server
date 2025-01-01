
const express = require('express');
const { submitQuiz, sendSMS,getQuizResults } = require('../controllers/quizController');
const authentication = require('../middlewares/authMiddleware');
const router = express.Router();
// POST route to submit quiz data
router.post('/submit-quiz', authentication, submitQuiz);

// Route to send WhatsApp message
router.post('/send-sms', authentication, sendSMS);

// GET route to fetch quiz results for teacher dashboard
router.get('/results', authentication, getQuizResults); // Add the route for fetching results


module.exports = router;
