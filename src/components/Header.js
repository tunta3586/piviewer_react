import React from 'react';
import { Navbar, Nav, Image, Container, NavDropdown, Button } from 'react-bootstrap';
import '../style/Header.css';
import logo from '../img/logo.png';
import alarm from '../img/alarm.png';
import { useNavigate, Link } from 'react-router-dom';

function Header({ isLoggedIn, onLogout }) {
    const navigate  = useNavigate();

    const Logout = (event) => {
      event.preventDefault();
      async function sendDataToSpringServer() {
          try {
              const response = await fetch('http://localhost:8080/logout', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json', // JSON 데이터라는 것을 명시
                  },
                  credentials: 'include'
              });
          
              if (response.ok) {
                  const responseData = await response.json(); // Spring 서버에서의 응답 데이터를 JSON으로 파싱
                  onLogout();
                  navigate(`/`);
                  console.log('Spring 서버 응답 데이터:', responseData);
              } else {
                  console.error('Spring 서버 응답 에러:', response.status, response.statusText);
              }
          } catch (error) {
              console.error('오류 발생:', error);
          }
      }
      sendDataToSpringServer();
    }

    return ( isLoggedIn ? (
        <Navbar className="px-3 py-0 bg-primary bg-opacity-50 navbar">
            <Container fluid>
                <Navbar.Brand>
                    <Link to="/" className='site-logo h2'>PIVeiwer</Link>
                </Navbar.Brand>
                <Navbar id="basic-navbar-nav d-flex justify-content-end">
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
                            <NavDropdown.Item onClick={Logout}>로그 아웃</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                  </Navbar>
            </Container>
        </Navbar>
        ) : (
            <Navbar className="px-3 py-0 bg-primary bg-opacity-50 navbar">
                <Container fluid>
                    <Navbar.Brand>
                        <Link to="/" className='site-logo h2'>PIVeiwer</Link>
                    </Navbar.Brand>
                    <Navbar id="basic-navbar-nav d-flex justify-content-end">
                        <Nav className='d-flex align-items-center'>
                            <Button type="button" href='/login'>login</Button>
                        </Nav>
                    </Navbar>
                </Container>
            </Navbar>
        )
    );
}

export default Header;