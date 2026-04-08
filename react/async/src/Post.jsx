import { useState } from 'react';

function Post() {
  const [title, setTitle] = useState('');

  const saveData = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      });

      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input onChange={e => setTitle(e.target.value)} />
      <button onClick={saveData}>저장</button>
    </div>
  );
}

export default Post;