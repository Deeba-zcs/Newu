"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./ques.css";
import jsonData from "src/app/questions.json";

const Question = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = jsonData.data.length;
  const currentQuestionData = jsonData.data[currentQuestion];

  const handleQuestionChange = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const handleNextQuestion = (e) => {
    e.preventDefault();
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handlePreviousQuestion = (e) => {
    e.preventDefault();
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  if (
    !jsonData ||
    !jsonData.data ||
    totalQuestions === 0 ||
    !currentQuestionData
  ) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <p
          className="font-poppins-regular"
          style={{ fontSize: "16px", color: "rgb(226, 104, 60)" }}
        >
          Question {currentQuestion + 1} of {totalQuestions}
        </p>
        <form>
          <div className="form-group">
            <div className="row">
              <div className="col-3 px-3">
                <label htmlFor={`question_${currentQuestion}`}>
                  <strong>{currentQuestionData.question}</strong>
                </label>
              </div>
            </div>
            <br />
            <div className="row">
              {currentQuestionData.questions_options.map((option, index) => (
                <div className="col-lg-5 opt col-md-12 py-3" key={index}>
                  <div className="row">
                    <div className="col-2 mx-1 circle">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="col-9 my-3">
                      <div className="form-check option">
                        <input
                          className="form-check-input chk"
                          type="checkbox"
                          name={`question_${currentQuestion}[]`}
                          id={`option_${currentQuestion}_${index}`}
                          value={`option${index + 1}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`option_${currentQuestion}_${index}`}
                        >
                          <strong>{option.option}</strong>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <input type="text" placeholder="Enter Text" className="txt" />
            </div>
            <div className="row py-3">
              <div className="col-6">
                {currentQuestion > 0 && (
                  <button
                    type="button"
                    className="btnsv"
                    onClick={handlePreviousQuestion}
                  >
                    Previous{" "}
                    <i
                      className="fa-solid fa-arrow-left px-1"
                      style={{ color: "#eeeff2" }}
                    ></i>
                  </button>
                )}
              </div>
              <div className="col-6">
                {currentQuestion < totalQuestions - 1 ? (
                  <button
                    type="button"
                    className="btnsv"
                    onClick={handleNextQuestion}
                  >
                    Next{" "}
                    <i
                      className="fa-solid fa-arrow-right px-1"
                      style={{ color: "#eeeff2" }}
                    ></i>
                  </button>
                ) : (
                  <button type="submit" className="btnsv">
                    Submit{" "}
                    <i
                      className="fa-solid fa-arrow-right px-1"
                      style={{ color: "#eeeff2" }}
                    ></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="col-4">
        <div className="col-8 imagg">
          <Image
            src="/pana.png"
            alt="Image Description"
            layout="responsive"
            width={300}
            height={200}
            className="iom"
          />
        </div>
      </div>
    </>
  );
};

export default Question;
