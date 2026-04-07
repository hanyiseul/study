import apple from './assets/apple.png';

function App() {
  const boxStyle = {
    border: '1px solid #333',
    padding: '16px',
    marginTop: '20px'
  };

  return (
    <div>
      <h1 className="title">JSX 속성 실습</h1>
      <img src={apple} alt="샘플 이미지" width={150} />
      <div style={boxStyle}>스타일 객체 적용 영역</div>
      <label htmlFor="userId">아이디</label>
      <input id="userId" type="text" placeholder="아이디 입력" />
    </div>
  );
}

export default App;