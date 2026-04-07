import Profile from './components/Profile';

function App() {
  return (
    <div>
      <Profile name="홍길동" age={24} major="컴퓨터공학" />
      <Profile name="김영수" age={22} major="산업공학" />
    </div>
  );
}

export default App;