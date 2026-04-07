const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'my_super_secret_key'; // 클라이언트와 서버가 공유하는 비밀 열쇠

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

// MariaDB 연결 설정
const pool = mysql.createPool({
    host: 'localhost',
    user: 'testuser',
    password: '1234',
    database: 'testdb'
});

// 계좌번호 생성 함수
function makeAccountNumber() {
    const now = Date.now().toString().slice(-8);
    const rand = Math.floor(Math.random() * 9000) + 1000;
    return `1002-${now}-${rand}`;
}

// JWT 확인 함수
function verifyToken(req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return null;

    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
}

// [1] 페이지 라우팅: templates 폴더 안의 파일들을 읽어옵니다.
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'signup.html')));
app.get('/main', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'main.html')));

// [2] API: 회원가입 (비밀번호 암호화 후 DB 저장 + 계좌 자동 생성)
app.post('/api/signup', async (req, res) => {
    let conn;
    try {
        const { userId, password, userName, role } = req.body;

        if (!userId || !password || !userName) {
            return res.status(400).json({ success: false, message: '입력값 누락' });
        }

        const userRole = role === 'admin' ? 'admin' : 'user';
        const hashed = await bcrypt.hash(password, 10);
        const accountNumber = makeAccountNumber();

        conn = await pool.getConnection();
        await conn.beginTransaction();

        await conn.execute(
            'INSERT INTO users (user_id, password, user_name, role) VALUES (?, ?, ?, ?)',
            [userId, hashed, userName, userRole]
        );

        await conn.execute(
            'INSERT INTO accounts (user_id, account_number, balance) VALUES (?, ?, ?)',
            [userId, accountNumber, 100000]
        );

        await conn.execute(
            `INSERT INTO account_transactions
            (account_number, tx_type, amount, balance_after, related_account, transfer_id, memo)
            VALUES (?, 'DEPOSIT', ?, ?, NULL, NULL, '초기입금')`,
            [accountNumber, 100000, 100000]
        );

        await conn.commit();
        res.json({ success: true, accountNumber });

    } catch (err) {
        if (conn) await conn.rollback();
        console.error(err);
        res.status(500).json({ success: false, message: '회원가입 실패' });
    } finally {
        if (conn) conn.release();
    }
});

// [3] API: 로그인 (검증 성공 시 JWT 발급)
app.post('/api/login', async (req, res) => {
    try {
        const { userId, password } = req.body;
        const [rows] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [userId]);
        const user = rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {
                    userId: user.user_id,
                    userName: user.user_name,
                    role: user.role
                },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: '로그인 실패' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '서버 오류' });
    }
});

// [4] API: JWT 검증 (클라이언트가 보낸 토큰이 진짜인지 확인)
app.get('/api/verify', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.json({ success: false });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.json({ success: false });
        res.json({ success: true, user: decoded });
    });
});

// [5] API: 보호된 데이터 조회
app.get('/api/data', async (req, res) => {
    try {
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ success: false, message: '인증 실패' });
        }

        if (decoded.role === 'admin') {
            const [users] = await pool.execute(`
                SELECT u.user_id, u.user_name, u.role, u.created_at, a.account_number, a.balance
                FROM users u
                LEFT JOIN accounts a ON u.user_id = a.user_id
                ORDER BY u.created_at DESC, a.account_number ASC
            `);

            const [transfers] = await pool.execute(`
                SELECT *
                FROM transfers
                ORDER BY transferred_at DESC
            `);

            const [transactions] = await pool.execute(`
                SELECT *
                FROM account_transactions
                ORDER BY created_at DESC, tx_id DESC
            `);

            return res.json({
                success: true,
                role: 'admin',
                users,
                transfers,
                transactions
            });
        } else {
            const [accounts] = await pool.execute(
                'SELECT * FROM accounts WHERE user_id = ? ORDER BY created_at DESC',
                [decoded.userId]
            );

            const [transactions] = await pool.execute(`
                SELECT at.*
                FROM account_transactions at
                JOIN accounts a ON at.account_number = a.account_number
                WHERE a.user_id = ?
                ORDER BY at.created_at DESC, at.tx_id DESC
            `, [decoded.userId]);

            return res.json({
                success: true,
                role: 'user',
                user: decoded,
                accounts,
                transactions
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '데이터 조회 실패' });
    }
});

