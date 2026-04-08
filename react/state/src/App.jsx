import { useState } from 'react';

function App() {
  /**
   * 이벤트가 생길 경우 state로 상태값 관리
   *   - onChange, onClick 등 사용자에 의한 이벤트 발생시 상태 변경 관리 변수에 변화값을 담아서 관리
   *   - 상태를 저장한 변수를 직접 수정할 수 없기 때문에 상태 변경 함수로 상태를 업데이트
   *   - 상태 변경시 컴포넌트 렌더링 후 변경된 부분만 실제 dom에 반영하여 변경
  */

  // 상태변수와 상태변수를 제어하는 변수 정의 (배열 구조 분해 할당)
  const [keyword, setKeyword] = useState(''); // 상태 기본값 ''
  const [loading, setLoading] = useState(false); // 상태 기본값 false
  const [list, setList] = useState([]); // 상태 기본값 [](빈배열)

  return (
    <div>
      {/* input에 변화가(입력이) 생길 경우 setKeyword에 input value값 저장 */}
      <input onChange={e => setKeyword(e.target.value)} placeholder="검색어" /> 
      {/* button 클릭시 setLoading에 저장된 상태값 변경 false일시 true로 (그 반대도 가능) */}
      <button onClick={() => setLoading(!loading)}>로딩 변경</button>
      {/* setKeyword에 저장되어있는 keyword 값 출력 */}
      <p>검색어: {keyword}</p>
      {/* loading이 true일 경우 로딩중 아니면 대기 */}
      <p>로딩 상태: {loading ? '로딩 중' : '대기'}</p>
      {/* list(배열)의 길이값 출력 */}
      <p>목록 길이: {list.length}</p>
    </div>
  );
}

export default App;