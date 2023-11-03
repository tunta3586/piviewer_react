import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import MainContents from './components/MainContents';
import SearchResults from './components/SearchResults';
import Login from './components/Login';
import './style/App.css';

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
                    {/* <span id="channels" class="bg-primary bg-opacity-25"> */}
                        {/* 채널 안쪽 width가 200px이 되어야 한다. */}
                        {/* <div class="m-3 p-2 bg-secondary bg-opacity-50 ">
                          <div class="row pb-2 justify-content-around">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAHWSURBVFhH7ZZN0oIwDIbLt8KdS5ZwCjcu9BbeAG7BkmPALfBmsvMj0jAxpD+0OsOMPDMZsITmbWxDkueI2jB/+rpZdoGx7AJjEQXe73d1vV5V13V6xAz6FkWhkiR5MxjzmcMKlBlOlmVQep5pmuoRmb7vn8fj8eVrMtccLkSBNIANXIjL2rbVb6wnSiD1q6pKj05A5vBZTBY/JpDTNI31uS/ipw42OCI8nnH5+c5j42Nlhp9WON2fICqDh8NBDcOgf9n5WgZt9ayua31nZzxA+i4AyCCHnkA000nkh4EbP91rEQVKQWMDhbI3rLH8pkCogXDyv9bNUKBjuVwu3h98qcPJ8zy4YTAKhEAwMQbx+eDb2i94P0SkKNAUyIWr/QoRKUaVArnqICxK8uc1da3IhUBTIBd8URRJpC8LgVIguh9NG56+Iy0qtD9ceNJJMBA9LGBSBuhzEz4+HGsdPJ1Or2tZlq8rAi1WdH3zRQudgezAMBjf0PwZBcfBJPje9mXhaWqf4G8+n89vYxQ6ThdF9y81X0RPk8ixeZ3vb7eb9p6g2XWZb2UAjEsxiUR7PB7ac8Llj7ZGHOCf6xGaJQmbyLXCkFUCUUBosBD2jjqWXWAsGxeo1D8tsFfL3zNPUAAAAABJRU5ErkJggg==" class="col"/>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAHWSURBVFhH7ZZN0oIwDIbLt8KdS5ZwCjcu9BbeAG7BkmPALfBmsvMj0jAxpD+0OsOMPDMZsITmbWxDkueI2jB/+rpZdoGx7AJjEQXe73d1vV5V13V6xAz6FkWhkiR5MxjzmcMKlBlOlmVQep5pmuoRmb7vn8fj8eVrMtccLkSBNIANXIjL2rbVb6wnSiD1q6pKj05A5vBZTBY/JpDTNI31uS/ipw42OCI8nnH5+c5j42Nlhp9WON2fICqDh8NBDcOgf9n5WgZt9ayua31nZzxA+i4AyCCHnkA000nkh4EbP91rEQVKQWMDhbI3rLH8pkCogXDyv9bNUKBjuVwu3h98qcPJ8zy4YTAKhEAwMQbx+eDb2i94P0SkKNAUyIWr/QoRKUaVArnqICxK8uc1da3IhUBTIBd8URRJpC8LgVIguh9NG56+Iy0qtD9ceNJJMBA9LGBSBuhzEz4+HGsdPJ1Or2tZlq8rAi1WdH3zRQudgezAMBjf0PwZBcfBJPje9mXhaWqf4G8+n89vYxQ6ThdF9y81X0RPk8ixeZ3vb7eb9p6g2XWZb2UAjEsxiUR7PB7ac8Llj7ZGHOCf6xGaJQmbyLXCkFUCUUBosBD2jjqWXWAsGxeo1D8tsFfL3zNPUAAAAABJRU5ErkJggg==" class="col"/>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAHWSURBVFhH7ZZN0oIwDIbLt8KdS5ZwCjcu9BbeAG7BkmPALfBmsvMj0jAxpD+0OsOMPDMZsITmbWxDkueI2jB/+rpZdoGx7AJjEQXe73d1vV5V13V6xAz6FkWhkiR5MxjzmcMKlBlOlmVQep5pmuoRmb7vn8fj8eVrMtccLkSBNIANXIjL2rbVb6wnSiD1q6pKj05A5vBZTBY/JpDTNI31uS/ipw42OCI8nnH5+c5j42Nlhp9WON2fICqDh8NBDcOgf9n5WgZt9ayua31nZzxA+i4AyCCHnkA000nkh4EbP91rEQVKQWMDhbI3rLH8pkCogXDyv9bNUKBjuVwu3h98qcPJ8zy4YTAKhEAwMQbx+eDb2i94P0SkKNAUyIWr/QoRKUaVArnqICxK8uc1da3IhUBTIBd8URRJpC8LgVIguh9NG56+Iy0qtD9ceNJJMBA9LGBSBuhzEz4+HGsdPJ1Or2tZlq8rAi1WdH3zRQudgezAMBjf0PwZBcfBJPje9mXhaWqf4G8+n89vYxQ6ThdF9y81X0RPk8ixeZ3vb7eb9p6g2XWZb2UAjEsxiUR7PB7ac8Llj7ZGHOCf6xGaJQmbyLXCkFUCUUBosBD2jjqWXWAsGxeo1D8tsFfL3zNPUAAAAABJRU5ErkJggg==" class="col"/>
                          </div>
                          <div class="text-center">유콘</div>
                        </div>
                    </span> */}

                    <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary sidebar">
                        <div className="text-center p-3 border-bottom fs-5 fw-semibold">팔로우 목록</div>
                        <div className="list-group list-group-flush border-bottom scrollarea">
                            <Link className="list-group-item list-group-item-action active py-3 lh-sm active" aria-current="true">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">List group item heading</strong>
                                    <small>Wed</small>
                                </div>
                                <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                            </Link>
                            <Link className="list-group-item list-group-item-action py-3 lh-sm">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">List group item heading</strong>
                                    <small className="text-body-secondary">Tues</small>
                                </div>
                                <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                            </Link>
                        </div>
                        <div className="border-bottom add-follow-button">
                            <Link className="list-group-item list-group-item-action py-3 lh-sm text-center" to='/search'>
                                <strong className="mb-1">팔로우 추가</strong>
                            </Link>
                        </div>
                    </div>
                    <div id="contents" className='w-100'>
                        <Routes>
                            <Route path="/search" element={<SearchResults />} />
                            <Route path="/" element={<MainContents isLoggedIn={isLoggedIn} onLogin={handleLogin}/>} />
                            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} onLogin={handleLogin}/>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
