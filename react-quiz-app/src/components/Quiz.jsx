import React, { useState } from "react";
import "./Quiz.css";
import quizData from "../assets/quizData";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lock, setLock] = useState(false);
  const questions = quizData[index];

  const checkAnswer = (option) => {
    if (!lock) {
      setSelectedAnswer(option);
      setLock(true);
      if (option === questions.answer) {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (index < quizData.length - 1) {
      setIndex(index + 1);
      setSelectedAnswer(null);
      setLock(false);
    }
  };

  if (!questions) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">
        <h1>Quiz App</h1>
        <hr />
        <h2>
          {index + 1}. {questions.question}
        </h2>
        <ul>
          {questions.options.map((option, i) => (
            <li
              key={i}
              className={
                lock
                  ? option === questions.answer
                    ? "correct"
                    : selectedAnswer === option
                    ? "wrong"
                    : "option"
                  : "option"
              }
              onClick={() => checkAnswer(option)}
            >
              {option}
            </li>
          ))}
        </ul>
        <button onClick={nextQuestion} disabled={selectedAnswer === null}>
          Next
        </button>
        <div className="index">
          {index + 1} out of {quizData.length} questions
        </div>
        <div className="score">Score: {score}</div>
      </div>
    </>
  );
};

export default Quiz;