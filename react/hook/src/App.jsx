import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0); // useEffect 예시
  const [text, setText] = useState('');
  const [text2, setText2] = useState(''); // 입력값 + 실시간 출력 예시
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState([]);
  const [time, setTime] = useState('');
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [name, setName] = useState('');

  function increase() {
    setCount(count+1);
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function addItem() {
    setList([...list, `항목 ${list.length + 1}`]);
  }
  
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

  useEffect(() => {
    console.log('count:', count2); 
  }, [count2]); // 카운트가 변경될 때마다 상태 감지하여 실행

  useEffect(() => { // timer나 event나 resource가 있을 경우 useEffect 사용
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString()); // setTime에 현재 시간을 담고
    }, 1000); // 1초마다 갱신

    return () => {
      clearInterval(timer); // 컴포넌트 제거시 clearInterval(변수)를 호출하여 반복을 중단 (메모리 자원 낭비 방지)
    };
  }, []); // 컴포넌트 제거시 실행 (최초 1회 등록)

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await res.json();
        setData2(result);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('제출값:', name);
  }
  return (
    <>
      <div>
        <p> 상태 업데이트 예제</p>
        <h1>{count}</h1>
        <button onClick={increase}>증가</button>
      </div>
      <br />
      <div>
        <p>useEffect 예제</p>
        <div>
          <h1>{count2}</h1>
          <button onClick={() => setCount2(count2 + 1)}>증가</button>
        </div>
      </div>
      <br/>
      <div>
        <p>입력 처리 예제</p>
        <input type="text" onChange={handleChange} />
        <p>{text}</p>
      </div>
      <br/>
      <div>
        <input onChange={e => setText2(e.target.value)} />
        <p>{text2}</p>
      </div>
      <br />
      <div>
        <p>토글 예제</p>
        <button onClick={() => setIsOpen(!isOpen)}>토글</button>
        {isOpen && <p>내용 표시</p>}
      </div>
      <br />
      <div>
        <p>리스트 추가 예제</p>
        <button onClick={addItem}>추가</button>
        <ul>
          {list.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <br />
      <div>
        <p>현재 시간 출력 + 정리 함수 예제</p>
        <h1>{time}</h1>
      </div>
      <br/>
      <p>제출 이벤트 예제</p>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={e => setName(e.target.value)} />
        <button type="submit">제출</button>
      </form>
      <br />
      <div>
        <p>API 호출 예제</p>
        {data.map(item => (
          <p key={item.id}>{item.title}</p>
        ))}
      </div>
      <br />
      <div>
        <p>API 데이터 로딩</p>
        {data.map(item => (
          <p key={item.id}>{item.title}</p>
        ))}
      </div>
    </>
  );
}

export default App
