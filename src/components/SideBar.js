import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import "../style/sideBar.css";

function SideBar() {
    const [followes, setFollowes] = useState([]);

    async function getFollowChannels() {
        try {
            const response = await fetch('http://localhost:8080/getFollowChannels', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
                if (response.ok) {
                    const responseData = await response.json();
                    setFollowes(responseData || []);
                    console.log('Spring 서버 응답 데이터:', responseData);
                } else {
                    console.error('Spring 서버 응답 에러:', response.status, response.statusText);
                }
            } catch (error) {
            console.error('오류 발생:', error);
        }
    }

    useEffect(() => {
        // 초기 로딩 시 한 번 데이터 가져오기
        getFollowChannels();

        // 5초마다 데이터 업데이트
        const intervalId = setInterval(() => {
            getFollowChannels();
        }, 30000);

        return () => {
            // 컴포넌트가 언마운트될 때 clearInterval을 사용하여 인터벌 제거
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            <h4 className='m-0'>생방송</h4>
        {followes.map((item, index) => (
        <div key={index}>
            { item.isLive === "Live" && (
            <Link className="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
            <div className='row'>
                <div className='sidebar_img'>
                    <img src={item.thumbnailsUrl} alt="" className="col sidebar_img"/>
                </div>
                <div className='col mx-2'>
                    <div className='overflow-text'><strong >{item.name}</strong></div>
                    <div><small className='live-text'>{item.isLive}</small></div>
                </div>
            </div>
            </Link>
            )}
        </div>
        ))}
        <h4 className='m-0'>오프라인</h4>
        {followes.map((item, index) => (
        <div key={index}>
            { item.isLive === "" && (
            <Link className="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
            <div className='row'>
                <div className='sidebar_img'>
                    <img src={item.thumbnailsUrl} alt="" className="col sidebar_img"/>
                </div>
                <div className='col mx-2'>
                    <div className='overflow-text'><strong >{item.name}</strong></div>
                    <div><small>{item.isLive}</small></div>
                </div>
            </div>
            </Link>
            )}
        </div>
        ))}
        </div>
    );
}


export default SideBar;