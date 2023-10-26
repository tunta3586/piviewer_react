import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import '../style/bootstrap.css';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" className="p-3">
      <Container>
        <Navbar.Brand href="#">
          <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlinkHref="#bootstrap"></use>
          </svg>
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">Features</Nav.Link>
          <Nav.Link href="#">Pricing</Nav.Link>
          <Nav.Link href="#">FAQs</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
        </Nav>

        <Form className="d-flex">
          <FormControl type="search" placeholder="Search..." className="mr-2" aria-label="Search" />
          <Button variant="outline-light">Search</Button>
        </Form>

        <Button variant="light" className="me-2">Login</Button>
        <Button variant="warning">Sign-up</Button>
      </Container>
    </Navbar>
  );
}

export default Header;