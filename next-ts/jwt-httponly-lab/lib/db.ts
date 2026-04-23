// mariadb 연결 풀을 만드는 파일
// 여러 연결 풀을 미리 만들어 재사용하는 구조
// db 연결 기준을 한군데로 통일
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'testuser',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'jwt_lab',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;