import Header from './components/Header';
import LoginPanel from './components/LoginPanel';
import ProductList from './components/ProductList';
import CartPanel from './components/CartPanel';
import DashboardPanel from './components/DashboardPanel';

function App() {
  return (
    <div className="app">
      <Header />

      <div className="grid-layout">
        <LoginPanel />
        <CartPanel />
        <ProductList />
        <DashboardPanel />
      </div>
    </div>
  );
}

export default App;