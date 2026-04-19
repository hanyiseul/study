const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

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
app.get('/api/transactions', async (req, res) => {
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