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
    res.sendFile(path.join(__dirname, 'templates', 'transfer.html'));
});

app.post('/api/transfer', async (req, res) => {

    console.log("API 호출됨");
    console.log(req.body);

    const { from, to, amount } = req.body;
console.log("from value:", from);
console.log("type:", typeof from);
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();
        const [fromAccount] = await conn.execute(
            'SELECT balance FROM accounts2 WHERE account_number = ?',
            [from]
        );

        if (fromAccount.length === 0) {
            throw new Error('출금 계좌 없음');
        }

        if (fromAccount[0].balance < amount) {
            throw new Error('잔액 부족');
        }

        await conn.execute(
            'UPDATE accounts2 SET balance = balance - ? WHERE account_number = ?',
            [amount, from]
        );

        await conn.execute(
            'UPDATE accounts2 SET balance = balance + ? WHERE account_number = ?',
            [amount, to]
        );

        await conn.execute(
            'INSERT INTO transactions2(from_account, to_account, amount) VALUES (?, ?, ?)',
            [from, to, amount]
        );

        await conn.commit();

        res.json({ message: '이체 완료' });

    } catch (err) {
        await conn.rollback();
        res.json({ message: '이체 실패: ' + err.message });

    } finally {
        conn.release();
    }
});

app.listen(3000, () => {
    console.log("server running on 2000");
});