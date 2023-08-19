"use client";
import React, { use, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import moment from "moment";
import "./sh.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { removeData, editData } from "../Store/dataslice";
const AccordionSimple = () => {
  const dispatch = useDispatch();
  const existingData = useSelector((state) => state.data.currentdata);

  console.log("existingDataScheduled", existingData);

  const dataByDate = {};
  existingData.forEach((item) => {
    const formattedDate = item.body.date;
    console.log("formattedDate", formattedDate);
    if (!dataByDate[formattedDate]) {
      dataByDate[formattedDate] = [];
    }
    dataByDate[formattedDate].push(item);
  });

  console.log("datebydte", dataByDate);

  const sortedDates = Object.keys(dataByDate).sort((a, b) =>
    moment(a, "MM-DD-YYYY").isBefore(moment(b, "MM-DD-YYYY")) ? -1 : 1
  );
  const handleRemoveItem = (item) => {
    console.log("sheduleddelete", item);

    dispatch(removeData({ id: item.id, selectedType: item.body.type }));
  };
  const handleEditItem = (item) => {
    console.log("itemedishduled", item);
    const momentdate = moment(item.body.date).format("YYYY-MM-DD");
    dispatch(
      editData({
        id: item.id,
        selectedType: item.body.type,
        selectedDate: momentdate,
        selectedTime: item.body.timeArr,
      })
    );
  };

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
                    {item.body.type === "video" && (
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
                    {item.body.type === "audio" && (
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
                    {item.body.type === "chat" && (
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
                    {item.body.timeArr && Array.isArray(item.body.timeArr)
                      ? item.body.timeArr.map((slot) => (
                          <button key={slot} className="btnslot">
                            {slot}
                          </button>
                        ))
                      : ""}
                  </div>
                  <div className="col-2">
                    <Link href="/healer">
                      {" "}
                      <i
                        className="fa fa-pencil pe-1"
                        aria-hidden="true"
                        style={{
                          color: "rgba(76, 78, 100, 0.54)",
                          fontSize: "14px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleEditItem(item)}
                      ></i>
                    </Link>
                    <AiOutlineDelete
                      style={{
                        color: "rgba(76, 78, 100, 0.54)",
                        fontSize: "22px",
                        paddingLeft: "5px!important",
                        cursor: "pointer",
                      }}
                      className="ps-1"
                      onClick={() => handleRemoveItem(item)}
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
