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

  const [allSelectedOptionsData, setAllSelectedOptionsData] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [arrayoption, setarrayoption] = useState([]);
  useEffect(() => {
    setProgressBarClass(
      `progress-bar progress-bar-${Math.floor(progress / 25) * 25}`
    );
  }, [currentQuestion, progress]);

  const handleQuestionChange = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    setSelectedOptions([]);
    setErrorMessage("");
  };
  const handleTextInputChange = (event) => {
    const { value } = event.target;
    setSelectedOptions([value]);
  };
  const handleOptionSelect = (optionIndex) => {
    const selectedOption = currentQuestionData.questions_options[optionIndex];

    let updatedSelectedOptions;

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
    if (selectedOptions.length === 0) {
      setErrorMessage(
        "Please select at least one option before proceeding to the next question."
      );
    } else {
      setErrorMessage("");
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < totalQuestions) {
        // Push the selected options of the current question into the array
        setAllSelectedOptionsData((prevData) => [
          ...prevData,
          selectedOptions.map((optionIndex) => {
            return currentQuestionData.questions_options[optionIndex];
          }),
        ]);
        handleQuestionChange(nextQuestion);
      } else {
        // For the last question, also push the selected options into the array
        setAllSelectedOptionsData((prevData) => [
          ...prevData,
          selectedOptions.map((optionIndex) => {
            return currentQuestionData.questions_options[optionIndex];
          }),
        ]);

        setShowResult(true);
        console.log("All Selected Options Data:", allSelectedOptionsData);
        allSelectedOptionsData.map((d) => {
          return console.log("d.option", d.option);
        });
      }
    }
  };

  const handlePreviousQuestion = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      handleQuestionChange(prevQuestion);
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
                  fontSize: "16px",
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
                      <div className="col-lg-12">
                        <input
                          type="text"
                          placeholder="Enter Text"
                          className="txt"
                          onChange={handleTextInputChange}
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
                          <input
                            type="text"
                            placeholder="Enter Text"
                            className="txt"
                          />
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
    </>
  );
};

export default Question;
