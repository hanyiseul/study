import Header from './components/Header';
import Navigation from './components/Navigation';
import Aside from './components/Aside';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <Navigation />

      <div style={{ display: 'flex' }}>
        <Aside />

        <main style={{ flex: 1, padding: '10px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;