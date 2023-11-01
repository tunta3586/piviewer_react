import React from 'react';
import '../style/contents.css';

function loginSubmit() {
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
      };
    // Spring 서버로 JSON 데이터를 보내는 함수
    async function sendDataToSpringServer() {
    try {
        const response = await fetch('http://192.168.0.14:8080/login', {
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
function LoginForm(props) {
    return (
        <div className='col p-5'>
            <div className='text-center h3'>로그인</div>
            <label htmlFor="username" className="form-label">username</label>
            <input type="text" className="form-control" id="username" />
            <label htmlFor="password" className="form-label">password</label>
            <input type="password" className="form-control" id="password" />
            <button onClick={loginSubmit} className="btn btn-primary btn-block my-3">Login</button>
        </div>
    );
}

function InitForm() {
    return (
        <div className='col p-5'>
            초기 화면 입니다.
        </div>
    );
}

class MainContents extends React.Component {
    constructor(props) {
        super(props);
        this.loginSubmit = this.loginSubmit.bind(this);
    }

    loginSubmit() {
        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
          };
        // Spring 서버로 JSON 데이터를 보내는 함수
        async function sendDataToSpringServer() {
            try {
                const response = await fetch('http://192.168.0.14:8080/login', {
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

    render() {
        const myCookieValue = getCookie("PIViewerSessionCookie");
        let contents;
        if (myCookieValue) {
            contents = <InitForm />;
        } else {
            contents = <LoginForm/>;
        }

        return (
            <div className='row w-100'>
                <span id="channels" className="bg-primary bg-opacity-25 channels"></span>
                {contents}
            </div>
        );
    }
}

function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
}


export default MainContents;