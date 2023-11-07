import React, { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "../style/LiveStream.css";

function LiveStream() {
    const { customUrl } = useParams();
    const [streramTwitchId, setStreramTwitchId] = useState("");
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const videoId = searchParams.get('v');
    
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

    async function getLiveStreamTwitchChannelId() {
        try {
            const response = await fetch('http://localhost:8080/getLiveStreamTwitchChannelId?custumUrl=' + customUrl, {
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
        const headerHeight = 310; // 헤더 높이로 대체
        const footerHeight = 0; // 푸터 높이로 대체

        // iframe.width = window.innerWidth - sideBarWidth - chattingWidth;
        iframe.height = window.innerHeight - headerHeight - footerHeight;
    }

    function showTwitchIdForm(){
        if(document.getElementById("setTwitchIdForm").classList.contains("hide")){
            document.getElementById("setTwitchIdForm").classList.remove("hide");
            document.getElementById("setTwitchIdForm").classList.add("show");
        }else {
            document.getElementById("setTwitchIdForm").classList.remove("show");
            document.getElementById("setTwitchIdForm").classList.add("hide");
        }
    }

    return (
        <div className='h-100 row'>
            <iframe 
                id="ytplayer" 
                title="liveStream"
                type="text/html" 
                src={"https://www.youtube.com/embed/" + videoId}
                frameborder="0"
                allowfullscreen
                className="col-md-9 px-0"
                >
            </iframe>
            <div className='col-md-3'>
                <div className='text-center mt-3 formheight'>
                    <div>
                        <label htmlFor="twitchId" className='px-2'>스트림 대상의 twitch id</label>
                        <input type='text' value={streramTwitchId}></input>
                    </div>
                    <button onClick={getLiveStreamTwitchChannelId}>Twitch Id 가져오기</button>
                    <div>
                        <form id="setTwitchIdForm" className='hide' onSubmit={(e) => setLiveStreamTwitchChannelId(e)}>
                            <label htmlFor="twitchId" className='px-2'>스트림 대상의 twitch id를 입력해 주세요</label>
                            <input type='text' id='twitchId'></input>
                        </form>
                        <button onClick={showTwitchIdForm}>Twitch Id 입력하기</button>
                    </div>
                </div>
                <div>
                    <iframe
                        src={"https://www.twitch.tv/embed/"+ streramTwitchId +"/chat?parent=localhost"}
                        title="twitchChatIframe"
                        width="350"
                        id="twitchChatIframe"
                        theme="black"
                        className="px-0"
                        >
                    </iframe>
                </div>
            </div>
        </div>
    );
}

export default LiveStream;