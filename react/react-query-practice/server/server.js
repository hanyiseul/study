const express = require('express'); // express 프레임워크 호출
const cors = require('cors'); // vite 개발 서버와 node 서버가 서로 다른 포트를 사용할 때 발생하는 cors 문제를 해결하기 위해 사용

const app = express(); // express 객체 생성
const PORT = 5000;

app.use(cors()); // 모든 출처의 요청을 허용
app.use(express.json()); // JSON 요청 본문 처리 설정

// 사용자 목록을 반환하는 API 엔드포인트
// react query는 이 주소로 요청을 보냄
app.get('/api/users', async function (req, res) {
  try {
    await new Promise(function (resolve) {
      setTimeout(resolve, 3000); // 1.5초 지연을 의도적으로 추가
    });

    const currentTime = new Date().toLocaleTimeString('ko-KR'); // 응답 시각을 문자열로 생성 -> 재요청이 발생하면 시간이 달라지므로, 백그라운드 재검증 이후 데이터가 실제로 교체되었는지 확인 가능

    const users = [
      {
        id: 1,
        name: '김민수',
        department: '개발팀',
        updatedAt: currentTime
      },
      {
        id: 2,
        name: '이서연',
        department: '기획팀',
        updatedAt: currentTime
      },
      {
        id: 3,
        name: '박준호',
        department: '운영팀',
        updatedAt: currentTime
      },
      {
        id: 4,
        name: '최유진',
        department: '품질관리팀',
        updatedAt: currentTime
      }
    ];

    res.json(users); // 사용자 목록을 JSON 형식으로 반환 -> React Query의 queryFn은 이 응답을 받아 캐시에 저장
    
  } catch (error) {
    res.status(500).json({ // 오류 발생 시 상태 코드와 메시지를 함꼐 전달
      message: '사용자 목록 조회 실패'
    });
  }
});

app.listen(PORT, function () {
  console.log('Node server is running on port ' + PORT);
});