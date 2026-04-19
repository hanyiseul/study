const express = require('express'); // express 프레임워크 모듈
const mysql = require('mysql2/promise'); // mysql2 (async/await) 방식으로 사용
const path = require('path'); // 파일 경로를 운영체제에 맞게 사용

const app = express(); // express 객체 생성
const PORT = 3000; // port 번호

app.use(express.json()); // JSON 요청 본문을 req.body에서 읽게 함
app.use(express.static(path.join(__dirname, 'static'))); // react build 파일 경로 

const pool = mysql.createPool({ //  db 연결 풀 생성 - 요청이 들어올 때마다 새 연결을 만들지 않고 기존 연결 재사용
  host: 'localhost',
  user: 'testuser',
  password: '1234',
  database: 'testdb',
  dateStrings: true
});

// 거래 데이터 조회 (Server State)
app.get('/api/transactions', async (req, res) => { // 리액트 쿼리 사용(useQuery가 해당 api 호출)
  try {
    // sql 실행해서 거래 데이터 조회
    const [rows] = await pool.query(`
      SELECT id, name, amount
      FROM transactions
      ORDER BY id DESC
    `);

    await new Promise((resolve) => { // 응답 2초 지연
      setTimeout(resolve, 2000);
    });

    res.json(rows); // 조회 결과 json으로 반환 -> 리액트쿼리는 이 json을 받아 캐시에 저장
  } catch (e) {
    res.status(500).json({ message: '조회 실패' });
  }
});

// React Router 대응
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/*rest', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(PORT, () => {
  console.log('server running');
});