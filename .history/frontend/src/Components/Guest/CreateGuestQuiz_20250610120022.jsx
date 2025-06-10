import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

function CreateGuestQuiz() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);
  const [quizzes, setQuizzes] = useState([
    {
      quizCode: 'ABC123',
      title: 'Sample Quiz 1',
      questions: [
        { questionText: 'What is React?', options: ['Library', 'Framework', 'Language', 'Tool'], correctAnswer: 'Library' }
      ],
      attempts: [
        { name: 'John Doe', score: 85 },
        { name: 'Jane Smith', score: 92 }
      ]
    },
    {
      quizCode: 'XYZ789',
      title: 'Sample Quiz 2',
      questions: [
        { questionText: 'What is JavaScript?', options: ['Language', 'Framework', 'Library', 'Database'], correctAnswer: 'Language' }
      ],
      attempts: []
    }
  ]);
  const [expandedQuizCode, setExpandedQuizCode] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }]);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Please enter a quiz title');
      return;
    }

    const quizCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const newQuiz = {
      quizCode,
      title,
      questions: questions.filter(q => q.questionText.trim()),
      attempts: []
    };

    setQuizzes([...quizzes, newQuiz]);
    alert(`Guest Quiz Created! Code: ${quizCode}`);
    setTitle('');
    setQuestions([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleDelete = (quizCode) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    setQuizzes(quizzes.filter(quiz => quiz.quizCode !== quizCode));
  };

  const toggleAccordion = (quizCode) => {
    setExpandedQuizCode(expandedQuizCode === quizCode ? null : quizCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 flex justify-center items-start">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Create Guest Quiz</h1>
            <p className="text-blue-100">Design engaging quizzes for your guests</p>
          </div>

          <div className="p-8">
            {/* Quiz Title Input */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quiz Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                placeholder="Enter quiz title..."
              />
            </div>

            {/* Questions */}
            <div className="space-y-6 mb-8">
              {questions.map((q, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 shadow-lg"
                >
                  <h3 className="text-lg font-semibold text-blue-600 mb-4">
                    Question {i + 1}
                  </h3>
                  
                  <div className="mb-4">
                    <input
                      type="text"
                      value={q.questionText}
                      onChange={(e) => handleChange(i, 'questionText', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your question..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {q.options.map((opt, j) => (
                      <input
                        key={j}
                        type="text"
                        value={opt}
                        onChange={(e) => handleOptionChange(i, j, e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder={`Option ${j + 1}`}
                      />
                    ))}
                  </div>

                  <div>
                    <input
                      type="text"
                      value={q.correctAnswer}
                      onChange={(e) => handleChange(i, 'correctAnswer', e.target.value)}
                      className="w-full px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50"
                      placeholder="Enter the correct answer..."
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={addQuestion}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Plus size={20} />
                Add Question
              </button>
              
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Create Quiz
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Existing Quizzes */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Existing Guest Quizzes</h2>
              
              <div className="space-y-4">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz.quizCode}
                    className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
                  >
                    <div
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 cursor-pointer hover:from-gray-100 hover:to-blue-100 transition-colors duration-200"
                      onClick={() => toggleAccordion(quiz.quizCode)}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {quiz.title}
                        </h3>
                        <p className="text-blue-600 font-medium">Code: {quiz.quizCode}</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(quiz.quizCode);
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete Quiz"
                        >
                          <Trash2 size={20} />
                        </button>
                        
                        {expandedQuizCode === quiz.quizCode ? (
                          <ChevronUp className="text-blue-600" size={24} />
                        ) : (
                          <ChevronDown className="text-blue-600" size={24} />
                        )}
                      </div>
                    </div>

                    {expandedQuizCode === quiz.quizCode && (
                      <div className="p-6 border-t border-gray-100">
                        <div className="mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {quiz.questions.length} Questions
                          </span>
                        </div>

                        {quiz.attempts.length > 0 ? (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3">Quiz Attempts:</h4>
                            <div className="space-y-2">
                              {quiz.attempts.map((attempt, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
                                >
                                  <span className="font-medium text-gray-700">
                                    {idx + 1}. {attempt.name}
                                  </span>
                                  <span className="font-bold text-green-600">
                                    Score: {attempt.score}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <div className="text-gray-400 mb-2">
                              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <p className="text-gray-500 italic">No attempts yet</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGuestQuiz;