import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import View from "./View";

function Details() {
  const [userinfo, setUserInfo] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [search, setSearch] = useState("");

  const [popup, setPopup] = useState({
    id: "",
    uname: "",
    email: "",
    number: "",
    website: "",
  });

  const popupClose = () => {
    setPopup(false);
  };

  const { id } = useParams();

  const popupAction = (id) => {
    fetch(`http://localhost:8080/userinfo/${id}`)
      .then((res) => res.json())
      .then((res) => setPopup(res));
  };

  useEffect(() => {
    //DB reading code ->axios.get call

    axios
      .get("http://localhost:8080/userinfo")
      .then((response) => {
        setErrorMessage("");
        setUserInfo(response.data);
      })
      .catch((error) => {
        setSuccessMessage("");
        setErrorMessage("Something went wrong..");
      });
  }, []);

  return (
    <>
      <div>
        <div className="container p-3">
          <Navbar bg="secondary" expand="lg" style={{ marginBottom: "2em" }}>
            <Container fluid>
              <Navbar.Brand style={{ color: "white" }}>
                Team Members
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                ></Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <a href="/details/View">
                    <Button
                      variant="light"
                      // onClick={() => {
                      //   <View />;
                      // }}
                    >
                      View
                    </Button>
                  </a>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={popup}
            onHide={popupClose}
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Detail Information
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col xs={6} md={4}>
                    <img src="./userimg.png" alt="UserImg" width="80%" />
                  </Col>
                  <Col xs={6} md={4}>
                    <h4>{popup.uname}</h4>
                    <p>{popup.email}</p>
                    <p>{popup.number}</p>
                    <p>{popup.website}</p>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button
                variant="primary"
                onClick={popupClose}
                // onClick={props.onHide}
              >
                OK
              </Button>
            </Modal.Footer> */}
          </Modal>

          <div className="row">
            {/* display individual bookings in Cards and apply some inline styling */}
            {userinfo
              .filter((userdata) =>
                userdata.uname.toLowerCase().includes(search.toLowerCase())
              )
              .map((userdata) => {
                return (
                  <>
                    <div className="col-md-3 col-sm-6 mb-3">
                      <div className="card col">
                        <div className=" text-center">
                          <img
                            src="./userimg.png"
                            alt="UserImg"
                            width="50%"
                            onClick={() => popupAction(userdata.id)}
                            data-toggle="modal"
                            data-target="#myModal"
                          />
                          <h4>{userdata.uname} </h4>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
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
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}

export default Details;
