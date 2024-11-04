"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
};

const AnswerSheetSetup: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Load questions from localStorage on component mount
  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    const newId = questions.length + 1;
    const newQuestionData: Question = {
      id: newId,
      text: newQuestion,
      options: newOptions,
      correctAnswer: correctAnswer,
    };

    const updatedQuestions = [...questions, newQuestionData];
    setQuestions(updatedQuestions);

    // Update localStorage
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));

    setNewQuestion('');
    setNewOptions(['', '', '', '']);
    setCorrectAnswer('');
    handleCloseModal();
  };

  const handleResetQuestions = () => {
    setQuestions([]); // Reset the questions state
    localStorage.removeItem('questions'); // Clear questions from localStorage
    alert('Questions reset!'); // Optional alert to inform the user
  };

  const handleGoToAnswerSheet = () => {
    router.push('/answer-sheet');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Setup Questions</h1>
      
      <button
        className="bg-black text-white py-2 px-4 rounded mb-4"
        onClick={handleOpenModal}
      >
        Add New Question
      </button>

      <div className="w-full max-w-md">
        {questions.length > 0 && (
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-black">No.</th>
                <th className="border p-2 text-black">Question</th>
                <th className="border p-2 text-black">Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question.id}>
                  <td className="border p-2 text-center text-black">{question.id}</td>
                  <td className="border p-2 text-black">{question.text}</td>
                  <td className="border p-2 text-center text-black">{question.correctAnswer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {questions.length > 0 && (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded mt-4 w-full"
            onClick={handleGoToAnswerSheet}
          >
            Go to Answer Sheet
          </button>
        )}
      </div>

      {questions.length > 0 && (
        <button
          className="bg-red-500 text-white py-2 px-4 rounded mt-4"
          onClick={handleResetQuestions}
        >
          Reset Questions
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-black">Add New Question</h2>

            <div className="mb-4">
              <label className="block font-bold mb-2 text-black">Question</label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full p-2 border rounded text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2 text-black">Options</label>
              {newOptions.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-2 border rounded mb-2 text-black"
                  placeholder={`Option ${index + 1}`}
                />
              ))}
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2 text-black">Correct Answer</label>
              <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="w-full p-2 border rounded text-black"
                placeholder="Correct Answer"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white py-2 px-4 rounded"
                onClick={handleAddQuestion}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerSheetSetup;
