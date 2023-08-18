"use client";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Link from "next/link";
import moment from "moment";
import "./sh.css";

const AccordionSimple = () => {
  const existingData = JSON.parse(localStorage.getItem("getdata")) || [];
  console.log("existingDatasheduled", existingData);

  const dataByDate = {};
  existingData.forEach((item) => {
    const formattedDate = moment(item.date).format("MM-DD-YYYY");
    if (!dataByDate[formattedDate]) {
      dataByDate[formattedDate] = [];
    }
    dataByDate[formattedDate].push(item);
  });
  
  const sortedDates = Object.keys(dataByDate).sort((a, b) =>
    moment(a).isBefore(b) ? -1 : 1
  );
  return (
    <>
      <div className="container header">
        <div className="row">
          <div className="col-6" style={{ top: "2px" }}>
            <p className="headerlogo">Scheduled Time List</p>
          </div>

          <div className=" col-6 d-flex justify-content-md-end">
            <a href="">
              <Link href="/healer" passHref className="btnheader">
                Add Scheduled Time
              </Link>
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        {sortedDates.map((date) => (
          <Accordion key={date} className="accord">
            <AccordionSummary
              expandIcon={<i className="fa-solid fa-chevron-down"></i>}
            >
              <Typography className="databtn">
                {" "}
                {moment(date).format("MM-DD-YYYY")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {dataByDate[date].map((item) => (
                <div key={item.id} className="row acrd">
                  <div className="col-2">
                    {item.type === "video" && (
                      <div
                        className="col-2"
                        style={{
                          fontSize: "13px",

                          color: "red",
                          backgroundColor: "pink",
                          margin: "9px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingTop: "4px",
                          paddingBottom: "4px",
                          width: "50px",
                          borderRadius: "10px",
                        }}
                      >
                        Video
                      </div>
                    )}{" "}
                    {item.type === "audio" && (
                      <div
                        className="col-2"
                        style={{
                          fontSize: "13px",

                          color: "rgb(38, 198, 249)",
                          backgroundColor: "rgba(38, 198, 249, 0.3)",
                          margin: "9px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingTop: "4px",
                          paddingBottom: "4px",
                          width: "50px",
                          borderRadius: "10px",
                        }}
                      >
                        Audio
                      </div>
                    )}
                    {item.type === "chat" && (
                      <div
                        className="col-2"
                        style={{
                          fontSize: "13px",

                          color: "rgb(253, 181, 40)",
                          backgroundColor: "rgba(253, 181, 40, 0.1)",
                          margin: "9px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingTop: "4px",
                          paddingBottom: "4px",
                          width: "50px",
                          borderRadius: "10px",
                        }}
                      >
                        Chat
                      </div>
                    )}
                  </div>
                  <div className="col-8">
                    {item.timeArr && Array.isArray(item.timeArr)
                      ? item.timeArr.map((slot) => (
                          <button key={slot} className="btnslot">
                            {slot}
                          </button>
                        ))
                      : ""}
                  </div>
                  <div className="col-2">
                    <i
                      className="fa fa-pencil pe-1"
                      aria-hidden="true"
                      style={{
                        color: "rgba(76, 78, 100, 0.54)",
                        fontSize: "14px",
                      }}
                    ></i>
                    <AiOutlineDelete
                      style={{
                        color: "rgba(76, 78, 100, 0.54)",
                        fontSize: "22px",
                        paddingLeft: "5px!important",
                      }}
                      className="ps-1"
                    />
                  </div>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default AccordionSimple;
