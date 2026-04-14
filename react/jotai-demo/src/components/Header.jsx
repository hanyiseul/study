import { useAtom } from 'jotai';
import { themeAtom } from '../atoms/themeAtom';
import { userAtom } from '../atoms/userAtom';

function Header() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [user] = useAtom(userAtom);

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <header className="header">
      <div>
        <h1>Jotai 통합 실습</h1>
        <p>현재 사용자: {user.name}</p>
      </div>

      <button onClick={toggleTheme}>
        {theme === 'light' ? '다크모드 전환' : '라이트모드 전환'}
      </button>
    </header>
  );
}

export default Header;