CREATE DATABASE IF NOT EXISTS wms_part4
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE wms_part4;

CREATE USER IF NOT EXISTS 'testuser'@'localhost' IDENTIFIED BY '1234';

GRANT ALL PRIVILEGES ON wms_part4.* TO 'testuser'@'localhost';

FLUSH PRIVILEGES;


CREATE TABLE users (
   id BIGINT NOT NULL AUTO_INCREMENT,
   email VARCHAR(100) NOT NULL,
   password_hash VARCHAR(255) NOT NULL,
   name VARCHAR(50) NOT NULL,
   role VARCHAR(30) NOT NULL,
   status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL,
   PRIMARY KEY (id),
   UNIQUE KEY uk_users_email (email)
);

CREATE TABLE contracts (
   id BIGINT NOT NULL AUTO_INCREMENT,
   customer_id BIGINT NOT NULL,
   product_name VARCHAR(100) NOT NULL,
   quantity INT NOT NULL,
   warehouse_name VARCHAR(100) NOT NULL,
   storage_type VARCHAR(30) NOT NULL,
   request_memo TEXT NULL,
   contract_status VARCHAR(30) NOT NULL DEFAULT 'REQUESTED',
   contract_date DATE NOT NULL,
   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NULL,
   PRIMARY KEY (id),
   CONSTRAINT fk_contracts_customer
       FOREIGN KEY (customer_id) REFERENCES users(id)
);

CREATE TABLE inbounds (
    id BIGINT NOT NULL AUTO_INCREMENT,
    contract_id BIGINT NOT NULL,
    received_quantity INT NOT NULL,
    warehouse_name VARCHAR(100) NOT NULL,
    storage_zone VARCHAR(100) NOT NULL,
    pallet_no VARCHAR(50) NULL,
    inbound_status VARCHAR(30) NOT NULL DEFAULT 'REGISTERED',
    inbound_date DATE NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_inbounds_contract
      FOREIGN KEY (contract_id) REFERENCES contracts(id)
);

CREATE TABLE inventories (
     id BIGINT NOT NULL AUTO_INCREMENT,
     contract_id BIGINT NOT NULL,
     customer_id BIGINT NOT NULL,
     product_name VARCHAR(100) NOT NULL,
     current_quantity INT NOT NULL,
     warehouse_name VARCHAR(100) NOT NULL,
     storage_zone VARCHAR(100) NOT NULL,
     pallet_no VARCHAR(50) NULL,
     inventory_status VARCHAR(30) NOT NULL DEFAULT 'STORED',
     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     updated_at DATETIME NULL,
     PRIMARY KEY (id),
     CONSTRAINT fk_inventories_contract
         FOREIGN KEY (contract_id) REFERENCES contracts(id),
     CONSTRAINT fk_inventories_customer
         FOREIGN KEY (customer_id) REFERENCES users(id)
);

CREATE TABLE outbounds (
    id BIGINT NOT NULL AUTO_INCREMENT,
    inventory_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    request_quantity INT NOT NULL,
    desired_date DATE NULL,
    request_memo TEXT NULL,
    outbound_status VARCHAR(30) NOT NULL DEFAULT 'REQUESTED',
    requested_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME NULL,
    updated_at DATETIME NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_outbounds_inventory
       FOREIGN KEY (inventory_id) REFERENCES inventories(id),
    CONSTRAINT fk_outbounds_customer
       FOREIGN KEY (customer_id) REFERENCES users(id)
);

CREATE TABLE notices (
     id BIGINT NOT NULL AUTO_INCREMENT,
     title VARCHAR(200) NOT NULL,
     content TEXT NOT NULL,
     visible BOOLEAN NOT NULL DEFAULT TRUE,
     created_by BIGINT NULL,
     created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
     updated_at DATETIME NULL,
     PRIMARY KEY (id),
     CONSTRAINT fk_notices_user
         FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE inquiries (
    id BIGINT NOT NULL AUTO_INCREMENT,
    customer_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    answer_content TEXT NULL,
    inquiry_status VARCHAR(30) NOT NULL DEFAULT 'WAITING',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    answered_at DATETIME NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_inquiries_customer
       FOREIGN KEY (customer_id) REFERENCES users(id)
);

INSERT INTO users
(email, password_hash, name, role, status)
VALUES
    ('admin@test.com', '$2a$10$fqNRPb4qcDqZfdVeS2Ms.uYhOzHiYxMbNcl7/.ap2UKTA50vM4Idm', '관리자', 'ROLE_ADMIN', 'ACTIVE'),
    ('user@test.com', '$2a$10$fqNRPb4qcDqZfdVeS2Ms.uYhOzHiYxMbNcl7/.ap2UKTA50vM4Idm', '고객사용자', 'ROLE_CUSTOMER', 'ACTIVE');

INSERT INTO contracts
(customer_id, product_name, quantity, warehouse_name, storage_type, request_memo, contract_status, contract_date)
VALUES
    (2, '유압 실린더', 120, 'A창고', 'NORMAL', '입고 전 외관 검수 필요', 'CONFIRMED', CURRENT_DATE),
    (2, '전장 제어 모듈', 80, 'B창고', 'NORMAL', '습기 주의', 'REQUESTED', CURRENT_DATE);

INSERT INTO notices
(title, content, visible, created_by)
VALUES
    ('WMS 운영 안내', '입고 및 출고 요청은 관리자 확인 후 처리됩니다.', TRUE, 1);

INSERT INTO inquiries
(customer_id, title, content, inquiry_status)
VALUES
    (2, '입고 일정 문의', '유압 실린더 입고 예정일을 확인하고 싶습니다.', 'WAITING');