// Question.js
"use client";
import React, { useState } from "react";
import Image from "next/image";
import jsonData from "src/app/questions.json";
import "./ques.css";

const Question = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = jsonData.data.length;
  const currentQuestionData = jsonData.data[currentQuestion];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleQuestionChange = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    setSelectedOptions([]);
  };

  const handleOptionSelect = (optionIndex) => {
    let updatedSelectedOptions;
    if (currentQuestionData.question_type === "radio") {
      // Radio type question, allow only one option to be selected
      updatedSelectedOptions = [optionIndex];
    } else {
      // Checkbox type question, allow multiple options to be selected
      if (selectedOptions.includes(optionIndex)) {
        // If the option is already selected, remove it
        updatedSelectedOptions = selectedOptions.filter(
          (index) => index !== optionIndex
        );
      } else {
        // If the option is not selected, add it
        updatedSelectedOptions = [...selectedOptions, optionIndex];
      }
    }
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      handleQuestionChange(nextQuestion);
    }
  };

  const handlePreviousQuestion = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      handleQuestionChange(prevQuestion);
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
    <div className="container screen mt-5">
      <div className="row">
        <div className="col-8">
          <p
            className="font-poppins-regular"
            style={{ fontSize: "16px", color: "rgb(226, 104, 60)" }}
          >
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
          <form>
            <div className="form-group">
              <div className="row">
                <div className="col-12 px-3">
                  <label htmlFor={`question_${currentQuestion}`}>
                    <strong>{currentQuestionData.question}</strong>
                  </label>
                </div>
              </div>
              <br />
              <div className="row">
                {currentQuestionData.questions_options.map((option, index) => (
                  <div
                    className={`col-lg-5 opt col-md-12 py-3 ${
                      selectedOptions.includes(index) ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                  >
                    <div className="row">
                      <div className="col-2 mx-1 circle">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div className="col-9 my-3">
                        <div className="form-check option">
                          <input
                            className="form-check-input chk"
                            type={
                              currentQuestionData.question_type === "radio"
                                ? "radio"
                                : "checkbox"
                            }
                            name={`question_${currentQuestion}`}
                            id={`option_${currentQuestion}_${index}`}
                            value={`option${index + 1}`}
                            checked={selectedOptions.includes(index)}
                            onChange={() => handleOptionSelect(index)}
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
              <div className="row py-3 btnsv-prev-next">
                <div className="col-6">
                  {currentQuestion > 0 && (
                    <button
                      type="button"
                      className="btnsv btnsv-prev"
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
                      className="btnsv btnsv-next"
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
      </div>
    </div>
  );
};

export default Question;
