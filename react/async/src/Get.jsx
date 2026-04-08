import { useState, useEffect } from 'react';

function Get() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      {data.map(item => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}

export default Get;