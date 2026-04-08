
import Get from './Get'
import Post from './Post'
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <>

      <h2>비동기통신 - 로딩상태 예시</h2>
      <div>
        {loading ? <p>로딩 중...</p> : data.map(item => <p key={item.id}>{item.title}</p>)}
      </div>
      <h2>비동기통신 - get 예시</h2>
      <Get />
      <h2>비동기통신 - post 예시</h2>
      <Post />
    </>
  )
}

export default App
