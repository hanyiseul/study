export default function HomePage() {
  return (
    <main style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <h1>JWT + HttpOnly 쿠키 인증 실습</h1>
      <p>이 프로젝트는 UI보다 API 구조 이해를 목표로 합니다.</p>

      <h2>테스트 대상 API</h2>
      <ul>
        <li>POST /api/auth/signup</li>
        <li>POST /api/auth/login</li>
        <li>POST /api/auth/logout</li>
        <li>GET /api/auth/me</li>
        <li>GET /api/admin/users</li>
      </ul>

      <h2>연습용 페이지</h2>
      <ul>
        <li>/practice/user</li>
        <li>/practice/admin</li>
      </ul>
    </main>
  );
}