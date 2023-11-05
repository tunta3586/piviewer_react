import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupForm(){
    const Signup = () => {
        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            youtubeChannelId: document.getElementById('youtubeChannelId').value,
        };
        // Spring 서버로 JSON 데이터를 보내는 함수
        async function sendDataToSpringServer() {
        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // JSON 데이터라는 것을 명시
                },
                body: JSON.stringify(data), // JSON 데이터를 문자열로 변환해서 요청 본문에 담음
            });
        
            if (response.ok) {
                const responseData = await response.json(); // Spring 서버에서의 응답 데이터를 JSON으로 파싱
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

    return (
        <div className='form-signin col p-5 mx-auto'>
            <div className='text-center h3 p-3'>회원 가입</div>
            <EmailForm/>
            <PasswordForm/>
            <div className="form-floating mt-2">
                <input type="text" className="form-control" id="youtubeChannelId" placeholder=""></input>
                <label htmlFor="youtubeChannelid">YoutubeChannelid</label>
            </div>
            <button onClick={Signup} className="btn btn-primary w-100 py-2 mt-3">Signin</button>
        </div>
    );
}

function EmailForm(){
    return (
        <div className="form-floating">
            <input type="text" className="form-control email-signin" id="username" placeholder=""></input>
            <label htmlFor="username">Email address</label>
        </div>
    );
}

function PasswordForm(){
    return (
        <div className="form-floating">
            <input type="password" className="form-control password-signin" id="password" placeholder=""></input>
            <label htmlFor="password">password</label>
        </div>
    );
}

function Login({ onLogin }) {
    const [isSignUp, setIsSignUp] = useState(true);
    const navigate  = useNavigate();

    const GoSignup = () => {
        setIsSignUp(false);
    };

    const LoginSubmit = () =>{
        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        // Spring 서버로 JSON 데이터를 보내는 함수
        async function sendDataToSpringServer() {
            try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // JSON 데이터라는 것을 명시
                    },
                    body: JSON.stringify(data), // JSON 데이터를 문자열로 변환해서 요청 본문에 담음
                    credentials: 'include',
                });
            
                if (response.ok) {
                    const responseData = await response.json(); // Spring 서버에서의 응답 데이터를 JSON으로 파싱
                    // 로그인 확인 함수 실행
                    onLogin();
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
    return (
        isSignUp ? (
            <React.StrictMode>
                <div className='form-signin col p-5 mx-auto'>
                    <div className='text-center h3 p-3'>로그인</div>
                    <EmailForm />
                    <PasswordForm />
                    <button onClick={LoginSubmit} className="btn btn-primary w-100 py-2 mt-3">Login</button>
                    <button onClick={GoSignup} className="btn btn-primary w-100 py-2 mt-3">Signin</button>
                </div>
            </React.StrictMode>
        ) : (
            <React.StrictMode>
                <SignupForm />
            </React.StrictMode>
        )
    );
}

export default Login;
