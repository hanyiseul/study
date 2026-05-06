-- 🔥 FK 무시하고 초기화
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS account_transactions;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;


-- =========================
-- 1️⃣ users
-- =========================
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- =========================
-- 2️⃣ accounts
-- =========================
CREATE TABLE accounts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  account_number VARCHAR(30) NOT NULL UNIQUE,
  account_name VARCHAR(100) NOT NULL,
  balance DECIMAL(15,2) DEFAULT 0.00,
  status ENUM('active', 'closed') DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_accounts_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);


-- =========================
-- 3️⃣ transactions
-- =========================
CREATE TABLE account_transactions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  account_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  transaction_type ENUM('deposit', 'withdraw') NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  memo VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_transactions_account
    FOREIGN KEY (account_id) REFERENCES accounts(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_transactions_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);


-- =========================
-- 4️⃣ users 더미데이터
-- 비밀번호: 1234
-- =========================
INSERT INTO users (name, email, password_hash, role, status)
VALUES
('김민수', 'minsu@test.com', '$2b$10$7sQ1xw5cG6pVhQWvQqZ8zO8rQxZ7Q0kzY6j2Wn9F3xY6F6Gk1p6G2', 'user', 'active'),
('이서연', 'seoyeon@test.com', '$2b$10$7sQ1xw5cG6pVhQWvQqZ8zO8rQxZ7Q0kzY6j2Wn9F3xY6F6Gk1p6G2', 'user', 'active'),
('박관리', 'admin@test.com', '$2b$10$7sQ1xw5cG6pVhQWvQqZ8zO8rQxZ7Q0kzY6j2Wn9F3xY6F6Gk1p6G2', 'admin', 'active');


-- =========================
-- 5️⃣ accounts 더미데이터
-- =========================
INSERT INTO accounts (user_id, account_number, account_name, balance)
VALUES
(1, '111-111-1111', '민수 주계좌', 1500000),
(1, '111-222-2222', '민수 저축', 3000000),
(2, '222-111-1111', '서연 급여계좌', 2200000),
(3, '333-111-1111', '관리자 계좌', 5000000);


-- =========================
-- 6️⃣ transactions 더미데이터
-- =========================
INSERT INTO account_transactions
(account_id, user_id, transaction_type, amount, memo)
VALUES
(1, 1, 'deposit', 1000000, '급여 입금'),
(1, 1, 'withdraw', 50000, '카페 결제'),
(1, 1, 'withdraw', 120000, '마트 결제'),
(2, 1, 'deposit', 3000000, '저축 입금'),
(3, 2, 'deposit', 2200000, '급여 입금'),
(4, 3, 'deposit', 5000000, '초기 자금'),
(4, 3, 'withdraw', 200000, '운영비');


-- =========================
-- 7️⃣ 페이지네이션 테스트용 (옵션)
-- =========================
INSERT INTO account_transactions
(account_id, user_id, transaction_type, amount, memo)
VALUES
(1,1,'deposit',1000,'테스트1'),
(1,1,'withdraw',2000,'테스트2'),
(1,1,'deposit',3000,'테스트3'),
(1,1,'withdraw',4000,'테스트4'),
(1,1,'deposit',5000,'테스트5'),
(1,1,'withdraw',6000,'테스트6'),
(1,1,'deposit',7000,'테스트7'),
(1,1,'withdraw',8000,'테스트8'),
(1,1,'deposit',9000,'테스트9'),
(1,1,'withdraw',10000,'테스트10');



-- =========================
-- 7️⃣ 계좌이체
-- =========================
INSERT INTO account_transfers
(from_account_id, to_account_id, user_id, amount, memo)
VALUES
-- 민수 → 민수 (계좌간 이동)
(1, 2, 1, 200000, '저축 이체'),

-- 민수 → 서연
(1, 3, 1, 150000, '친구 송금'),

-- 서연 → 민수
(3, 1, 2, 50000, '밥값 정산'),

-- 관리자 → 민수
(4, 1, 3, 300000, '보너스 지급'),

-- 관리자 → 서연
(4, 3, 3, 120000, '지원금'),

-- 민수 → 관리자
(2, 4, 1, 70000, '서비스 비용');

INSERT INTO account_transfers
(from_account_id, to_account_id, user_id, amount, memo)
VALUES
(1,2,1,1000,'테스트1'),
(2,1,1,2000,'테스트2'),
(1,3,1,3000,'테스트3'),
(3,1,2,4000,'테스트4'),
(4,1,3,5000,'테스트5'),
(1,4,1,6000,'테스트6'),
(2,3,1,7000,'테스트7'),
(3,2,2,8000,'테스트8'),
(4,2,3,9000,'테스트9'),
(2,4,1,10000,'테스트10');

CREATE TABLE account_close_requests (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  account_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  reason VARCHAR(255),
  status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  admin_memo VARCHAR(255),
  requested_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  processed_at DATETIME NULL,
  processed_by BIGINT NULL,
  CONSTRAINT fk_close_requests_account
    FOREIGN KEY (account_id) REFERENCES accounts(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_close_requests_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_close_requests_admin
    FOREIGN KEY (processed_by) REFERENCES users(id)
    ON DELETE SET NULL
);

CREATE TABLE admin_audit_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  admin_user_id BIGINT NULL,
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(100) NOT NULL,
  target_id BIGINT NULL,
  description VARCHAR(500),
  before_data JSON NULL,
  after_data JSON NULL,
  ip_address VARCHAR(100),
  user_agent VARCHAR(500),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_admin_audit_logs_admin
    FOREIGN KEY (admin_user_id) REFERENCES users(id)
    ON DELETE SET NULL
);