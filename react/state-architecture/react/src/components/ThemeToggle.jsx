// 상태를 직접 만들지 않고 props로 전달 받음
function ThemeToggle({ theme, toggleTheme }) { // Client State의 소비자 역할만 수행
  return (
    <button onClick={toggleTheme}>
      현재 테마: {theme}
    </button>
  );
}

export default ThemeToggle;