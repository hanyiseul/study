import useAuthStore from '../store/authStore';

function LoginPanel() {
  const isLoggedIn = useAuthStore(function (state) {
    return state.isLoggedIn;
  });

  const user = useAuthStore(function (state) {
    return state.user;
  });

  const login = useAuthStore(function (state) {
    return state.login;
  });

  const logout = useAuthStore(function (state) {
    return state.logout;
  });

  function handleLogin() {
    login({
      name: '김학생',
      email: 'kim@student.com',
      role: 'student'
    });
  }

  return (
    <section className="card">
      <h2>로그인 상태관리</h2>

      {isLoggedIn ? (
        <>
          <p>이름: {user.name}</p>
          <p>이메일: {user.email}</p>
          <p>권한: {user.role}</p>
          <button onClick={logout}>로그아웃</button>
        </>
      ) : (
        <>
          <p>현재 로그인된 사용자가 없습니다.</p>
          <button onClick={handleLogin}>로그인</button>
        </>
      )}
    </section>
  );
}

export default LoginPanel;