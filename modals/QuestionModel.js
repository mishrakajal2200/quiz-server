
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  lesson: { 
    type: String, 
    enum: ['Metals and Non-Metals', 'Magnetic Effects of Electric Current', 'How Do Organisms Reproduce', 'Heredity','Chemical Reactions and Equations'],
    required: true
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;