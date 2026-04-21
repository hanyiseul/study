// Global UI State 사용
import useStore from '../store'; // Zustand 전역 저장소를 불러옴

function ThemeButton() {
  // 특정 컴포넌트 내부 상태가 아니라 여러 화면에서 공유될 수 있는 UI 상태
  const { theme, toggleTheme } = useStore();

  return (
    <button onClick={toggleTheme}>
      현재 테마: {theme}
    </button>
  );
}

export default ThemeButton;