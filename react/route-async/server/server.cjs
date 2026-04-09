const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

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

app.get('/api/dashboard/summary', async function (req, res) {
  const [rows] = await pool.query(`
    SELECT
      COUNT(*) AS totalCount,
      SUM(CASE WHEN status = '접수대기' THEN 1 ELSE 0 END) AS waitingCount,
      SUM(CASE WHEN status = '처리중' THEN 1 ELSE 0 END) AS workingCount,
      SUM(CASE WHEN status = '처리완료' THEN 1 ELSE 0 END) AS doneCount
    FROM support_tickets
  `);

  res.json(rows[0]);
});

app.get('/api/tickets', async function (req, res) {
  const keyword = req.query.keyword || '';
  const status = req.query.status || '';

  let sql = `
    SELECT
      id,
      customer_name,
      title,
      content,
      status,
      DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at
    FROM support_tickets
    WHERE 1 = 1
  `;

  const params = [];

  if (keyword !== '') {
    sql += ' AND (customer_name LIKE ? OR title LIKE ?)';
    params.push('%' + keyword + '%');
    params.push('%' + keyword + '%');
  }

  if (status !== '') {
    sql += ' AND status = ?';
    params.push(status);
  }

  sql += ' ORDER BY id DESC';

  const [rows] = await pool.query(sql, params);
  res.json(rows);
});

app.post('/api/tickets', async function (req, res) {
  const customer_name = req.body.customer_name;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;

  await pool.execute(
    `
    INSERT INTO support_tickets (customer_name, title, content, status)
    VALUES (?, ?, ?, ?)
    `,
    [customer_name, title, content, status]
  );

  res.json({ success: true });
});

app.put('/api/tickets/:id', async function (req, res) {
  const id = req.params.id;
  const customer_name = req.body.customer_name;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;

  await pool.execute(
    `
    UPDATE support_tickets
    SET customer_name = ?, title = ?, content = ?, status = ?
    WHERE id = ?
    `,
    [customer_name, title, content, status, id]
  );

  res.json({ success: true });
});

app.delete('/api/tickets/:id', async function (req, res) {
  const id = req.params.id;

  await pool.execute(
    `
    DELETE FROM support_tickets
    WHERE id = ?
    `,
    [id]
  );

  res.json({ success: true });
});

app.get('/api/reports/status', async function (req, res) {
  const [rows] = await pool.query(`
    SELECT status, COUNT(*) AS count
    FROM support_tickets
    GROUP BY status
    ORDER BY count DESC
  `);

  res.json(rows);
});

// 루트 경로("/")로 접속했을 때 React 앱의 진입 파일(index.html)을 내려줌
// 즉, 처음 사이트 접속 시 React 앱을 띄우는 역할
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// React Router 대응용 라우트
// /tickets, /dashboard 같은 프론트 라우팅 URL을 직접 접근하면
// 서버에는 해당 경로가 없기 때문에 404가 발생함
// 이를 방지하기 위해 모든 경로를 index.html로 보내서
// React Router가 클라이언트에서 라우팅을 처리하도록 함
app.get('/*rest', function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});



app.listen(PORT, function () {
  console.log('서버 실행: http://localhost:' + PORT);
});