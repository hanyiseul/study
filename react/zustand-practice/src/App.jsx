import Header from './components/Header';
import CountView from './components/CountView';
import CountButtons from './components/CountButtons';
import MainBox from './components/MainBox';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-layout">
        <CountView />
        <CountButtons />
        <MainBox />
      </main>
    </div>
  );
}

export default App;