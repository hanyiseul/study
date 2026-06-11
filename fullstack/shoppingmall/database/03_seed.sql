USE shopping_db;

-- BCrypt hash for password: 1234
SET @PWD = '$2a$10$EzbrJCN0BE7B4R3nWRAxC.Zvob6ZfRfMVn/7nsbm9hhCmYxCk8LjC';

INSERT INTO users (name, email, password_hash, phone, role, status, created_at, updated_at) VALUES
('관리자', 'admin@test.com', @PWD, '010-0000-0000', 'ADMIN', 'ACTIVE', NOW(), NOW()),
('구매자', 'user@test.com', @PWD, '010-1111-1111', 'USER', 'ACTIVE', NOW(), NOW()),
('승인판매자', 'seller@test.com', @PWD, '010-2222-2222', 'SELLER', 'ACTIVE', NOW(), NOW()),
('승인대기판매자', 'pending@test.com', @PWD, '010-3333-3333', 'SELLER', 'ACTIVE', NOW(), NOW());

INSERT INTO sellers (user_id, business_name, business_number, store_name, status, created_at, updated_at) VALUES
(3, '테스트상사', '111-22-33333', '테스트스토어', 'APPROVED', NOW(), NOW()),
(4, '대기상사', '222-33-44444', '대기스토어', 'PENDING', NOW(), NOW());

INSERT INTO products (seller_id, name, price, stock_quantity, category, description, image_url, status, created_at, updated_at) VALUES
(1, '무선 키보드', 35000, 50, '전자기기', '실습용 무선 키보드 상품입니다.', '/placeholder-product.png', 'ON_SALE', NOW(), NOW()),
(1, '블루투스 마우스', 25000, 80, '전자기기', '실습용 블루투스 마우스 상품입니다.', '/placeholder-product.png', 'ON_SALE', NOW(), NOW()),
(1, '노트북 거치대', 42000, 30, '사무용품', '높이 조절이 가능한 노트북 거치대입니다.', '/placeholder-product.png', 'ON_SALE', NOW(), NOW());

INSERT INTO notices (admin_id, title, content, created_at, updated_at) VALUES
(1, '쇼핑몰 오픈 안내', 'JPA 기반 쇼핑몰 실습 서비스가 오픈되었습니다.', NOW(), NOW());
