import React, { useState, useEffect  } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import "../style/SideBar.css";

function SideBar({setStreramTwitchId}) {
    const [followes, setFollowes] = useState([]);
    const navigate = useNavigate();

    // Link를 클릭하면 URL 경로와 함께 쿼리를 추가하여 다른 페이지로 이동합니다
    const handleLinkClick = (e, custom_url, video_id) => {
        e.preventDefault(); // 기본 동작 중지
        getLiveStreamTwitchChannelId(custom_url);
        const query = '?v=' + video_id;
        const newPath = '/'+ custom_url + query;
        navigate(newPath);
    }

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

    async function getLiveStreamTwitchChannelId(custom_url) {
        try {
            const response = await fetch('http://localhost:8080/getLiveStreamTwitchChannelId?custumUrl=' + custom_url, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
                if (response.ok) {
                    const responseData = await response.text();
                    setStreramTwitchId(responseData);
                    console.log('Spring 서버 응답 데이터:', responseData);
                    return responseData;
                } else {
                    console.error('Spring 서버 응답 에러:', response.status, response.statusText);
                }
            } catch (error) {
            console.error('오류 발생');
        }
    }

    useEffect(() => {
        // 초기 로딩 시 한 번 데이터 가져오기
        getFollowChannels();

        // 3초마다 데이터 업데이트
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
            { item.is_live === "Live" && (
            <Link className="list-group-item list-group-item-action py-3 lh-sm" aria-current="true" onClick={(e) => handleLinkClick(e, item.custom_url, item.video_id)}>
            <div className='row'>
                <div className='sidebar_img'>
                    <img src={item.thumbnails_url} alt="" className="col sidebar_img"/>
                </div>
                <div className='col mx-2'>
                    <div className='overflow-text'><strong >{item.name}</strong></div>
                    <div><small className='live-text'>{item.is_live}</small></div>
                </div>
            </div>
            </Link>
            )}
        </div>
        ))}
        <h4 className='m-0'>오프라인</h4>
        {followes.map((item, index) => (
        <div key={index}>
            { item.is_live === "" && (
            <Link className="list-group-item list-group-item-action py-3 lh-sm" aria-current="true">
            <div className='row'>
                <div className='sidebar_img'>
                    <img src={item.thumbnails_url} alt="" className="col sidebar_img"/>
                </div>
                <div className='col mx-2'>
                    <div className='overflow-text'><strong >{item.name}</strong></div>
                    <div><small>{item.is_live}</small></div>
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