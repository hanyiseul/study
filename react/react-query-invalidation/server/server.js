const express = require('express');
const path = require('path');

const app = express();
const PORT = 5100;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

// 현재 서버 메모리에 저장되는 사용자 목록
let users = [
  { id: 1, name: '김민수' },
  { id: 2, name: '이서연' }
];

app.get('/api/users', function (req, res) { // 사용자 목록 조회 api
  res.json(users);
});

app.post('/api/users', function (req, res) { // 사용자 추가 api
  const newUser = {
    id: Date.now(), // 간단한 고유 id 생성용
    name: req.body.name // 클라이언트가 보낸 사용자 이름이 들어감
  };

  users.push(newUser); // 배열에 세 데이터 추가

  res.json(newUser); // 저장된 데이터 반환
});

app.get('/*rest', function (req, res) { // spa 대응 라우팅
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(PORT, function () {
  console.log('server running on port ' + PORT);
});