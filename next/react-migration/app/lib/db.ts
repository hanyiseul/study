import mysql from 'mysql2/promise'; // async/await 사용을 위한 mysql2

const pool = mysql.createPool({ // db를 여러개 연결해놓고 필요할때 꺼내쓰는 형식
  host: 'localhost',
  user: 'testuser',
  password: '1234',
  database: 'testdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true
});

export default pool; // 다른 곳에서 사용할 수 있게 함