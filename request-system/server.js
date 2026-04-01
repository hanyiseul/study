const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'testuser',
    password: '1234',
    database: 'testdb'
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.post('/api/user2', async (req, res) => {
    const name = req.body.name;

    const sql = 'INSERT INTO users2(name) VALUES (?)';
    await pool.execute(sql, [name]);

    res.json({ message: '저장 완료' });
});

app.listen(5500);