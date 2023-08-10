"use client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState } from "react";
import "./healer.css";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
// import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
function Healer() {
  const timeSlots = generateTimeSlots();
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSlot = (index) => {
    if (selectedSlots.includes(index)) {
      setSelectedSlots(
        selectedSlots.filter((slotIndex) => slotIndex !== index)
      );
    } else {
      setSelectedSlots([...selectedSlots, index]);
    }
  };
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
  const [selectedSlot, setSelectedSlot] = useState(null);

  const showtime = (index) => {
    console.log("Selected slot:", index);
    setSelectedSlot(index);
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
                    fontFamily: "Poppins,sans-serif",
                  }}
                >
                  <i className="fa-solid fa-plus mx-1 "> </i> ADD
                </Button>
              </div>
            </div>
          </Card.Header>

          <Card.Body>
            <div className="containerr">
              <form className="mx-4">
                <Card.Title>
                  <div className="mt-4">
                    <div>
                      <input
                        type="text"
                        className="datadiv px-3"
                        placeholder="   Select Date"
                        onFocus={(e) => {
                          e.target.type = "date";
                          e.target.min = "  yyyy-mm-dd";
                        }}
                        onBlur={(e) => {
                          if (!e.target.value) {
                            e.target.type = "text";
                            e.target.min = null;
                          }
                        }}
                      />
                    </div>
                    {/* <DateRangePicker
                      slots={{ field: SingleInputDateRangeField }}
                    /> */}
                  </div>
                </Card.Title>
                <Card.Text>
                  <strong>Select Type:</strong>
                  <br />
                  <div className="form-check form-check-inline mt-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Mode"
                      id="videoRadio"
                      value="video"
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
                    />
                    <label className="form-check-label" for="chatRadio">
                      Chat
                    </label>
                  </div>
                </Card.Text>
                <Card.Text>
                  <div className="divtimeslot">
                    <strong className="mb-3">Select Time:</strong>
                    <div className="mt-2">
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
              </form>
            </div>
          </Card.Body>

          <Card.Footer className="text-muted">
            <Button className="divbtn" style={{ backgroundColor: "red" }}>
              ADD
            </Button>
            <Button className="btn btn-secondary  mx-2 divbtn">CANCEL</Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}
export default Healer;
