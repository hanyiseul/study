CREATE DATABASE testdb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE testdb;

CREATE USER 'testuser'@'localhost' IDENTIFIED BY '1234';

GRANT ALL PRIVILEGES ON testdb.* TO 'testuser'@'localhost';

FLUSH PRIVILEGES;

use testdb;

CREATE TABLE support_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT '접수대기',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO support_tickets (customer_name, title, content, status) VALUES
('김서준', '결제 오류 문의', '카드 결제 진행 중 오류가 발생했습니다.', '접수대기'),
('박지윤', '배송 일정 확인', '주문 상품의 예상 배송일을 알고 싶습니다.', '처리중'),
('이현우', '환불 요청', '중복 결제가 되어 환불을 요청합니다.', '처리완료'),
('최민서', '회원정보 수정 문의', '이메일 주소 변경이 되지 않습니다.', '접수대기'),
('정도윤', '쿠폰 적용 오류', '할인 쿠폰이 결제 화면에서 적용되지 않습니다.', '처리중');