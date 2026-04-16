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

// 상품 목록 조회
app.get('/api/products', async function (req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM products ORDER BY id DESC'
    );

    await new Promise(function (resolve) {
      setTimeout(resolve, 2000);
    });

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: '상품 목록 조회 실패' });
  }
});

// 상품 등록
app.post('/api/products', async function (req, res) {
  try {
    const { product_name, category, price, risk_level } = req.body;

    if (!product_name || !category || !price || !risk_level) {
      return res.status(400).json({ message: '모든 항목을 입력해야 합니다.' });
    }

    await pool.query(
      'INSERT INTO products (product_name, category, price, risk_level) VALUES (?, ?, ?, ?)',
      [product_name, category, price, risk_level]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: '상품 등록 실패' });
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