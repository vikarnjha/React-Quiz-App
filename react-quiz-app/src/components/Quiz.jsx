import React, { useState, useEffect } from "react";
import "./Quiz.css";
import quizData from "../assets/quizData";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lock, setLock] = useState(false);
  const [timer, setTimer] = useState(10);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (timer > 0 && !lock) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !lock) {
      setLock(true);
    }
  }, [timer, lock]);

  useEffect(() => {
    if (lock) {
      const timeout = setTimeout(() => {
        if (index < quizData.length - 1) {
          setIndex(index + 1);
          setSelectedAnswer(null);
          setLock(false);
          setTimer(10);
        } else {
          setShowResult(true);
        }
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [lock, index]);

  if (showResult) {
    return (
      <div className="container">
        <h1>Quiz Completed!</h1>
        <div className="score">Your Final Score: {score}</div>
      </div>
    );
  }

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
      setTimer(10);
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
        <div className="timer">Time Left: {timer} seconds</div>
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
          {index + 1} out of {quizData.length} Questions
        </div>
        <div className="score">Your Score: {score}</div>
      </div>
    </>
  );
};

export default Quiz;