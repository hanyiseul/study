import { useEffect } from 'react';

function Timer() {
  // 생명 주기에 따라 실행되어야 하는 side-effect를 처리하는 도구
  useEffect(() => {
    const id = setInterval(() => { // 1초마다 콘솔에 메시지를 출력하는 타이머 등록
      console.log('동작 중');
    }, 1000);

    return () => clearInterval(id); // 컴포넌트가 화면에서 사라질 때 타이머 제거 -> 해당 함수가 없으면 컴포넌트가 ㅏ라진 뒤에도 타이머가 계속 동작
  }, []); // 컴포넌트가 처음 화면에 나타날 때 한 번 실행

  return <div>타이머 실행 중</div>;
}

export default Timer;