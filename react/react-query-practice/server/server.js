const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/users', async function (req, res) {
  try {
    await new Promise(function (resolve) {
      setTimeout(resolve, 1500);
    });

    const currentTime = new Date().toLocaleTimeString('ko-KR');

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
      }
    ];

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: '사용자 목록 조회 실패'
    });
  }
});

app.listen(PORT, function () {
  console.log('Node server is running on port ' + PORT);
});