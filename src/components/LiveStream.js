import React, { useState, useEffect  } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import "../style/LiveStream.css";
import { Modal, Button } from 'react-bootstrap';

function LiveStream({streramTwitchId, setStreramTwitchId}) {
    const { customUrl } = useParams();
    const [twitchSearchResult, setTwitchSearchResult] = useState([]);
    const [show, setShow] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const videoId = searchParams.get('v');
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        ytplayerResize();
        twitchChatIframeResize();
        window.addEventListener("ytplayer", ytplayerResize);
        window.addEventListener("twitchChatIframe", twitchChatIframeResize);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
        return () => {
            window.removeEventListener("ytplayer", ytplayerResize);
            window.removeEventListener("twitchChatIframe", twitchChatIframeResize);
        };
    }, []);

    async function setLiveStreamTwitchChannelId(e) {
        e.preventDefault();

        const twitchChannelId = document.getElementById('twitchId').value;
        try {
            const response = await fetch('http://localhost:8080/setLiveStreamTwitchChannelId?custumUrl=' + customUrl + "&twitchChannelId=" + twitchChannelId, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
                if (response.ok) {
                    const responseData = await response.text();
                    setStreramTwitchId(twitchChannelId);
                    console.log('Spring 서버 응답 데이터:', responseData);
                    return responseData;
                } else {
                    console.error('Spring 서버 응답 에러:', response.status, response.statusText);
                }
            } catch (error) {
            console.error('오류 발생');
        }
    }

    async function searchTwitchChannelId(search) {
        try {
            const response = await fetch('http://localhost:8080/twitchSearchChannel?search=' + search, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
                if (response.ok) {
                    const responseData = await response.json();
                    setTwitchSearchResult(responseData.data || []);
                    console.log('Spring 서버 응답 데이터:', responseData);
                } else {
                    console.error('Spring 서버 응답 에러:', response.status, response.statusText);
                }
            } catch (error) {
            console.error('오류 발생:', error);
        }
    }

    function ytplayerResize() {
        const iframe = document.getElementById("ytplayer");
        // 필요한 경우 헤더와 푸터의 높이를 뺄 수 있습니다
        const headerHeight = 100; // 헤더 높이로 대체
        const footerHeight = 0; // 푸터 높이로 대체

        const sideBarWidth = 250;
        const chattingWidth = 350;

        iframe.width = window.innerWidth - sideBarWidth - chattingWidth;
        iframe.height = window.innerHeight - headerHeight - footerHeight;
    }

    function twitchChatIframeResize() {
        const iframe = document.getElementById("twitchChatIframe");
        // 필요한 경우 헤더와 푸터의 높이를 뺄 수 있습니다
        const headerHeight = 100; // 헤더 높이로 대체

        // iframe.width = window.innerWidth - sideBarWidth - chattingWidth;
        iframe.height = window.innerHeight - headerHeight;
    }

    return (
        <div className='w-100 h-100 row'>
            <iframe 
                id="ytplayer" 
                title="liveStream"
                src={"https://www.youtube.com/embed/" + videoId + "?autoplay=1"}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                className="col-md-8"
                >
            </iframe>
            {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/DgpEmYsT9hE?si=NJmaumU3EIGVDXzi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            <div className='col-md-3'>
                <div className='streamIdBx'>
                    <button onClick={() => handleShow()}>Twitch id 찾기</button>
                </div>
                <iframe
                    src={"https://www.twitch.tv/embed/"+ streramTwitchId +"/chat?parent=localhost"}
                    title="twitchChatIframe"
                    width="350"
                    id="twitchChatIframe"
                    theme="black"
                >
                </iframe>
            </div>
            <Modal show={show} onHide={handleClose} className='disable-drag'>
                <Modal.Header closeButton>
                <Modal.Title>twitch id 찾기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>직접 입력하거나 검색해서 찾아주세요</label>
                    <input type="text" className="form-control" id="twitchId" placeholder="twitch id"></input>
                    <div id="searchResult"></div>
                    <div className='pt-4'>
                        <label>검색</label>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            searchTwitchChannelId(e.target.elements.searchInput.value);}}>
                            <input type="text" className="form-control" placeholder="Search..." name="searchInput"/>
                        </form>
                        <div>검색 결과</div>
                        <div className='scrollarea search-result'>
                        {twitchSearchResult.map((item, index) => (
                            <Link key={index} className="list-group-item py-3 px-2 lh-sm searchResultElement" aria-current="true" onClick={(e) => {e.preventDefault(); document.getElementById("twitchId").value = item.broadcaster_login}}>
                                <div className='row scrollba'>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={setLiveStreamTwitchChannelId}>
                        추가하기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LiveStream;