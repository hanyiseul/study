// express 프레임워크 호출 -> 서버 생성, API라우팅, 정적 파일 제공을 담당
const express = require('express'); 
// db 모듈 호출 -> async/await 방식으로 다루기 위해 mysql2/promise를 사용
const mysql = require('mysql2/promise');
// 파일 경로를 운영체제에 맞게 안전하게 결합하기 위한 Node 내장 모듈
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json()); // Post 요청에서 JSON 요청 본문을 req.body에서 읽을 수 있게 함
app.use(express.static(path.join(__dirname, 'static'))); // React build 결과를 브라우저에 정적 파일로 제공

// db 연결 풀 생성 -> db 연결을 재사용하여 성능을 안정적으로 유지
const pool = mysql.createPool({
  host: 'localhost',
  user: 'testuser',
  password: '1234',
  database: 'testdb',
  dateStrings: true
});

// 계좌 요약 조회
app.get('/api/account', async (req, res) => {
  try {
    const [[row]] = await pool.query(`
      SELECT id, owner_name, balance
      FROM accounts
      LIMIT 1
    `);

    res.json(row);
  } catch (e) {
    res.status(500).json({ message: '계좌 조회 실패' });
  }
});

// 거래 내역 조회
app.get('/api/transactions', async (req, res) => { // React Query의 useQuery가 이 API를 호출
  try {
    const [rows] = await pool.query(`
      SELECT id, sender_name, amount, created_at
      FROM transactions
      ORDER BY id DESC
    `);

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: '거래 내역 조회 실패' });
  }
});

// 거래 등록
app.post('/api/transactions', async (req, res) => {
  try {
    const { sender_name, amount } = req.body;

    if (!sender_name || !amount) {
      return res.status(400).json({ message: '입력값이 부족합니다.' });
    }

    await pool.query(
      `INSERT INTO transactions (sender_name, amount) VALUES (?, ?)`,
      [sender_name, Number(amount)]
    );

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: '거래 등록 실패' });
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