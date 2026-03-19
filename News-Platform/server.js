const express = require("express"); // express 모듈
const path = require("path") // 경로 모듈
const mysql = require("mysql2/promise"); // sql 모듈

const app = express();
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

// 서버 실행
app.listen(5000, () => {
    console.log("server running : http://localhost:5000");
});