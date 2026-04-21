const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'testuser',
  password: '1234',
  database: 'testdb',
  dateStrings: true
});

// 거래 데이터 조회 (Server State)
app.get('/api/transactions', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, name, amount
      FROM transactions
      ORDER BY id DESC
    `);

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    res.json(rows);
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