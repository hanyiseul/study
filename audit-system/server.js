const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

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

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'templates', 'transfer.html'));
});

app.get('/audit', function (req, res) {
    res.sendFile(path.join(__dirname, 'templates', 'audit.html'));
});

app.get('/api/audit', async function (req, res) {
    try {
        const sql = `
            SELECT id, user_id, action_type, from_account, to_account, amount, status, error_message, created_at
            FROM audit_logs3
            ORDER BY id DESC
        `;
        const [rows] = await pool.execute(sql);
        res.json(rows);
    } catch (err) {
        res.json([]);
    }
});

app.post('/api/transfer', async function (req, res) {
    const user_id = req.body.user_id;
    const from = req.body.from;
    const to = req.body.to;
    const amount = Number(req.body.amount);

    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        await conn.execute(
            `INSERT INTO audit_logs3 (user_id, action_type, from_account, to_account, amount, status, error_message)
             VALUES (?, 'TRANSFER_REQUEST', ?, ?, ?, 'START', NULL)`,
            [user_id, from, to, amount]
        );

        const [fromRows] = await conn.execute(
            'SELECT balance FROM accounts3 WHERE account_number = ?',
            [from]
        );

        if (fromRows.length === 0) {
            throw new Error('출금 계좌 없음');
        }

        const [toRows] = await conn.execute(
            'SELECT balance FROM accounts3 WHERE account_number = ?',
            [to]
        );

        if (toRows.length === 0) {
            throw new Error('입금 계좌 없음');
        }

        if (amount <= 0) {
            throw new Error('이체 금액 오류');
        }

        if (fromRows[0].balance < amount) {
            throw new Error('잔액 부족');
        }

        await conn.execute(
            'UPDATE accounts3 SET balance = balance - ? WHERE account_number = ?',
            [amount, from]
        );

        await conn.execute(
            'UPDATE accounts3 SET balance = balance + ? WHERE account_number = ?',
            [amount, to]
        );

        await conn.execute(
            `INSERT INTO transactions3 (from_account, to_account, amount)
             VALUES (?, ?, ?)`,
            [from, to, amount]
        );

        await conn.execute(
            `INSERT INTO audit_logs3 (user_id, action_type, from_account, to_account, amount, status, error_message)
             VALUES (?, 'TRANSFER_RESULT', ?, ?, ?, 'SUCCESS', NULL)`,
            [user_id, from, to, amount]
        );

        await conn.commit();

        res.json({ success: true, message: '이체 완료' });
    } catch (err) {
        await conn.rollback();

        try {
            await pool.execute(
                `INSERT INTO audit_logs3 (user_id, action_type, from_account, to_account, amount, status, error_message)
                 VALUES (?, 'TRANSFER_RESULT', ?, ?, ?, 'FAIL', ?)`,
                [user_id, from, to, amount, err.message]
            );
        } catch (logErr) {
        }

        res.json({ success: false, message: '이체 실패: ' + err.message });
    } finally {
        conn.release();
    }
});

app.listen(3100, function () {
    console.log('실행: http://localhost:3100');
});