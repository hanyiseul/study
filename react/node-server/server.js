const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 정적 파일 제공
app.use('/static', express.static(path.join(__dirname, 'static')));

// 루트 접속 시 React index.html 반환
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`서버 실행: http://localhost:${PORT}`);
});