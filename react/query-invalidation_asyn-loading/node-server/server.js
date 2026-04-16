const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// static 디렉토리 제공
app.use(express.static(path.join(__dirname, 'static')));

// DB 연결
const pool = mysql.createPool({
  host: 'localhost',
  user: 'testuser',
  password: '1234',
  database: 'testdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true
});

// 문의 목록 조회
app.get('/api/tickets', async function (req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM tickets ORDER BY id DESC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: '문의 목록 조회 실패' });
  }
});

// 문의 등록
app.post('/api/tickets', async function (req, res) {
  try {
    const { customer_name, title, content } = req.body;

    if (!customer_name || !title || !content) {
      return res.status(400).json({ message: '모든 항목을 입력해야 합니다.' });
    }

    if (title.length >= 100) {
      return res.status(400).json({ message: '제목은 100자 미만이어야 합니다.' });
    }

    if (title.includes('오류테스트')) {
      return res.status(500).json({ message: '강제 오류가 발생했습니다.' });
    }

    await pool.query(
      'INSERT INTO tickets (customer_name, title, content, status) VALUES (?, ?, ?, ?)',
      [customer_name, title, content, '접수대기']
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: '문의 등록 실패' });
  }
});

// React 라우팅 대응
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/*rest', function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(PORT, function () {
  console.log('server running on 3000');
});