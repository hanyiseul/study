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
  database: 'testdb'
});

// 거래 조회
app.get('/api/transfers', async function (req, res) {
  const [rows] = await pool.query(
    'SELECT * FROM transfers ORDER BY id DESC'
  );
  res.json(rows);
});

// 거래 등록 (Mutation)
app.post('/api/transfers', async function (req, res) {
  const { sender_name, receiver_name, amount, transfer_type } = req.body;

  if (amount >= 1000000) {
    return res.status(500).json({ message: '거래 실패' });
  }

  await pool.query(
    'INSERT INTO transfers (sender_name, receiver_name, amount, transfer_type, status) VALUES (?, ?, ?, ?, ?)',
    [sender_name, receiver_name, amount, transfer_type, '완료']
  );

  res.json({ success: true });
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