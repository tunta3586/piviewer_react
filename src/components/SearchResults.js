import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

import "../style/SearchResult.css";

function SearchResults() {
    const [customUrl, setCustomUrl] = useState('');
    const [searchResult, setSearchResult] = useState();
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => setShow(false);

    async function searchChannel(customUrl) {
        try {
            const response = await fetch('http://localhost:8080/searchChannel?search=' + customUrl, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
                if (response.ok) {
                    const responseData = await response.json();
                    if(responseData.searchResult)
                        setSearchResult(responseData.liveConfig);
                    else
                        setSearchResult(null);
                    console.log('Spring 서버 응답 데이터:', responseData);
                } else {
                    console.error('Spring 서버 응답 에러:', response.status, response.statusText);
                }
            } catch (error) {
            console.error('오류 발생:', error);
        }
    }

    async function sendFollowData() {
        try {
            const response = await fetch('http://localhost:8080/follow?customUrl='+ customUrl, {
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
        <div className='h-100 p-5 w-50'>
            <h1>팔로우 추가</h1>
            <form onSubmit={(event) => {
                event.preventDefault();
                searchChannel(customUrl);
                }} className='pt-3 py-2'>
                <div className="row">
                    <div className="row w-100">
                        <label htmlFor="firstName" className="form-label">채널 검색</label>
                        <div className='col'>
                            <input type="text" className="form-control" placeholder="검색할 채널의 커스텀url을 정확히 입력해주세요" value={customUrl} onChange={(e) => setCustomUrl(e.target.value)}/>
                        </div>
                        <Button variant="primary" onClick={() => handleShow()} className='col addfollowbutton'>추가하기</Button>
                    </div>
                </div>
            </form>
            <div className="d-md-flex flex-md-equal w-100">
                <div className="text-bg-dark pt-3 w-100 overflow-hidden">
                    <div className="my-3 py-3">
                        <h2 className="display-5 text-center">검색결과</h2>
                    </div>
                    <div className="bg-body-tertiary shadow-sm mx-auto my-3 searchResult">
                        <div className="text-black searchResultField" id="youtubeResult" >
                            {searchResult != null ? (
                                <Link className="list-group-item py-3 px-2 lh-sm searchResultElement" aria-current="true">
                                    <div className='row'>
                                        <img src={searchResult.thumbnails_url} alt="Thumbnail" className='thumbnailSize'></img>
                                        <div className="w-100 align-items-center col">
                                            <div>
                                                <strong className="mb-1">{searchResult.custom_url}</strong>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center channel-des-area">{searchResult.description}</div>
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <div className="list-group-item py-3 px-2 lh-sm searchResultElement">
                                    <div className='row'>
                                        <div className="w-100 align-items-center col">
                                            <div>
                                                <strong className="mb-1">검색결과가 없습니다.</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
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
                                <div>
                                    <div className='row'>
                                        <div>
                                        {searchResult != null ? (
                                            <Link className="list-group-item py-3 px-2 lh-sm searchResultElement" aria-current="true">
                                                <div className='row'>
                                                    <img src={searchResult.thumbnails_url} alt="Thumbnail" className='thumbnailSize'></img>
                                                    <div className="w-100 align-items-center col">
                                                        <div>
                                                            <strong className="mb-1">{searchResult.custom_url}</strong>
                                                        </div>
                                                        <div className="d-flex justify-content-center align-items-center channel-des-area">{searchResult.description}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : (
                                            <div>검색을 진행한 뒤 진행해 주세요</div>
                                        )
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex align-items-center justify-content-between'>
                        확인이 끝났다면 추가하기 버튼을 눌러주세요. &nbsp;&nbsp;&nbsp;
                        <Button variant="primary" onClick={addFollow}>
                            추가하기
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}


export default SearchResults;