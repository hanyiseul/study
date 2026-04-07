CREATE TABLE users (
    user_id VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    account_number VARCHAR(30) NOT NULL UNIQUE,
    balance BIGINT NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE transfers (
    transfer_id INT AUTO_INCREMENT PRIMARY KEY,
    from_account_number VARCHAR(30) NOT NULL,
    to_account_number VARCHAR(30) NOT NULL,
    sender_user_id VARCHAR(50) NOT NULL,
    receiver_user_id VARCHAR(50) NOT NULL,
    amount BIGINT NOT NULL,
    transfer_memo VARCHAR(255),
    transferred_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_user_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_user_id) REFERENCES users(user_id)
);

CREATE TABLE account_transactions (
    tx_id INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(30) NOT NULL,
    tx_type ENUM('DEPOSIT', 'WITHDRAW', 'TRANSFER_OUT', 'TRANSFER_IN') NOT NULL,
    amount BIGINT NOT NULL,
    balance_after BIGINT NOT NULL,
    related_account VARCHAR(30),
    transfer_id INT NULL,
    memo VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_number) REFERENCES accounts(account_number),
    FOREIGN KEY (transfer_id) REFERENCES transfers(transfer_id)
);

INSERT INTO users (user_id, password, user_name, role) VALUES
('admin1', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '한지훈', 'admin'),
('user1',  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '김민수', 'user'),
('user2',  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '이서연', 'user'),
('user3',  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '박준호', 'user');

INSERT INTO accounts (user_id, account_number, balance) VALUES
('admin1', '1002-0000-0001', 0),
('user1',  '1002-1111-1111', 845000),
('user2',  '1002-2222-2222', 912000),
('user3',  '1002-3333-3333', 743000);

-- 이체 기록(transfers) 삽입
INSERT INTO transfers (transfer_id, from_account_number, to_account_number, sender_user_id, receiver_user_id, amount, transfer_memo, transferred_at) VALUES
(1, '1002-1111-1111', '1002-2222-2222', 'user1', 'user2', 12000, '점심값', '2026-03-01 09:10:00'),
(2, '1002-2222-2222', '1002-3333-3333', 'user2', 'user3', 30000, '스터디비', '2026-03-01 11:20:00'),
(3, '1002-3333-3333', '1002-1111-1111', 'user3', 'user1', 45000, '모임회비', '2026-03-01 15:05:00'),
(4, '1002-1111-1111', '1002-2222-2222', 'user1', 'user2', 18000, '커피정산', '2026-03-02 10:00:00'),
(5, '1002-2222-2222', '1002-3333-3333', 'user2', 'user3', 22000, '교통비', '2026-03-02 13:40:00'),
(6, '1002-3333-3333', '1002-1111-1111', 'user3', 'user1', 51000, '공동구매', '2026-03-02 18:25:00'),
(7, '1002-1111-1111', '1002-2222-2222', 'user1', 'user2', 27000, '저녁식사', '2026-03-03 09:30:00'),
(8, '1002-2222-2222', '1002-3333-3333', 'user2', 'user3', 15000, '택시비', '2026-03-03 12:15:00'),
(9, '1002-3333-3333', '1002-1111-1111', 'user3', 'user1', 39000, '간식비', '2026-03-03 17:45:00'),
(10, '1002-1111-1111', '1002-2222-2222', 'user1', 'user2', 34000, '회식정산', '2026-03-04 08:50:00');

