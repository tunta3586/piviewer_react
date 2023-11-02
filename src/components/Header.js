import React from 'react';
import { Navbar, Nav, Form, FormControl, Image, Container, NavDropdown, Button } from 'react-bootstrap';
import '../style/Header.css';
import logo from '../img/logo.png';
import alarm from '../img/alarm.png';
import { useNavigate } from 'react-router-dom';

function Header({ isLoggedIn, onLogout }) {
    // const handleSearch = (event) => {
    //     event.preventDefault();
    //     const search = document.getElementById('search').value;

    //     async function sendDataToSpringServer() {
    //         try {
    //             const response = await fetch('http://localhost:8080/youtubeSearch?search=' + search, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json', // JSON 데이터라는 것을 명시
    //                 },
    //                 credentials: 'include'
    //             });
            
    //             if (response.ok) {
    //                 const responseData = await response.json(); // Spring 서버에서의 응답 데이터를 JSON으로 파싱
    //                 console.log('Spring 서버 응답 데이터:', responseData);
    //             } else {
    //                 console.error('Spring 서버 응답 에러:', response.status, response.statusText);
    //             }
    //         } catch (error) {
    //             console.error('오류 발생:', error);
    //         }
    //     }
    //     sendDataToSpringServer();
    // }
    const navigate  = useNavigate();
    const handleSearch = (event) => {
        event.preventDefault();
        const searchQuery = event.target.elements.search.value;
        // 이 부분에서 검색어를 사용하여 URL을 변경하도록 구현
    
        // 예시: `/search` 경로로 이동하고 검색어를 쿼리 문자열로 추가
        navigate(`/search?q=${searchQuery}`);
    };

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
                <Navbar href="#home"><Image src={logo}></Image></Navbar>
                <Navbar.Collapse id="basic-navbar-nav" className='d-flex justify-content-center'>
                    <Form onSubmit={handleSearch}>
                        <FormControl type="search" placeholder="Search..." className="mr-2" aria-label="Search" id="search"/>
                    </Form>
                </Navbar.Collapse>
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
                    <Navbar href="#home"><Image src={logo}></Image></Navbar>
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