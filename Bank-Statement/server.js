const express = require("express") // express 프레임워크
const path = require("path") // 경로를 안전하게 만들기 위한 Node.js 모듈

const accountData = require("./static/account") // db 파일 연결

const app = express() // express 서버 객체 생성

// static 폴더 제공
app.use("/static", express.static(path.join(__dirname, "static"))) // static 폴더 경로 사용

// 메인 페이지
app.get("/", (req, res) => { // '/' 요청을 보내면
    res.sendFile(path.join(__dirname, "templates", "index.html")) // index.html을 브라우저에 제공
})

// 거래내역 API
app.get("/api/account", async (req, res) => { // acount api 요청이 들어오면

    const data = await new Promise((resolve)=>{  // 0.3초 뒤에 accountData 데이터를 data 변수에 할당
        setTimeout(()=>{
            resolve(accountData)
        },300)
    })

    res.json(data) // 제공된 데이터를 json으로 변환하여 제공

})

app.listen(3000, ()=>{ // 포트 3000으로 localhost 돌리기
    console.log("server running : http://localhost:3000")
})