-- 상세 거래 내역(account_transactions) 삽입
INSERT INTO account_transactions (account_number, tx_type, amount, balance_after, related_account, transfer_id, memo, created_at) VALUES
('1002-1111-1111', 'DEPOSIT', 1000000, 1000000, NULL, NULL, '초기입금', '2026-02-28 09:00:00'),
('1002-2222-2222', 'DEPOSIT', 1000000, 1000000, NULL, NULL, '초기입금', '2026-02-28 09:00:00'),
('1002-3333-3333', 'DEPOSIT', 1000000, 1000000, NULL, NULL, '초기입금', '2026-02-28 09:00:00'),
('1002-1111-1111', 'TRANSFER_OUT', 12000, 988000, '1002-2222-2222', 1, '점심값', '2026-03-01 09:10:00'),
('1002-2222-2222', 'TRANSFER_IN', 12000, 1012000, '1002-1111-1111', 1, '점심값', '2026-03-01 09:10:00'),
('1002-2222-2222', 'TRANSFER_OUT', 30000, 982000, '1002-3333-3333', 2, '스터디비', '2026-03-01 11:20:00'),
('1002-3333-3333', 'TRANSFER_IN', 30000, 1030000, '1002-2222-2222', 2, '스터디비', '2026-03-01 11:20:00'),
('1002-3333-3333', 'TRANSFER_OUT', 45000, 985000, '1002-1111-1111', 3, '모임회비', '2026-03-01 15:05:00'),
('1002-1111-1111', 'TRANSFER_IN', 45000, 1033000, '1002-3333-3333', 3, '모임회비', '2026-03-01 15:05:00'),
('1002-1111-1111', 'TRANSFER_OUT', 18000, 1015000, '1002-2222-2222', 4, '커피정산', '2026-03-02 10:00:00'),
('1002-2222-2222', 'TRANSFER_IN', 18000, 1000000, '1002-1111-1111', 4, '커피정산', '2026-03-02 10:00:00'),
('1002-2222-2222', 'TRANSFER_OUT', 22000, 978000, '1002-3333-3333', 5, '교통비', '2026-03-02 13:40:00'),
('1002-3333-3333', 'TRANSFER_IN', 22000, 1007000, '1002-2222-2222', 5, '교통비', '2026-03-02 13:40:00'),
('1002-3333-3333', 'TRANSFER_OUT', 51000, 956000, '1002-1111-1111', 6, '공동구매', '2026-03-02 18:25:00'),
('1002-1111-1111', 'TRANSFER_IN', 51000, 1066000, '1002-3333-3333', 6, '공동구매', '2026-03-02 18:25:00'),
('1002-1111-1111', 'TRANSFER_OUT', 27000, 1039000, '1002-2222-2222', 7, '저녁식사', '2026-03-03 09:30:00'),
('1002-2222-2222', 'TRANSFER_IN', 27000, 1005000, '1002-1111-1111', 7, '저녁식사', '2026-03-03 09:30:00'),
('1002-2222-2222', 'TRANSFER_OUT', 15000, 990000, '1002-3333-3333', 8, '택시비', '2026-03-03 12:15:00'),
('1002-3333-3333', 'TRANSFER_IN', 15000, 971000, '1002-2222-2222', 8, '택시비', '2026-03-03 12:15:00'),
('1002-3333-3333', 'TRANSFER_OUT', 39000, 932000, '1002-1111-1111', 9, '간식비', '2026-03-03 17:45:00'),
('1002-1111-1111', 'TRANSFER_IN', 39000, 1078000, '1002-3333-3333', 9, '간식비', '2026-03-03 17:45:00'),
('1002-1111-1111', 'TRANSFER_OUT', 34000, 1044000, '1002-2222-2222', 10, '회식정산', '2026-03-04 08:50:00'),
('1002-2222-2222', 'TRANSFER_IN', 34000, 1024000, '1002-1111-1111', 10, '회식정산', '2026-03-04 08:50:00'),
('1002-1111-1111', 'WITHDRAW', 50000, 994000, NULL, NULL, 'ATM출금', '2026-03-05 09:00:00'),
('1002-2222-2222', 'WITHDRAW', 42000, 982000, NULL, NULL, '현금출금', '2026-03-05 10:00:00'),
('1002-3333-3333', 'DEPOSIT', 80000, 1012000, NULL, NULL, '급여입금', '2026-03-05 11:00:00'),
('1002-1111-1111', 'DEPOSIT', 30000, 1024000, NULL, NULL, '용돈입금', '2026-03-06 09:00:00'),
('1002-2222-2222', 'DEPOSIT', 55000, 1037000, NULL, NULL, '환급금', '2026-03-06 10:00:00'),
('1002-3333-3333', 'WITHDRAW', 27000, 985000, NULL, NULL, '생활비출금', '2026-03-06 11:00:00'),
('1002-1111-1111', 'WITHDRAW', 12000, 1012000, NULL, NULL, '편의점', '2026-03-07 08:30:00'),
('1002-2222-2222', 'DEPOSIT', 70000, 1107000, NULL, NULL, '보너스', '2026-03-07 09:30:00'),
('1002-3333-3333', 'DEPOSIT', 65000, 1050000, NULL, NULL, '정산금', '2026-03-07 10:30:00'),
('1002-1111-1111', 'DEPOSIT', 20000, 1032000, NULL, NULL, '환불', '2026-03-08 08:00:00'),
('1002-2222-2222', 'WITHDRAW', 15000, 1092000, NULL, NULL, '교통카드', '2026-03-08 09:00:00'),
('1002-3333-3333', 'WITHDRAW', 18000, 1032000, NULL, NULL, '점심결제', '2026-03-08 10:00:00'),
('1002-1111-1111', 'WITHDRAW', 37000, 995000, NULL, NULL, '공과금', '2026-03-09 08:15:00'),
('1002-2222-2222', 'DEPOSIT', 60000, 1152000, NULL, NULL, '캐시백', '2026-03-09 09:15:00'),
('1002-3333-3333', 'DEPOSIT', 45000, 1077000, NULL, NULL, '중고거래', '2026-03-09 10:15:00'),
('1002-1111-1111', 'DEPOSIT', 150000, 1145000, NULL, NULL, '급여', '2026-03-10 08:00:00'),
('1002-2222-2222', 'WITHDRAW', 88000, 1064000, NULL, NULL, '쇼핑', '2026-03-10 09:00:00'),
('1002-3333-3333', 'WITHDRAW', 55000, 1022000, NULL, NULL, '병원비', '2026-03-10 10:00:00');

