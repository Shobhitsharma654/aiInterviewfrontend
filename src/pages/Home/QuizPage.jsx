import React, { useState } from "react";
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
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        API_PATHS.QUIZ.GENERATE_QUIZ,
        { topic, numberOfQuestions }
      );

      console.log("Generated quiz:", res.data);
      setQuiz(res.data.quiz); // backend sends { success, quiz }
      setResults(null);
      setUserAnswers({});
    } catch (err) {
      console.log(err.message);
      console.error("Quiz generation error:", err);
      alert("Error generating quiz");
    }
    setLoading(false);
  };

  // Select answer
  const handleSelect = (qIdx, option) => {
    setUserAnswers((prev) => ({ ...prev, [qIdx]: option }));
  };

  // Submit quiz (evaluate locally)
  const submitQuiz = () => {
    if (quiz.length === 0) return;

    const evaluated = quiz.map((q, idx) => {
      const userAnswer = userAnswers[idx] || "";
      const isCorrect = userAnswer === q.answer;
      return {
        question: q.question,
        correctAnswer: q.answer,
        userAnswer,
        isCorrect,
      };
    });

    setResults({
      score: evaluated.filter((r) => r.isCorrect).length,
      total: quiz.length,
      results: evaluated,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Quiz Generator</h1>

      {/* Quiz Settings */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="number"
          min={1}
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          className="border p-2 w-20"
        />
        <button
          onClick={generateQuiz}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
      </div>

      {loading && <p>Loading quiz...</p>}

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

      {/* Results */}
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
              <p>Your answer: {r.userAnswer || "Not answered"}</p>
              <p>Correct answer: {r.correctAnswer}</p>
              <p>
                {r.isCorrect ? (
                  <span className="text-green-600">✅ Correct</span>
                ) : (
                  <span className="text-red-600">❌ Incorrect</span>
                )}
              </p>
            </div>
          ))}
          <button
            onClick={() => {
              setResults(null);
              setQuiz([]);
            }}
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