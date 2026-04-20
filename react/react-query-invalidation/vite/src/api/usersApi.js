// 조회(Query) 함수
export async function fetchUsers() { // 목록 조회 전용 함수
  const response = await fetch('/api/users'); // 현재 접속한 서버 기준으로 get 요청 전송

  if (!response.ok) { // 서버가 200번대 상태코드를 반환하지 않았을 때 오류를 강제로 발생시키는 구문
    throw new Error('목록 조회 실패'); // react query에서 error 상태로 관리
  }

  return await response.json(); // 응답 본문을 json으로 변환하여 반환 -> uesQuery의 data에 저장
}

// 변경(Mutation) 함수
export async function createUser(name) { // 사용자 생성 전용 함수
  const response = await fetch('/api/users', { // 네트워크 응답 개체 받음
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // 서버에 json 형식 데이터가 전송된다는 사실을 명시
    },
    body: JSON.stringify({ name }) // 입력받은 문자열을 json 문자열로 바꾸어 전송하는 구문
  });

  if (!response.ok) {
    throw new Error('사용자 생성 실패');
  }

  return await response.json();
}

// 조회 후 변경 -> 변경 후 무효화 -> 무효화 후 재조회