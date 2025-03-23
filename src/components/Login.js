import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Login() {
  useEffect(() => {
    document.body.style.background =
      "url('./loginBG.png') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
  }, []);

  const navigate = useNavigate();

  const [logDetails, setLogDetails] = useState({
    logname: "",
    //logemail: "",
    logpwd: "",
  });

  const [errors, setErrors] = useState({
    logname: "",
    //logemail: "",
    logpwd: "",
  });

  const [mandatory, setMandatory] = useState(false);

  const [valid, setValid] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    let { name, value } = event.target;
    setLogDetails({ ...logDetails, [name]: value });
    //console.log("handle change");

    let val = event.target.value;

    let nameRegex = /^[a-zA-Z ]*$/;

    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/;

    switch (event.target.name) {
      case "logname":
        if ((val.length < 3)) {
          setErrors({
            ...errors,
            logname: "Name should have a minimum of 3 characters..",
          });
          setValid(false);
        } else if (!nameRegex.test(val)) {
          setErrors({
            ...errors,
            logname: "Name should have only alphabets or space ",
          });
          setValid(false);
        } else {
          setErrors({ ...errors, logname: "" });
        }
        break;

      // case "logemail":
      //   if (!emailRegex.test(val)) {
      //     setErrors({
      //       ...errors,
      //       logemail: "Email must be contain in the format of abc@gmail.com ",
      //     });
      //     setValid(false);
      //   } else {
      //     setErrors({ ...errors, logemail: "" });
      //   }
      //   break;

      case "logpwd":
        if (!passwordRegex.test(val)) {
          setErrors({
            ...errors,
            logpwd:
              " Password must be minimum eight characters, at least one special character and one number",
          });
          setValid(false);
        } else {
          setErrors({ ...errors, logpwd: "" });
        }
        break;
    }
    // console.log(errors);
    if (
      errors.logname === "" &&
      // errors.logemail === "" &&

      errors.logpwd === ""
    ) {
      setValid(true);
      //console.log(true);
    }
  };

  function handleSubmit(event) {
    console.log(logDetails);
    event.preventDefault();

    if (
      logDetails.logname === "" ||
      //logDetails.logemail === "" ||

      logDetails.logpwd === ""
    ) {
      setMandatory(true);

      //console.log("Please enter all fields")
    } else {
      setMandatory(false);
      axios
        .post("http://localhost:8080/loginfo", logDetails)
        .then((response) => {
          setSuccessMessage(
            `${response.data.logname} your account is logged in successfully `
          );
          alert(
            `${response.data.logname} your account is logged in successfully `
          );
        }, navigate("/About"))
        .catch((error) => {
          setErrorMessage("Something went wrong");
        });
    }
  }

  return (
    <>
      <div>
        <h2
          className="text-center"
          style={{
            color: "white",
            fontFamily: "Corbel Light",
            fontSize: "2em",
            justifyItems: "center",
            margin: "2em",
          }}
        >
          CAPSTONE
        </h2>

        <div
          className="container bg-light col-md-5"
          style={{ marginTop: "2em" }}
        >
          <div
            className="card"
            style={{
              backgroundColor: "rgb(81,128,227)",
              padding: "2px",
            }}
          ></div>
          <h2 style={{ paddingLeft: "3em", paddingTop: "1em" }}>
            Sign in to your account
          </h2>
          <div style={{ padding: "2em" }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>UserName or Email</Form.Label>
                <Form.Control
                  type="name"
                  value={logDetails.logname}
                  onChange={handleChange}
                  name="logname"
                />
                <span className="text-danger">{errors.logname}</span>
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="logemail"
                placeholder="Your email..."
                value={logDetails.logemail}
                onChange={handleChange}
                name="logemail"
              />
              <span className="text-danger">{errors.logemail}</span>
            </Form.Group> */}

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={logDetails.logpwd}
                  onChange={handleChange}
                  name="logpwd"
                />
                <span className="text-danger">{errors.logpwd}</span>
              </Form.Group>

              <Button
                className="btn btn-primary "
                type="submit"
                disabled={!valid}
              >
                Sign In
              </Button>
            </Form>

            {mandatory ? (
              <div data-testid="success" className="text-danger">
                Please enter the data in all fields
              </div>
            ) : null}

            {successMessage ? (
              <div data-testid="success" className="text-success">
                {successMessage}
              </div>
            ) : null}

            {errorMessage ? (
              <div data-testid="success" className="text-danger">
                {errorMessage}
              </div>
            ) : null}

            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

