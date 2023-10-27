import React from 'react';
import { Navbar, Nav, Form, FormControl, Image, Container, NavDropdown } from 'react-bootstrap';
import '../style/bootstrap.css';
import '../style/Header.css';
import logo from '../img/logo.png';
import alarm from '../img/alarm.png';

function Header() {
  return (
    <Navbar expand="lg" className="p-3 bg-primary bg-opacity-50" style={{ height: '60px' }}>
      <Container fluid>
        <Navbar href="#home"><Image src={logo}></Image></Navbar>
        <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-center'>
          <Form>
            <FormControl type="search" placeholder="Search..." className="mr-2" aria-label="Search" />
          </Form>
        </Navbar.Collapse>
        <Navbar id="basic-navbar-nav d-flex justify-content-end" className='me-5'>
          <Nav className='d-flex align-items-center'>
            <NavDropdown title={<Image src={alarm} className='bg-danger rounded-circle'></Image>} id="basic-nav-dropdown" align="end">
              <div>
                <div className="small text-gray-500 text-center">공지판</div>
              </div>
              <NavDropdown.Item className='py-3'>
                <div>
                  <div className="small text-gray-500">Documentation</div>
                  Usage instructions and reference
                </div>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={<Image src={logo} className='rounded-circle'></Image>} id="basic-nav-dropdown" align="end">
              <NavDropdown.Item href="#action/3.1" >내정보</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                로그 아웃
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default Header;