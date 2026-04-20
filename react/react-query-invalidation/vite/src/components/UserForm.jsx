import { useState } from 'react';

function UserForm({ onAdd, isPending }) {
  const [name, setName] = useState(''); // 현재 입력 중인 이름을 저장하는 상태

  function handleSubmit(event) { // 폼 제출 시 실행
    event.preventDefault(); // 기본 폼 제출 동작 방지

    const trimmedName = name.trim(); // 앞뒤 공백을 제거한 값을 새 변수에 저장 -> 사용자가 공백만 입력한 경우를 걸러내기 위한 전처리

    if (!trimmedName) { // 이름이 비어있으면 아무 동작 하지 않고 종료
      return; // 서버에 빈 문자열을 보내지 않기 위한 최소 검증
    }
    
    // 상위 컴포넌트가 전달한 함수 실행 
    onAdd(trimmedName); // 현재 입력값을 App으로 올려 보내고, App은 그 값을 mutation.mutate()에 연결
    setName(''); // 제출 후 입력 초기화
  }

  return (
    <form onSubmit={handleSubmit} className="form-row">
      <input
        className="input-box"
        type="text"
        value={name}
        onChange={function (e) {
          setName(e.target.value);
        }}
        placeholder="추가할 사용자 이름 입력"
      />
      <button type="submit" className="action-button" disabled={isPending}>
        사용자 추가
      </button>
    </form>
  );
}

export default UserForm;