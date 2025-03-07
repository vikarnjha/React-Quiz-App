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
  const [startQuiz, setStartQuiz] = useState(false);

  useEffect(() => {
    if (startQuiz && timer > 0 && !lock) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !lock) {
      setLock(true);
    }
  }, [timer, lock, startQuiz]);

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

  const startHandler = () => {
    setStartQuiz(true);
    setTimer(10); // Reset Timer
  };

  const checkAnswer = (option) => {
    if (!lock) {
      setSelectedAnswer(option);
      setLock(true);
      if (option === questions.answer) {
        setScore(score + 1);
      }
    }
  };

  const questions = quizData[index];

  if (showResult) {
    return (
      <div className="container">
        <h1>Quiz Completed!</h1>
        <div className="score">Your Final Score: {score}</div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        {!startQuiz ? (
          <button className="start-btn" onClick={startHandler}>
            Start Quiz
          </button>
        ) : (
          <>
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
            <button disabled={selectedAnswer === null} onClick={() => setLock(true)}>
              Next
            </button>
            <div className="index">
              {index + 1} out of {quizData.length} Questions
            </div>
            <div className="score">Your Score: {score}</div>
            <div className="timer">Time Left: {timer}s</div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
