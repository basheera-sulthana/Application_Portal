import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Table } from "react-bootstrap";


function View() {

  const [usersRecord, setusersRecord] = useState([]);
  // const [model, setModel] = useState({
  //   id: "",
  //   uname: "",
  //   email: "",
  //   number: "",
  //   website: "",
  // });
  const [search, setSearch] = useState("");
  
  const getdata = () => {
    fetch("http://localhost:8080/userinfo")
      .then((response) => response.json())
      .then((response) => setusersRecord(response));
  };
  
  useEffect(() => {
    getdata();
  }, []);

  // const showdetail = (id) => {
  //   fetch(`http://localhost:8080/userinfo/${id}`)
  //     .then((res) => res.json())
  //     .then((res) => setModel(res));
  // };

  return (
    <div>
      <div className="container p-3">
        <Navbar
          bg="secondary"
          expand="lg"
          style={{ marginBottom: "2em" }}
        >
          <Container fluid>
            <Navbar.Brand style={{ color: "white" }}>Team Members</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-2"
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

                <a href="/View">
                  <Button variant="light">View</Button>
                </a>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
        <div className="container mt-2">
          <div className="row mt-2">
            <div className="col-md-8" >
              <div className="mt-0">
                <Table striped responsive>
                  <thead style={{backgroundColor:"black" , color:"white" , fontStyle:"normal"}}>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Website</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersRecord
                      .filter((names) =>
                        names.uname.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((names, index) => (
                        <tr key={index}>
                          <td>
                            <a href="/">{names.uname}</a>
                          </td>
                          <td>{names.email}</td>
                          <td>{names.number}</td>
                          <td>{names.website}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
 </div>
        </Container>
      </div>
    </div>
  );
};
export default View;