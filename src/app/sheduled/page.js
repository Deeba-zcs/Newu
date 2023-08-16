// ** MUI Imports
"use client";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import "./sh.css";

import { useRouter } from "next/navigation";

const AccordionSimple = () => {
  const router = useRouter();

  const direct = () => {
    console.log("Add Scheduled Time clicked");
    router.push("/healer");
  };
  return (
    <>
      <div className=" container header">
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
        <Accordion className="accord">
          <AccordionSummary
            id="panel-header-1"
            aria-controls="panel-content-1"
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
          >
            <Typography
              style={{
                fontWeight: "600",
                color: "rgba(76, 78, 100, 0.87)",
                fontSize: "15px",
                paddingTop: "10px",
              }}
            >
              2023-08-17
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row acrd  ">
              <div
                className="col-2 btnvdo"
                style={{
                  fontSize: "12px",

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
              <div className="col-8" style={{ marginLeft: "60px" }}>
                <button className="btnslot">6:00PM</button>
                <button className="btnslot">5:00PM</button>
                <button className="btnslot">4:00PM</button>
                <button className="btnslot">1:00PM</button>
                <button className="btnslot">7:00AM</button>
                <button className="btnslot">1:00PM</button>
                <button className="btnslot">3:00PM</button>
              </div>
              <div className="col-2 text-end ms-5">
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
            <div className="row acrd">
              <div
                className="col-2 btnvdo"
                style={{
                  fontSize: "12px",

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

              <div className="col-8" style={{ marginLeft: "60px" }}>
                <button className="btnslot">6:00PM</button>
                <button className="btnslot">5:00PM</button>
                <button className="btnslot">4:00PM</button>
                <button className="btnslot">1:00PM</button>
                <button className="btnslot">7:00AM</button>
                <button className="btnslot">1:00PM</button>
                <button className="btnslot">3:00PM</button>
              </div>
              <div className="col-2 text-end ms-5 ">
                <i
                  class="fa fa-pencil pe-1 "
                  aria-hidden="true"
                  style={{
                    color: "rgba(76, 78, 100, 0.54)",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                ></i>
                <AiOutlineDelete
                  style={{
                    color: "rgba(76, 78, 100, 0.54)",
                    fontSize: "22px",
                  }}
                  className="ps-1"
                />
              </div>
            </div>
            <div className="row acrd">
              <div
                className="col-2"
                style={{
                  fontSize: "12px",

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
              <div className="col-8" style={{ marginLeft: "60px" }}>
                <button className="btnslot">6:00PM</button>
                <button className="btnslot">5:00PM</button>
                <button className="btnslot">4:00PM</button>
                <button className="btnslot">1:00PM</button>
                <button className="btnslot">7:00AM</button>
                <button className="btnslot">1:00PM</button>
                <button className="btnslot">3:00PM</button>
              </div>
              <div className="col-2  text-end  ms-5">
                <i
                  class="fa fa-pencil  pe-1"
                  aria-hidden="true"
                  style={{
                    color: "rgba(76, 78, 100, 0.54)",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                ></i>
                <AiOutlineDelete
                  style={{
                    color: "rgba(76, 78, 100, 0.54)",
                    fontSize: "22px",
                  }}
                  className="ps-1"
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion className="accord">
          <AccordionSummary
            id="panel-header-2"
            aria-controls="panel-content-2"
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
          >
            <Typography
              style={{
                fontWeight: "600",
                color: "rgba(76, 78, 100, 0.87)",
                paddingTop: "10px",
              }}
            >
              2023-08-16
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row acrd">
              <div
                className="col-2 btnvdo"
                style={{
                  fontSize: "12px",

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
              <div className="col-8 mt-3" style={{ marginLeft: "60px" }}>
                <button className="btnslot">6:00PM</button>
                <button className="btnslot">5:00PM</button>
                <button className="btnslot">4:00PM</button>
                <button className="btnslot">1:00PM</button>
                <button className="btnslot">7:00AM</button>
                <button className="btnslot">1:00PM</button>
                <button className="btnslot">3:00PM</button>
              </div>
              <div className="col-2 text-end ms-5 mt-3">
                <i
                  class="fa fa-pencil  pe-1"
                  aria-hidden="true"
                  style={{
                    color: "rgba(76, 78, 100, 0.54)",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                ></i>
                <AiOutlineDelete
                  style={{ color: "rgba(76, 78, 100, 0.54)", fontSize: "22px" }}
                  className="ps-1"
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion className="accord">
          <AccordionSummary
            id="panel-header-3"
            aria-controls="panel-content-3"
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
          >
            <Typography
              style={{
                fontWeight: "600",
                color: "rgba(76, 78, 100, 0.87)",
                fontSize: "15px",
                paddingTop: "10px",
              }}
            >
              2023-08-11
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row acrd">
              <div
                className="col-2 btnvdo"
                style={{
                  fontSize: "12px",

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
              <div className="col-8" style={{ marginLeft: "60px" }}>
                <button className="btnslot">6:00PM</button>
                <button className="btnslot">5:00PM</button>
              </div>
              <div className="col-2 text-end ms-5">
                <i
                  class="fa fa-pencil  pe-1"
                  aria-hidden="true"
                  style={{
                    color: "rgba(76, 78, 100, 0.54)",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                ></i>
                <AiOutlineDelete
                  style={{
                    color: "rgba(76, 78, 100, 0.54)",
                    fontSize: "22px",
                  }}
                  className="ps-1"
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default AccordionSimple;
