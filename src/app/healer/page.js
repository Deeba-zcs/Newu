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
      <div className="mt-5">
        <Card className=" " style={{ width: "1100px", marginLeft: "50px" }}>
          <Card.Header style={{ border: "none" }}>
            <div className="row">
              <div
                className="col-4"
                style={{
                  marginTop: "10px",
                  fontSize: "22px",
                  color: "rgb(120, 126, 139)",
                  fontFamily: "Poppins",

                  fontWeight: 800,
                }}
              >
                Add Healer Availability
              </div>
              <div className="col-8">
                <Button
                  style={{
                    backgroundColor: "rgb(120, 126, 139)",
                    border: "none",
                    marginLeft: "600px",
                    marginTop: "10px",
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
                  <div className="mt-4 ">
                    <input
                      type="text"
                      className="datadiv"
                      placeholder="Select Date"
                    />
                  </div>
                </Card.Title>
                <br />
                <Card.Text>
                  <strong>Selected Type:</strong>
                  <br />
                  <div className="form-check form-check-inline">
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
                      Voice
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
                    <strong>Selected Time:</strong>
                    <br />
                    {timeSlots.map((timeSlot, index) => (
                      <Button key={index} className="btntime">
                        {timeSlot}
                      </Button>
                    ))}
                  </div>
                </Card.Text>
              </form>
            </div>
          </Card.Body>
          <Card.Footer className="text-muted">
            {" "}
            <Button className="divbtn">ADD</Button>{" "}
            <Button
              style={{
                backgroundColor: "rgb(120, 126, 139)",
                border: "none",
                marginBottom: "10px",
                marginTop: "20px",
              }}
            >
              Cancel
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default Healer;
