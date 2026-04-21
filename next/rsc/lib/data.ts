export async function getUsers() {
  console.log('서버: 사용자 데이터 조회 시작');

  await new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });

  console.log('서버: 사용자 데이터 조회 완료');

  return [
    { id: 1, name: '김민수', role: '관리자' },
    { id: 2, name: '이서연', role: '운영자' },
    { id: 3, name: '박지훈', role: '일반사용자' },
  ];
}