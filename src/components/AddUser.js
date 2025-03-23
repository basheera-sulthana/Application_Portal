import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddUser() {
  const [userDetails, setUserDetails] = useState({
    uname: "",
    email: "",
    number: "",
    website: "",
  });

  const [errors, setErrors] = useState({
    uname: "",
    email: "",
    number: "",
    website: "",
  });

  const [mandatory, setMandatory] = useState(false);

  const [valid, setValid] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    let { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
    //console.log("handle change");

    let val = event.target.value;

    let nameRegex = /^[a-zA-Z ]*$/;

    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let phoneRegex = /^[0-9]{10}$/;

    // let chatGPTwebsiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/;

    let websiteRegex =
      /^(https:\/\/www\.|http:\/\/www\.|www\.)[a-zA-Z0-9\-_$]+\.[a-zA-Z]{2,5}$/;

    switch (event.target.name) {
      case "uname":
        if (val.length < 3) {
          setErrors({
            ...errors,
            uname: "Name should have a minimum of 3 characters..",
          });
          setValid(false);
        } else if (!nameRegex.test(val)) {
          setErrors({
            ...errors,
            uname: "Name should have only alphabets or space ",
          });
          setValid(false);
        } else {
          setErrors({ ...errors, uname: "" });
        }
        break;

      case "email":
        if (!emailRegex.test(val)) {
          setErrors({
            ...errors,
            email: "Email must be contain in the format of abc@gmail.com ",
          });
          setValid(false);
        } else {
          setErrors({ ...errors, email: "" });
        }
        break;

      case "number":
        if (!phoneRegex.test(val)) {
          setErrors({
            ...errors,
            number:
              "Please enter a valid mobile number(range must be 10 numbers)",
          });
          setValid(false);
          //console.log("Designation Field");
        } else {
          setErrors({ ...errors, number: "" });
        }
        break;

      case "website":
        if (!websiteRegex.test(val)) {
          setErrors({
            ...errors,
            website: " Please enter a correct website followed by http/https",
          });
          setValid(false);
        } else {
          setErrors({ ...errors, website: "" });
        }
        break;
    }
    // console.log(errors);
    if (
      errors.uname === "" &&
      errors.email === "" &&
      errors.number === "" &&
      errors.website === ""
    ) {
      setValid(true);
      //console.log(true);
    }
  };

  function handleSubmit(event) {
    console.log(userDetails);
    event.preventDefault();

    if (
      userDetails.uname === "" ||
      userDetails.email === "" ||
      userDetails.number === "" ||
      userDetails.website === ""
    ) {
      setMandatory(true);

      //console.log("Please enter all fields")
    } else {
      setMandatory(false);
      axios
        .post("http://localhost:8080/userinfo", userDetails)
        .then((response) => {
          setSuccessMessage(
            `${response.data.uname} your details has been successfully added `
          );
        })
        .catch((error) => {
          setErrorMessage("Something went wrong");
        });
    }
  }

  return (
    <>
      <div>
        <div
          className="container bg-light col-md-5"
          style={{ marginTop: "2em" }}
        >
          <h2 style={{ paddingLeft: "4em", paddingTop: "1em" }}>Add User</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={userDetails.uname}
                onChange={handleChange}
                name="uname"
              />
              <span className="text-danger">{errors.uname}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email..."
                value={userDetails.email}
                onChange={handleChange}
                name="email"
              />
              <span className="text-danger">{errors.email}</span>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Your phone..."
                value={userDetails.number}
                onChange={handleChange}
                name="number"
              />
              <span className="text-danger">{errors.number}</span>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="url"
                placeholder="Your website..."
                value={userDetails.website}
                onChange={handleChange}
                name="website"
              />
              <span className="text-danger">{errors.website}</span>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!valid}>
              Submit
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
          {/* </form> */}
          <br />
        </div>
      </div>
    </>
  );
}

export default AddUser;

