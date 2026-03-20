const express = require("express"); // express 모듈
const path = require("path") // 경로 모듈
const mysql = require("mysql2/promise"); // sql 모듈
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const JWT_SECRET = 'my_super_secret_key';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static 폴더 경로 설정
app.use("/static", express.static(path.join(__dirname, "static")));

// db 설정
const pool = mysql.createPool({
  host: "localhost",
  user: "testuser",
  password: "1234",
  database: "testdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 메인 페이지
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "templates", "index.html"));
});
app.get("/edit", (_, res) => {
  res.sendFile(path.join(__dirname, "templates", "edit.html"));
});
app.get("/detail/:id", (req,res)=>{
  res.sendFile(path.join(__dirname,"templates","detail.html"));
});
app.get("/signup", (req,res)=>{
  res.sendFile(path.join(__dirname,"templates","signup.html"));
});
app.get("/login", (req,res)=>{
  res.sendFile(path.join(__dirname,"templates","login.html"));
});
app.get("/dashboard", (req,res)=>{
  res.sendFile(path.join(__dirname,"templates","dashboard.html"));
});


// 메뉴 조회 api
app.get("/api/category", async(_, res) => {
  const sql = `
    select distinct category
    from news
  `;
  const [rows] = await pool.query(sql);

  res.json(rows);
});


// 뉴스 조회 api
app.get("/api/news", async(_, res) => {
  try {
    let sql = `
      select id, title, category, content, author
      from news
      order by id desc;
    `;
    const [rows] = await pool.query(sql);

    res.json(rows); // 조회된 데이터를 JSON 형태로 클라이언트에 응답
    } catch (error) { // error 발생시
      console.error("DB 조회 오류:", error);
      res.status(500).json({ message: "데이터 조회 실패" });
    }
});

// it 뉴스 조회 api
app.get("/api/ecoNews", async(_, res) => {
  try {
    const sql = `
      select id, title, category, content, author
      from news
      where category = '경제'
      order by id desc;
    `;
     const [rows] = await pool.query(sql);

    res.json(rows); // 조회된 데이터를 JSON 형태로 클라이언트에 응답
    } catch (error) { // error 발생시
      console.error("DB 조회 오류:", error);
      res.status(500).json({ message: "데이터 조회 실패" });
    }
});

// it 뉴스 조회 api
app.get("/api/itNews", async(_, res) => {
  try {
    const sql = `
      select id, title, category, content, author
      from news
      where category = 'IT'
      order by id desc;
    `;
     const [rows] = await pool.query(sql);

    res.json(rows); // 조회된 데이터를 JSON 형태로 클라이언트에 응답
    } catch (error) { // error 발생시
      console.error("DB 조회 오류:", error);
      res.status(500).json({ message: "데이터 조회 실패" });
    }
});

// 기사 등록 api
app.post("/api/edit", async (req, res) => {
  try {

    const { title, category, author, content } = req.body;

    const sql = `
      insert into news (title, category, content, author)
      values (?, ?, ?, ?)
    `;

    await pool.query(sql, [
      title,
      category,
      content,
      author
    ]);

    res.json({ message: "등록 완료" });

  } catch (err) {
    console.error("기사 등록 오류:", err);
    res.status(500).json({ message: "저장 실패" });
  }
});


// 기사 상세 api
app.get("/api/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
      select id, title, category, content, author
      from news
      where id = ?;
    `;
    const [rows] = await pool.query(sql, [id]);

    res.json(rows[0]); // 해당 데이터 1개만 반환

  } catch (err) {
    console.error("기사 등록 오류:", err);
    res.status(500).json({ message: "저장 실패" });
  }
});

// 회원가입
app.post("/api/signup", async (req, res) => {
  try {
    const { Authorization, userId, password, userName } = req.body;
    const hashed = await bcrypt.hash(password, 10); 
    await pool.execute('INSERT INTO member (Authorization, user_id, password, user_name) VALUES (?, ?, ?, ?)', [Authorization, userId, hashed, userName]);
    res.json({ success: true });

  } catch (err) {
    res.status(500).json({success: false});
  }
});

// 로그인
app.post('/api/login', async (req, res) => {
    try {
      const { userId, password } = req.body;
      const [rows] = await pool.execute('SELECT * FROM member WHERE user_id = ?', [userId]);
      const user = rows[0]; // 조회된 목록 중 첫번째 사용자 꺼냄 (로그인시 1명만 조회되기 때문에)

      // bcrypt.compare(입력비밀번호, DB해시비밀번호) 비밀번호 비교 함수
      // payload -> secret key로 서명 -> JWT 토큰 생성 -> secret key로 검증
      if (user && await bcrypt.compare(password, user.password)) { // user가 존재 하고 비밀번호 비교가 가능하다면
        // Payload에 유저 정보를 담아 서명함 - payload에 들어갈 데이터 : { userId: user.user_id, userName: user.user_name } (나중에 토큰 검증할 때 꺼낼 수 있음)
        // jwt.sign() :  JWT 토큰을 생성하는 코드
        // JWT_SECRET : 토큰 서명용 비밀키
        // { expiresIn: '1h' } : 토큰 만료시간 : '1시간'
        const token = jwt.sign({ role: user.Authorization, userId: user.user_id, userName: user.user_name }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token });
      } else {
        res.status(401).json({ success: false });
      }
  } catch (err) {
      res.status(500).json({ success: false });
  }
});

// JWT 검증
app.get('/api/verify', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer 문자열 떼어내기

    if (!token) return res.json({ success: false });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.json({ success: false });
        res.json({ success: true, user: decoded }); // 유효하면 해독된 유저 정보 응답
    });
});

// 계정 조회
app.get('/api/data', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM member');
        res.json(rows);
    } catch (err) {
        res.status(500).json([]);
    }
});

// 데이터 조회
app.post('/api/userDelete', async (req, res) => {
  try {
    const { userId } = req.body;
    const [rows] = await pool.execute('DELETE FROM member WHERE user_id = ?', [userId]);
    res.json(rows);
  } catch (err) {
      res.status(500).json({ success: false });
  }
});

app.get('/api/newsList', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM news');
        res.json(rows);
    } catch (err) {
        res.status(500).json([]);
    }
});

// 서버 실행
app.listen(5000, () => {
    console.log("server running : http://localhost:5000");
});