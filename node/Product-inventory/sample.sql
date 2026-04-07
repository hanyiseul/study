-- testdb 사용
use testdb;

-- product 테이블 생성
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    stock INT NOT NULL,
    price INT NOT NULL
);
 
 -- 샘플 데이터 입력 (insert)
 INSERT INTO product (name, category, stock, price) VALUES
('무선 이어폰', '전자기기', 12, 89000),
('노트북 거치대', '사무용품', 4, 35000),
('텀블러', '생활용품', 27, 18000),
('기계식 키보드', '전자기기', 2, 129000),
('무드등', '인테리어', 9, 22000);