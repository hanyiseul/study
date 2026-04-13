-- database 생성 (인코딩방식, 대소문자 구별 안함 설정)
create database testdb character set utf8mb4 collate utf8mb4_general_ci;

-- 생성한 database 사용
use testdb;

-- user 생성 (user 계정, 비밀번호)
create user 'testuser'@'localhost' identified by '1234';

-- testdb에 모든 권한 부여
grant all privileges on testdb.* to 'testuser'@'localhost';

-- 즉시 적용
flush privileges;

-- 테이블 생성 
CREATE TABLE support_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT '접수대기',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 샘플데이터
INSERT INTO support_tickets (customer_name, title, content, status) VALUES
('김서준', '결제 오류 문의', '카드 결제 진행 중 오류가 발생했습니다.', '접수대기'),
('박지윤', '배송 일정 확인', '주문 상품의 예상 배송일을 알고 싶습니다.', '처리중'),
('이현우', '환불 요청', '중복 결제가 되어 환불을 요청합니다.', '처리완료'),
('최민서', '회원정보 수정 문의', '이메일 주소 변경이 되지 않습니다.', '접수대기'),
('정도윤', '쿠폰 적용 오류', '할인 쿠폰이 결제 화면에서 적용되지 않습니다.', '처리중'); 