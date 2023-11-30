import React from 'react';
import '../style/MainContents.css';

function InitForm() {
    return (
        <div className='col p-5'>
            로그인 초기 화면 입니다.
        </div>
    );
}

function NoticeBoard() {
    return (
      <div>
          <h1>공지판 입니다.</h1>
      </div>
    );
  }

function MainContents({ isLoggedIn, onLogin }) {
    return (
        isLoggedIn ? (
            <InitForm />
        ) : (
            <NoticeBoard />
        )
    );
}

export default MainContents;