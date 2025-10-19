import React, { useState } from 'react';

// This is the main component for the Skill Gap Assessor application.
// It manages the assessment state and user interactions.
const App = () => {
    // Define the assessment questions and correct answers
    const assessmentData = [
        { id: 1, question: "Which library is foundational for numerical operations in Python?", answer: "NumPy" },
        { id: 2, question: "What is the primary function of Pandas?", answer: "Data Manipulation" },
        { id: 3, question: "Which methodology focuses on iterative development?", answer: "Agile" },
        { id: 4, question: "What version control system is industry standard?", answer: "Git" },
        { id: 5, question: "What is the JS library for building UIs?", answer: "React.js" },
    ];

    // State to store user responses (map of questionId -> user answer)
    const [responses, setResponses] = useState({});
    // State to store the final score
    const [score, setScore] = useState(null);

    // Handles changes to input fields (store raw input to allow spaces)
    const handleResponseChange = (id, value) => {
        setResponses(prev => ({ ...prev, [id]: value }));
    };

    // Handles the submission and scoring logic
    const handleSubmit = (e) => {
        e.preventDefault();
        let correctCount = 0;
        
        assessmentData.forEach(item => {
            const raw = responses[item.id] ? responses[item.id] : '';
            const userAnswer = raw
                .trim()
                .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
                .replace(/\s+/g, ' ')
                .toLowerCase();
            const correctAnswer = item.answer
                .trim()
                .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
                .replace(/\s+/g, ' ')
                .toLowerCase();
            if (userAnswer === correctAnswer) {
                correctCount++;
            }
        });
        
        setScore(correctCount);
    };

    // Resets the assessment
    const handleReset = () => {
        setResponses({});
        setScore(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center font-sans">
            <script src="https://cdn.tailwindcss.com"></script>
            <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-6 sm:p-10">
                <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-2">
                    Skill Gap Assessor Demo
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {assessmentData.map((item, index) => (
                        <div key={item.id} className="bg-indigo-50 p-4 rounded-lg shadow-inner">
                            <label htmlFor={`q-${item.id}`} className="block text-md font-medium text-gray-700 mb-2">
                                {index + 1}. {item.question}
                            </label>
                            <input
                                id={`q-${item.id}`}
                                type="text"
                                value={responses[item.id] || ''}
                                onChange={(e) => handleResponseChange(item.id, e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-indigo-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                placeholder="Type your answer here..."
                                disabled={score !== null} // Disable input after submission
                            />
                        </div>
                    ))}
                    
                    <div className="flex space-x-4 pt-4">
                        <button
                            type="submit"
                            disabled={score !== null}
                            className={`w-full py-3 px-4 rounded-lg font-semibold shadow-md transition duration-200 ${
                                score === null 
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                            }`}
                        >
                            {score === null ? 'Submit Assessment' : 'Submitted'}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="w-1/3 py-3 px-4 rounded-lg font-semibold text-indigo-600 border border-indigo-300 bg-white hover:bg-indigo-50 shadow-md transition duration-200"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {/* Conditional Rendering of the Score */}
                {score !== null && (
                    <div className={`mt-8 p-6 rounded-xl text-center shadow-lg transition-all duration-500 ${score < assessmentData.length * 0.6 ? 'bg-red-100 border-red-400' : 'bg-green-100 border-green-400'}`}>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">
                            Assessment Complete!
                        </h2>
                        <p className="text-4xl font-extrabold mb-4">
                            Score: <span className={score < assessmentData.length * 0.6 ? 'text-red-600' : 'text-green-600'}>{score} / {assessmentData.length}</span>
                        </p>
                        <p className="text-gray-600">
                            {score < assessmentData.length * 0.6 
                                ? 'Review needed! This highlights areas for improvement.'
                                : 'Great job! Strong foundational knowledge demonstrated.'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
