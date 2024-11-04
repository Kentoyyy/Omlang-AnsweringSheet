"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
};

const AnswerSheetForm: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [result, setResult] = useState<{ correctCount: number; totalCount: number } | null>(null);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // Retrieve questions from local storage when the component mounts
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const handleAnswerChange = (id: number, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Calculate correct answers
    let correctCount = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    const totalCount = questions.length;
    setResult({ correctCount, totalCount });
  };

  const handleBack = () => {
    router.push('/answer-sheet-setup'); // Navigate back to the question setup page
  };

  if (result) {
    const percentage = ((result.correctCount / result.totalCount) * 100).toFixed(2);
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
        <h1 className="text-2xl font-bold mb-4 text-black">Results</h1>
        <p className="text-lg text-black">You answered {result.correctCount} out of {result.totalCount} correctly!</p>
        <p className="text-lg text-black">Percentage: {percentage}%</p>
        <button
          onClick={handleBack}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Back to Setup
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Answer Sheet</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        {questions.map((question) => (
          <div key={question.id} className="mb-4 border p-4 rounded bg-white">
            <h2 className="text-lg font-bold text-black mb-2">{question.text}</h2>
            <div className="flex flex-col">
              {question.options.map((option, index) => (
                <label key={index} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    onChange={() => handleAnswerChange(question.id, option)}
                    className="mr-2 text-black"
                  />
                  {option}
                </label>
              ))}
              <input
                type="text"
                placeholder="Type your answer here (if applicable)"
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="w-full p-2 border rounded text-black mt-2"
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded w-full"
        >
          Submit Answers
        </button>
      </form>
    </div>
  );
};

export default AnswerSheetForm;
