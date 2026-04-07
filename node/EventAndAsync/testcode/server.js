const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// JSON 데이터 처리를 위한 미들웨어
app.use(express.json());

// 1. [이벤트 시스템의 시작] 메인 페이지 제공
app.get('/', (req, res) => {
    // templates 폴더 안의 index.html을 읽어서 브라우저로 전송
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// 2. [실행 타이밍 시스템의 대상] 비동기 요청 API
app.get('/api/data', async (req, res) => {
    try {
        // 실제 DB 조회를 시뮬레이션하기 위해 1초의 지연 시간을 둠
        await new Promise(resolve => setTimeout(resolve, 3500));

        // throw new Error('강제 서버 오류');
        // // throw는 예외(오류)를 발생시켜 현재 실행 흐름을 즉시 중단하고, 에러 처리 영역으로 전달하는 명령어
        
        const result = {
            status: "success",
            message: "서버 시스템으로부터 데이터를 수신했습니다.",
            serverTime: new Date().toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul'
            }),
            dataList: ['이렇게 하면 데이터가 잘 전달 되나?','전달되겠지','그렇지?']
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "서버 내부 실행 오류" });
    }
});

app.listen(PORT, () => { console.log(`Server runing on:${PORT}`); });