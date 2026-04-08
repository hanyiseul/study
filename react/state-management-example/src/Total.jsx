import { useState } from 'react';

function Total() {
  const [price] = useState(1000);
  const [count, setCount] = useState(1);

  const total = price * count;

  return (
    <div>
      <p>가격: {price}</p>
      <p>수량: {count}</p>
      <p>총액: {total}</p>
      <button onClick={() => setCount(count + 1)}>수량 증가</button>
    </div>
  );
}

export default Total;