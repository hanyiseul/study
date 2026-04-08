import { useState } from 'react';

function App() {
  // 파생 상태 예제
  const [price, setPrice] = useState(1000);
  const [count, setCount] = useState(1);

  const total = price * count; // 파생상태

  // 필터링 결과를 파생 상태로 처리하는 예제
  const [keyword, setKeyword] = useState('');
  const [list] = useState(['사과', '바나나', '포도', '수박']);

  const filteredList = list.filter(item => item.includes(keyword)); // 파생상태

  return (
    <>
      {/* 파생 상태 예제 */}
      <div>
        <p>가격: {price}</p>
        <p>수량: {count}</p>
        <p>총액: {total}</p>
        <button onClick={() => setCount(count + 1)}>수량 증가</button>
      </div>

      {/* 필터링 결과를 파생 상태로 처리하는 예제 */}
      <div>
        <input onChange={e => setKeyword(e.target.value)} />
        {filteredList.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
    </>
  );
}

export default App;