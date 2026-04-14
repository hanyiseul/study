function MainBox() {
  return (
    <div className="info-box">
      <h3>실습 확인 내용</h3>
      <p>1. 현재 카운트는 CountView 컴포넌트에서 출력한다.</p>
      <p>2. 버튼은 CountButtons 컴포넌트에서 관리한다.</p>
      <p>3. 두 컴포넌트는 props 없이 같은 Zustand store를 공유한다.</p>
    </div>
  );
}

export default MainBox;