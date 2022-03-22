import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer, } from 'react-router-bootstrap';
function TitleBar() {

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
    <Container>
    <Navbar.Brand href="home">Eff-5 Standing By</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkContainer to="/">
        <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/updates">
        <Nav.Link>Updates</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
        <Nav.Link>Login</Nav.Link>
        </LinkContainer>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">PlaceHolder 1</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">PlaceHolder 2</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
        </NavDropdown>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    
    
    
    );
}
export default TitleBar;