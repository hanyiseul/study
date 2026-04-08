import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h1>홈 페이지입니다.</h1>;
}

function About() {
  return <h1>소개 페이지입니다.</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">홈</Link> | 
        <Link to="/about">소개</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;