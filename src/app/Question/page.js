"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import jsonData from "src/app/questions.json";
import "./ques.css";

const Question = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = jsonData.data.length;
  const currentQuestionData = jsonData.data[currentQuestion];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const [progressBarClass, setProgressBarClass] = useState();

  useEffect(() => {
    setProgressBarClass(
      `progress-bar progress-bar-${Math.floor(progress / 25) * 25}`
    );
  }, [currentQuestion, progress]);

  console.log("progress", progress);
  console.log("progressBarClasssss", progressBarClass);

  const handleQuestionChange = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    setSelectedOptions([]);
  };

  const handleOptionSelect = (optionIndex) => {
    let updatedSelectedOptions;
    if (currentQuestionData.question_type === "radio") {
      updatedSelectedOptions = [optionIndex];
    } else {
      if (selectedOptions.includes(optionIndex)) {
        updatedSelectedOptions = selectedOptions.filter(
          (index) => index !== optionIndex
        );
      } else {
        updatedSelectedOptions = [...selectedOptions, optionIndex];
      }
    }
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      console.log("Next clicked");
      handleQuestionChange(nextQuestion);
    }
  };

  const handlePreviousQuestion = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      console.log("Prev clicked");
      handleQuestionChange(prevQuestion);
    }
  };

  console.log("currentQuestion:", currentQuestion);
  console.log("totalQuestions:", totalQuestions);

  console.log("progress:", progress);

  return (
    <>
      <div className="container-fluid screen">
        <div className="container">
          <div className="row progress-bar-wrapper">
            <div
              className={`${progressBarClass}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <p
                className="font-poppins-regular"
                style={{
                  fontSize: "16px",
                  color: "rgb(226, 104, 60)",
                  marginTop: "20px",
                }}
              >
                Question {currentQuestion + 1} of {totalQuestions}
              </p>
              <form>
                <div className="form-group">
                  <div className="row">
                    <div className="col-lg-12">
                      <label htmlFor={`question_${currentQuestion}`}>
                        <strong>{currentQuestionData.question}</strong>
                      </label>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    {currentQuestionData.questions_options.map(
                      (option, index) => (
                        <div
                          className={`col-lg-5 opt col-md-12  ${
                            selectedOptions.includes(index) ? "selected" : ""
                          }`}
                          key={index}
                          onClick={() => handleOptionSelect(index)}
                        >
                          <div className="row">
                            <div className="col-3 my-3 circle">
                              {String.fromCharCode(65 + index)}
                            </div>
                            <div className="col-8  my-3 ">
                              <div className="form-check option">
                                <input
                                  className="form-check-input chk"
                                  type={
                                    currentQuestionData.question_type ===
                                    "radio"
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
                            <div className="col-2">
                              {selectedOptions.includes(index) && (
                                <i
                                  className="fa-solid fa-check fa-xl gb"
                                  style={{ color: "#f1f4f8" }}
                                ></i>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="row my-3">
                    <input
                      type="text"
                      placeholder="Enter Text"
                      className="txt"
                    />
                  </div>

                  <div className="row  btnsv-prev-next">
                    <div className="col-6">
                      {currentQuestion > 0 && (
                        <button
                          type="button"
                          className="btnsv btnsv-prev"
                          onClick={handlePreviousQuestion}
                        >
                          {" "}
                          <i
                            className="fa-solid fa-arrow-left"
                            style={{ color: "#eeeff2" }}
                          ></i>
                          Previous{" "}
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
                            className="fa-solid fa-arrow-right "
                            style={{ color: "#eeeff2" }}
                          ></i>
                        </button>
                      ) : (
                        <button type="submit" className="btnsv">
                          Submit{" "}
                          <i
                            className="fa-solid fa-arrow-right"
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
              <Image
                src="/pana.png"
                alt="Image Description"
                layout="responsive"
                width={400}
                height={600}
                className="iom"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
