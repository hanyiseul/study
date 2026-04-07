-- db 생성
CREATE DATABASE newsdb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
use newsdb;

-- 사용자 생성
create user 'testuser'@'localhost' identified by '1234';
-- 사용자 권한 부여
grant all privileges on newsdb.* to 'testuser'@'localhost'; -- testuser에게 모든 권한 부여
-- 권한 즉시 적용
flush privileges;

-- user 테이블 생성
create table users (
	id int auto_increment primary key, -- 기본키, 자동증가
    user_id varchar(50) not null unique, -- 유일키, 빈값 금지
    password varchar(255) not null, -- 빈값 금지
    user_name varchar(50) not null, -- 빈값 금지
    role varchar(20) not null -- 빈값 금지
);
-- articles 테이블 생성
create table articles (
	id int auto_increment primary key, -- 기본키, 자동증가
    title varchar(255) not null, -- 빈값 금지
    content text not null, -- 빈값 금지
    article_date varchar(20) not null, -- 빈값 금지
    category varchar(2) not null, -- 빈값 금지
    reporter_id int not null, -- 빈값 금지
    reporter_name varchar(50) not null, -- 빈값 금지
    photo_path varchar(255), -- 빈값 금지
    status varchar(20) not null default 'pending', -- 상태값, 기본값 'pendign', 빈값 금지
    create_at datetime default current_timestamp, -- 글이 생성된 시간을 저장하는 컬럼, 기본값 값을 넣지 않으면 현재 시간을 자동으로 넣어줌
    foreign key (reporter_id) references users(id) on delete cascade 
		-- 외래키 설정 (articles.reporter_id는 users테이블의 id값만 들어올 수 있음)
        -- on delete cascade 연쇄 삭제 옵션 (부모 데이터가 삭제되면 연결된 자식 데이터도 삭제)
);
create table comments (
	id int auto_increment primary key, -- 기본키, 자동증가
	article_id int not null, -- 빈값 금지
    user_id int not null, -- 빈값 금지
    user_name varchar(50) not null, -- 빈값 금지
    content text not null, -- 빈값 금지
    create_at datetime default current_timestamp, -- 글이 생성된 시간을 저장하는 컬럼, 기본값 값을 넣지 않으면 현재 시간을 자동으로 넣어줌
	foreign key (article_id) references articles(id) on delete cascade, -- 외래키 설정 article_id -> articles 테이블 id값 참조
    foreign key (user_id) references users(id) on delete cascade -- 외래키 설정 user_id -> users 테이블 id값 참조
);