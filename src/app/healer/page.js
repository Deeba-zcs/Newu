"use client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./healer.css";

function Healer() {
  const timeSlots = generateTimeSlots();

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

  return (
    <>
      <div className=" mt-5">
        <Card className="mx-auto" style={{ maxWidth: "1100px" }}>
          <Card.Header className="bg-transparent border-0">
            <div className="row">
              <div
                className="col-12 col-md-4"
                style={{
                  marginTop: "10px",
                  fontSize: "22px",
                  color: "rgb(120, 126, 139)",
                  fontFamily: "Poppins",
                  fontWeight: "1000!important",
                }}
              >
                <h3 className="header mb-0">Add Healer Availability</h3>
              </div>
              <div className="col-12 col-md-8 d-flex justify-content-md-end">
                <Button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "rgb(120, 126, 139)",
                    border: "none",
                    // marginLeft: "600px",
                    // marginTop: "10px",
                    fontSize: "14px",
                  }}
                >
                  <i className="fa-solid fa-plus"></i> ADD
                </Button>
              </div>
            </div>
          </Card.Header>

          <Card.Body>
            <div className="container">
              <form>
                <Card.Title>
                  <div className="mt-4">
                    <div>
                      <input
                        type="text"
                        className="datadiv"
                        placeholder="Select Date"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => {
                          if (!e.target.value) {
                            e.target.type = "text";
                          }
                        }}
                      />
                    </div>
                  </div>
                </Card.Title>
                <Card.Text>
                  <strong>Selected Type:</strong>
                  <br />
                  <div className="form-check form-check-inline mt-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="communicationMode"
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
                      name="communicationMode"
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
                      name="communicationMode"
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
                    <strong className="mb-3">Selected Time:</strong>
                    <div className="mt-2">
                      {timeSlots.map((timeSlot, index) => (
                        <Button key={index} className="btntime">
                          {timeSlot}
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card.Text>
              </form>
            </div>
          </Card.Body>

          <Card.Footer className="text-muted">
            <Button className="divbtn">ADD</Button>
            <Button className="btn btn-secondary mx-2 mt-2">Cancel</Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}
export default Healer;
