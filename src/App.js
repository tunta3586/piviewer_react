import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import MainContents from './components/MainContents';
import SearchResults from './components/SearchResults';
import LiveStream from './components/LiveStream';
import Login from './components/Login';
import './style/App.css';
import SideBar from './components/SideBar';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    useEffect(() => {
        // Spring 서버로 JSON 데이터를 보내는 함수
        async function sendDataToSpringServer() {
            try {
                const response = await fetch('http://localhost:8080/checkLogin', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // JSON 데이터라는 것을 명시
                    },
                    credentials: 'include',
                });
            
                if (response.ok) {
                    const responseData = await response.json(); // Spring 서버에서의 응답 데이터를 JSON으로 파싱
                    if(responseData === true){
                      // 로그인 확인 함수 실행
                      handleLogin();
                    }
                    console.log('Spring 서버 응답 데이터:', responseData);
                } else {
                    console.error('Spring 서버 응답 에러:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('오류 발생:', error);
            }
        }
        sendDataToSpringServer();
    }, []);

    return (
        <Router>
            <div className="h-100">
                <header>
                    <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                </header>
                <div className="d-flex h-100">
                    <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary sidebar mt-header">
                        <div className="border-bottom add-follow-button">
                            {isLoggedIn && 
                            <Link className="list-group-item list-group-item-action py-3 lh-sm text-center" to='/search'>
                                <strong className="mb-1">팔로우 추가</strong>
                            </Link>
                            }
                        </div>
                        <div className="text-center p-3 border-bottom fs-5 fw-semibold">팔로우 목록</div>
                        <div className="list-group list-group-flush border-bottom scrollarea">
                            {isLoggedIn  ? (
                                <SideBar />
                            ) : (
                                <div className='text-center'>로그인을 해주세요</div>
                            )}
                        </div>
                    </div>
                    <div id="contents" className='w-100 mt-header'>
                        <Routes>
                            <Route path="/search" element={<SearchResults />} />
                            <Route path="/" element={<MainContents isLoggedIn={isLoggedIn} onLogin={handleLogin}/>} />
                            <Route path="/:customUrl" element={<LiveStream />} />
                            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} onLogin={handleLogin}/>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
