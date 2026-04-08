import { createContext, useContext, useState } from 'react';

// Context API는 여러 컴포넌트가 같은 상태를 공유해야 할 때 사용하는 React 기능
//   -> 필요한 컴포넌트가 직접 공통 데이터를 읽을 수 있게
const ThemeContext = createContext(); // context 생성

function Header() {
  const theme = useContext(ThemeContext);

  return <h1>현재 테마: {theme}</h1>;
}

function App() {
  const [theme, setTheme] = useState('light');

  return (
    // Provider: 공유할 값을 하위 컴포넌트에 공급
    // value 속성으로 provider 하위 컴포넌트에 value값의 속성이나 함수 전달
    <ThemeContext.Provider value={theme}>
      <Header />
      <button onClick={() => setTheme('dark')}>테마 변경</button>
    </ThemeContext.Provider>
  );
}

export default App;