

const sendWhatsAppMessage = require('../utils/twilio');
const QuizSubmission = require('../modals/QuizSubmission');

exports.submitQuiz = async (req, res) => {
  try {
    const {
      username,
      totalQuestions,
      attemptedQuestions,
      notAttempted,
      timeTaken,
      cheatingAttempts,
      correctAnswers: score, // Renaming correctAnswers to score
      wrongAnswers,
      
    } = req.body;

    console.log(req.body); // Log incoming data to debug

    // Validate required fields
    if (!username || totalQuestions === undefined || attemptedQuestions === undefined || timeTaken === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newSubmission = new QuizSubmission({
      username,
      totalQuestions,
      attemptedQuestions,
      notAttempted,
      score: score || 0, // Assign the renamed score variable
      timeTaken,
      cheatingAttempts: cheatingAttempts || 0,
      correctAnswers: score || 0, // Use score for correctAnswers
      wrongAnswers: wrongAnswers || [],
      
    });

    await newSubmission.save();

    res.status(201).json({ message: "Quiz submission successful", data: newSubmission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.sendSMS = async (req, res) => {
  try {
    const { message,phoneNumber} = req.body;

    // Call the Twilio utility function to send the message
    await sendWhatsAppMessage(message,phoneNumber);

    res.status(200).json({ success: true, message: 'WhatsApp message sent successfully!' });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).json({ success: false, message: 'Failed to send WhatsApp message.' });
  }
};

// Get quiz results for the teacher dashboard
exports.getQuizResults = async (req, res) => {
  try {
    const results = await QuizSubmission.find()
      .populate('userId', 'name') // Populate userId with the name field
      .populate('testId', 'name') // Populate testId with the name field
      .exec();
    res.json(results); // Send the results as JSON response
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).send('Server error');
  }
};


