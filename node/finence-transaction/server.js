const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'my_super_secret_key';

app.use(express.json());

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

function addMonths(date, months) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
}

function formatDateTime(date) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function todayString() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// 페이지 라우팅
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'signup.html')));
app.get('/main', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'main.html')));
app.get('/user', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'user.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'admin.html')));

// 회원가입
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

        await conn.execute(
            `INSERT INTO transfer_limits
            (user_id, daily_limit, per_transfer_limit, used_today, last_reset_date)
            VALUES (?, 1000000, 500000, 0, ?)`,
            [userId, todayString()]
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

// 로그인
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

// JWT 검증
app.get('/api/verify', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.json({ success: false });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.json({ success: false });
        res.json({ success: true, user: decoded });
    });
});

// 보호 데이터 조회
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

            const [products] = await pool.execute(`
                SELECT *
                FROM savings_products
                ORDER BY created_at DESC, product_id DESC
            `);

            const [limits] = await pool.execute(`
                SELECT tl.user_id, u.user_name, tl.daily_limit, tl.per_transfer_limit, tl.used_today, tl.last_reset_date, tl.updated_at
                FROM transfer_limits tl
                JOIN users u ON tl.user_id = u.user_id
                ORDER BY tl.updated_at DESC, tl.user_id ASC
            `);

            return res.json({
                success: true,
                role: 'admin',
                users,
                transfers,
                transactions,
                products,
                limits
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

            const [products] = await pool.execute(`
                SELECT *
                FROM savings_products
                WHERE status = 'ON'
                ORDER BY created_at DESC, product_id DESC
            `);

            const [mySavings] = await pool.execute(`
                SELECT us.savings_id, us.account_number, us.join_amount, us.monthly_amount, us.maturity_date, us.status, us.created_at,
                       sp.product_name, sp.product_type, sp.interest_rate, sp.period_months
                FROM user_savings us
                JOIN savings_products sp ON us.product_id = sp.product_id
                WHERE us.user_id = ?
                ORDER BY us.created_at DESC, us.savings_id DESC
            `, [decoded.userId]);

            const [limitRows] = await pool.execute(`
                SELECT *
                FROM transfer_limits
                WHERE user_id = ?
            `, [decoded.userId]);

            return res.json({
                success: true,
                role: 'user',
                user: decoded,
                accounts,
                transactions,
                products,
                mySavings,
                transferLimit: limitRows[0] || null
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '데이터 조회 실패' });
    }
});

