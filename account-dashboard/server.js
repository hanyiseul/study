const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'my_super_secret_key'; // 클라이언트와 서버가 공유하는 비밀 열쇠

app.use(express.json());

// MariaDB 연결 설정
const pool = mysql.createPool({
    host: 'localhost', 
    user: 'testuser', 
    password: '1234', 
    database: 'testdb'
});

// [1] 페이지 라우팅: templates 폴더 안의 파일들을 읽어옵니다.
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'login.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'signup.html')));
app.get('/main', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'main.html')));
app.get('/a', (req, res) => res.sendFile(path.join(__dirname, 'templates', 'a.html')));

// [2] API: 회원가입 (비밀번호 암호화 후 DB 저장)
app.post('/api/signup', async (req, res) => {
    try {
        const { userId, password, userName } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        await pool.execute('INSERT INTO users (user_id, password, user_name) VALUES (?, ?, ?)', [userId, hashed, userName]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// [3] API: 로그인 (검증 성공 시 JWT 발급)
app.post('/api/login', async (req, res) => {
    try {
        const { userId, password } = req.body;
        const [rows] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [userId]);
        const user = rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            // Payload에 유저 정보를 담아 서명함
            const token = jwt.sign({ userId: user.user_id, userName: user.user_name }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false });
        }
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// [4] API: JWT 검증 (클라이언트가 보낸 토큰이 진짜인지 확인)
app.get('/api/verify', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer 문자열 떼어내기

    if (!token) return res.json({ success: false });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.json({ success: false });
        res.json({ success: true, user: decoded }); // 유효하면 해독된 유저 정보 응답
    });
});

// [5] API: 보호된 데이터 조회
app.get('/api/data', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM spending');
        res.json(rows);
    } catch (err) {
        res.status(500).json([]);
    }
});

// [5] API: 보호된 데이터 조회
app.get('/api/data2', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM income');
        res.json(rows);
    } catch (err) {
        res.status(500).json([]);
    }
});

app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));