-- 최종 잔액 업데이트 (내역과 동기화)
UPDATE accounts SET balance = 1145000 WHERE account_number = '1002-1111-1111';
UPDATE accounts SET balance = 1064000 WHERE account_number = '1002-2222-2222';
UPDATE accounts SET balance = 1022000 WHERE account_number = '1002-3333-3333';

CREATE TABLE savings_products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_type ENUM('DEPOSIT', 'INSTALLMENT') NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    period_months INT NOT NULL,
    min_amount BIGINT NOT NULL DEFAULT 0,
    status ENUM('ON', 'OFF') NOT NULL DEFAULT 'ON',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_savings (
    savings_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    account_number VARCHAR(30) NOT NULL,
    product_id INT NOT NULL,
    join_amount BIGINT NOT NULL DEFAULT 0,
    monthly_amount BIGINT NOT NULL DEFAULT 0,
    maturity_date DATETIME NOT NULL,
    status ENUM('ACTIVE', 'CLOSED') NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (account_number) REFERENCES accounts(account_number),
    FOREIGN KEY (product_id) REFERENCES savings_products(product_id)
);

CREATE TABLE transfer_limits (
    user_id VARCHAR(50) PRIMARY KEY,
    daily_limit BIGINT NOT NULL DEFAULT 1000000,
    per_transfer_limit BIGINT NOT NULL DEFAULT 500000,
    used_today BIGINT NOT NULL DEFAULT 0,
    last_reset_date DATE NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO savings_products (product_name, product_type, interest_rate, period_months, min_amount)
VALUES
('기본 정기예금 6개월', 'DEPOSIT', 2.80, 6, 100000),
('기본 정기예금 12개월', 'DEPOSIT', 3.20, 12, 100000),
('기본 자유적금 12개월', 'INSTALLMENT', 3.50, 12, 10000);

INSERT INTO transfer_limits (user_id, daily_limit, per_transfer_limit, used_today, last_reset_date)
SELECT user_id, 1000000, 500000, 0, CURDATE()
FROM users
WHERE user_id NOT IN (SELECT user_id FROM transfer_limits);