// 계좌이체
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

        const [limitRows] = await conn.execute(
            'SELECT * FROM transfer_limits WHERE user_id = ? FOR UPDATE',
            [decoded.userId]
        );

        if (limitRows.length === 0) {
            await conn.execute(
                `INSERT INTO transfer_limits (user_id, daily_limit, per_transfer_limit, used_today, last_reset_date)
                 VALUES (?, 1000000, 500000, 0, ?)`,
                [decoded.userId, todayString()]
            );
        }

        const [limitRows2] = await conn.execute(
            'SELECT * FROM transfer_limits WHERE user_id = ? FOR UPDATE',
            [decoded.userId]
        );

        const limitInfo = limitRows2[0];
        const today = todayString();
        let usedToday = Number(limitInfo.used_today);

        if (String(limitInfo.last_reset_date) !== today) {
            usedToday = 0;
            await conn.execute(
                'UPDATE transfer_limits SET used_today = 0, last_reset_date = ? WHERE user_id = ?',
                [today, decoded.userId]
            );
        }

        if (sendAmount > Number(limitInfo.per_transfer_limit)) {
            await conn.rollback();
            return res.status(400).json({ success: false, message: '1회 이체 한도 초과' });
        }

        if ((usedToday + sendAmount) > Number(limitInfo.daily_limit)) {
            await conn.rollback();
            return res.status(400).json({ success: false, message: '1일 이체 한도 초과' });
        }

        const [fromRows] = await conn.execute(
            'SELECT * FROM accounts WHERE account_number = ? FOR UPDATE',
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

        await conn.execute(
            'UPDATE transfer_limits SET used_today = used_today + ? WHERE user_id = ?',
            [sendAmount, decoded.userId]
        );

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

// 관리자 - 사용자 추가
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

        await conn.execute(
            `INSERT INTO transfer_limits
            (user_id, daily_limit, per_transfer_limit, used_today, last_reset_date)
            VALUES (?, 1000000, 500000, 0, ?)`,
            [userId, todayString()]
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

// 관리자 - 계좌 추가
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

// 관리자 - 비밀번호 초기화
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

// 사용자 - 예금적금 가입
app.post('/api/savings/join', async (req, res) => {
    let conn;
    try {
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ success: false, message: '인증 실패' });
        }

        if (decoded.role !== 'user') {
            return res.status(403).json({ success: false, message: '사용자만 가능' });
        }

        const { accountNumber, productId, joinAmount, monthlyAmount } = req.body;
        const inputJoinAmount = Number(joinAmount) || 0;
        const inputMonthlyAmount = Number(monthlyAmount) || 0;

        if (!accountNumber || !productId) {
            return res.status(400).json({ success: false, message: '입력값 누락' });
        }

        conn = await pool.getConnection();
        await conn.beginTransaction();

        const [accountRows] = await conn.execute(
            'SELECT * FROM accounts WHERE account_number = ? FOR UPDATE',
            [accountNumber]
        );
        const account = accountRows[0];

        if (!account) {
            await conn.rollback();
            return res.status(404).json({ success: false, message: '계좌 없음' });
        }

        if (account.user_id !== decoded.userId) {
            await conn.rollback();
            return res.status(403).json({ success: false, message: '본인 계좌만 사용 가능' });
        }

        const [productRows] = await conn.execute(
            `SELECT * FROM savings_products WHERE product_id = ? AND status = 'ON'`,
            [productId]
        );
        const product = productRows[0];

        if (!product) {
            await conn.rollback();
            return res.status(404).json({ success: false, message: '상품 없음' });
        }

        let firstWithdrawAmount = 0;

        if (product.product_type === 'DEPOSIT') {
            if (inputJoinAmount < Number(product.min_amount)) {
                await conn.rollback();
                return res.status(400).json({ success: false, message: '최소 가입금액 미만' });
            }
            firstWithdrawAmount = inputJoinAmount;
        } else {
            if (inputMonthlyAmount < Number(product.min_amount)) {
                await conn.rollback();
                return res.status(400).json({ success: false, message: '최소 월납입금 미만' });
            }
            firstWithdrawAmount = inputMonthlyAmount;
        }

        if (Number(account.balance) < firstWithdrawAmount) {
            await conn.rollback();
            return res.status(400).json({ success: false, message: '잔액 부족' });
        }

        const newBalance = Number(account.balance) - firstWithdrawAmount;
        const maturityDate = formatDateTime(addMonths(new Date(), Number(product.period_months)));

        await conn.execute(
            'UPDATE accounts SET balance = ? WHERE account_number = ?',
            [newBalance, accountNumber]
        );

        const [joinResult] = await conn.execute(`
            INSERT INTO user_savings
            (user_id, account_number, product_id, join_amount, monthly_amount, maturity_date, status)
            VALUES (?, ?, ?, ?, ?, ?, 'ACTIVE')
        `, [
            decoded.userId,
            accountNumber,
            product.product_id,
            product.product_type === 'DEPOSIT' ? firstWithdrawAmount : 0,
            product.product_type === 'INSTALLMENT' ? firstWithdrawAmount : 0,
            maturityDate
        ]);

        await conn.execute(`
            INSERT INTO account_transactions
            (account_number, tx_type, amount, balance_after, related_account, transfer_id, memo)
            VALUES (?, 'WITHDRAW', ?, ?, NULL, NULL, ?)
        `, [
            accountNumber,
            firstWithdrawAmount,
            newBalance,
            `${product.product_name} 가입`
        ]);

        await conn.commit();
        res.json({ success: true, message: '상품 가입 완료', savingsId: joinResult.insertId });

    } catch (err) {
        if (conn) await conn.rollback();
        console.error(err);
        res.status(500).json({ success: false, message: '상품 가입 실패' });
    } finally {
        if (conn) conn.release();
    }
});

// 관리자 - 상품 추가
app.post('/api/admin/add-product', async (req, res) => {
    try {
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ success: false, message: '인증 실패' });
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: '관리자만 가능' });
        }

        const { productName, productType, interestRate, periodMonths, minAmount } = req.body;

        if (!productName || !productType || !interestRate || !periodMonths || minAmount === undefined) {
            return res.status(400).json({ success: false, message: '입력값 누락' });
        }

        if (!['DEPOSIT', 'INSTALLMENT'].includes(productType)) {
            return res.status(400).json({ success: false, message: '상품 유형 오류' });
        }

        await pool.execute(`
            INSERT INTO savings_products
            (product_name, product_type, interest_rate, period_months, min_amount, status)
            VALUES (?, ?, ?, ?, ?, 'ON')
        `, [
            productName,
            productType,
            Number(interestRate),
            Number(periodMonths),
            Number(minAmount)
        ]);

        res.json({ success: true, message: '상품 추가 완료' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '상품 추가 실패' });
    }
});

// 관리자 - 이체한도 설정
app.post('/api/admin/set-transfer-limit', async (req, res) => {
    try {
        const decoded = verifyToken(req);
        if (!decoded) {
            return res.status(401).json({ success: false, message: '인증 실패' });
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: '관리자만 가능' });
        }

        const { userId, dailyLimit, perTransferLimit } = req.body;

        if (!userId || !dailyLimit || !perTransferLimit) {
            return res.status(400).json({ success: false, message: '입력값 누락' });
        }

        const [rows] = await pool.execute(
            'SELECT * FROM transfer_limits WHERE user_id = ?',
            [userId]
        );

        if (rows.length === 0) {
            await pool.execute(`
                INSERT INTO transfer_limits
                (user_id, daily_limit, per_transfer_limit, used_today, last_reset_date)
                VALUES (?, ?, ?, 0, ?)
            `, [
                userId,
                Number(dailyLimit),
                Number(perTransferLimit),
                todayString()
            ]);
        } else {
            await pool.execute(`
                UPDATE transfer_limits
                SET daily_limit = ?, per_transfer_limit = ?
                WHERE user_id = ?
            `, [
                Number(dailyLimit),
                Number(perTransferLimit),
                userId
            ]);
        }

        res.json({ success: true, message: '이체 한도 설정 완료' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: '이체 한도 설정 실패' });
    }
});

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});