// [6] API: 계좌이체
app.post('/api/transfer', async (req, res) => {
    let conn;
    try {
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ success: false, message: '인증 실패' });
        }

        if (decoded.role !== 'user') {
            return res.status(403).json({ success: false, message: '사용자만 이체 가능' });
        }

        const { fromAccountNumber, toAccountNumber, amount, memo } = req.body;
        const sendAmount = Number(amount);

        if (!fromAccountNumber || !toAccountNumber || !sendAmount) {
            return res.status(400).json({ success: false, message: '입력값 누락' });
        }

        if (fromAccountNumber === toAccountNumber) {
            return res.status(400).json({ success: false, message: '동일 계좌 이체 불가' });
        }

        if (sendAmount <= 0) {
            return res.status(400).json({ success: false, message: '금액 오류' });
        }

        conn = await pool.getConnection();
        await conn.beginTransaction();

        const [fromRows] = await conn.execute(
            'SELECT * FROM accounts WHERE account_number = ? FOR UPDATE', // 조회한 다음에 바로 수정이나 삭제할거니까 다른 프로세스 사용x
            [fromAccountNumber]
        );
        const fromAccount = fromRows[0];

        const [toRows] = await conn.execute(
            'SELECT * FROM accounts WHERE account_number = ? FOR UPDATE',
            [toAccountNumber]
        );
        const toAccount = toRows[0];

        if (!fromAccount) {
            await conn.rollback();
            return res.status(404).json({ success: false, message: '출금 계좌 없음' });
        }

        if (!toAccount) {
            await conn.rollback();
            return res.status(404).json({ success: false, message: '입금 계좌 없음' });
        }

        if (fromAccount.user_id !== decoded.userId) {
            await conn.rollback();
            return res.status(403).json({ success: false, message: '본인 계좌만 출금 가능' });
        }

        if (fromAccount.balance < sendAmount) {
            await conn.rollback();
            return res.status(400).json({ success: false, message: '잔액 부족' });
        }

        const newFromBalance = fromAccount.balance - sendAmount;
        const newToBalance = toAccount.balance + sendAmount;

        await conn.execute(
            'UPDATE accounts SET balance = ? WHERE account_number = ?',
            [newFromBalance, fromAccountNumber]
        );

        await conn.execute(
            'UPDATE accounts SET balance = ? WHERE account_number = ?',
            [newToBalance, toAccountNumber]
        );

        const [transferResult] = await conn.execute(`
            INSERT INTO transfers
            (from_account_number, to_account_number, sender_user_id, receiver_user_id, amount, transfer_memo)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [
            fromAccountNumber,
            toAccountNumber,
            fromAccount.user_id,
            toAccount.user_id,
            sendAmount,
            memo || ''
        ]);

        const transferId = transferResult.insertId;

        await conn.execute(`
            INSERT INTO account_transactions
            (account_number, tx_type, amount, balance_after, related_account, transfer_id, memo)
            VALUES (?, 'TRANSFER_OUT', ?, ?, ?, ?, ?)
        `, [
            fromAccountNumber,
            sendAmount,
            newFromBalance,
            toAccountNumber,
            transferId,
            memo || ''
        ]);

        await conn.execute(`
            INSERT INTO account_transactions
            (account_number, tx_type, amount, balance_after, related_account, transfer_id, memo)
            VALUES (?, 'TRANSFER_IN', ?, ?, ?, ?, ?)
        `, [
            toAccountNumber,
            sendAmount,
            newToBalance,
            fromAccountNumber,
            transferId,
            memo || ''
        ]);

        await conn.commit();
        res.json({ success: true, message: '이체 완료' });

    } catch (err) {
        if (conn) await conn.rollback();
        console.error(err);
        res.status(500).json({ success: false, message: '이체 실패' });
    } finally {
        if (conn) conn.release();
    }
});

// [7] API: 관리자 - 사용자 강제 추가
app.post('/api/admin/add-user', async (req, res) => {
    let conn;
    try {
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ success: false, message: '인증 실패' });
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: '관리자만 가능' });
        }

        const { userId, password, userName, role } = req.body;

        if (!userId || !password || !userName) {
            return res.status(400).json({ success: false, message: '입력값 누락' });
        }

        const userRole = role === 'admin' ? 'admin' : 'user';
        const hashed = await bcrypt.hash(password, 10);

        conn = await pool.getConnection();
        await conn.beginTransaction();

        await conn.execute(
            'INSERT INTO users (user_id, password, user_name, role) VALUES (?, ?, ?, ?)',
            [userId, hashed, userName, userRole]
        );

        await conn.commit();
        res.json({ success: true, message: '사용자 추가 완료' });

    } catch (err) {
        if (conn) await conn.rollback();
        console.error(err);
        res.status(500).json({ success: false, message: '사용자 추가 실패' });
    } finally {
        if (conn) conn.release();
    }
});

// [8] API: 관리자 - 계좌 강제 추가
app.post('/api/admin/add-account', async (req, res) => {
    let conn;
    try {
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ success: false, message: '인증 실패' });
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: '관리자만 가능' });
        }

        const { userId, accountNumber, balance } = req.body;
        const firstBalance = Number(balance) || 0;

        if (!userId || !accountNumber) {
            return res.status(400).json({ success: false, message: '입력값 누락' });
        }

        conn = await pool.getConnection();
        await conn.beginTransaction();

        const [userRows] = await conn.execute(
            'SELECT * FROM users WHERE user_id = ?',
            [userId]
        );

        if (userRows.length === 0) {
            await conn.rollback();
            return res.status(404).json({ success: false, message: '사용자 없음' });
        }

        await conn.execute(
            'INSERT INTO accounts (user_id, account_number, balance) VALUES (?, ?, ?)',
            [userId, accountNumber, firstBalance]
        );

        await conn.execute(`
            INSERT INTO account_transactions
            (account_number, tx_type, amount, balance_after, related_account, transfer_id, memo)
            VALUES (?, 'DEPOSIT', ?, ?, NULL, NULL, '관리자 강제 계좌 생성')
        `, [accountNumber, firstBalance, firstBalance]);

        await conn.commit();
        res.json({ success: true, message: '계좌 추가 완료' });

    } catch (err) {
        if (conn) await conn.rollback();
        console.error(err);
        res.status(500).json({ success: false, message: '계좌 추가 실패' });
    } finally {
        if (conn) conn.release();
    }
});

// [9] API: 관리자 - 사용자 비밀번호 수정
app.post('/api/admin/reset-password', async (req, res) => {
    let conn;
    try {
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ success: false, message: '인증 실패' });
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: '관리자만 가능' });
        }

        const { userId, newPassword } = req.body;

        if (!userId || !newPassword) {
            return res.status(400).json({ success: false, message: '입력값 누락' });
        }

        const hashed = await bcrypt.hash(newPassword, 10);

        conn = await pool.getConnection();
        await conn.beginTransaction();

        const [rows] = await conn.execute(
            'SELECT * FROM users WHERE user_id = ?',
            [userId]
        );

        if (rows.length === 0) {
            await conn.rollback();
            return res.status(404).json({ success: false, message: '사용자 없음' });
        }

        await conn.execute(
            'UPDATE users SET password = ? WHERE user_id = ?',
            [hashed, userId]
        );

        await conn.commit();

        res.json({ success: true, message: '비밀번호 수정 완료' });

    } catch (err) {
        if (conn) await conn.rollback();
        console.error(err);
        res.status(500).json({ success: false, message: '비밀번호 수정 실패' });
    } finally {
        if (conn) conn.release();
    }
});

app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));