import { useReducer, useState } from 'react';

// 여러 상태를 관리하는 함수
function reducer(state, action) {
  switch (action.type) {
    case 'ADD': // 상태가 추가일 시
      return [...state, action.payload]; // 상태를 배열로 반환
    case 'REMOVE': // 삭제일시
      return state.filter((_, i) => i !== action.payload); //해당 값이 일치하지 않은 것만 새 배열로 반환
    default:
      return state;
  }
}

function App() {
  const [text, setText] = useState('');
  //복잡한 상태 변경 로직을 하나의 함수로 모아서 관리하는 Hook
  const [list, dispatch] = useReducer(reducer, []); // 여러 상태를 관리하는 reducer를 hook으로 관리, 초기값 빈배열

  return (
    <div>
      {/* input에 입력값이 발생하면 값을 setText에 저장 */}
      <input onChange={e => setText(e.target.value)} value={text} />
      {/* 버튼 클릭시 reducer 함수 실행 */}
      {/* add 타입과 text를 페이로드로 함수 실행 , 클릭시 setText 초기화 */}
      <button
        onClick={() => {
          dispatch({ type: 'ADD', payload: text });
          setText('');
        }}
      >
        추가
      </button>
      
      {/* 배열을 map으로 순회 */}
      {list.map((item, i) => (
        // map 순서를 key값으로 저장
        <div key={i}>
          {/* list의 item 값 출력 */}
          <span>{item}</span>
          {/* 버튼 클릭시 reducer 함수 실행 */}
          {/* remove 타입과 배열의 인덱스값을 페이로드 */}
          <button onClick={() => dispatch({ type: 'REMOVE', payload: i })}>
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;