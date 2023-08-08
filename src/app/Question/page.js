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
  const [errorMessage, setErrorMessage] = useState("");
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const [progressBarClass, setProgressBarClass] = useState();
  const isTextQuestion = currentQuestionData.question_type === "text";
  const [textInputs, setTextInputs] = useState([]);

  const [showResult, setShowResult] = useState(false);
  const [userResponses, setUserResponses] = useState([]);
  useEffect(() => {
    setProgressBarClass(
      `progress-bar progress-bar-${Math.floor(progress / 25) * 25}`
    );
  }, [currentQuestion, progress]);

  const handleQuestionChange = (questionIndex) => {
    const response = {
      selectedOptions: selectedOptions,
      textInputs: textInputs,
    };
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestion] = response;
    setUserResponses(updatedResponses);

    setCurrentQuestion(questionIndex);
    setSelectedOptions(userResponses[questionIndex]?.selectedOptions || []);
    setTextInputs(userResponses[questionIndex]?.textInputs || []);
    setErrorMessage("");
  };
  const handleTextInputChange = (event) => {
    console.log("event.target", event.target.value);
    const { value } = event.target;
    const updatedTextInputs = [...textInputs];
    updatedTextInputs[currentQuestion] = value;
    const response = {
      selectedOptions: selectedOptions,
      textInputs: updatedTextInputs,
    };
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestion] = response;
    setUserResponses(updatedResponses);
    setTextInputs(updatedTextInputs);
    console.log("updatedtext", textInputs);
  };
  const handleOptionSelect = (optionIndex) => {
    const selectedOption = currentQuestionData.questions_options[optionIndex];

    let updatedSelectedOptions;
    const response = {
      selectedOptions: updatedSelectedOptions,
      textInputs: textInputs,
    };
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestion] = response;
    setUserResponses(updatedResponses);

    if (currentQuestionData.question_type === "radio") {
      updatedSelectedOptions = [optionIndex];
    } else {
      if (selectedOptions.includes(optionIndex)) {
        updatedSelectedOptions = selectedOptions.filter(
          (option) => option !== optionIndex
        );
      } else {
        updatedSelectedOptions = [...selectedOptions, optionIndex];
      }
    }

    setSelectedOptions(updatedSelectedOptions);
    setErrorMessage("");
  };
  const handleNextQuestion = (event) => {
    event.preventDefault();
    const nextQuestion = currentQuestion + 1;

    if (!isTextQuestion && selectedOptions.length === 0) {
      setErrorMessage(
        "Please select at least one option before proceeding to the next question."
      );
    } else {
      setErrorMessage("");
      let updatedSelectedOptions;

      if (currentQuestionData.question_type === "radio") {
        updatedSelectedOptions = [selectedOptions[0]];
      } else {
        updatedSelectedOptions = selectedOptions.slice();
      }

      const response = {
        selectedOptions: updatedSelectedOptions,
        textInputs: textInputs,
      };

      const updatedResponses = [...userResponses];
      updatedResponses[currentQuestion] = response;
      setUserResponses(updatedResponses);

      if (nextQuestion < totalQuestions) {
        if (userResponses[nextQuestion]) {
          const nextResponse = userResponses[nextQuestion];
          setSelectedOptions(nextResponse.selectedOptions);
          setTextInputs(nextResponse.textInputs);
        } else {
          setSelectedOptions([]);
          setTextInputs([]);
        }
        handleQuestionChange(nextQuestion);
      } else {
        setShowResult(true);
      }
    }
  };

  const handlePreviousQuestion = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      const response = {
        selectedOptions: selectedOptions,
        textInputs: textInputs,
      };
      const updatedResponses = [...userResponses];
      updatedResponses[currentQuestion] = response;
      setUserResponses(updatedResponses);

      console.log("response.selected.option", response.selectedOptions);
      setCurrentQuestion(prevQuestion);
      setSelectedOptions(userResponses[prevQuestion]?.selectedOptions || []);
      setTextInputs(userResponses[prevQuestion]?.textInputs || []);
      setErrorMessage("");
    }
  };
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
                  fontSize: "18px",
                  color: "rgb(226, 104, 60)",
                  marginTop: "20px",
                }}
              >
                Question {currentQuestion + 1} of {totalQuestions}
              </p>
              <form onSubmit={handleNextQuestion}>
                <div className="form-group">
                  <div className="row">
                    <div className="col-lg-12 ques">
                      <label htmlFor={`question_${currentQuestion}`}>
                        <strong>{currentQuestionData.question}</strong>
                      </label>
                    </div>
                  </div>
                  <br />
                  {isTextQuestion ? (
                    <div className="row">
                      <div className="col-lg-12 col-md-6">
                        <input
                          type="text"
                          placeholder="Enter Text"
                          className="txt"
                          onChange={handleTextInputChange}
                          value={textInputs[currentQuestion] || ""}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="row" style={{ cursor: "pointer" }}>
                      <>
                        {currentQuestionData.questions_options.map(
                          (option, index) => (
                            <div
                              className={`col-lg-5 opt col-md-6  ${
                                selectedOptions.includes(index)
                                  ? "selected"
                                  : ""
                              }`}
                              key={index}
                              onClick={() => handleOptionSelect(index)}
                            >
                              <div
                                className="row"
                                style={{ cursor: "pointer" }}
                              >
                                <div className="col-3 circle">
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <div className="col-8 my-3">
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
                                      className="form-check-label rt"
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
                        <div className="row my-3">
                          <div className="col-lg-12 col-md-6">
                            <input
                              type="text"
                              placeholder="Enter Text"
                              className="txt"
                              onChange={handleTextInputChange}
                              value={textInputs[currentQuestion] || ""}
                            />
                          </div>
                        </div>
                      </>
                    </div>
                  )}
                  <div className="row my-3">
                    {errorMessage && (
                      <p style={{ color: "red", marginBottom: "0" }}>
                        {errorMessage}
                      </p>
                    )}
                  </div>
                  <div className="row btnsv-prev-next">
                    <div className="col-lg-6 col-md-6 mb-3">
                      {currentQuestion > 0 && (
                        <button
                          type="button"
                          className="btnsv btnsv-prev"
                          onClick={handlePreviousQuestion}
                        >
                          <i
                            className="fa-solid fa-arrow-left me-1"
                            style={{ color: "#eeeff2" }}
                          ></i>{" "}
                          Previous
                        </button>
                      )}
                    </div>
                    <div className="col-lg-6 col-md-6 mb-3">
                      <button type="submit" className="btnsv btnsv-next">
                        {currentQuestion < totalQuestions - 1
                          ? "Next"
                          : "Submit"}{" "}
                        <i
                          className="fa-solid fa-arrow-right"
                          style={{ color: "#eeeff2" }}
                        ></i>
                      </button>
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
      {showResult && (
        <div className="row">
          <div className="col-lg-8">
            <h3>List of selected options and text of questions:</h3>
            <ul>
              {userResponses.map((response, index) => (
                <li key={index}>
                  <p>
                    <strong>Question {index + 1}:</strong>{" "}
                    {jsonData.data[index].question}
                  </p>
                  {jsonData.data[index].questions_options && (
                    <p>
                      <strong>Selected Options:</strong>{" "}
                      {response.selectedOptions.map((optionIndex) => (
                        <span key={optionIndex}>
                          {
                            jsonData.data[index].questions_options[optionIndex]
                              .option
                          }
                          ,{" "}
                        </span>
                      ))}
                    </p>
                  )}
                  {jsonData.data[index].question_type === "text" && (
                    <p>
                      <strong>Entered Text:</strong>{" "}
                      {response.textInputs[index] || ""}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
