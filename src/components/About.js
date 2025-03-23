import React from "react";
import Card from "react-bootstrap/Card";
//import "./About.css";

function About() {
  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          display: "flex",
        }}
      >
        <Card
          // className="bgCard"
          style={{
            alignItems: "center",

            background: "rgba(229, 229, 234, 0.81)",
            width: "50rem",
            height: "fit-content",
            margin: "1rem",
            top: "10rem",
          }}
        >
          <Card.Body
          // style={{ padding: "1em", display: "absolute", flexWrap: "wrap" }}
          >
            <Card.Title
              className="cardTitle"
              style={{ textAlign: "center", color: "black", paddingTop: "1em" }}
            >
              Welcome to E-Portal
            </Card.Title>
            <Card.Text>
              E-Portal is an application where managers can collect information
              about the job and the skill set of their team members, as well as
              where team members can submit information relevant to their job.
              The functionality of dynamic addition of team members and options
              for team members to upload work in progress.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default About;

