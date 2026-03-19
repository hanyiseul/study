use testdb;
show tables;

-- table 생성
create table news (
	id int auto_increment primary key,
    title varchar(1000),
    category varchar(1000),
    content text,
    author varchar(10000)    
);

-- test query
insert into news (title, category, content, author) values
('정부 경제 정책 발표', '경제', '정부가 새로운 경제 정책을 발표했다.', '김기자'),
('프로야구 개막', '스포츠', '프로야구 시즌이 오늘 개막했다.', '이기자'),
('AI 기술 발전 가속화', 'IT', '최근 AI 기술 발전이 빠르게 진행되고 있다.', '박기자'),
('국회 본회의 개최', '정치', '국회에서 주요 법안 논의를 위한 본회의가 열렸다.', '최기자'),
('서울 주택 가격 상승', '경제', '서울 아파트 가격이 다시 상승세를 보이고 있다.', '정기자'),
('월드컵 예선 승리', '스포츠', '한국 축구 대표팀이 월드컵 예선에서 승리했다.', '한기자'),
('새 스마트폰 출시', 'IT', '국내 기업이 새로운 스마트폰을 공개했다.', '오기자');
