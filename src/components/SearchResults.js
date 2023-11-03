import React, { useState } from 'react';
import { Link, Image } from 'react-router-dom';
import "../style/searchResult.css";

function SearchResults() {
    const [searchQuery, setSearchQuery] = useState('');
    const [youtubeSearchResult, setYoutubeSearchResult] = useState([]);
    const [twitchSearchResult, setTwitchSearchResult] = useState([]);

    async function sendDataToSpringServer(query) {
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

    return (
        <div className='h-100 p-5'>
            <h1>팔로우 추가</h1>
            <form onSubmit={(event) => {
                event.preventDefault();
                sendDataToSpringServer(searchQuery);
                }} className='pt-3 py-2'>
                <div className="row">
                    <div className="col-sm-6">
                        <label htmlFor="firstName" className="form-label">채널 검색</label>
                        <input type="text" className="form-control" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
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
                                <Link key={index} className="list-group-item list-group-item-action py-3 px-2 lh-sm searchResultElement" aria-current="true">
                                    <div className='row'>
                                        <img src={item.snippet.thumbnails.medium.url} alt="Thumbnail" className='thumbnailSize'></img>
                                        <div className="d-flex w-100 align-items-center justify-content-between col">
                                            <div>
                                                <strong className="mb-1">{item.snippet.title}</strong>
                                            </div>
                                            <div>{item.snippet.description}</div>
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
                        <div className="text-white" id="twitchResult">test</div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SearchResults;