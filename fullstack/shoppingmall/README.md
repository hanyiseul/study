# JPA 기반 쇼핑몰 풀스택 서비스 구축

이 프로젝트는 Spring Boot JPA 백엔드와 Next.js 프론트엔드를 분리하여 구성한 쇼핑몰 풀스택 실습 프로젝트이다.

## 1. 기술 기준

| 구분 | 내용 |
|---|---|
| Backend | Spring Boot, Spring Security JWT, Spring Data JPA, MariaDB |
| Frontend | Next.js App Router, TypeScript, API Route, globals.css |
| Database | MariaDB |
| Java | Java 17 |
| Build Tool | Gradle |
| Frontend Port | 3100 |
| Backend Port | 3200 |
| DB Port | 3306 |

이 프로젝트는 Gradle만 사용한다.

사용 파일:

```text
build.gradle
settings.gradle
gradlew
gradlew.bat
```

사용하지 않는 항목:

```text
pom.xml
mvn
mvnw
mvnw.cmd
.mvn/
```

## 2. 폴더 구조

```text
shopping-fullstack-project/
├── database/
│   ├── 01_create_database.sql
│   ├── 02_schema.sql
│   └── 03_seed.sql
├── shopping-spring-api/
└── shopping-next-frontend/
```

## 3. MariaDB 준비

MariaDB 실행 상태를 확인한다.

```bash
sudo systemctl status mariadb
```

실행 중이 아니면 시작한다.

```bash
sudo systemctl start mariadb
```

데이터베이스와 계정을 생성한다.

```bash
cd ~/shopping-fullstack-project
sudo mariadb < database/01_create_database.sql
```

테이블을 생성한다.

```bash
mariadb -u testuser -p'1234' shopping_db < database/02_schema.sql
```

초기 데이터를 입력한다.

```bash
mariadb -u testuser -p'1234' shopping_db < database/03_seed.sql
```

테이블을 확인한다.

```bash
mariadb -u testuser -p'1234' shopping_db
```

```sql
SHOW TABLES;
SELECT id, name, email, role, status FROM users;
```

## 4. Spring Boot 실행

Spring Boot 백엔드는 3200 포트에서 실행된다.

```bash
cd ~/shopping-fullstack-project/shopping-spring-api
./gradlew bootRun
```

만약 `./gradlew` 실행 권한이 없으면 다음 명령을 먼저 실행한다.

```bash
chmod +x gradlew
./gradlew bootRun
```

백엔드 설정 파일 위치:

```text
shopping-spring-api/src/main/resources/application.properties
```

주요 설정:

```properties
server.port=3200
spring.datasource.url=jdbc:mariadb://localhost:3306/shopping_db
spring.datasource.username=testuser
spring.datasource.password=1234
spring.jpa.hibernate.ddl-auto=validate
```

## 5. Next.js 실행

Next.js 프론트엔드는 3100 포트에서 실행된다.

```bash
cd ~/shopping-fullstack-project/shopping-next-frontend
cp .env.local.example .env.local
npm install
npm run dev
```

브라우저 접속 주소:

```text
http://localhost:3100
```

`.env.local` 기준:

```properties
SPRING_API_BASE_URL=http://localhost:3200
```

## 6. 기본 계정

| 역할 | 이메일 | 비밀번호 |
|---|---|---|
| 관리자 | admin@test.com | 1234 |
| 구매자 | user@test.com | 1234 |
| 승인 판매자 | seller@test.com | 1234 |
| 승인 대기 판매자 | pending@test.com | 1234 |

## 7. 브라우저 테스트 흐름

구매자 테스트:

```text
로그인
→ 상품 목록 조회
→ 상품 상세 조회
→ 장바구니 담기
→ 장바구니 조회
→ 주문서 작성
→ 주문 생성
→ 주문 내역 조회
→ 리뷰 작성
```

판매자 테스트:

```text
판매자 로그인
→ 상품 등록
→ 내 상품 목록 조회
→ 상품 수정
→ 판매 중지
→ 주문 조회
→ 배송 상태 변경
```

관리자 테스트:

```text
관리자 로그인
→ 대시보드 확인
→ 회원 관리
→ 판매자 승인
→ 상품 차단
→ 주문 조회
→ 공지사항 등록
```

## 8. curl 테스트

curl 테스트는 브라우저 없이 API 요청과 응답을 확인할 때 사용한다. 이 프로젝트에서는 Next.js API Route가 JWT 쿠키를 저장하므로, 로그인 테스트에서는 쿠키 파일을 저장하고 이후 요청에서 재사용한다.

### 8.1 구매자 로그인

```bash
curl -i -c user-cookie.txt -X POST http://localhost:3100/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"1234"}'
```

### 8.2 현재 사용자 확인

```bash
curl -i -b user-cookie.txt http://localhost:3100/api/auth/me
```

### 8.3 상품 목록 조회

```bash
curl -i http://localhost:3100/api/products
```

### 8.4 상품 상세 조회

```bash
curl -i http://localhost:3100/api/products/1
```

### 8.5 장바구니 담기

```bash
curl -i -b user-cookie.txt -X POST http://localhost:3100/api/cart/items \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":2}'
```

### 8.6 장바구니 조회

```bash
curl -i -b user-cookie.txt http://localhost:3100/api/cart
```

### 8.7 주문 생성

```bash
curl -i -b user-cookie.txt -X POST http://localhost:3100/api/orders \
  -H "Content-Type: application/json" \
  -d '{"receiverName":"홍길동","receiverPhone":"010-1234-5678","deliveryAddress":"서울시 중구"}'
```

### 8.8 주문 목록 조회

```bash
curl -i -b user-cookie.txt http://localhost:3100/api/orders
```

### 8.9 관리자 로그인

```bash
curl -i -c admin-cookie.txt -X POST http://localhost:3100/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"1234"}'
```

### 8.10 관리자 대시보드 조회

```bash
curl -i -b admin-cookie.txt http://localhost:3100/api/admin/dashboard
```

### 8.11 판매자 승인

```bash
curl -i -b admin-cookie.txt -X PUT http://localhost:3100/api/admin/sellers/2/approve
```

### 8.12 판매자 로그인

```bash
curl -i -c seller-cookie.txt -X POST http://localhost:3100/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seller@test.com","password":"1234"}'
```

### 8.13 판매자 상품 등록

```bash
curl -i -b seller-cookie.txt -X POST http://localhost:3100/api/seller/products \
  -H "Content-Type: application/json" \
  -d '{"name":"테스트 상품","price":15000,"stockQuantity":20,"category":"테스트","description":"curl 등록 상품","imageUrl":"/placeholder-product.png"}'
```

### 8.14 판매자 주문 조회

```bash
curl -i -b seller-cookie.txt http://localhost:3100/api/seller/orders
```

## 9. 오류 점검

포트가 충돌하면 기존 프로세스를 종료하고 정해진 포트를 유지한다.

```text
Next.js: 3100
Spring Boot: 3200
MariaDB: 3306
```

DB 연결 오류가 발생하면 다음을 확인한다.

```text
MariaDB 실행 여부
shopping_db 생성 여부
testuser / 1234 계정 여부
02_schema.sql 실행 여부
```

로그인 유지가 안 되면 브라우저 또는 curl 쿠키 파일에서 `token` 쿠키가 저장되었는지 확인한다.

권한 오류가 발생하면 현재 계정의 role과 API 경로를 확인한다.

```text
/api/cart/** = USER
/api/orders/** = USER
/api/reviews/** = USER
/api/seller/** = SELLER
/api/admin/** = ADMIN
```
