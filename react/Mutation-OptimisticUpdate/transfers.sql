- MySQL
CREATE DATABASE testdb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE testdb;

CREATE USER 'testuser'@'localhost' IDENTIFIED BY '1234';

GRANT ALL PRIVILEGES ON testdb.* TO 'testuser'@'localhost';

FLUSH PRIVILEGES;

Exit

mysql -u testuser -p
1234
use testdb;

CREATE TABLE transfers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_name VARCHAR(50),
  receiver_name VARCHAR(50),
  amount INT,
  transfer_type VARCHAR(30),
  status VARCHAR(20),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);