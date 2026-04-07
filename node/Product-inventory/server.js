const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();

const pool = mysql.createPool({
    host: "localhost",
    user: "testuser",
    password: "1234",
    database: "testdb",
    // 동시에 여러 사용자가 접속할 수 있기 때문에
    // DB 연결을 매번 새로 생성하지 않고 "Connection Pool"을 사용한다. Pool로 연결하지 않으면 요청하다 새로 연결해야 한다.
    // 아래 설정들은 이 풀의 동작 방식을 제어하는 옵션이다.
    waitForConnections: true,
    // 사용 가능한 DB 연결이 모두 사용 중일 때
    // 새 요청을 즉시 실패시키지 않고 "대기 큐"에서 기다리도록 설정
    // true  → 연결이 반환될 때까지 요청을 대기
    // false → 연결이 없으면 즉시 오류 발생
    connectionLimit: 10,
    // 동시에 생성할 수 있는 최대 DB 연결 수
    // 여기서는 최대 10개의 DB 연결을 유지
    // 즉, 동시에 10개의 SQL 요청을 처리 가능
    queueLimit: 0
    // 연결이 모두 사용 중일 때 대기할 수 있는 요청 수
    // 0은 "무제한 대기"를 의미
    // 예: connectionLimit이 10이고 요청이 100개면
    //     10개는 실행, 나머지 90개는 큐에서 대기
});

// 메인 페이지
app.get("/", (req, res) => { // '/' 경로 요청이 들어오면 index.html 브라우저에 전달
    res.sendFile(path.join(__dirname, "templates", "index.html"));
});

// 상품 재고 API
app.get("/api/product", async (req, res) => { // '/api/product' API 요청 처리 (async)
    try {
         // product 테이블에서 데이터 조회 (오름차순)
        const sql = `
            SELECT id, name, category, stock, price
            FROM product
            ORDER BY id ASC
        `;

        // pool : 여러 DB 연결을 관리하는 connection pool 객체
        const [rows] = await pool.query(sql);

        res.json(rows); // 조회된 데이터를 JSON 형태로 클라이언트에 응답
    } catch (error) { // error 발생시
        console.error("DB 조회 오류:", error);
        res.status(500).json({ message: "데이터 조회 실패" });
    }
});

app.listen(3000, () => {
    console.log("server running : http://localhost:3000");
});