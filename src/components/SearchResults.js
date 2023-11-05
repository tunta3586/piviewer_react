import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

import "../style/searchResult.css";

function SearchResults() {
    const [searchQuery, setSearchQuery] = useState('');
    const [youtubeSearchResult, setYoutubeSearchResult] = useState([]);
    const [twitchSearchResult, setTwitchSearchResult] = useState([]);
    const [show, setShow] = useState(false);
    const [errorMassage, setErrorMassage] = useState('');
    const [selectYoutube, setSelectYoutube] = useState('');
    const [selectTwitch, setSelectTwitch] = useState('');
    const [follow, setFollow] = useState({
        followName: '',
        youtubeChannelId: '',
        twitchChannelId: ''
    });

    const handleShow = () => {
        if(selectYoutube && selectTwitch){
            setErrorMassage('');
        }else{
            setErrorMassage("Youtube와 Twitch의 검색결과중 하나가 선택되지 않았습니다.");
        }
        setShow(true);
    };

    const handleClose = () => setShow(false);

    async function searchChannel(query) {
        try {
            const response = await fetch('http://localhost:8080/youtubeSearch?search=' + query, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
                if (response.ok) {
                    const responseData = await response.json();
                    setYoutubeSearchResult(responseData.youtubeSearchResult.items ||[]);
                    setTwitchSearchResult(responseData.twitchSearchResult.data || []);
                    console.log('Spring 서버 응답 데이터:', responseData);
                } else {
                    console.error('Spring 서버 응답 에러:', response.status, response.statusText);
                }
            } catch (error) {
            console.error('오류 발생:', error);
        }
    }

    const select = (target, item, area) => {
        removeActive(area);
        const updatedDict = follow;
        target.classList.add('active');
        if(area === "youtubeResult") {
            updatedDict.followName = item.item.snippet.title;
            updatedDict.youtubeChannelId = item.item.snippet.channelId;
            setFollow(updatedDict);
            setSelectYoutube(target.innerHTML);
        }else {
            updatedDict.twitchChannelId = item.item.broadcaster_login;
            setFollow(updatedDict);
            setSelectTwitch(target.innerHTML);
        }
    }

    const removeActive = (area) => {
        const target = document.querySelectorAll(`#${area} .active`);
        for (let i = 0; i < target.length; i++) {
            target[i].classList.remove("active");
        }
    }

    async function sendFollowData() {
        try {
            const response = await fetch('http://localhost:8080/follow?followName=' + follow.followName + '&customUrl='+ follow.youtubeChannelId +'&twitchChannelId='+ follow.twitchChannelId, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
                if (response.ok) {
                } else {
                    console.error('Spring 서버 응답 에러:', response.status, response.statusText);
                }
            } catch (error) {
            console.error('오류 발생:', error);
        }
    }

    const addFollow = () => {
        sendFollowData();
        handleClose();
    }

    return (
        <div className='h-100 p-5'>
            <h1>팔로우 추가</h1>
            <form onSubmit={(event) => {
                event.preventDefault();
                searchChannel(searchQuery);
                }} className='pt-3 py-2'>
                <div className="row">
                    <div className="row w-100">
                        <label htmlFor="firstName" className="form-label">채널 검색</label>
                        <div className='col'>
                            <input type="text" className="form-control" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        </div>
                        <Button variant="primary" onClick={() => handleShow()} className='col addfollowbutton'>추가하기</Button>
                    </div>
                </div>
            </form>
            <div className="d-md-flex flex-md-equal w-100">
                <div className="text-bg-dark pt-3 w-50 overflow-hidden">
                    <div className="my-3 py-3">
                        <h2 className="display-5 text-center">Youtube검색결과</h2>
                    </div>
                    <div className="bg-body-tertiary shadow-sm mx-auto my-3 searchResult">
                        <div className="text-black searchResultField" id="youtubeResult" >
                            {youtubeSearchResult.map((item, index) => (
                                <Link key={index} className="list-group-item py-3 px-2 lh-sm searchResultElement" aria-current="true" onClick={(e) => select(e.currentTarget, {item}, "youtubeResult")}>
                                    <div className='row'>
                                        <img src={item.snippet.thumbnails.medium.url} alt="Thumbnail" className='thumbnailSize'></img>
                                        <div className="w-100 align-items-center col">
                                            <div>
                                                <strong className="mb-1">{item.snippet.title}</strong>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center channel-des-area">{item.snippet.description}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-body-tertiary pt-3 w-50 text-center overflow-hidden">
                    <div className="my-3 p-3">
                        <h2 className="display-5">Twitch검색결과</h2>
                    </div>
                    <div className="bg-dark shadow-sm mx-auto searchResult">
                        <div className="text-white searchResultField" id="twitchResult">
                            {twitchSearchResult.map((item, index) => (
                                <Link key={index} className="list-group-item py-3 px-2 lh-sm searchResultElement" aria-current="true" onClick={(e) => select(e.currentTarget, {item}, "twitchResult")}>
                                    <div className='row'>
                                        <img src={item.thumbnail_url} alt={item.thumbnail_url ? "Thumbnail" : ""} className="thumbnailSize" />
                                        <div className="w-100 align-items-center col">
                                            <div>
                                                <strong className="mb-1">{item.display_name}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} className='disable-drag'>
                <Modal.Header closeButton>
                <Modal.Title>확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                {errorMassage &&(
                                    <div className="alert alert-danger" role="alert">
                                        {errorMassage}
                                    </div>
                                )}
                                {!errorMassage && (
                                <div>
                                    <div className='row'>
                                        <div>
                                            <p>선택한 Youtube 정보:</p>
                                            <div dangerouslySetInnerHTML={{ __html: selectYoutube }}></div>
                                        </div>
                                    </div>
                                    <div className='row mt-4'>
                                    <div>
                                        <p>선택한 Twitch 정보:</p>
                                        <div dangerouslySetInnerHTML={{ __html: selectTwitch }}></div>
                                    </div>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                {errorMassage && (
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                )}
                {!errorMassage && (
                    <div className='d-flex align-items-center justify-content-between'>
                        확인이 끝났다면 추가하기 버튼을 눌러주세요. &nbsp;&nbsp;&nbsp;
                        <Button variant="primary" onClick={addFollow}>
                            추가하기
                        </Button>
                    </div>
                )}
                </Modal.Footer>
            </Modal>
        </div>
    );
}


export default SearchResults;