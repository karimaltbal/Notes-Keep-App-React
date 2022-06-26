import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl} from "react-bootstrap";
import {logoutUserAction} from "../../redux/action/users/userActions"

const Header = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.userLogin);
  const { userInfo } = state;

  const handelLogout = () => {
    dispatch(logoutUserAction());
    window.location.reload()
  };
  



  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">Notes Record</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarscroll" />
        <Navbar.Collapse id="navbarscroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Nav>
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarscroll="true"
          >
            <Nav.Link href="/mynotes">My Notes</Nav.Link>
            <NavDropdown
              title={userInfo ? userInfo.name : "User"}
              id="navbarscrollingDropdown"
            >
              <NavDropdown.Item href="profile">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handelLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header