function MainBox() {
  return (
    <div className="info-box">
      <h3>실습 확인 내용</h3>
      <p>1. countAtom은 공유 상태 조각이다.</p>
      <p>2. CountView와 CountButtons는 같은 atom을 사용한다.</p>
      <p>3. Jotai는 useState와 유사한 문법으로 전역 상태를 다룬다.</p>
    </div>
  );
}

export default MainBox;