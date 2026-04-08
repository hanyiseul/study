import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function Header() {
  const theme = useContext(ThemeContext);
  return <h1>현재 테마: {theme}</h1>;
}

function ContextAPI() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <button onClick={() => setTheme('dark')}>테마 변경</button>
    </ThemeContext.Provider>
  );
}

export default ContextAPI;