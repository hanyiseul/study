// 초기 관리자 계정을 넣기 위한 스크립트
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

async function seedAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'testuser',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'jwt_lab'
  });

  // 비밀번호를 그대로 저장하지 않고 해시화 하여 저장
  const passwordHash = await bcrypt.hash('1234', 10);

  await connection.execute(
    `
    INSERT INTO users (name, email, password_hash, role, status)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      password_hash = VALUES(password_hash),
      role = VALUES(role),
      status = VALUES(status)
    `,
    ['관리자', 'admin@test.com', passwordHash, 'admin', 'active']
  );

  await connection.end();
  console.log('관리자 계정 시드 완료');
}

seedAdmin().catch((error) => {
  console.error(error);
  process.exit(1);
});