import { useLocation } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  async function sendDataToSpringServer(search) {
        try {
        const response = await fetch('http://localhost:8080/youtubeSearch?search=' + search, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
            if (response.ok) {
                const responseData = await response.json();
                console.log('Spring 서버 응답 데이터:', responseData);
            } else {
                console.error('Spring 서버 응답 에러:', response.status, response.statusText);
            }
        } catch (error) {
        console.error('오류 발생:', error);
        }
  }

  // 컴포넌트 렌더링과 함께 `sendDataToSpringServer` 함수 실행
  sendDataToSpringServer(query);

  return (
    <div>
      <h1>Search Results</h1>
      <p>Query: {query}</p>
    </div>
  );
}


export default SearchResults;