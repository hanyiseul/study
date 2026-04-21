// Component Lifecycle
import { useEffect } from 'react';

function Timer() {
  useEffect(() => { // UI 상태를 저장하는 도구가 아니라 컴포넌트 생명주기에 따라 실행되어야 하는 side-effect를 처리하는 도구
    const id = setInterval(() => {
      console.log('동작 중');
    }, 1000);

    return () => clearInterval(id);
  }, []); // 컴포넌트가 처음 화면에 나타날 때 한 번 실행

  return <div>타이머 실행 중</div>;
}

export default Timer;