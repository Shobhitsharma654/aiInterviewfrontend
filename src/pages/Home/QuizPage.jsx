import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const QuizPage = () => {
  const [topic, setTopic] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [quiz, setQuiz] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Generate quiz
  const generateQuiz = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(API_PATHS.QUIZ.GENERATE_QUIZ, {
        topic,
        numberOfQuestions,
      });
      console.log(res.data);
      setQuiz(res.data.quiz);
      setResults(null);
      setUserAnswers({});
    } catch (err) {
      console.error(err);
      alert("Error generating quiz");
    }
    setLoading(false);
  };

  // Handle answer selection
  const handleSelect = (questionIndex, option) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  // Submit quiz
  const submitQuiz = async () => {
    if (quiz.length === 0) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/quiz/submit", {
        quiz,
        userAnswers: quiz.map((q, idx) => ({
          question: q.question,
          selectedOption: userAnswers[idx] || "",
        })),
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Quiz Generator</h1>

      {/* Quiz Settings */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          min={1}
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(e.target.value)}
          className="border p-2 mr-2 w-20"
        />
        <button
          onClick={generateQuiz}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Generate Quiz
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {/* Quiz Questions */}
      {quiz.length > 0 && !results && (
        <div>
          {quiz.map((q, idx) => (
            <div key={idx} className="mb-4 p-4 border rounded">
              <p className="font-medium">
                {idx + 1}. {q.question}
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(idx, opt)}
                    className={`text-left p-2 border rounded ${
                      userAnswers[idx] === opt ? "bg-blue-200" : ""
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={submitQuiz}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Quiz
          </button>
        </div>
      )}

      {/* Quiz Results */}
      {results && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">
            Score: {results.score} / {results.total}
          </h2>
          {results.results.map((r, idx) => (
            <div key={idx} className="mb-2 p-2 border rounded">
              <p>
                <strong>{idx + 1}. {r.question}</strong>
              </p>
              <p>Your answer: {r.userAnswer}</p>
              <p>Correct answer: {r.correctAnswer}</p>
              <p>
                {r.isCorrect ? (
                  <span className="text-green-600">Correct</span>
                ) : (
                  <span className="text-red-600">Incorrect</span>
                )}
              </p>
            </div>
          ))}
          <button
            onClick={() => { setResults(null); setQuiz([]); }}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Try Another Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
