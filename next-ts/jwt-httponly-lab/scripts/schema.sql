CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY, -- 사용자 고유 번호
  name VARCHAR(100) NOT NULL, -- 사용자 이름
  email VARCHAR(191) NOT NULL UNIQUE, -- 로그인용 이메일
  password_hash VARCHAR(255) NOT NULL, -- 해시된 비밀번호 저장 컬럼
  role ENUM('user', 'admin') NOT NULL DEFAULT 'user', -- user 또는 admin이며 권한 구분에 사용
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active', -- 계정 활성 여부
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 비활성 계정 로그인
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- 생성 및 수정 시각
);