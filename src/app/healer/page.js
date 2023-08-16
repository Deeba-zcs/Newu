"use client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import "./healer.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { Placeholder } from "react-bootstrap";

function Healer() {
  const timeSlots = generateTimeSlots();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSlots, setSelectedSlots] = useState([]);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const startedDate = moment(startDate).format("YYYY-MM-DD");
  const endedDate = moment(endDate).format("YYYY-MM-DD");
  console.log("startDate", startedDate);

  console.log("endDate", endedDate);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedtype, setSelectedtype] = useState(null);

  const toggleSlot = (index) => {
    clearErrorMessage();
    if (selectedSlots.includes(index)) {
      setSelectedSlots(
        selectedSlots.filter((slotIndex) => slotIndex !== index)
      );
    } else {
      setSelectedSlots([...selectedSlots, index]);
    }
    console.log("multipletime", selectedSlots);
  };
  const getSelectedTimeSlots = () => {
    return selectedSlots.map((index) => timeSlots[index]);
  };

  useEffect(() => {
    console.log("time slots:", getSelectedTimeSlots());
  }, [selectedSlots]);

  function generateTimeSlots() {
    const currentTime = new Date();
    const startTime = new Date(currentTime);
    startTime.setHours(7, 0, 0);

    const endTime = new Date(currentTime);
    endTime.setDate(endTime.getDate() + 1);
    endTime.setHours(6, 0, 0);

    const timeSlots = [];
    const timeIncrement = 60 * 60 * 1000;

    let currentTimeSlot = new Date(startTime);

    while (currentTimeSlot <= endTime) {
      const formattedTime = currentTimeSlot.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      console.log("timeformat", formattedTime);
      timeSlots.push(formattedTime);
      currentTimeSlot.setTime(currentTimeSlot.getTime() + timeIncrement);
    }
    console.log("button", timeSlots);

    return timeSlots;
  }
  const handleTypeChange = (event) => {
    setSelectedtype(event.target.value);
  };
  const clearall = () => {
    setSelectedSlots([]);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectedtype(null);
    setDateRange([null, null]);
  };
  const showdata = () => {
    if (!startDate || !endDate) {
      setErrorMessage("Please select a date range.");
      return false;
    }

    if (!selectedtype) {
      setErrorMessage("Please select a type.");
      return false;
    }

    if (selectedSlots.length === 0) {
      setErrorMessage("Please select at least one time slot.");

      return false;
    } else {
      setSelectedStartDate(startDate);
      setSelectedEndDate(endDate);

      selectedtype;
    }
    const body = {
      date: startDate,
      type: selectedtype,
      timeArr: selectedSlots,
    };

    console.log("body", body);
    fetch(url, {
      method: "POST",
      body: body,
    });

    // console.log("Selected Start Date:", selectedStartDate);
    // console.log("Selected End Date:", selectedEndDate);
    // console.log("Selected Time Slots:", getSelectedTimeSlots());
  };
  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <>
      <div className=" mt-5">
        <Card className="mx-auto" style={{ maxWidth: "1100px" }}>
          <Card.Header className="bg-transparent border-0">
            <div className="row">
              <div
                className="col-12 col-md-6"
                style={{
                  marginTop: "10px",
                  fontSize: "22px",
                  color: "rgb(120, 126, 139)",
                  fontFamily: "Poppins,sans-serif",
                  fontWeight: "1000!important",
                }}
              >
                <h3 className="header mb-0">Add Healer Availability</h3>
              </div>

              <div className="col-12 col-md-6 d-flex justify-content-md-end">
                <Button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "rgb(120, 126, 139)",
                    border: "none",
                    fontSize: "14px",
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  <i className="fa-solid fa-plus mx-1 "> </i> ADD
                </Button>
              </div>
            </div>
          </Card.Header>
          <form className="mx-3">
            <Card.Body>
              <div className="containerr  mx-3">
                <Card.Title>
                  <div className="mt-4 mx-3">
                    <div>
                      <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText=" Select Date"
                        className="datadiv"
                        required
                        onChange={(update) => {
                          setDateRange(update);
                          clearErrorMessage();
                        }}
                        // isClearable={true}
                      />
                    </div>
                  </div>
                </Card.Title>
                <Card.Text>
                  <strong className="mx-3">Select Type:</strong>
                  <br />
                  <div className="form-check form-check-inline mt-3 mx-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Mode"
                      id="videoRadio"
                      value="video"
                      checked={selectedtype === "video"}
                      onChange={(event) => {
                        handleTypeChange(event);
                        clearErrorMessage(); // Clear error on type radio change
                      }}
                    />
                    <label className="form-check-label" for="videoRadio">
                      Video
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Mode"
                      id="voiceRadio"
                      value="audio"
                      checked={selectedtype === "audio"}
                      onChange={(event) => {
                        handleTypeChange(event);
                        clearErrorMessage(); // Clear error on type radio change
                      }}
                    />
                    <label className="form-check-label" for="voiceRadio">
                      Audio
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Mode"
                      id="chatRadio"
                      value="chat"
                      checked={selectedtype === "chat"}
                      onChange={(event) => {
                        handleTypeChange(event);
                        clearErrorMessage(); // Clear error on type radio change
                      }}
                    />
                    <label className="form-check-label" for="chatRadio">
                      Chat
                    </label>
                  </div>
                </Card.Text>
                <Card.Text>
                  <div className="divtimeslot">
                    <strong className="mb-3 mx-3">Select Time:</strong>
                    <div className="mt-2 mx-3">
                      <div>
                        {timeSlots.map((timeSlot, index) => (
                          <Button
                            key={index}
                            style={{
                              backgroundColor: selectedSlots.includes(index)
                                ? "red"
                                : "rgb(120, 126, 139)",
                              color: selectedSlots.includes(index)
                                ? "white"
                                : "",
                              borderRadius: "40px",
                              margin: "3px",
                              padding: "5px",
                              border: "none",
                              fontSize: "14px",
                              fontFamily: "Poppins",
                            }}
                            onClick={() => toggleSlot(index)}
                          >
                            {timeSlot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card.Text>
              </div>
            </Card.Body>

            <Card.Footer className="text-muted">
              <Button
                className="divbtn"
                style={{ backgroundColor: "red" }}
                onClick={showdata}
              >
                ADD
              </Button>
              <Button
                className="btn btn-secondary  mx-2 divbtn"
                onClick={clearall}
              >
                CANCEL
              </Button>
              <div className="text-end my-1">
                {errorMessage && (
                  <p style={{ color: "red", marginBottom: "0" }}>
                    {errorMessage}
                  </p>
                )}
              </div>
            </Card.Footer>
          </form>
        </Card>
      </div>
      <div>
        {selectedStartDate && selectedEndDate && (
          <div>
            <p>
              Selected Start Date:{" "}
              {moment(selectedStartDate).format("MMMM Do, YYYY")}
            </p>
            <p>
              Selected End Date:{" "}
              {moment(selectedEndDate).format("MMMM Do, YYYY")}
            </p>
            <p>Selected Type: {selectedtype}</p>
            <p>Selected Time Slots: {getSelectedTimeSlots().join(", ")}</p>
          </div>
        )}
      </div>
    </>
  );
}
export default Healer;
