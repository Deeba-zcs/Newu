"use client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import "./healer.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addData, editData, clearEditObj, saveData } from "../Store/dataslice";
import { useRouter } from "next/navigation";

function Healer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const existingeditdata = useSelector((state) => state.data.editobj);
  console.log("existingeditdata", existingeditdata);
  const existingDataHealer = useSelector((state) => state.data.currentdata);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedtype, setSelectedtype] = useState();
  const [editingItem, setEditingItem] = useState(null);

  const timeSlots = generateTimeSlots();
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const [buttonText, setButtonText] = useState();
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [date, setDate] = useState();

  const toggleSlot = (index) => {
    clearErrorMessage();
    if (selectedSlots.includes(index)) {
      setSelectedSlots(
        selectedSlots.filter((slotIndex) => slotIndex !== index)
      );
    } else {
      setSelectedSlots([...selectedSlots, index]);
    }
  };
  const startedDate = moment(date).format("MM/DD/YYYY");
  // console.log("statrted dts", startedDate);

  const getSelectedTimeSlots = () => {
    return selectedSlots.map((index) => timeSlots[index]);
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
      // console.log("timeformat", formattedTime);
      timeSlots.push(formattedTime);
      currentTimeSlot.setTime(currentTimeSlot.getTime() + timeIncrement);
    }
    // console.log("button", timeSlots);

    return timeSlots;
  }
  const handleTypeChange = (event) => {
    setSelectedtype(event.target.value);
  };
  const clearall = () => {
    setDate(null);
    setSelectedStartDate(null);
    setSelectedSlots([]);
    setSelectedtype(null);
    clearErrorMessage();
  };

  console.log("existeditdatadate", existingeditdata.selectedDate);
  const selectedDateD = moment(selectedStartDate).format("MM/DD/YYYY");
  console.log("selectedDateD", selectedDateD);

  useEffect(() => {
    if (existingeditdata) {
      setSelectedStartDate(existingeditdata.selectedDate);
      // setDate(selectedDateD);
      setSelectedtype(existingeditdata.selectedType);

      const timeArr = existingeditdata.selectedTime || [];
      const slots = generateTimeSlots();

      const selectedSlotIndices = timeArr.map((time) => slots.indexOf(time));

      setSelectedSlots(selectedSlotIndices);
    }
  }, [existingeditdata]);

  useEffect(() => {
    console.log("UseEffectexistingedittdata", existingeditdata);

    if (Object.keys(existingeditdata).length === 0) {
      setButtonText("ADD");
    } else {
      setButtonText("Save Changes");
    }
  }, [existingeditdata]);
  useEffect(() => {
    if (Object.keys(existingeditdata).length === 0) {
      setButtonText("Add");
    } else {
      setButtonText("Save Changes");
    }
  }, [existingeditdata]);
  const handleEditData = () => {
    console.log("handleeditdata call");
    const updatedData = {
      date: selectedStartDate,
      id: existingeditdata.id,

      timeArr: getSelectedTimeSlots(),
      type: selectedtype,
    };
    console.log("updatedatasavdata", updatedData);

    dispatch(
      saveData({
        id: existingeditdata.id,
        newData: updatedData,
        datad: existingDataHealer,
      })
    );

    clearall();
    dispatch(clearEditObj());
  };

  const showdata = () => {
    if (!date) {
      setErrorMessage1("Please select a date.");
      return;
    }

    if (!selectedtype) {
      setErrorMessage2("Please select a type.");
      return;
    }

    if (selectedSlots.length === 0) {
      setErrorMessage3("Please select at least one time slot.");
      return;
    }
    const body = {
      id: Date.now(),
      date: moment(date).format("MM-DD-YYYY"),
      type: selectedtype,
      timeArr: getSelectedTimeSlots(),
    };

    dispatch(addData({ body }));
    console.log("body", body);
    setSelectedStartDate(moment(date).format("MM-DD-YYYY"));
    selectedtype;
    //router.push("/sheduled");
    // const existingdata = JSON.parse(localStorage.getItem("getdata")) || [];

    // existingdata.push(body);

    // localStorage.setItem("getdata", JSON.stringify(existingdata));
  };

  const clearErrorMessage = () => {
    setErrorMessage1("");
    setErrorMessage2("");
    setErrorMessage3("");
  };

  // fetch(url, {
  //   method: "POST",
  //   body: body,
  // });

  // console.log("Selected Start Date:", selectedStartDate);
  // console.log("Selected End Date:", selectedEndDate);
  // console.log("Selected Time Slots:", getSelectedTimeSlots());

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
                  className=""
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
                    <DatePicker
                      selected={date}
                      className="datpik"
                      onChange={(update) => {
                        setDate(update);
                        clearErrorMessage();
                      }}
                      placeholderText="Select Date"
                    />
                  </div>
                  <div className=" my-1">
                    {errorMessage1 && (
                      <p
                        style={{
                          color: "red",
                          marginBottom: "0",
                          marginLeft: "15px",
                          fontSize: "15px",
                        }}
                      >
                        {errorMessage1}
                      </p>
                    )}
                  </div>
                </Card.Title>
                <Card.Text>
                  <strong className="mx-3 my-4">Select Type:</strong>
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
                        clearErrorMessage();
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
                        clearErrorMessage();
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
                        clearErrorMessage();
                      }}
                    />
                    <label className="form-check-label" for="chatRadio">
                      Chat
                    </label>
                  </div>
                  <div className=" my-1">
                    {setErrorMessage2 && (
                      <p
                        style={{
                          color: "red",
                          marginLeft: "15px",
                          marginBottom: "0",
                          fontSize: "15px",
                        }}
                      >
                        {errorMessage2}
                      </p>
                    )}
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
                  <div className="">
                    {errorMessage3 && (
                      <p
                        style={{
                          color: "red",
                          marginLeft: "15px",
                          marginTop: "-15px",

                          fontSize: "15px",
                        }}
                      >
                        {errorMessage3}
                      </p>
                    )}
                  </div>
                </Card.Text>
              </div>
            </Card.Body>

            <Card.Footer className="text-muted">
            <Button
          className="divbtn"
          style={{ backgroundColor: "red" }}
          onClick={existingeditdata ? handleEditData : showdata}
        >
          {buttonText}
        </Button>
              <Button
                className="btn btn-secondary  mx-2 divbtn"
                onClick={clearall}
              >
                CANCEL
              </Button>
            </Card.Footer>
          </form>
        </Card>
      </div>
      <div>
        {selectedStartDate && (
          <div>
            <p>
              Selected Start Date:{" "}
              {moment(selectedStartDate).format("MMMM Do, YYYY")}
            </p>
            <p>
              {/* Selected End Date:{" "}
              {moment(selectedEndDate).format("MMMM Do, YYYY")} */}
            </p>
            <p>Selected Type: {selectedtype}</p>
            <p>Selected Time Slots: {getSelectedTimeSlots().join(", ")}</p>
          </div>
        )}
        <Link href={"/sheduled"}>Sheduled</Link>
      </div>
    </>
  );
}
export default Healer;
