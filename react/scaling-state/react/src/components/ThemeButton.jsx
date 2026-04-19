import useStore from '../store'; // Zustand 전역 저장소 호출

// 여러 화면에서 공유될 수 있는 UI 상태 -> Global UI State로 관리하는 것이 적절
function ThemeButton() {
  // 전역 상태 함수 호출
  const { theme, toggleTheme } = useStore();

  return (
    <button onClick={toggleTheme}>
      현재 테마: {theme}
    </button>
  );
}

export default ThemeButton;