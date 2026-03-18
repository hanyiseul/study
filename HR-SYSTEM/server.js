const express = require('express'); // express 라이브러리 
const path = require('path'); // 경로
const fs = require('fs'); // 파일 읽기
const mysql = require('mysql2'); // sql

const app = express();
const PORT = 3001; // port 설정

//extended 조사 필요
app.use(express.urlencoded({extended : true})); // form 데이터 해석을 위한 설정
app.use('/static', express.static(path.join(__dirname, 'static'))); // static 경로 설정

// db 연결 객체
const conn = mysql.createConnection({ // sql 계정 설정
  host: 'localhost',
  user: 'testuser',
  password: '1234',
  database: 'testdb',
  dateStrings: true
});

conn.connect((err) => {  // sql 설정한 계정으로 db 연결
  if(err) { // sql db 연결이 실패한다면
    console.log('db 연결 실패 ', err); // db 연결 실패시 콘솔로그에 err 표시
    return
  }
  console.log('db 연결 성공'); // db 연결 성공 표시
});

// 1. 문자열 변환 함수 (사용자 입력 문자열 -> html 문자열)
function escapeHtml(value) { // 사용자 입력 문자열을 안전한 html 문자열로 반환
  if(value === null || value === undefined) { // 값이 없다면
    return '';
  }
  return String(value)
    // 정규표현식(/&/g같은거) 문자를 이스케이프(&amp; 같은거)로 변환(replace)
    // 정규표현식 /찾는문자/g(문자열전체) - /&/g : 문자열 전체에서 &를 찾음
    // 보안때문에 사용 필수!!
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 2. 파일 읽기 함수 (html 템플릿 파일)
function readTemplate(fileName) { // html 템플릿 파일을 읽어 문자열로 반환
  const filePath = path.join(__dirname, 'templates', fileName); // html 파일 경로 설정
  return fs.readFileSync(filePath, 'utf8') // 설정한 html 파일 경로를 uft8로 읽어옴
}

// 3. 문자열 치환 함수 (템플릿 내 변수 -> 실제 데이터)
function renderTemplate(template, data) { // 템플릿 내 변수 표시를 실제 데이터로 치환
  let html = template;

  for (const key in data) {
    // new RegExp : '위치'를 찾아내어 검색, 추출, 치환
    const pattern = new RegExp(`{{${key}}}`, `g`) // 문자열 전체에서 {{key}}값을 추출하여 patter 변수에 담은 뒤
    console.log("pattern : ", pattern);
    html = html.replace(pattern, data[key]); // html에 pattern 값을 data[key]값으로 변환
    // console.log("html : ", html)
  }
  return html;
}

// 4. 치환 완료 안내 메세지 함수 (서버 -> 클라이언트)
function sendMessagePage(res, title, message) { // 치환된 html을 보내는 함수
  const template = readTemplate('employee-message.html'); // 2번 함수 콜백 : html 템플릿 파일 읽기
  const html = renderTemplate(template, { // 3번 함수 콜백 : 템플릿 치환하기
    title : escapeHtml(title), // 1번 함수 콜백 : title 문자를 html로 변환
    message: escapeHtml(message) // 1번 함수 콜백 : message 문자를 html로 변환
  })
  res.send(html); // res.send(보낼 데이터) 서버가 클라이언트(브라우저)에게 응답을 보내는 코드
}

// 금액 변환 함수
function formatMoney(value) {
  return Number(value).toLocaleString('ko-KR'); // 숫자를 한국식 금액 형식으로 변환
}

// 재직상태 여부 확인 함수
function getStatusSelectedMap(status) {
  return {
    // {key: value} -> {selected_status_working: status}
    // selected_status_working의 상태 === '라면' ? 'selected'를 아니면 ''를 반환
    selected_status_working: status === '재직' ? 'selected' : '', 
    selected_status_promoted: status === '승진' ? 'selected' : '',
    selected_status_leave: status === '휴직' ? 'selected' : '',
    selected_status_resigned: status === '퇴사' ? 'selected' : ''
  }
}

// 경로 이동 함수
app.get('/', (req, res) => { // get : 요청이 들어오면 실행
  res.redirect('/employee/list'); // res.redirect('이동할 경로')
});


// 직원 목록 조회 (crud-read)
app.get('/employee/list', (req,res) => { // get (데이터 조회) : 요청이 들어오면 실행
  // sql 조회
  const sql = `
    select
      employee_id,
      emp_no,
      name,
      department,
      position,
      employment_status,
      annual_salary,
      DATE_FORMAT(hire_date, '%Y-%m-%d') AS hire_date
    FROM employee
    ORDER BY employee_id DESC
  `

  conn.query(sql, (err, rows) => { // conn.query(sql문) SQL을 실행하는 함수
    if(err) {
      if (err) { // db 조회 실패시
        console.error('직원 목록 조회 실패:', err);
        return sendMessagePage(res, '조회 실패', '직원 목록 조회 중 오류가 발생했습니다.');
      }
    }

    let tableSection = ''; // 테이블 템플릿 담을 변수

    if (rows.length === 0) { // 조회 결과가 없을 때 nodata
      tableSection = `<div class="empty-box">등록된 직원 정보가 없습니다.</div>`;
    } else {
      let rowsHtml = ''; // 조회한 결과 출력 담을 변수
      
      for (let i = 0; i < rows.length; i++) {
        rowsHtml += `
          <tr>
              <td>${rows[i].employee_id}</td>
              <td>${escapeHtml(rows[i].emp_no)}</td>
              <td class="title-cell">
                  <a class="title-link" href="/employee/detail/${rows[i].employee_id}">${escapeHtml(rows[i].name)}</a>
              </td>
              <td>${escapeHtml(rows[i].department)}</td>
              <td>${escapeHtml(rows[i].position)}</td>
              <td>${escapeHtml(rows[i].employment_status)}</td>
              <td class="money">${formatMoney(rows[i].annual_salary)}원</td>
              <td>${rows[i].hire_date}</td>
              <td>
                  <a class="action-link view-link" href="/employee/detail/${rows[i].employee_id}">조회</a>
              </td>
              <td>
                  <a class="action-link edit-link" href="/employee/edit/${rows[i].employee_id}">수정</a>
              </td>
              <td>
                  <form class="inline-form" action="/employee/delete/${rows[i].employee_id}" method="post" onsubmit="return confirm('정말 삭제하시겠습니까?');">
                      <button class="delete-btn" type="submit">삭제</button>
                  </form>
              </td>
          </tr>
        `;
      }
      
      tableSection = `
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th class="col-id">번호</th>
                        <th class="col-empno">사번</th>
                        <th class="col-name">직원명</th>
                        <th class="col-dept">부서</th>
                        <th class="col-position">직급</th>
                        <th class="col-status">상태</th>
                        <th class="col-salary">연봉</th>
                        <th class="col-date">입사일</th>
                        <th class="col-action">조회</th>
                        <th class="col-action">수정</th>
                        <th class="col-action">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
      `;
    }

    const template = readTemplate('employee-list.html'); // html 파일 읽기
    console.log("template : ", template)
    const html = renderTemplate(template, { // 읽은 파일을 치환하기
      table_section: tableSection //  {{table_section}}을 tableSection로 바꾸기
    });
    console.log("tableSection : ", tableSection)
    res.send(html) // 클라이언트에 보내기
  });
});


app.get('/employee/write', (req, res) => { // '/employee/write' 조회 요청이 들어오면 
    res.sendFile(path.join(__dirname, 'templates', 'employee-write.html')); // 해당 경로로 이동
});

app.post('/employee/write', (req, res) => { // post(데이터 생성 / 저장) : 요청이 들어오면 실행 (form action="/employee/write" method="post")
  const { // 객체 구조 분해 할당
    emp_no,
    name,
    department,
    position,
    hire_date,
    employment_status,
    annual_salary,
    tax,
    bonus,
    address,
    phone,
    email,
    hr_note
  } = req.body; // req.body : form에서 보낸 데이터

  // sql 삽입 : INSERT INTO '테이블명' (컬럼들) value (컬럼에 넣을 값들)
  const sql = `
    INSERT INTO employee (
        emp_no,
        name,
        department,
        position,
        hire_date,
        employment_status,
        annual_salary,
        tax,
        bonus,
        address,
        phone,
        email,
        hr_note,
        created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CONVERT_TZ(UTC_TIMESTAMP(), '+00:00', '+09:00'))
  `;
  // sql 실행 함수
  conn.query(sql, [ // 설정한 sql에 삽입될 data
    emp_no,
    name,
    department,
    position,
    hire_date,
    employment_status,
    annual_salary,
    tax,
    bonus,
    address,
    phone,
    email,
    hr_note
  ], (err) => { // sql에 데이터 삽입 실패시 
    if (err) {
      console.error('직원 정보 저장 실패:', err);
      // 치환 완료 메세지 함수(실패 안내)
      return sendMessagePage(res, '저장 실패', '직원 정보 저장 중 오류가 발생했습니다.');
    }
    res.redirect('/employee/list'); // /employee/list'로 경로 이동
  });
});

// 수정 화면 이동
app.get('/employee/detail/:id', (req, res) => {
    const employeeId = req.params.id;

    const sql = `
        SELECT
            employee_id,
            emp_no,
            name,
            department,
            position,
            DATE_FORMAT(hire_date, '%Y-%m-%d') AS hire_date,
            employment_status,
            annual_salary,
            tax,
            bonus,
            address,
            phone,
            email,
            hr_note,
            DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at
        FROM employee
        WHERE employee_id = ?
    `;

    conn.query(sql, [employeeId], (err, rows) => {
        if (err) {
            console.error('직원 상세 조회 실패:', err);
            return sendMessagePage(res, '조회 실패', '직원 정보 조회 중 오류가 발생했습니다.');
        }

        if (rows.length === 0) {
            return sendMessagePage(res, '조회 실패', '해당 직원 정보가 존재하지 않습니다.');
        }

        const row = rows[0];
        const template = readTemplate('employee-detail.html');
        const html = renderTemplate(template, {
            employee_id: String(row.employee_id),
            emp_no: escapeHtml(row.emp_no),
            name: escapeHtml(row.name),
            department: escapeHtml(row.department),
            position: escapeHtml(row.position),
            hire_date: row.hire_date,
            employment_status: escapeHtml(row.employment_status),
            annual_salary: formatMoney(row.annual_salary),
            tax: formatMoney(row.tax),
            bonus: formatMoney(row.bonus),
            address: escapeHtml(row.address),
            phone: escapeHtml(row.phone),
            email: escapeHtml(row.email),
            hr_note: escapeHtml(row.hr_note),
            created_at: row.created_at
        });

        res.send(html);
    });
});

// 수정 화면을 보여주는 요청 (수정x)
app.get('/employee/edit/:id', (req, res) => {
  /**
   * Express는 자동으로 이렇게 만들어 줌
   * req.params = {id: "5"}
   * 
   */
  const employeeId = req.params.id;

  // sql 조회 : employee_id에 맞는 정보들 조회
  const sql = `
    SELECT
      employee_id,
      emp_no,
      name,
      department,
      position,
      DATE_FORMAT(hire_date, '%Y-%m-%d') AS hire_date,
      employment_status,
      annual_salary,
      tax,
      bonus,
      address,
      phone,
      email,
      hr_note
    FROM employee
    WHERE employee_id = ?
  `;

  // sql 실행 함수
  conn.query(sql, [employeeId], (err, rows) => { // WHERE employee_id = ?의 ?가 [employeeId]
    // 조회 실패시
    if(err) { 
      console.error('수정 화면 조회 실패:', err);
      return sendMessagePage(res, '조회 실패', '수정 화면 조회 중 오류가 발생했습니다.');
    }

    // employeeId가 0일 경우
    if (rows.length === 0) {
      return sendMessagePage(res, '조회 실패', '해당 직원 정보가 존재하지 않습니다.');
    }

    // 조회하는 employee_id는 pk 값이기 때문에 결과는 항상 1개만 나옴
    const row = rows[0]; // DB에서 조회한 한 줄 데이터
    const statusSelectedMap = getStatusSelectedMap(row.employment_status); // 재직상태 여부 확인 함수 호출

    const template = readTemplate('employee-edit.html'); // 2.파일읽기 함수 호출
    const html = renderTemplate(template, {
      employee_id: String(row.employee_id),
      emp_no: escapeHtml(row.emp_no),
      name: escapeHtml(row.name),
      department: escapeHtml(row.department),
      position: escapeHtml(row.position),
      hire_date: row.hire_date,
      annual_salary: String(row.annual_salary),
      tax: String(row.tax),
      bonus: String(row.bonus),
      address: escapeHtml(row.address),
      phone: escapeHtml(row.phone),
      email: escapeHtml(row.email),
      hr_note: escapeHtml(row.hr_note),
      selected_status_working: statusSelectedMap.selected_status_working,
      selected_status_promoted: statusSelectedMap.selected_status_promoted,
      selected_status_leave: statusSelectedMap.selected_status_leave,
      selected_status_resigned: statusSelectedMap.selected_status_resigned
    });
    res.send(html);
  });
});


// 수정한 내용 처리 요청
app.post('/employee/edit/:id', (req, res) => {
  const employeeId = req.params.id;
  const {
    emp_no,
    name,
    department,
    position,
    hire_date,
    employment_status,
    annual_salary,
    tax,
    bonus,
    address,
    phone,
    email,
    hr_note
  } = req.body;

  // sql 업데이트 
  // UPDATE 테이블명 SET 컬럼1 = 값1, 컬럼2 = 값2 WHRER 조건;
  const sql = `
    UPDATE employee
    SET
      emp_no = ?,
      name = ?,
      department = ?,
      position = ?,
      hire_date = ?,
      employment_status = ?,
      annual_salary = ?,
      tax = ?,
      bonus = ?,
      address = ?,
      phone = ?,
      email = ?,
      hr_note = ?
    WHERE employee_id = ?
  `;

  conn.query(sql, [ // sql 실행 함수
    emp_no,
    name,
    department,
    position,
    hire_date,
    employment_status,
    annual_salary,
    tax,
    bonus,
    address,
    phone,
    email,
    hr_note,
    employeeId
  ], (err, result) => {
    // 수정 실패시 (update 실패시)
    if(err) {
      console.error('직원 정보 수정 실패:', err);
      return sendMessagePage(res, '수정 실패', '직원 정보 수정 중 오류가 발생했습니다.');
    }
    // result.affectedRows 행의 개수가 0일 경우 (수정할 직원 정보가 조회하지 않을 경우)
    if (result.affectedRows === 0) { // affectedRows: SQL 실행으로 영향을 받은 행 개수
      return sendMessagePage(res, '수정 실패', '해당 직원 정보가 존재하지 않습니다.');
    }

    res.redirect('/employee/detail/' + employeeId); // 해당 경로 + employeeId값으로 이동
  });
});

// 직원 정보 삭제
app.post('/employee/delete/:id', (req, res) => {
  const employeeId = req.params.id;

  // DELETE FROM 테이블명 WHERE 조건
  const sql = `
    DELETE FROM employee
    WHERE employee_id = ?
  `

  conn.query(sql, [employeeId], (err, result) => {
    // 삭제 실패할 경우
    if (err) {
      console.error('직원 정보 삭제 실패:', err);
      return sendMessagePage(res, '삭제 실패', '직원 정보 삭제 중 오류가 발생했습니다.');
    }
    // 조회 결과가 없을 경우
    if (result.affectedRows === 0) {
      return sendMessagePage(res, '삭제 실패', '해당 직원 정보가 존재하지 않습니다.');
    }
    res.redirect('/employee/list'); // 해당 경로로 이동
  });
});

app.listen(PORT, () => {
    console.log('=========================================');
    console.log(` 인사관리 서버가 포트 ${PORT}에서 작동 중입니다.`);
    console.log('=========================================');
});
