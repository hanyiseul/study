CREATE TABLE accounts2 (
    account_number VARCHAR(50) PRIMARY KEY,
    balance INT
);

CREATE TABLE transactions2 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_account VARCHAR(50),
    to_account VARCHAR(50),
    amount INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO accounts2 (account_number, balance) VALUES
('ACC001', 1000000),
('ACC002', 500000),
('ACC003', 300000),
('ACC004', 100000),
('ACC005', 0);

INSERT INTO transactions2 (from_account, to_account, amount, created_at) VALUES
('ACC001', 'ACC002', 100000, NOW() - INTERVAL 15 MINUTE),
('ACC002', 'ACC003', 50000, NOW() - INTERVAL 12 MINUTE),
('ACC003', 'ACC004', 20000, NOW() - INTERVAL 10 MINUTE),
('ACC001', 'ACC005', 300000, NOW() - INTERVAL 8 MINUTE);